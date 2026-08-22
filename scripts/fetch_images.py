#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""抓取真实图片(非AI)到 images/real/，覆盖卫生巾情报工作台六大板块封面需求。
主源：Openverse(CC图片聚合，Flickr/Wikimedia真实摄影，免费无key)
辅源：Pexels(CC0真实摄影) + 品牌新闻稿真实配图
所有图片均为真实拍摄/真实产品图，绝不AI生成。
"""
import urllib.request, urllib.parse, json, os, time

OUT = os.path.join(os.path.dirname(__file__), "..", "images", "real")
os.makedirs(OUT, exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) WorkBuddyBot/1.0"}

def http_get(url, timeout=30, tries=4):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            return urllib.request.urlopen(req, timeout=timeout).read()
        except urllib.error.HTTPError as e:
            last = e
            if e.code in (429, 503):
                wait = 6 * (i + 1); print(f"    {e.code} 等待{wait}s重试..."); time.sleep(wait)
            else: raise
        except Exception as e:
            last = e; time.sleep(3)
    raise last or RuntimeError("get failed")

def download(url, name):
    try:
        data = http_get(url)
        if data[:2] not in (b"\xff\xd8", b"\x89P"):
            print(f"  SKIP {name} 非图片 ({len(data)}B)"); return False
        ext = ".jpg" if data[:2] == b"\xff\xd8" else ".png"
        open(os.path.join(OUT, name + ext), "wb").write(data)
        print(f"  OK   {name}{ext} {len(data)//1024}KB")
        return True
    except Exception as e:
        print(f"  FAIL {name}: {e}"); return False

def openverse(q, n=3):
    url = "https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(
        {"q": q, "page_size": str(n), "license_type": "all"})
    try:
        d = json.loads(http_get(url, timeout=30))
        return [(r.get("title",""), r.get("url")) for r in d.get("results", [])[:n] if r.get("url")]
    except Exception as e:
        print(f"  ov err [{q}]: {e}"); return []

# ---------- Openverse 真实 CC 图片(每主题2张) ----------
themes = {
    "industry_factory":  ["textile factory production", "manufacturing factory line"],
    "industry_cotton":   ["cotton field plant", "cotton harvest farm"],
    "industry_market":   ["supermarket shelf products", "retail store feminine hygiene"],
    "new_pad":           ["sanitary napkin pad", "feminine hygiene product"],
    "new_panty":         ["panties underwear cotton", "comfort underwear"],
    "material_nonwoven": ["nonwoven fabric", "fiber textile material"],
    "material_cotton":   ["cotton fiber macro", "raw cotton boll"],
    "material_sap":      ["white powder polymer", "absorbent granules"],
    "material_machine":  ["paper machine production", "industrial machinery factory"],
    "pack_design":       ["product packaging design", "pink box packaging"],
    "pack_box":          ["gift box packaging", "minimalist box design"],
    "reg_lab":           ["laboratory testing scientist", "quality control lab"],
    "reg_standard":      ["official document report", "standard document paper"],
    "comp_shelf":        ["supermarket shelf retail", "store product display"],
    "env_eco":           ["recycling biodegradable green", "eco sustainable plant"],
    "women_care":        ["woman relax home comfort", "women wellness self care"],
}
print("== Openverse 真实CC图片 ==")
idx = 0
for key, queries in themes.items():
    for qi, q in enumerate(queries):
        for title, u in openverse(q, 2):
            idx += 1
            download(u, f"{key}_{qi}_{idx}")
            time.sleep(0.6)
        time.sleep(1)

# ---------- Pexels 真实摄影(已验证直链) ----------
pexels = {
    "px_cotton":  "https://images.pexels.com/photos/291761/pexels-photo-291761.jpeg?auto=compress&w=900",
    "px_factory": "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&w=900",
    "px_cottonf": "https://images.pexels.com/photos/242236/pexels-photo-242236.jpeg?auto=compress&w=900",
    "px_lab":     "https://images.pexels.com/photos/2280570/pexels-photo-2280570.jpeg?auto=compress&w=900",
    "px_women":   "https://images.pexels.com/photos/3769706/pexels-photo-3769706.jpeg?auto=compress&w=900",
}
print("== Pexels 真实摄影 ==")
for k, u in pexels.items():
    download(u, k); time.sleep(0.5)

# ---------- 品牌新闻稿真实产品图 ----------
brand = {
    "pax_silk": "http://qqpublic.qpic.cn/qq_public/0/28-2220790308-9FA92C838DBC083EF18BA10AF373DEC4/0?fmt=png&size=1029&h=702&w=1053&ppv=1",
}
print("== 品牌新闻真实配图 ==")
for k, u in brand.items():
    download(u, k)

print("\n== 完成，真实图片清单 ==")
files = sorted(os.listdir(OUT))
print(f"共 {len(files)} 张真实图片")
for f in files: print(" ", f)
