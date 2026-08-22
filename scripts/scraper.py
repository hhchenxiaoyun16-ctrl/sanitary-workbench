#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""小小y产品策划 · 自动更新抓取器
- 读取 curated.json (精选真实内容)
- 抓取 Google News RSS (卫生巾/安睡裤/经期裤/女性护理) 实时新闻
- 为实时新闻分配真实封面图(来自 images/real/ 真实摄影，绝不AI)
- 合并去重，生成 assets/js/data.js
- 由 GitHub Actions 每日运行，commit+push 后 GitHub Pages 自动重建 = 动态自动更新
"""
import urllib.request, urllib.parse, json, os, re, time, glob, hashlib
import xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CURATED = os.path.join(ROOT, "scripts", "curated.json")
DATA_JS = os.path.join(ROOT, "assets", "js", "data.js")
IMG_DIR = os.path.join(ROOT, "images", "real")
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) WorkBuddyBot/1.0 (sanitary-workbench updater)"}

def http_get(url, timeout=25, tries=3):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            return urllib.request.urlopen(req, timeout=timeout).read()
        except Exception as e:
            last = e; time.sleep(3)
    raise last or RuntimeError("get failed")

# ---------- 真实图池(按板块分桶) ----------
def build_pools():
    pools = {"industry": [], "news": [], "material": [], "packaging": [], "regulatory": [], "competitor": []}
    if not os.path.isdir(IMG_DIR): return pools
    for f in sorted(os.listdir(IMG_DIR)):
        if not f.lower().endswith((".jpg", ".jpeg", ".png")): continue
        p = "images/real/" + f
        n = f.lower()
        if n.startswith(("industry_", "px_cotton", "px_factory")) or "market" in n:
            pools["industry"].append(p); pools["competitor"].append(p)
        if n.startswith(("pax_silk", "new_pad", "px_women", "women_care", "px_cottonf", "material_cotton", "industry_cotton", "pack_box")):
            pools["news"].append(p)
        if n.startswith(("material_", "px_factory")):
            pools["material"].append(p)
        if n.startswith(("pack_", "env_", "comp_shelf")):
            pools["packaging"].append(p); pools["competitor"].append(p)
        if n.startswith(("reg_", "px_lab")):
            pools["regulatory"].append(p)
        if n.startswith(("comp_shelf", "pax_silk")):
            pools["competitor"].append(p)
    # 兜底：空池用全量
    all_imgs = sorted({x for v in pools.values() for x in v})
    for k in pools:
        if not pools[k]: pools[k] = list(all_imgs)
    return pools

def pick_cover(pools, section, key):
    arr = pools.get(section) or pools["news"]
    if not arr: return ""
    h = int(hashlib.md5(key.encode("utf-8")).hexdigest(), 16)
    return arr[h % len(arr)]

# ---------- Google News RSS ----------
KEYWORDS = [
    "卫生巾 OR 安睡裤 OR 经期裤",
    "女性护理 卫生用品 新品",
    "卫生巾 国标 OR 抽检 OR 比较试验",
    "卫生巾 包装 OR 联名 OR 新品上市",
]
KW_MAP = [
    ("卫生巾 OR 安睡裤 OR 经期裤", "卫生巾"),
    ("女性护理 卫生用品 新品", "卫生巾"),
    ("卫生巾 国标 OR 抽检 OR 比较试验", "卫生巾"),
    ("卫生巾 包装 OR 联名 OR 新品上市", "卫生巾"),
    ("纸尿裤 OR 尿不湿 OR 拉拉裤 新品", "纸尿裤"),
]

def classify(title):
    t = title
    if any(k in t for k in ["纸尿裤","尿不湿","拉拉裤","婴儿纸尿裤","婴童"]):
        return "news", "纸尿裤"
    if any(k in t for k in ["安睡裤","晚安裤","夜安裤","经期裤","安心裤","卫生裤"]):
        return "news", ("安睡裤" if "经期裤" not in t else "经期裤")
    if any(k in t for k in ["无纺布","高分子","SAP","芯体","底膜","工艺","莱赛尔","蚕丝","纯棉材料","吸水树脂"]):
        return "material", "卫生巾"
    if any(k in t for k in ["包装","联名","礼盒","IP"]):
        return "packaging", "卫生巾"
    if any(k in t for k in ["国标","标准","抽检","比较试验","消保委","虚标","虫卵","检测","GB","合规"]):
        return "regulatory", "卫生巾"
    if any(k in t for k in ["市场","规模","出海","份额","巨头","新锐","代言","跨界","品牌","渠道","直播"]):
        return "industry", "卫生巾"
    return "news", "卫生巾"

def parse_date(s):
    try:
        return datetime.strptime(s, "%a, %d %b %Y %H:%M:%S %Z")
    except Exception:
        try: return datetime.strptime(s[:25], "%a, %d %b %Y %H:%M:%S")
        except Exception: return datetime.now(timezone.utc)

def norm(t):
    return re.sub(r"[\s\W]+", "", t.lower())[:30]

def fetch_google_news():
    items = []
    seen = set()
    for kw, cat in KW_MAP:
        url = "https://news.google.com/rss/search?" + urllib.parse.urlencode(
            {"q": kw, "hl": "zh-CN", "gl": "CN", "ceid": "CN:zh-Hans"})
        try:
            xml = http_get(url, timeout=25).decode("utf-8", "ignore")
            root = ET.fromstring(xml)
            for it in root.findall(".//item"):
                title = (it.findtext("title") or "").strip()
                if not title: continue
                # 去掉标题尾部 " - 来源"
                title = re.sub(r"\s*-\s*[^-]+$", "", title).strip()
                nt = norm(title)
                if nt in seen: continue
                seen.add(nt)
                pub = it.findtext("pubDate") or ""
                link = it.findtext("link") or ""
                src = (it.find("source") is not None and it.find("source").text) or "Google News"
                dt = parse_date(pub)
                items.append({
                    "title": title, "pub": pub, "link": link, "src": src, "dt": dt,
                    "cat": cat, "nt": nt
                })
        except Exception as e:
            print(f"  RSS 抓取失败 [{kw}]: {e}")
        time.sleep(1)
    items.sort(key=lambda x: x["dt"], reverse=True)
    return items[:18]  # 取最新18条

# ---------- 生成 data.js ----------
def js_str(s):
    return json.dumps(s, ensure_ascii=False)

def build_data_js(curated, auto, pools):
    # 合并去重：curated 优先
    curated_titles = {norm(c["title"]) for c in curated}
    auto_keep = [a for a in auto if a["nt"] not in curated_titles]

    # 当前版本不展示图片(用户要求)，精选条目不写 image 字段，前端渲染干净文字块；
    # 保留 curated 中的 url(原文链接) 字段。
    for c in curated:
        c.pop("image", None)
        c.pop("image_credit", None)

    all_items = list(curated)
    for a in auto_keep:
        sec, cat = classify(a["title"])
        date = a["dt"].strftime("%Y-%m-%d")
        all_items.append({
            "id": "auto-" + hashlib.md5(a["nt"].encode()).hexdigest()[:8],
            "section": sec, "category": cat,
            "title": a["title"], "en": "",
            "brand": a["src"], "source": "googleNews", "date": date,
            "url": a["link"], "urlKind": "origin",
            "tags": ["实时","Google News"],
            "summary": f"来源：{a['src']}（{date}）。点击查看原文。",
            "body": f"【实时抓取】{a['title']}。来源：{a['src']}，发布时间 {a['pub']}。原文链接：{a['link']}"
        })

    all_items.sort(key=lambda x: x.get("date", ""), reverse=True)

    today = datetime.now(timezone(timedelta(hours=8))).strftime("%Y-%m-%d")
    meta = (
        'const SITE_META = {\n'
        f'  title: "小小y产品策划",\n'
        '  subtitle: "卫生巾 · 安睡裤 · 经期裤 · 纸尿裤 产品情报工作台",\n'
        '  desc: "把全球碎片化的监管 / 原料 / 工艺 / 趋势 / 包装 / 竞品情报，统一沉淀到一条时间轴上。每日自动更新。",\n'
        f'  buildDate: "{today}",\n'
        '  owner: "hhchenxiaoyun16-ctrl",\n'
        '  repo: "sanitary-workbench",\n'
        f'  autoCount: {len(auto_keep)}\n'
        '};\n'
    )
    cats = (
        'const CATEGORIES = [\n'
        '  { key: "卫生巾", label: "卫生巾" },\n'
        '  { key: "安睡裤", label: "安睡裤" },\n'
        '  { key: "经期裤", label: "经期裤" },\n'
        '  { key: "棉条", label: "棉条" },\n'
        '  { key: "护垫", label: "护垫" },\n'
        '  { key: "纸尿裤", label: "纸尿裤·婴童" }\n'
        '];\n'
    )
    secs = (
        'const SECTIONS = [\n'
        '  { key: "feed", label: "今日动态", en: "Feed" },\n'
        '  { key: "industry", label: "行业资讯", en: "Industry" },\n'
        '  { key: "news", label: "新品上新", en: "New Arrivals" },\n'
        '  { key: "material", label: "材料灵感", en: "Material" },\n'
        '  { key: "packaging", label: "包装灵感", en: "Packaging" },\n'
        '  { key: "regulatory", label: "监管合规", en: "Regulatory" },\n'
        '  { key: "competitor", label: "竞品雷达", en: "Competitor" },\n'
        '  { key: "supplier", label: "供应商", en: "Supplier" },\n'
        '  { key: "me", label: "个人中心", en: "My Desk" }\n'
        '];\n'
        'const FEED_LIMIT = 40;\n'
    )
    # SOURCES 字典由 _SOURCES.json 统一维护（含公众号/纸尿裤/供应链来源）
    sources_path = os.path.join(os.path.dirname(__file__), "..", "_SOURCES.json")
    try:
        with open(sources_path, encoding="utf-8") as f:
            src_dict = json.load(f)
    except Exception:
        src_dict = {}
    src_lines = ",\n".join(
        '  %s: { name: %s, url: %s, note: %s%s }' % (
            json.dumps(k, ensure_ascii=False), json.dumps(v.get("name", k), ensure_ascii=False),
            json.dumps(v.get("url", "#"), ensure_ascii=False),
            json.dumps(v.get("note", ""), ensure_ascii=False),
            (', search: %s' % json.dumps(v["search"], ensure_ascii=False)) if v.get("search") else ""
        ) for k, v in src_dict.items()
    )
    sources = 'const SOURCES = {\n' + src_lines + '\n};\n'
    body = ',\n'.join('  ' + json.dumps(it, ensure_ascii=False) for it in all_items)
    items_str = 'const ITEMS = [\n' + body + '\n];\n'

    js = (
        '/* ============================================================\n'
        '   小小y产品策划 · 卫生巾/安睡裤产品情报工作台 · 数据层(自动生成)\n'
        f'   生成时间: {today} ｜ 精选 {len(curated)} 条 + 实时抓取 {len(auto_keep)} 条 = 共 {len(all_items)} 条\n'
        '   内容来源: 公开权威信息整理(2025-2026)，仅供策略参考\n'
        '   封面图: 均为真实抓取照片(Wikimedia/Openverse CC / Pexels / 品牌新闻稿)，非AI生成\n'
        '   ============================================================ */\n\n'
        + meta + '\n' + cats + '\n' + secs + '\n' + sources + '\n' + items_str
    )
    return js, len(curated), len(auto_keep), len(all_items)

def main():
    print("== 加载精选内容 ==")
    with open(CURATED, encoding="utf-8") as f:
        curated = json.load(f)
    print(f"  精选 {len(curated)} 条")

    print("== 抓取 Google News 实时新闻 ==")
    pools = build_pools()
    print(f"  真实图池: " + ", ".join(f"{k}={len(v)}" for k, v in pools.items()))
    auto = fetch_google_news()
    print(f"  实时新闻 {len(auto)} 条")

    js, nc, na, total = build_data_js(curated, auto, pools)
    os.makedirs(os.path.dirname(DATA_JS), exist_ok=True)
    with open(DATA_JS, "w", encoding="utf-8") as f:
        f.write(js)
    print(f"\n== 已生成 data.js: 精选 {nc} + 实时 {na} = 共 {total} 条 ==")
    print(f"   路径: {DATA_JS}")

if __name__ == "__main__":
    main()
