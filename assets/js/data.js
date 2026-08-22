/* ============================================================
   小小y产品策划 · 卫生巾/安睡裤产品情报工作台
   数据层 — 内容由公开权威信息整理（2025-2026），仅供策略参考
   ============================================================ */

const SITE_META = {
  title: "小小y产品策划",
  subtitle: "卫生巾 · 安睡裤 · 经期裤 产品情报工作台",
  desc: "把全球碎片化的监管 / 原料 / 工艺 / 趋势 / 包装 / 竞品情报，统一沉淀到一条时间轴上。",
  buildDate: "2026-08-22",
  owner: "hhchenxiaoyun16-ctrl",
  repo: "sanitary-workbench"
};

/* 主品类 + 二级品类（顶部 Tab） */
const CATEGORIES = [
  { key: "卫生巾", label: "卫生巾" },
  { key: "安睡裤", label: "安睡裤" },
  { key: "经期裤", label: "经期裤" },
  { key: "棉条", label: "棉条" },
  { key: "护垫", label: "护垫" },
  { key: "纸尿裤", label: "纸尿裤·婴童" }
];

/* 板块定义 */
const SECTIONS = [
  { key: "feed", label: "今日动态", en: "Feed" },
  { key: "industry", label: "行业资讯", en: "Industry" },
  { key: "news", label: "新品上新", en: "New Arrivals" },
  { key: "material", label: "材料灵感", en: "Material" },
  { key: "packaging", label: "包装灵感", en: "Packaging" },
  { key: "regulatory", label: "监管合规", en: "Regulatory" },
  { key: "competitor", label: "竞品雷达", en: "Competitor" },
  { key: "me", label: "个人中心", en: "My Desk" }
];

/* 数据源（权威 / 垂直 / 国际） */
const SOURCES = {
  lifePaper: { name: "生活用纸网", url: "http://www.cnhpia.org/", note: "中国造纸协会生活用纸专委会，行业最权威垂直媒体" },
  chinabgao: { name: "中国报告大厅", url: "https://www.chinabgao.com/", note: "行业研报与市场规模" },
  shangpu: { name: "尚普咨询", url: "https://www.shangpu-china.com/", note: "《2025中国卫生巾市场洞察报告》" },
  cbn: { name: "CBNData", url: "https://www.cbndata.com/", note: "消费大数据" },
  chanmama: { name: "蝉妈妈", url: "https://www.chanmama.com/", note: "抖音电商数据" },
  mojing: { name: "魔镜洞察", url: "https://www.moojing.com/", note: "电商全网监测" },
  ccc: { name: "消费者报道", url: "https://www.ccreports.com.cn/", note: "比较试验媒体" },
  jssxb: { name: "江苏省消保委", url: "https://www.jsconsumer.com.cn/", note: "安睡裤比较试验" },
  shxb: { name: "上海市消保委", url: "https://www.315.sh.cn/", note: "卫生巾(裤)比较试验" },
  ndcpa: { name: "国家疾控局", url: "https://www.ndcpa.gov.cn/", note: "GB 15979-2024 发布" },
  samr: { name: "国家市场监管总局", url: "https://www.samr.gov.cn/", note: "标准与抽检" },
  eurmon: { name: "Euromonitor", url: "https://www.euromonitor.com/", note: "国际零售监测" },
  mintel: { name: "Mintel", url: "https://www.mintel.com/", note: "全球趋势" },
  nonwoven: { name: "Nonwovens Industry", url: "https://www.nonwovens-industry.com/", note: "国际非织造材料" },
  edana: { name: "EDANA", url: "https://www.edana.org/", note: "欧洲非织造协会" },
  unicharm: { name: "尤妮佳官网", url: "https://www.unicharm.co.jp/", note: "苏菲/乐而雅新品" },
  kao: { name: "花王官网", url: "https://www.kao.com/cn/", note: "乐而雅新品" },
  pgh: { name: "宝洁/护舒宝", url: "https://www.pg.com.cn/", note: "护舒宝研发" }
};

/* ============================================================
   主数据：items
   section: industry/news/material/packaging/regulatory/competitor
   category: 卫生巾/安睡裤/经期裤/棉条/护垫/纸尿裤
   ============================================================ */
const ITEMS = [

  /* ---------------- 行业资讯 ---------------- */
  {
    id: "ind-001", section: "industry", category: "卫生巾",
    title: "新国标一周年：行业从「可用」走向「可信」",
    en: "One Year of the New GB Standard",
    brand: "行业综述", source: "lifePaper", date: "2026-07-01",
    image: "", tags: ["GB 15979-2024", "信任", "质量竞争"],
    summary: "2025-07-01 强制性国标 GB 15979-2024 实施满一年，卫生巾从规模扩张转向质量竞争。",
    body: "2025年7月1日，强制性国家标准《一次性使用卫生用品卫生要求》(GB 15979—2024) 正式实施，这是该标准自2002年发布以来的首次修订，将卫生巾、护垫等按风险等级纳入重点监管，新增 pH 值、可迁移性荧光增白剂残留量等理化指标，并调整微生物污染限值与毒理学要求。新国标落地已满一年，推动行业从规模扩张转向质量竞争。2025年中国卫生巾市场规模达682亿元，同比增长8.1%，市场渗透率超96%。"
  },
  {
    id: "ind-002", section: "industry", category: "卫生巾",
    title: "2025 中国卫生巾市场规模达 682 亿元，渗透率超 96%",
    en: "China Sanitary Napkin Market 2025",
    brand: "行业数据", source: "chinabgao", date: "2026-01-15",
    image: "", tags: ["市场规模", "渗透率", "高端化"],
    summary: "据行业统计，2025 年中国卫生巾市场规模 682 亿元（同比+8.1%），渗透率超 96%，CR5 达 61%。",
    body: "中国是全球最大女性卫生用品市场之一。2025年市场规模达682亿元，同比增长8.1%，市场渗透率超过96%。尚普咨询《2025年中国卫生巾市场洞察报告》显示，97%的卫生巾购买者为女性，超过50%的女性近年增加了私护产品购买频率。市场集中度持续提升，CR5已达61%；电商销售占比超40%，直播带货贡献超20%销售额。单价15元以上高端卫生巾增速达25%，功能性卫生巾占据约65%份额，超90%消费者将「原料安全」列为首要购买因素。"
  },
  {
    id: "ind-003", section: "industry", category: "卫生巾",
    title: "高端化与功能化并行：纯棉、抑菌、pH 平衡成竞争焦点",
    en: "Premiumization & Functionalization",
    brand: "行业趋势", source: "shangpu", date: "2025-11-20",
    image: "", tags: ["纯棉", "抑菌", "pH平衡", "趋势"],
    summary: "材质升级：中国纯棉卫生巾2024年规模125亿元；抑菌、pH平衡、智能监测成焦点。",
    body: "据行业研究，中国纯棉卫生巾2024年市场规模达125亿元，自由点以「有机纯棉」+「九无添加」+全链路可溯源构建竞争力。可降解卫生巾成本比普通产品高20%，但渗透率仅12%，增长空间大。抑菌、智能监测、pH平衡等功能型产品成为竞争焦点——如她研社抑菌系列、Tampax Pure pH平衡棉条。超过90%消费者将「原料安全」列为首要购买因素。"
  },
  {
    id: "ind-004", section: "industry", category: "卫生巾",
    title: "渠道变革：直播带货贡献超 20%，2025 线上占比迈向 47%",
    en: "Channel Shift to Livestream",
    brand: "渠道数据", source: "cbn", date: "2025-09-08",
    image: "", tags: ["直播", "抖音", "电商", "渠道"],
    summary: "电商平台销售占比已超40%，直播带货贡献超20%销售额，预计2030年线上占比达47%-65%。",
    body: "卫生巾销售渠道发生根本性变革：电商平台销售占比已超过40%，直播带货贡献了超过20%的销售额，预计到2030年线上销售额占比可能达47%甚至65%。2024年1-2月线上销售量同比上涨3%，累计约3500万件。抖音、小红书成为新品打爆与口碑沉淀的核心阵地，对产品策划的意义在于：包装即内容、开箱即种草。"
  },
  {
    id: "ind-005", section: "industry", category: "卫生巾",
    title: "东南亚出海：中国品牌销售额同比增长 62%",
    en: "Going Global: SE Asia +62%",
    brand: "出海数据", source: "chinabgao", date: "2025-10-12",
    image: "", tags: ["出海", "东南亚", "全球化"],
    summary: "2025 中国卫生巾出口量预计占产能15%，东南亚销售额同比+62%，越南市占率达18%。",
    body: "中国卫生巾产业积极开拓国际市场，预计2025年出口量将占产能的15%。中国品牌在东南亚表现亮眼，近期销售额同比增长达62%，个别品牌在越南市场占有率已达18%。借助 TikTok、Shein 等平台出海成为新增长曲线，对国内品牌的产品本地化（尺寸、气候、宗教文化）提出新要求。"
  },
  {
    id: "ind-006", section: "industry", category: "安睡裤",
    title: "安睡裤品类崛起：整晚不换的「睡眠经济」新入口",
    en: "Period Panty Boom",
    brand: "品类机会", source: "mojing", date: "2025-12-03",
    image: "", tags: ["安睡裤", "经期裤", "睡眠", "品类"],
    summary: "安睡裤主打「360°贴合+整晚不换」，对吸收速度/吸水倍率/防侧漏要求高于普通卫生巾，是高端化与礼品化潜力品类。",
    body: "「安睡裤」是一种裤型卫生巾，又称女性卫生裤、安心裤、夜安裤。相较普通卫生巾，它要满足整晚不更换，吸血量更多，对吸收速度、吸水倍率、渗透性能及防侧漏性能要求更高。江苏省消保委2025年比较试验显示，40批次产品吸收速度均在5~12秒（国标≤60秒），5批次吸水倍率达30倍以上。该品类正从「夜用替代」走向「独立礼品/旅行装」场景，溢价与联名空间大。"
  },
  {
    id: "ind-007", section: "industry", category: "卫生巾",
    title: "Z 世代为「限定」多付 30%：创意包装成第二增长曲线",
    en: "Collectible Packaging",
    brand: "尚普咨询年度复盘", source: "shangpu", date: "2026-02-18",
    image: "", tags: ["包装", "情绪价值", "联名", "复购"],
    summary: "尚普预测：到2026年具「收藏属性」的创意包装销售占比有望从不足5%提升至18%。",
    body: "尚普咨询年度复盘指出：高端不是价格，是情绪价值。Z世代愿为「限定」多付30%。「季度限量联名」打法（每季携手新锐艺术家推12款经期情绪插画、单片铝箔袋印隐藏诗句、可种植包装、云收藏数字藏品）让试点品牌A在2025年5月抖音直播卖出320万包，同比+176%，新客占比升至42%（其中28%来自「被包装种草」）。预测到2026年，具收藏属性的创意包装销售占比有望从不足5%提升至18%。"
  },

  /* ---------------- 新品上新 ---------------- */
  {
    id: "news-001", section: "news", category: "卫生巾",
    title: "护舒宝全球首发「莱赛尔蚕丝卫生巾」：蚕丝写进成分表",
    en: "Whisper Lyocell × Silk Top Sheet",
    brand: "护舒宝", source: "pgh", date: "2026-03-12",
    image: "images/product/prod-day.png",
    tags: ["莱赛尔", "蚕丝", "少摩擦", "敏感肌"],
    summary: "首次将莱赛尔纤维与天然蚕丝结合用于卫生巾表层，摩擦系数较纯棉降低22%，主打减少经期红痒。",
    body: "护舒宝在2026中国医师协会妇产科医师大会全球首发莱赛尔蚕丝卫生巾，首次将莱赛尔与天然蚕丝结合应用于卫生巾表层，以写进成分表的天然真蚕丝减少经期摩擦红痒。据介绍，表层摩擦力较护舒宝天然纯棉产品降低22%；现场调研显示超99.6%受访专家认可该材质组合有助于减少私处摩擦红痒。这是「材质即卖点」的典型案例——把抽象的「亲肤」变成可验证的成分与数据。"
  },
  {
    id: "news-002", section: "news", category: "安睡裤",
    title: "护舒宝「减压深睡裤」：Sleep Pro 多孔深睡芯 + 4D 微压包裹",
    en: "Whisper Deep Sleep Panty",
    brand: "护舒宝", source: "pgh", date: "2026-03-12",
    image: "images/product/prod-panty.png",
    tags: ["安睡裤", "减压", "防漏", "透气"],
    summary: "针对夜间「闷、勒、怕漏」三大痛点，融合 Sleep Pro 多孔深睡芯与四向防漏设计，实验室称腰腹腿压力减少30%。",
    body: "护舒宝全新推出减压深睡裤，针对经期夜晚「闷、勒、怕漏」三大痛点，创新融合 Sleep Pro 多孔深睡芯、4D立体微压包裹及四向防漏设计，实现整晚透气、防漏、不粘肤。2026妇产科医师大会调研显示，超99.7%受访专家认可挑选轻薄防漏安睡裤可减少夜间渗漏及裆部闷湿黏热。结构创新（芯体+包裹+防漏）是安睡裤差异化的主战场。"
  },
  {
    id: "news-003", section: "news", category: "卫生巾",
    title: "护舒宝液体卫生巾 Pro 升级：速吸散热条吸收速度 +50%",
    en: "Whisper Liquid Pro Upgrade",
    brand: "护舒宝", source: "pgh", date: "2026-03-12",
    image: "images/product/prod-day.png",
    tags: ["液体卫生巾", "FlexFoam", "速吸", "物理隔菌"],
    summary: "新升级「灵动速吸岛」技术，第二次潮涌吸收速度较上代+50%；Pro健康专研版以纯物理屏障隔菌，不添加化学杀菌剂。",
    body: "护舒宝液体卫生巾核心采用 FlexFoam 液体材料吸收芯，吸收后巾身保持超薄不变形。2026升级版采用「灵动速吸岛」技术，据宝洁研发数据第二次潮涌吸收速度较上一代提升约50%。Pro健康专研版采用纯物理屏障隔绝细菌，不添加化学杀菌剂，以95%物理隔菌能力提供温和体验，契合「避免过度清洁破坏微生态」的专家观点，并通过英国健康联盟评估、无添加荧光剂。"
  },
  {
    id: "news-004", section: "news", category: "卫生巾",
    title: "花王乐而雅「零触感纯棉甄选」：0.1cm 吸收层打破纯棉=厚重",
    en: "Laurier Zero Touch Cotton",
    brand: "乐而雅(花王)", source: "kao", date: "2026-07-21",
    image: "images/product/prod-day.png",
    tags: ["纯棉", "超薄", "透气孔底膜", "乐而雅"],
    summary: "100%澳洲进口纯棉表层 + 特薄0.1cm吸收层 + 千万透气孔底膜，主打「纯棉表层+超薄透气」双重体验。",
    body: "花王旗下乐而雅推出『零触感纯棉甄选』系列，以特薄0.1cm吸收层打破「纯棉=厚重」固有印象。新品采用100%澳洲进口纯棉表层，搭配天然透气棉纤维表层与千万透气孔底膜，层层透气远离闷热。上市规格覆盖22.5/25/35cm护翼型，2026年7月于中国大陆上市。启示：纯棉赛道正从「安心」升级到「轻盈安心」，超薄化是纯棉线必须补的课。"
  },
  {
    id: "news-005", section: "news", category: "安睡裤",
    title: "日本花王夜用安心裤（25新款）：拉拉裤式，300ml+ 吸收",
    en: "Kao Night Panty 2025",
    brand: "花王(日本)", source: "kao", date: "2025-08-20",
    image: "images/product/prod-panty.png",
    tags: ["安心裤", "拉拉裤", "产后", "大吸收"],
    summary: "拉拉裤式设计贴合不位移，高分子吸水材料+多层导流，300ml以上超大吸收，适合夜间与产后。",
    body: "日本花王25年新款夜用安心裤采用拉拉裤式设计，穿脱像内裤，特别适合不喜欢移位、翻身易漏的用户及产后妈妈。材质为柔软无纺布，亲肤透气，简约白系视觉更干净。吸收力采用高分子吸水材料与多层导流结构，300ml以上超大吸收容量，可应对夜间经量高峰或产后恶露。对国内安睡裤产品的启发：产后/大流量场景是高溢价细分。"
  },
  {
    id: "news-006", section: "news", category: "卫生巾",
    title: "全棉时代奈丝公主「100%棉少女系列消毒级」：电子束物理灭菌",
    en: "PurCotton NICE Princess 100% Cotton",
    brand: "奈丝公主(全棉时代)", source: "lifePaper", date: "2026-04-10",
    image: "images/product/prod-day.png",
    tags: ["全棉", "消毒级", "医用级", "无添加"],
    summary: "依托稳健医疗医用品背景，原料经277道指标检验，30万级洁净车间生产，全程0手触，电子束物理灭菌。",
    body: "全棉时代旗下奈丝公主依托母公司稳健医疗多年医用品制造背景，2026年推出「100%棉少女系列消毒级卫生巾」，原料经277道指标检验，在30万级洁净车间生产，全程0手触，采用电子束物理灭菌技术。在全国全棉时代门店永久免费提供应急卫生巾。定位「医用级安全」，把医疗背书转化为消费信任。"
  },
  {
    id: "news-007", section: "news", category: "卫生巾",
    title: "自由点益 LA88 Pro：有机棉 + 复合后生元，调节私处微生态",
    en: "Free LA88 Pro Probiotic",
    brand: "自由点", source: "lifePaper", date: "2025-06-15",
    image: "images/product/prod-day.png",
    tags: ["有机棉", "益生菌", "微生态", "自由点"],
    summary: "有机棉面层 + 复合后生元菌剂(LA88+N13+益生元)，经临床证实调节阴道微生态，获MyMicrobiome认证。",
    body: "自由点是国内较早推广有机纯棉表层概念的品牌。其益LA88 Pro系列添加复合后生元菌剂（LA88+N13+益生元），经临床试验证实对阴道微生态具调节效果，通过德国MyMicrobiome国际微生物组友好认证及SIC益生菌卫生产品认证，并获沙利文认证「中国益生菌卫生巾第一品牌」。代表方向：从「杀菌」转向「微生态平衡」的叙事升级。"
  },
  {
    id: "news-008", section: "news", category: "卫生巾",
    title: "她研社均衡力：弱酸抑菌面层，贴合私处 pH",
    en: "HERLAB Balancin pH",
    brand: "她研社", source: "lifePaper", date: "2025-05-28",
    image: "images/product/prod-day.png",
    tags: ["弱酸", "抑菌", "她研社", "pH"],
    summary: "弱酸性面层接近女性健康私处pH值，经实验显著抑制有害菌；央视网实地探访完成四重测试全部合格。",
    body: "她研社是近年快速成长的国货品牌，其均衡力弱酸抑菌卫生巾采用弱酸性面层，接近女性健康私处的pH值，经实验证明可显著抑制有害菌。2025年央视网以「#听见她声音守护她健康#」为主题实地探访其研发技术中心，完成弱酸性抑菌、防漏性、透气性、密封性四重测试，全部指标合格。国货「成分党+科学背书」打法样本。"
  },
  {
    id: "news-009", section: "news", category: "卫生巾",
    title: "倍舒特：壳聚糖抑菌 + 18倍超吸收科技芯，量大专研",
    en: "Bestore Chitosan Core",
    brand: "倍舒特", source: "lifePaper", date: "2026-01-22",
    image: "images/product/prod-day.png",
    tags: ["壳聚糖", "超吸收", "量大", "消毒级"],
    summary: "壳聚糖（虾蟹壳天然多糖）12h抑菌率>99.9%；自研18倍超吸收科技芯，干爽度+60%，夜用尾翼加宽。",
    body: "倍舒特构建完整产品矩阵：植物系（100%纯棉面层+护翼、婴儿级亲肤认证、9大无添加、消毒级）、超吸收Pro消毒级（量大专研、干爽度+60%）、轻0感（0.08cm极薄芯体）、航天超吸收系列。其壳聚糖天然多糖实验室条件12h抑菌率>99.9%，对大肠杆菌、金黄色葡萄球菌、白色念珠菌显著抑制且对乳酸杆菌影响小。参考价16.9-43.9元/包，消毒级中性价比突出。"
  },
  {
    id: "news-010", section: "news", category: "安睡裤",
    title: "高洁丝海岛奢宠纯棉系列女性卫生裤",
    en: "Kotex Island Cotton Panty",
    brand: "高洁丝", source: "lifePaper", date: "2025-11-10",
    image: "images/product/prod-panty.png",
    tags: ["高洁丝", "纯棉", "奢宠", "卫生裤"],
    summary: "甄选珍稀海岛长绒棉，0.07cm纤薄设计，摩擦降低，对敏感肌友好；全系微生物管控高于国标。",
    body: "高洁丝始创于1920年，是历史悠久的国际品牌。2026年荣获中国卫生用品行业「匠心产品」权威荣誉。海岛奢宠纯棉系列甄选珍稀海岛长绒棉，0.07cm纤薄设计，摩擦降低，对敏感肌友好；奢爽纯棉系列定位中高端，采用澳洲纯棉表层。全系产品微生物管控标准高于国标，主打百年品牌背书与品质路线。"
  },
  {
    id: "news-011", section: "news", category: "卫生巾",
    title: "苏菲裸感S贵族棉（日本）：0.1cm 极薄 + 贵族棉表层",
    en: "Sofy Premium Cotton (JP)",
    brand: "苏菲(尤妮佳)", source: "unicharm", date: "2025-09-30",
    image: "images/product/prod-day.png",
    tags: ["苏菲", "极薄", "贵族棉", "日本"],
    summary: "日本尤妮佳苏菲裸感S贵族棉系列，250mm日用12片，轻薄舒适，主打「像没穿一样」的裸感体验。",
    body: "苏菲是日本尤妮佳集团旗下品牌，以高性能夜用卫生巾广受喜爱。裸感S贵族棉采用贵族棉表层与极薄结构，体感轻盈，是日本市场长青的「裸感」代表。对国内策划的启发：将「薄」转化为感官语言（裸感/无感/隐形），而非只标参数。"
  },
  {
    id: "news-012", section: "news", category: "安睡裤",
    title: "ELIS × Care Bears 联名（日本）：1.9mm 超薄 + 双倍吸收",
    en: "ELIS × Care Bears Collab",
    brand: "ELIS(大王制纸)", source: "unicharm", date: "2025-10-01",
    image: "images/product/prod-panty.png",
    tags: ["IP联名", "Care Bears", "超薄", "日本"],
    summary: "日本大王制纸 ELIS Compact Guard 与 Care Bears 联名，1.9mm 超薄却达常规2倍吸收，7款角色包装。",
    body: "2025年10月1日起，日本大王制纸 ELIS 推出「ELIS Compact Guard × Care Bears™ 联名设计」，含7款角色设计。产品仅1.9mm厚，吸收能力达常规2倍，外包装与单片包装均印角色插画。品牌主张「Not someone, but by your side」，用陪伴感消解月经羞耻。这是「IP情绪包装」的国际范本，可作为国内联名的参考方向。"
  },
  {
    id: "news-013", section: "news", category: "卫生巾",
    title: "ELIS × Esther Bunny 联名（2026）：经期情绪插画包装",
    en: "ELIS × Esther Bunny 2026",
    brand: "ELIS(大王制纸)", source: "unicharm", date: "2026-06-01",
    image: "images/product/prod-day.png",
    tags: ["IP联名", "Esther Bunny", "插画", "情绪"],
    summary: "2026年6月推出10款 Esther Bunny 联名设计，以「醒醒/梳妆/咖啡/居家」叙事插画把月经变治愈。",
    body: "ELIS 于2026年6月1日推出 Erisa Compact Guard × Esther Bunny 联名，10款产品含7款设计，插画捕捉 Esther Bunny 在起床、梳妆、咖啡、居家等氛围场景。艺术家 Esther Kim 理念「Love Myself, Love Yourself」与 ELIS「在你身边」主张契合。把「拆包装」变成情绪疗愈仪式，是国内「经期情绪插画」包装可直接借鉴的叙事框架。"
  },
  {
    id: "news-014", section: "news", category: "卫生巾",
    title: "苏菲 × HANA 限定包装（日本）：成员手写留言单片装",
    en: "Sofy × HANA Limited",
    brand: "苏菲(尤妮佳)", source: "unicharm", date: "2025-10-10",
    image: "images/product/prod-day.png",
    tags: ["联名", "手写留言", "少女群体", "苏菲"],
    summary: "7人女团 HANA 参与构思包装，单片独立装印成员手写寄语，6种限定包装按「当日心情」选择。",
    body: "尤妮佳苏菲 Center-in Compact 1/2 与7人女团 HANA 联名，2025年10月上旬日本全国限量发售。概念「どんな日も、どんなあなたも、咲けますように（无论哪天、无论哪个你，都能绽放）」。单片包装印成员手写寄语，共6种限定包装按长度/香型区分，让女性「按当天心情选卫生巾」。把偶像陪伴感注入私密刚需，是触达10-20代少女的高效路径。"
  },

  /* ---------------- 材料灵感（重点：结构/工艺/触感） ---------------- */
  {
    id: "mat-001", section: "material", category: "卫生巾",
    title: "亲肤面层无纺布：卫生巾与皮肤接触的第一层",
    en: "Top Sheet Nonwoven",
    brand: "材料", source: "nonwoven", date: "2025-01-01",
    image: "images/material/mat-nonwoven.png",
    tags: ["无纺布", "面层", "PP", "热风"],
    summary: "面层多为 PP 纺粘/热风无纺布（或 PE 打孔膜），负责快速下渗、保持干爽；劣质面层会「拒液」导致整日潮湿。",
    material: {
      role: "面层 / Top Sheet",
      composition: "聚丙烯(PP)纺粘或热风无纺布；高端用莱赛尔、天然蚕丝、有机棉",
      structure: "单层或多层复合，表面常有压花/打孔形成单向漏斗，引导液体快速下渗并减少回渗",
      process: "PP 树脂挤出成纤→铺网→热风/热轧加固→亲水整理→裁切对齐",
      experience: "触感「软、干、不粘」；营销语言：裸感 / 云朵棉 / 像没穿",
      usedBy: "苏菲裸感S（贵族棉）、乐而雅零触感纯棉甄选（澳洲纯棉）",
      consumerLang: "「像没穿一样」「透气不闷」「摩擦红痒少」",
      reference: "把「无纺布」翻译成感官词而非材料名；超薄化需配合透气孔底膜才不闷"
    }
  },
  {
    id: "mat-002", section: "material", category: "卫生巾",
    title: "高分子吸水树脂 SAP：锁水成凝胶，卫生巾的「心脏」",
    en: "Super Absorbent Polymer (SAP)",
    brand: "材料", source: "nonwoven", date: "2025-01-01",
    image: "images/material/mat-sap.png",
    tags: ["SAP", "高分子", "吸水", "芯体"],
    summary: "交联聚丙烯酸钠可吸收自身重量数百倍液体并锁成凝胶，受压不回渗；SAP/木浆比例是成本与性能最大杠杆。",
    material: {
      role: "吸收芯体主料 / SAP",
      composition: "交联聚丙烯酸钠（Sodium Polyacrylate），部分牌号达食品级/血液吸收级",
      structure: "颗粒状，分散于木浆纤维网络中；比例越高越薄越干，但成本越高、手感偏硬",
      process: "木浆锤磨成绒→与 SAP 计量混合→真空成型为扁平芯体→包裹防漏",
      experience: "「瞬吸」「不反渗」「量大也不怕」；营销语言：超吸收芯 / 科技芯",
      usedBy: "倍舒特18倍超吸收科技芯、护舒宝FlexFoam（液体芯体变体）",
      consumerLang: "「一碰就锁住」「表面干干爽爽」「夜用尾翼加宽更能装」",
      reference: "SAP比例与木浆比例是策划要会问工厂的参数；液体芯体(FlexFoam)是SAP的柔性替代路线"
    }
  },
  {
    id: "mat-003", section: "material", category: "卫生巾",
    title: "复合吸收芯体 vs 液体芯体：薄、干、不变形的工程博弈",
    en: "Composite Core vs FlexFoam",
    brand: "材料", source: "nonwoven", date: "2025-01-01",
    image: "images/material/mat-structure.png",
    tags: ["芯体", "复合芯", "液体芯体", "结构"],
    summary: "主流为木浆+SAP复合芯（分均布/分层/分区三种结构）；护舒宝 FlexFoam 用乳化液体材料做柔性芯体，吸收后不变形。",
    material: {
      role: "吸收芯体 / Absorbent Core",
      composition: "绒毛浆(Fluff Pulp) + SAP；或 FlexFoam 液体材料（水+纳米聚合物乳化）",
      structure: "均布混合（经济但易凝胶阻塞）/ 分层（上层木浆快渗、下层SAP储能）/ 分区（中心高SAP应对集中涌流）",
      process: "Mat forming（绒毛成型）→ SAP计量混合→ 芯体压缩包裹→ 与面层/底膜层压",
      experience: "「薄却吸得多」「怎么动都贴合不变形」；营销语言：仿若无物 / 灵动速吸岛",
      usedBy: "护舒宝液体卫生巾(FlexFoam)、各品牌超薄日夜用",
      consumerLang: "「0.1cm 也能兜住」「翻身不堆在一处」",
      reference: "芯体 SAP 分布是高端化核心；分区芯体(Zoned Core)适合量大夜用"
    }
  },
  {
    id: "mat-004", section: "material", category: "卫生巾",
    title: "导流层 ADL：决定会不会「中间漏、隧道漏」的隐形功臣",
    en: "Acquisition Distribution Layer",
    brand: "材料", source: "nonwoven", date: "2025-01-01",
    image: "images/material/mat-nonwoven.png",
    tags: ["ADL", "导流层", "渗透", "防漏"],
    summary: "位于面层之下的亲水无纺布/多孔纸，把液体快速拉下并横向扩散，避免集中击穿芯体导致隧道漏。",
    material: {
      role: "导流/分配层 / ADL",
      composition: "亲水无纺布或打孔纸，孔隙结构加速液体转移",
      structure: "夹在面层与芯体之间的一层「中转站」，决定液体去向",
      process: "亲水涂层处理→裁切对齐→与芯体、面层同步层压",
      experience: "「不堆在一处」「猛地一来也不慌」；营销语言：四跑道纵向导流 / 速吸岛",
      usedBy: "多品牌速吸系列（如专利超导芯、四跑道导流层）",
      consumerLang: "「吸速提升66%」「不反渗不黏腻」",
      reference: "ADL 是防漏的关键但最被包装忽略；策划应把「导流」讲成可感知的安心"
    }
  },
  {
    id: "mat-005", section: "material", category: "卫生巾",
    title: "透气底膜：微孔 PE 膜如何「防水又透气」",
    en: "Microporous Breathable Backsheet",
    brand: "材料", source: "nonwoven", date: "2025-01-01",
    image: "images/material/mat-breathable.png",
    tags: ["底膜", "透气", "微孔", "PE"],
    summary: "PE 混碳酸钙填料拉伸出微米级孔隙：液态水过不去，气态水蒸气能逃出（MVTR>5000 g/m²/24h），告别闷热。",
    material: {
      role: "底膜 / Backsheet",
      composition: "聚乙烯(PE) + 碳酸钙(CaCO₃)填料，拉伸成微孔；或 PE 与无纺布复合的「布感底膜」",
      structure: "微孔孔径约2微米——液态水分子太大过不去，气态水分子能逃逸",
      process: "PE树脂流延成膜→混入CaCO₃→双向拉伸出微孔→（可选）复合无纺布降噪",
      experience: "「会呼吸」「不闷痘」「走路没沙沙声」；营销语言：千万透气孔 / 布感底膜",
      usedBy: "乐而雅零触感纯棉甄选（千万透气孔底膜）、各高端线",
      consumerLang: "「整晚干爽不闷痒」「底膜有透气孔才是真透气」",
      reference: "透气底膜是 premium 标配；包装上「透气孔」需是真微孔而非印花假孔"
    }
  },
  {
    id: "mat-006", section: "material", category: "卫生巾",
    title: "有机棉 / 莱赛尔面层：把「安心」做成可验证的材质",
    en: "Organic Cotton & Lyocell",
    brand: "材料", source: "nonwoven", date: "2025-01-01",
    image: "images/material/mat-nonwoven.png",
    tags: ["有机棉", "莱赛尔", "GOTS", "敏感肌"],
    summary: "有机棉需 GOTS/JAS 第三方可追溯；莱赛尔源自木浆、吸湿排汗且摩擦系数低。两者把「天然安心」变可验证成分。",
    material: {
      role: "面层材质升级 / Plant-based",
      composition: "100%有机棉（GOTS或JAS认证，禁用合成农药与转基因）；莱赛尔（木浆再生纤维）",
      structure: "作为面层替代 PP 无纺布，主打低刺激与可持续",
      process: "有机棉：种植限用化学品→无氯漂白(TCF更优)→水刺成布；莱赛尔：木浆溶解纺丝",
      experience: "「天然棉籽香」「不刺激红痒」「对环境也好」；营销语言：九无添加 / 纯净呵护",
      usedBy: "奈丝公主100%棉、花王有机棉(JAS)、护舒宝莱赛尔蚕丝、自由点有机棉",
      consumerLang: "「皮肤科医生也囤」「闻得到植物清香无香精」",
      reference: "「纯棉」≠「有机棉」，策划要区分认证等级；TCF无氯漂白是高端加分项"
    }
  },
  {
    id: "mat-007", section: "material", category: "卫生巾",
    title: "生产工艺：从原料到成品的 8 步高速自动化",
    en: "Manufacturing Process",
    brand: "工艺", source: "nonwoven", date: "2025-01-01",
    image: "images/material/mat-production.png",
    tags: ["生产工艺", "超声波", "层压", "自动化"],
    summary: "芯体成型→面层/ADL制备→底膜流延→层压「三明治」→压花打孔→裁切 wings→单片包→装箱，速度可达1200片/分。",
    material: {
      role: "整体工艺 / Process",
      composition: "绒毛浆、SAP、PP无纺布、PE膜、热熔胶、离型纸",
      structure: "在线连续「网页式」生产：芯体→层压→成形→单片包→装箱，光学对位精度±1mm",
      process: "①芯体(木浆+SAP超声波混合) ②面层/ADL裁切 ③底膜流延(透气版复合无纺) ④层压热封 ⑤压花打孔 ⑥wing裁切 ⑦单片包裹 ⑧装箱",
      experience: "「全封闭全自动」「AI视觉逐片扫描」= 品质信任；营销语言：30万级洁净 / 0手触",
      usedBy: "护舒宝广州黄埔工厂（4K摄像头+AI算法毫秒级扫描）、奈丝公主30万级洁净车间",
      consumerLang: "「工厂比我厨房干净」「每片都看得见结构」",
      reference: "把「工艺」转化成信任状：洁净车间、AI质检、0手触是高端线常用叙事"
    }
  },
  {
    id: "mat-008", section: "material", category: "经期裤",
    title: "安睡裤/经期裤结构：360°包裹 + 腰腿微压 + 四向防漏",
    en: "Period Panty Structure",
    brand: "材料", source: "nonwoven", date: "2025-01-01",
    image: "images/material/mat-structure.png",
    tags: ["经期裤", "结构", "防漏", "包裹"],
    summary: "裤型结构靠腰口弹性+腿口防漏隔边+吸收芯分布实现360°贴合；尺码需按臀围而非体重选，否则过紧或移位。",
    material: {
      role: "整体结构 / Panty Structure",
      composition: "无纺布腰口+腿口橡筋、防漏隔边、复合芯体、透气底膜、前腰贴",
      structure: "360°包裹主体 + 腰腹腿微压设计 + 四向防漏；吸收芯偏后腰加宽应对卧姿涌流",
      process: "芯体成型→裤体裁切→橡筋焊接→隔边成形→单片折叠→包装",
      experience: "「整晚不换也安心」「翻身不漏不勒」；营销语言：减压深睡 / 拉拉裤式",
      usedBy: "护舒宝减压深睡裤(Sleep Pro多孔深睡芯+4D微压)、花王夜用安心裤(拉拉裤式)",
      consumerLang: "「像内裤一样贴身」「腰腹不勒、腿口不卡」",
      reference: "按臀围标注是国标GB/T 39391强制要求；策划需强调「量臀围选码」避免勒痕漏液"
    }
  },

  /* ---------------- 包装灵感 ---------------- */
  {
    id: "pack-001", section: "packaging", category: "卫生巾",
    title: "高端极简风：米白 + 哑光 + 留白，把卫生巾做成「护肤品质感」",
    en: "Premium Minimal Packaging",
    brand: "包装方向", source: "lifePaper", date: "2025-01-01",
    image: "images/pack/pack-premium.png",
    tags: ["极简", "米白", "高级感", "哑光"],
    summary: "借鉴护肤/香氛的极简语言：素净米白盒、哑光触感膜、细衬线字、留白，消解「卫生用品」的廉价感。",
    body: "日本花王有机棉卫生巾采用「哑光米白独立包装，无浮夸樱花粉红，只有KAO logo与一行100% ORGANIC COTTON小字」，被用户形容「像拆一封来自京都的温柔手札」。启示：高端线可用米白/裸色+极小字体+材质触感（触感膜/压纹）营造「私护级」尊贵感，避免高饱和粉红带来的廉价联想。"
  },
  {
    id: "pack-002", section: "packaging", category: "卫生巾",
    title: "IP 联名可爱风：把「拆包装」变成情绪疗愈仪式",
    en: "IP Collab Cute Packaging",
    brand: "包装方向", source: "unicharm", date: "2025-10-01",
    image: "images/pack/pack-ip.png",
    tags: ["IP联名", "可爱", "情绪", "收藏"],
    summary: "Care Bears / Esther Bunny / HANA 等联名证明：角色插画+单片寄语能把私密刚需变成可晒的社交货币。",
    body: "日本 ELIS × Care Bears（7款角色）、ELIS × Esther Bunny（10款叙事插画）、苏菲 × HANA（成员手写寄语单片装）均成功把卫生巾包装转化为「陪伴与情绪」载体。泰国市场卡通IP卫生巾（Hello Kitty/Sailor Moon）线上增长超40%，#CartoonPeriodProducts# 浏览破200万。策划启示：直接搬运知名IP有法律风险，可用「主题风格迁移」（提取水手服元素/蝴蝶结符号做原创设计）。"
  },
  {
    id: "pack-003", section: "packaging", category: "卫生巾",
    title: "可持续包装：可种植纸盒、单片铝箔诗句、环保水基墨",
    en: "Sustainable Packaging",
    brand: "包装方向", source: "shangpu", date: "2026-02-18",
    image: "images/pack/pack-sustainable.png",
    tags: ["可持续", "可种植", "环保", "PLA"],
    summary: "可种植包装（浸水发芽）、单片铝箔印隐藏诗句集齐兑换、食品级白卡+水基墨防潮，回应Z世代环保偏好。",
    body: "尚普复盘中的「季度限量联名」打法包含：环保纸盒升级为可种植包装（浸水三天发芽）、单片独立铝箔袋印隐藏诗句集齐可兑换、上线「云收藏」小程序生成数字藏品。材料端，底膜与包装正向 PLA 聚乳酸（玉米/甘蔗基生物塑料，可工业堆肥）探索。启示：可持续不是成本项，是社交谈资与溢价支点。"
  },
  {
    id: "pack-004", section: "packaging", category: "安睡裤",
    title: "袋型与开启：易撕口、贴封口贴、磁吸翻盖在高端线的应用",
    en: "Pouch & Opening Details",
    brand: "包装方向", source: "lifePaper", date: "2025-01-01",
    image: "images/pack/pack-premium.png",
    tags: ["袋型", "开启方式", "磁吸", "便利"],
    summary: "卫生巾包装袋型（软包/纸盒/可降解袋/独立贴）、开启方式（易撕口/封口贴/磁吸翻盖）是高端线体验细节。",
    body: "包装信息层级可走三条路：①图案/IP主导（少女线）②极简文字主导（高端线）③插画叙事主导（情绪线）。高端线常用可重复封口贴保持防潮，旅行装用硬盒+抽取；安睡裤因单片体积大，多用独立小包+外盒，开封后易散，可借鉴纸巾的「翻盖抽取」结构。开启的「顺手感」是复购的隐性因素。"
  },
  {
    id: "pack-005", section: "packaging", category: "卫生巾",
    title: "跨品类借鉴：彩妆/香氛的「高级感」如何平移到卫生巾",
    en: "Cross-category Inspiration",
    brand: "包装方向", source: "lifePaper", date: "2025-01-01",
    image: "images/pack/pack-premium.png",
    tags: ["跨品类", "彩妆", "香氛", "借鉴"],
    summary: "卫生巾包装常借鉴彩妆的高级感：烫金、丝印、UV局部、磨砂、击凸，以及色系（裸粉/雾蓝/燕麦）。",
    body: "食品/奢侈品/彩妆是卫生巾包装设计的隐性老师。可借鉴：①彩妆的烫金LOGO+磁吸翻盖 ②香氛的哑光瓶身触感与留白 ③食品的防潮内衬与便携分装。色系上，燕麦米白、裸粉、雾蓝比高饱和粉红更显高级。表面工艺：烫金、丝印、UV局部、磨砂、击凸可低成本提升质感。信息层级要「一眼看懂卖点」，避免参数堆砌。"
  },
  {
    id: "pack-006", section: "packaging", category: "经期裤",
    title: "经期裤包装：从「裤型卫生巾」到「内衣级礼盒」",
    en: "Panty Premium Box",
    brand: "包装方向", source: "unicharm", date: "2025-01-01",
    image: "images/pack/pack-ip.png",
    tags: ["经期裤", "礼盒", "内衣级", "礼品"],
    summary: "安睡裤可作「旅行/待产/礼物」场景，包装向内裤礼盒靠拢：抽屉盒、丝带、独立裤型小包。",
    body: "安睡裤因单片体积大、使用场景偏「安睡/旅行/产后」，包装可脱离传统卫生巾的软包逻辑，借鉴内衣礼盒：抽屉盒+丝带、每片独立裤型小包、外盒印使用场景插画（星空/卧室）。日本花王夜用安心裤用「简约白系」传递干净医疗感，可作为待产包定位参考。礼品化是安睡裤提溢价的有效路径。"
  },

  /* ---------------- 监管合规 ---------------- */
  {
    id: "reg-001", section: "regulatory", category: "卫生巾",
    title: "GB 15979-2024 实施：卫生巾归疾控局管，不归药监局",
    en: "GB 15979-2024 Enforced",
    brand: "国家标准", source: "ndcpa", date: "2025-07-01",
    image: "", tags: ["GB 15979-2024", "疾控局", "强制标准"],
    summary: "卫生巾属第三类消毒产品，归卫健委/疾控局监管（非药监局/NMPA）。GB 15979-2024 于2025-07-01实施，新增pH、可迁移荧光剂等指标。",
    body: "重要澄清：卫生巾、护垫、安睡裤属于第三类消毒产品（卫生用品），由卫健部门/疾控局监管，药监局(NMPA)的备案系统是化妆品用的，与卫生巾无关；且第三类产品本身不需备案。GB 15979-2024《一次性使用卫生用品卫生要求》2024-06-25发布、2025-07-01实施，替代2002版，归国家疾控局。新增pH值、可迁移性荧光增白剂残留量等理化指标，调整微生物限值与毒理学要求。普通级菌落总数≤200 CFU/g、真菌≤100 CFU/g；消毒级菌落≤20 CFU/g且无真菌。"
  },
  {
    id: "reg-002", section: "regulatory", category: "卫生巾",
    title: "新国标 GB/T 8939-2025 发布：2027-01-01 实施，看齐婴童",
    en: "GB/T 8939-2025 Released",
    brand: "国家标准", source: "samr", date: "2026-01-20",
    image: "", tags: ["GB/T 8939-2025", "新国标", "婴童看齐"],
    summary: "2026年1月发布新版卫生巾(护垫)国标，收紧长度偏差/pH/甲醛/吸收倍率，新增增塑剂、重金属、致癌芳香胺染料。",
    body: "据行业报道，2026年1月发布新版《卫生巾(护垫)》国家标准 GB/T 8939-2025，计划2027年1月1日实施。相较旧版，收紧了全长偏差、条质量偏差、pH值、甲醛与吸收倍率要求，并新增增塑剂、重金属、可分解致癌芳香胺染料等化学安全指标，多项指标向婴童用品标准看齐。对策划含义：未来「安全指标」将成为包装与传播的硬性背书点。"
  },
  {
    id: "reg-003", section: "regulatory", category: "安睡裤",
    title: "江苏省消保委安睡裤比较试验：40 批次卫生安全全达标",
    en: "Jiangsu Period Panty Test",
    brand: "江苏省消保委", source: "jssxb", date: "2025-11-12",
    image: "", tags: ["安睡裤", "比较试验", "抽检", "标签"],
    summary: "40批次安睡裤卫生/性能/安全指标均符合标准，但部分标签不规范（臀围/腰围标注不符、进口无中文标）。",
    body: "江苏省消保委2025年11月发布安睡裤比较试验：购40批次（线上28+线下12），涉乐而雅、高洁丝、淘淘氧棉、ABC等，单价0.66-6.36元/片。卫生/性能/安全指标均符合标准：吸收速度5~12秒（国标≤60秒），5批次吸水倍率≥30倍，19批次20~30倍；甲醛、可迁移荧光物、重金属、丙烯酰胺、邻苯均达标。问题在标签：兔菲腰围实测109cm低于XL标准(≥115cm)；康乐司执行标准引用不当；米娅等10批次臀围标注不符；花王乐而雅进口无中文标（已整改）。"
  },
  {
    id: "reg-004", section: "regulatory", category: "卫生巾",
    title: "上海市消保委 55 款卫生巾(裤)测评：长度虚标引关注",
    en: "Shanghai 55-Pad Test",
    brand: "上海市消保委", source: "shxb", date: "2025-03-13",
    image: "", tags: ["长度虚标", "比较试验", "消保委", "舆情"],
    summary: "55款测评中 GentleCarlng 小轻芯全长偏差-6%超±4%限值；7款实测长于标示。安全指标全部合格。",
    body: "上海市消保委2025年妇女节前夕发布女性卫生巾(裤)比较试验，购51/55款（护舒宝、高洁丝、乐而雅、苏菲、她研社、薇尔、七度空间、自由点、全棉时代等），价格3-79.9元/包。全长偏差：GentleCarlng®小轻芯系列出现-6%负偏差，超标准±4%允许范围（监管已责令停售清理）；ALDI超长日用、植护秘觉独角兽羽感等7款实测长于标示。pH、甲醛、可迁移荧光物、微生物全部合格；5款宣称抑菌中有1款表现较差。提示：长度标注合规是近期监管重点。"
  },
  {
    id: "reg-005", section: "regulatory", category: "卫生巾",
    title: "2024-2025 舆情：长度虚标、3·15 残次料翻新、pH/荧光剂焦虑",
    en: "2024-2025 Public Opinion",
    brand: "舆情综述", source: "lifePaper", date: "2025-03-15",
    image: "", tags: ["舆情", "3·15", "残次料", "信任"],
    summary: "2024-11多品牌被曝长度虚标；2025-3·15曝光卫生巾/纸尿裤残次料翻新二次销售；消费者信心进入修复期。",
    body: "2024年11月多个知名品牌卫生巾被曝光「虚标长度」；2025年3月央视3·15晚会曝光卫生巾、纸尿裤残次料被翻新「二次销售」乱象；同期上海消保委55款测评显示部分样品长度偏差。系列事件引发消费者对产品安全的普遍担忧，2025年1-8月女性卫生用品市场虽同比+23.9%至128.8亿元，但信心仍处修复周期。对策划的核心教训：信任状（标准、检测报告、洁净工艺）比功能口号更重要。"
  },
  {
    id: "reg-006", section: "regulatory", category: "卫生巾",
    title: "标准矩阵速查：卫生巾 / 安睡裤 / 标签 该看哪份标准",
    en: "Standard Cheat Sheet",
    brand: "标准库", source: "samr", date: "2025-01-01",
    image: "", tags: ["标准", "GB/T 8939", "GB/T 39391", "GB 38598"],
    summary: "普通卫生巾 GB/T 8939-2018；安睡裤/经期裤 GB/T 39391-2020《女性卫生裤》；强制卫生 GB 15979-2024；标签 GB 38598-2020。",
    body: "卫生巾品类标准矩阵：①普通卫生巾(护垫) GB/T 8939-2018《卫生巾(护垫)》；②安睡裤/经期裤 GB/T 39391-2020《女性卫生裤》（规定适用臀围/腰围范围，按 S/M/L/XL 对应固定尺寸）；③卫生安全强制标准 GB 15979-2024（2025-07-01实施，归国家疾控局）；④标签 GB 38598-2020《消毒产品标签说明书通用要求》。策划需避免把「安睡裤」错误引用 GB/T 8939（如康乐司案例被点名）。"
  },

  /* ---------------- 竞品雷达 ---------------- */
  {
    id: "cmp-001", section: "competitor", category: "卫生巾",
    title: "国际巨头 vs 国货新锐：技术路线与定位分化",
    en: "Giant vs Challenger",
    brand: "竞品雷达", source: "mojing", date: "2026-03-01",
    image: "", tags: ["竞品", "护舒宝", "她研社", "自由点"],
    summary: "护舒宝走「多技术路线并行+医学背书」；自由点打「有机棉+微生态」；她研社打「弱酸抑菌+科学测评」。",
    body: "技术路线分化明显：①护舒宝（宝洁）多技术并行——液体芯体 FlexFoam、莱赛尔蚕丝、减压深睡裤，并以妇产科大会+千名专家背书建立科学信任；②自由点 主打有机纯棉+益生菌微生态(LA88 Pro)，获沙利文「益生菌卫生巾第一品牌」；③她研社 均衡力弱酸抑菌+央视网四重测试。策划启示：高端突破点=可验证材质/数据+权威背书，而非空泛「呵护」。"
  },
  {
    id: "cmp-002", section: "competitor", category: "安睡裤",
    title: "安睡裤赛道品牌图谱：谁在拼吸收、谁在拼包装",
    en: "Period Panty Landscape",
    brand: "竞品雷达", source: "jssxb", date: "2025-11-12",
    image: "", tags: ["安睡裤", "品牌", "图谱", "竞争"],
    summary: "江苏省消保委40批次覆盖乐而雅、高洁丝、淘淘氧棉、ABC、护舒宝、薇尔、倍舒特、花王等；拼吸收(倍率)与拼包装(联名)两派。",
    body: "安睡裤竞争两极化：①性能派——护舒宝减压深睡裤(Sleep Pro多孔深睡芯)、花王夜用安心裤(300ml+)、倍舒特(18倍超吸收)比拼吸收速度与容量；②情绪派——ELIS×Care Bears/Esther Bunny、苏菲×HANA用IP与插画做溢价。国内品牌中，她研社深藏不露裤型、自由点、 ABC棉柔表层各占细分。策划机会：把「性能数据」与「情绪包装」结合，而非二选一。"
  },
  {
    id: "cmp-003", section: "competitor", category: "卫生巾",
    title: "「消毒级」成新信任锚点：倍舒特/奈丝公主抢先占位",
    en: "Sterilized Grade Trust Anchor",
    brand: "竞品雷达", source: "lifePaper", date: "2026-01-22",
    image: "", tags: ["消毒级", "信任", "倍舒特", "奈丝公主"],
    summary: "新国标后，「消毒级」(菌落≤20 CFU/g)成为高端信任锚点，倍舒特、奈丝公主、自由点纷纷以消毒级+检测背书切入。",
    body: "GB 15979 将产品分「普通级」与「消毒级」。舆情后，消毒级（微生物更严、需标「消毒级」及消毒方式/日期）成为消费者可理解的安全锚点。倍舒特植物系「婴儿级亲肤认证+9大无添加+消毒级」、奈丝公主「30万级洁净+电子束灭菌」、自由点「有机棉+益生菌」纷纷以可验证安全切入。策划启示：把「消毒级/洁净工艺」做成包装正面信任状，比喊「安全」有效。"
  },
  {
    id: "cmp-004", section: "competitor", category: "经期裤",
    title: "日本市场参考：超薄化(1.9mm) + 双倍吸收 + IP 包装三位一体",
    en: "Japan Benchmark",
    brand: "竞品雷达", source: "unicharm", date: "2026-06-01",
    image: "", tags: ["日本", "超薄", "IP", "参考"],
    summary: "日本 ELIS 把 1.9mm 超薄、2倍吸收、Care Bears/Esther Bunny IP 包装集于一身，是「技术+情绪」融合范本。",
    body: "日本市场给出清晰范本：ELIS Compact Guard 用1.9mm超薄复合芯实现常规2倍吸收，再叠加 Care Bears / Esther Bunny 角色插画包装。技术参数（薄+吸）与情绪价值（IP陪伴）不互斥，反而互相放大——薄让用户「愿意带」，IP让用户「愿意晒」。对国内策划：超薄化是入场券，包装情绪化是溢价与裂变的关键。"
  }
];

/* 默认首页信息流条数 */
const FEED_LIMIT = 40;

if (typeof module !== "undefined") {
  module.exports = { SITE_META, CATEGORIES, SECTIONS, SOURCES, ITEMS, FEED_LIMIT };
}
