/* 本地生成 data.js (等价于 scripts/scraper.py 的 build_data_js，但不抓 RSS)
   这样在本地 python 受限时也能生成预览，并可直接 commit 上线。
   Actions 上的 scraper.py 仍会每日运行并幂等覆盖。
*/
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const d = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'curated.json'), 'utf8'));
const src = JSON.parse(fs.readFileSync(path.join(ROOT, '_SOURCES.json'), 'utf8'));

const today = new Date().toISOString().slice(0,10);
// 用 curated 的日期最大值作为"更新于"
const dates = d.map(x=>x.date).filter(Boolean).sort();
const upd = dates[dates.length-1] || today;

const SITE_META = `const SITE_META = {
  title: "小小y产品策划",
  subtitle: "卫生巾 · 安睡裤 · 经期裤 · 纸尿裤 产品情报工作台",
  desc: "把全球碎片化的监管 / 原料 / 工艺 / 趋势 / 包装 / 竞品 / 供应链情报，统一沉淀到一条时间轴上。",
  buildDate: "${upd}",
  owner: "hhchenxiaoyun16-ctrl",
  repo: "sanitary-workbench",
  autoCount: 0
};`;

const CATEGORIES = `const CATEGORIES = [
  { key: "卫生巾", label: "卫生巾" },
  { key: "安睡裤", label: "安睡裤" },
  { key: "经期裤", label: "经期裤" },
  { key: "棉条", label: "棉条" },
  { key: "护垫", label: "护垫" },
  { key: "纸尿裤", label: "纸尿裤·婴童" }
];`;

const SECTIONS = `const SECTIONS = [
  { key: "feed", label: "今日动态", en: "Feed" },
  { key: "industry", label: "行业资讯", en: "Industry" },
  { key: "news", label: "新品上新", en: "New Arrivals" },
  { key: "material", label: "材料灵感", en: "Material" },
  { key: "packaging", label: "包装灵感", en: "Packaging" },
  { key: "regulatory", label: "监管合规", en: "Regulatory" },
  { key: "competitor", label: "竞品雷达", en: "Competitor" },
  { key: "supplier", label: "供应商", en: "Supplier" },
  { key: "me", label: "个人中心", en: "My Desk" }
];
const FEED_LIMIT = 40;`;

const srcLines = Object.entries(src).map(([k,v])=>{
  const search = v.search ? `, search: ${JSON.stringify(v.search)}` : '';
  return `  ${k}: { name: ${JSON.stringify(v.name)}, url: ${JSON.stringify(v.url)}, note: ${JSON.stringify(v.note||'')}${search} }`;
}).join(',\n');
const SOURCES = `const SOURCES = {\n${srcLines}\n};`;

// 清理 image 字段（当前不展示图片）
const items = d.map(it=>{ const o={...it}; delete o.image; delete o.image_credit; if(o.imageQuery) delete o.imageQuery; return o; });
const ITEMS = 'const ITEMS = [\n' + items.map(it=>'  '+JSON.stringify(it)).join(',\n') + '\n];';

const header = `/* ============================================================
   小小y产品策划 · 卫生巾/安睡裤/纸尿裤产品情报工作台 · 数据层
   生成时间: ${upd} ｜ 精选 ${items.length} 条
   内容来源: 公开权威信息整理(2025-2026)，仅供策略参考
   ============================================================ */

`;

fs.writeFileSync(path.join(ROOT, 'assets', 'js', 'data.js'), header + SITE_META + '\n' + CATEGORIES + '\n' + SECTIONS + '\n' + SOURCES + '\n' + ITEMS, 'utf8');
console.log('已生成 data.js，条目:', items.length);
console.log('板块数:', [...new Set(items.map(x=>x.section))].length, '| 来源数:', Object.keys(src).length);
