#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""内容感知的真实图片抓取(非AI)。

为 curated.json 中每一条内容，根据其【实际主题】(品类/材质/场景/品牌类型)
在 Openverse(CC 真实摄影聚合：Flickr / Wikimedia) 检索一张语义相关的真实照片，
下载到 images/real/<id>.jpg，并把本地路径与版权署名写回 curated.json：
  item["image"]       = "images/real/<id>.jpg"
  item["image_credit"]= "Photo: <creator> / <license> / <source>"

设计原则：
1. 不按板块笼统分配，而是每条内容单独检索 -> 与内容相关、彼此不重复。
2. 中文品牌名(护舒宝/奈丝公主)无法匹配照片，故映射为「产品类型/材质/场景」英文关键词。
3. CC 署名信息一并保存，符合合规要求。
4. 已抓取过的条目(id 已有 image 且文件存在)跳过，避免重复下载与覆盖。
"""
import urllib.request, urllib.parse, json, os, time, hashlib, re

HERE = os.path.dirname(__file__)
ROOT = os.path.join(HERE, "..")
CURATED = os.path.join(HERE, "curated.json")
OUT = os.path.join(ROOT, "images", "real")
os.makedirs(OUT, exist_ok=True)

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) WorkBuddyBot/1.0 (product-research)"}

def http_get(url, timeout=30, tries=3):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            return urllib.request.urlopen(req, timeout=timeout).read()
        except urllib.error.HTTPError as e:
            last = e
            if e.code in (429, 503):
                wait = 5 * (i + 1); print(f"    {e.code} 等待{wait}s重试..."); time.sleep(wait)
            elif e.code == 424:
                # Openverse 缩略图 CDN 偶发故障，快速跳过换下一张，不空等
                time.sleep(2); last = None; continue
            else: raise
        except Exception as e:
            last = e; time.sleep(3)
    if last: raise last
    raise RuntimeError("get failed (424 burst)")

# ---------- 内容 -> 检索关键词 映射 ----------
# 按「具体优先」顺序匹配：命中越具体，图越贴切。
KEYWORD_RULES = [
    # (匹配特征, Openverse 英文检索词)
    ("蚕丝", "silk fabric texture"),
    ("莱赛尔", "silk fabric texture"),
    ("纯棉", "cotton fabric texture"),
    ("棉纱", "cotton yarn thread"),
    ("棉", "cotton textile"),
    ("液体卫生巾", "liquid drop blue"),
    ("液体", "liquid abstract blue"),
    ("透气", "breathable mesh fabric"),
    ("无纺布", "nonwoven fabric"),
    ("非织造", "nonwoven fabric"),
    ("高分子", "white polymer pellets"),
    ("吸水树脂", "white polymer pellets"),
    ("芯体", "absorbent cotton pad"),
    ("安睡裤", "women underwear cotton"),
    ("经期裤", "women underwear cotton"),
    ("贴贴裤", "women underwear cotton"),
    ("生理裤", "women underwear cotton"),
    ("裤", "women underwear cotton"),
    ("卫生巾", "sanitary pad product"),
    ("卫生巾", "feminine hygiene"),
    ("护垫", "panty liner"),
    ("消毒级", "clean laboratory"),
    ("工厂", "textile factory"),
    ("透明工厂", "modern factory interior"),
    ("代言", "fashion model portrait"),
    ("红毯", "red carpet event"),
    ("联名", "cute cartoon bear toy"),
    ("IP", "cute cartoon character"),
    ("种草", "social media phone"),
    ("发布会", "product launch stage"),
    ("少女", "young woman portrait"),
    ("女性", "woman wellness self care"),
    ("抑菌", "microscope bacteria"),
    ("检测", "laboratory microscope"),
    ("标准", "official document"),
    ("合规", "official document"),
    ("包装", "product packaging pink"),
    ("设计", "package design studio"),
    ("可降解", "recycling biodegradable"),
    ("环保", "eco sustainability leaf"),
    ("电商", "ecommerce warehouse"),
    ("渠道", "retail store shelf"),
    ("市场", "supermarket shelf"),
    ("出海", "global shipping container"),
    ("竞品", "supermarket shelf products"),
]

DEFAULT_QUERY = {
    "industry": "feminine care industry",
    "news": "sanitary pad product",
    "material": "cotton fabric texture",
    "packaging": "product packaging design",
    "regulatory": "quality control laboratory",
    "competitor": "retail store shelf",
}

def build_query(item):
    """根据条目内容挑选最贴切的英文检索词。"""
    text = " ".join([
        item.get("title", ""), item.get("summary", ""),
        " ".join(item.get("tags", [])), item.get("category", "")
    ])
    for feat, q in KEYWORD_RULES:
        if feat in text:
            return q
    return DEFAULT_QUERY.get(item.get("section", "news"), "sanitary pad")

def openverse_search(q, n=5):
    url = "https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(
        {"q": q, "page_size": str(n), "license_type": "all", "mature": "false"})
    try:
        d = json.loads(http_get(url, timeout=30))
        out = []
        for r in d.get("results", [])[:n]:
            u = r.get("url")
            if not u: continue
            # 优先用 Openverse 自有 CDN 缩略图(避免直连 Wikimedia/Flickr 被限流 429/502)
            thumb = r.get("thumbnail") or u
            out.append({
                "url": thumb,
                "title": r.get("title", ""),
                "creator": (r.get("creator") or "Unknown").strip(),
                "license": r.get("license", "unknown"),
                "source": r.get("source", r.get("provider", "openverse")),
                "foreign": r.get("foreign_landing_url", ""),
            })
        return out
    except Exception as e:
        print(f"  ov err [{q}]: {e}"); return []

def img_ext(data):
    if data[:3] == b"\xff\xd8\xff": return ".jpg"
    if data[:8] == b"\x89PNG\r\n\x1a\n": return ".png"
    if data[:4] == b"GIF8": return ".gif"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP": return ".webp"
    return None

def download(url):
    data = http_get(url)
    ext = img_ext(data)
    if not ext:
        print(f"    SKIP 非图片 ({len(data)}B)"); return None, None
    return data, ext

def file_md5(path):
    h = hashlib.md5()
    with open(path, "rb") as f:
        for b in iter(lambda: f.read(8192), b""):
            h.update(b)
    return h.hexdigest()

# 已下载图片的 md5 -> 使用次数，用于「尽量不重复」但允许有限复用
REUSE_CAP = 2  # 同一张真实照片最多被 2 条内容复用(避免完全雷同，又保证不 FAIL)

# 备用检索词：当主检索词返回的全是重复/不可用时，逐条尝试
FALLBACKS = [
    "feminine hygiene", "cotton textile macro", "textile close up",
    "soft fabric texture", "women wellness", "pink pastel background",
    "hygiene product", "textile industry", "pastel fabric",
]

def try_download_for(item, queries):
    """对一组检索词依次尝试，返回 (rel_path, credit) 或 None。"""
    iid = item.get("id")
    seen_md5 = try_download_for.seen
    existing = item.get("image")
    for qi, q in enumerate(queries):
        cands = openverse_search(q, 6)
        for c in cands:
            try:
                raw, ext = download(c["url"])
            except Exception as e:
                continue
            if not raw: continue
            md5 = hashlib.md5(raw).hexdigest()
            used = seen_md5.get(md5, 0)
            if used >= REUSE_CAP:
                continue
            # FORCE 模式下删除旧图，换新图
            if FORCE and existing and os.path.isfile(os.path.join(ROOT, existing)):
                try: _os.remove(os.path.join(ROOT, existing))
                except Exception: pass
            name = f"{iid}{ext}"
            open(os.path.join(OUT, name), "wb").write(raw)
            seen_md5[md5] = used + 1
            rel = "images/real/" + name
            credit = f"Photo: {c['creator']} / {c['license']} / {c['source']}"
            return rel, credit, name, len(raw)
    return None

def main():
    import os as _os
    global FORCE
    FORCE = _os.environ.get("FORCE_REFRESH") == "1"
    data = json.load(open(CURATED, encoding="utf-8"))
    try_download_for.seen = {}
    # FORCE 模式不预填旧图 md5(旧图即待替换的重复源)；非 FORCE 预填避免撞车
    if not FORCE:
        for f in os.listdir(OUT):
            p = os.path.join(OUT, f)
            if os.path.isfile(p):
                try: try_download_for.seen[file_md5(p)] = REUSE_CAP
                except Exception: pass

    updated = 0
    skipped = 0
    failed = 0
    total = len(data)
    for idx, item in enumerate(data):
        iid = item.get("id")
        existing = item.get("image")
        if (not FORCE) and existing and os.path.isfile(os.path.join(ROOT, existing)):
            skipped += 1
            continue
        q = build_query(item)
        queries = [q] + FALLBACKS
        try:
            res = try_download_for(item, queries)
        except Exception as e:
            print(f"[{iid}] EXC {e}"); res = None
        if res:
            rel, credit, name, sz = res
            item["image"] = rel
            item["image_credit"] = credit
            print(f"[{idx+1}/{total}] {iid} OK {name} {sz//1024}KB | {credit}")
            updated += 1
        else:
            print(f"[{idx+1}/{total}] {iid} FAIL 无可用图")
            failed += 1
        # 每 10 条增量保存，避免中断丢失进度
        if (idx + 1) % 10 == 0:
            json.dump(data, open(CURATED, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
            print(f"  (已增量保存 {idx+1}/{total})")
        time.sleep(0.5)  # 礼貌限速

    json.dump(data, open(CURATED, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"\n== 完成 == 新增真实图 {updated} 张，跳过已有 {skipped} 张，失败 {failed} 张")
    print(f"images/real 现有 {len(os.listdir(OUT))} 张")

if __name__ == "__main__":
    main()
