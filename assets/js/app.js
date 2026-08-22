/* ============================================================
   小小y产品策划 · 应用逻辑
   ============================================================ */
(function () {
  "use strict";

  var state = {
    section: "feed",
    category: null,      // null = 全部
    search: "",
    sort: "date",
    meTab: "fav",
    visible: FEED_LIMIT
  };

  var FAV_KEY = "sw_fav_v1";
  var NOTE_KEY = "sw_notes_v1";

  /* ---------- 本地存储 ---------- */
  function getFav() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch (e) { return []; }
  }
  function setFav(arr) { localStorage.setItem(FAV_KEY, JSON.stringify(arr)); }
  function isFav(id) { return getFav().indexOf(id) >= 0; }
  function toggleFav(id) {
    var a = getFav(); var i = a.indexOf(id);
    if (i >= 0) a.splice(i, 1); else a.push(id);
    setFav(a); return a.indexOf(id) >= 0;
  }
  function getNotes() {
    try { return JSON.parse(localStorage.getItem(NOTE_KEY)) || {}; } catch (e) { return {}; }
  }
  function setNote(id, txt) { var n = getNotes(); if (!txt) delete n[id]; else n[id] = txt; localStorage.setItem(NOTE_KEY, JSON.stringify(n)); }

  /* ---------- 工具 ---------- */
  function srcName(key) { return SOURCES[key] ? SOURCES[key].name : key; }
  function srcUrl(key) { return SOURCES[key] ? SOURCES[key].url : "#"; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function imgTag(item, cls) {
    if (item.image && item.image.trim() !== "") {
      return '<img src="' + esc(item.image) + '" alt="' + esc(item.title) + '" onerror="this.parentNode.innerHTML=\'<div class=&quot;ph&quot;><div class=&quot;ph-ico&quot;>图</div><span>配图待生成</span></div>\'">';
    }
    return '<div class="ph"><div class="ph-ico">' + (item.section === "material" ? "材" : item.section === "packaging" ? "包" : item.section === "regulatory" ? "规" : item.section === "competitor" ? "竞" : "讯") + '</div><span>' + srcName(item.source) + '</span></div>';
  }
  function secLabel(key) {
    var m = { industry: "行业资讯", news: "新品上新", material: "材料灵感", packaging: "包装灵感", regulatory: "监管合规", competitor: "竞品雷达", feed: "今日动态" };
    return m[key] || key;
  }

  /* ---------- 渲染：品类 Tab ---------- */
  function renderCatBar() {
    var bar = document.getElementById("catBar");
    var html = "";
    CATEGORIES.forEach(function (c) {
      var cnt = ITEMS.filter(function (it) { return it.category === c.key; }).length;
      var active = state.category === c.key ? " active" : "";
      html += '<div class="cat-tab' + active + '" data-cat="' + c.key + '">' + esc(c.label) + '<span class="badge">' + cnt + '</span></div>';
    });
    bar.innerHTML = html;
    bar.querySelectorAll(".cat-tab").forEach(function (el) {
      el.onclick = function () {
        state.category = (state.category === el.dataset.cat) ? null : el.dataset.cat;
        state.visible = FEED_LIMIT;
        renderAll();
      };
    });
  }

  /* ---------- 渲染：侧栏板块 ---------- */
  function renderSectionNav() {
    var nav = document.getElementById("sectionNav");
    var html = "";
    SECTIONS.forEach(function (s) {
      var cnt;
      if (s.key === "feed") cnt = ITEMS.length;
      else if (s.key === "me") cnt = getFav().length;
      else cnt = ITEMS.filter(function (it) { return it.section === s.key; }).length;
      var active = state.section === s.key ? " active" : "";
      html += '<div class="side-item' + active + '" data-sec="' + s.key + '">' +
        '<span>' + esc(s.label) + ' <span class="en">' + esc(s.en) + '</span></span>' +
        '<span class="cnt">' + cnt + '</span></div>';
    });
    nav.innerHTML = html;
    nav.querySelectorAll(".side-item").forEach(function (el) {
      el.onclick = function () {
        state.section = el.dataset.sec;
        state.visible = FEED_LIMIT;
        if (state.section !== "me") { document.getElementById("searchInput").value = ""; state.search = ""; }
        renderAll();
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
    });
  }

  /* ---------- 渲染：统计 ---------- */
  function renderStats() {
    var el = document.getElementById("sideStats");
    var total = ITEMS.length;
    var mats = ITEMS.filter(function (i) { return i.section === "material"; }).length;
    var news = ITEMS.filter(function (i) { return i.section === "news"; }).length;
    var favs = getFav().length;
    el.innerHTML =
      '<h4>情报概览</h4>' +
      row("收录条目", total) +
      row("材料/工艺", mats) +
      row("新品追踪", news) +
      row("我的收藏", favs) +
      row("更新于", SITE_META.buildDate);
    function row(k, v) { return '<div class="row"><span>' + k + '</span><b>' + v + '</b></div>'; }
  }

  /* ---------- 过滤 + 排序 ---------- */
  function getList() {
    var list = ITEMS.slice();
    if (state.section !== "feed" && state.section !== "me") {
      list = list.filter(function (i) { return i.section === state.section; });
    }
    if (state.category) {
      list = list.filter(function (i) { return i.category === state.category; });
    }
    if (state.search) {
      var q = state.search.toLowerCase();
      list = list.filter(function (i) {
        return (i.title + " " + (i.en || "") + " " + (i.brand || "") + " " + (i.summary || "") + " " + (i.tags || []).join(" ") + " " + srcName(i.source)).toLowerCase().indexOf(q) >= 0;
      });
    }
    list.sort(function (a, b) {
      if (state.sort === "title") return a.title.localeCompare(b.title, "zh");
      if (state.sort === "dateAsc") return a.date < b.date ? -1 : 1;
      return a.date < b.date ? 1 : -1; // date desc
    });
    return list;
  }

  /* ---------- 渲染：卡片 ---------- */
  function cardHTML(it) {
    var cls = it.section;
    var fav = isFav(it.id) ? " on" : "";
    var tags = (it.tags || []).slice(0, 3).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("");
    return '<article class="card ' + cls + '" data-id="' + it.id + '">' +
      '<div class="card-img">' + imgTag(it) +
        '<span class="card-sec">' + secLabel(it.section) + '</span>' +
        '<button class="card-fav' + fav + '" data-fav="' + it.id + '" title="收藏">♥</button>' +
      '</div>' +
      '<div class="card-body">' +
        '<div class="card-meta"><span class="chip">' + esc(it.category) + '</span>' +
          '<span class="src">' + esc(srcName(it.source)) + '</span><span class="dot">·</span>' +
          '<span>' + esc(it.date) + '</span></div>' +
        '<h3 class="card-title">' + esc(it.title) + '</h3>' +
        '<p class="card-sum">' + esc(it.summary) + '</p>' +
        '<div class="card-tags">' + tags + '</div>' +
        (it.en ? '<div class="card-en">' + esc(it.en) + '</div>' : '') +
      '</div></article>';
  }

  function renderCards() {
    var grid = document.getElementById("cardGrid");
    var wrap = document.getElementById("loadMoreWrap");
    if (state.section === "me") { renderMe(); return; }

    var list = getList();
    document.getElementById("resultCount").textContent = "共 " + list.length + " 条";

    var show = list.slice(0, state.visible);
    grid.innerHTML = show.map(cardHTML).join("") ||
      '<p style="color:var(--ink-faint);grid-column:1/-1;padding:40px">没有匹配的内容，换个关键词试试。</p>';

    // 收藏按钮
    grid.querySelectorAll("[data-fav]").forEach(function (b) {
      b.onclick = function (e) {
        e.stopPropagation();
        var on = toggleFav(b.dataset.fav);
        b.classList.toggle("on", on);
        renderStats(); renderSectionNav();
      };
    });
    // 打开详情
    grid.querySelectorAll(".card").forEach(function (c) {
      c.onclick = function () { openModal(c.dataset.id); };
    });

    // 加载更多（仅 feed 且有余量时）
    if (state.section === "feed" && list.length > state.visible) {
      wrap.style.display = "block";
    } else { wrap.style.display = "none"; }
  }

  /* ---------- 个人中心 ---------- */
  function renderMe() {
    var grid = document.getElementById("cardGrid");
    var wrap = document.getElementById("loadMoreWrap");
    wrap.style.display = "none";
    document.getElementById("resultCount").textContent = "";

    var favs = getFav();
    var notes = getNotes();
    var html = '<div style="grid-column:1/-1">' +
      '<div class="me-tabs">' +
        '<button class="me-tab ' + (state.meTab === "fav" ? "active" : "") + '" data-metab="fav">我的收藏 (' + favs.length + ')</button>' +
        '<button class="me-tab ' + (state.meTab === "note" ? "active" : "") + '" data-metab="note">我的笔记 (' + Object.keys(notes).length + ')</button>' +
      '</div>';

    if (state.meTab === "fav") {
      if (favs.length === 0) html += empty("还没有收藏。在任意卡片右上角点 ♥ 即可收藏。");
      else {
        html += '<div class="me-list">';
        favs.forEach(function (id) {
          var it = byId(id); if (!it) return;
          html += meItem(it, notes[id]);
        });
        html += '</div>';
      }
    } else {
      var keys = Object.keys(notes);
      if (keys.length === 0) html += empty("还没有笔记。打开任意条目，底部可写私人备注。");
      else {
        html += '<div class="me-list">';
        keys.forEach(function (id) {
          var it = byId(id); if (!it) return;
          html += meItem(it, notes[id]);
        });
        html += '</div>';
      }
    }
    html += '</div>';
    grid.innerHTML = html;

    grid.querySelectorAll("[data-metab]").forEach(function (b) {
      b.onclick = function () { state.meTab = b.dataset.metab; renderMe(); };
    });
    grid.querySelectorAll(".me-item").forEach(function (c) {
      c.onclick = function () { openModal(c.dataset.id); };
    });
  }
  function meItem(it, note) {
    var noteHtml = note ? esc(note) : '<span class="none">（暂无笔记）</span>';
    return '<div class="me-item" data-id="' + it.id + '">' +
      '<div class="mi-img">' + imgTag(it) + '</div>' +
      '<div class="mi-body"><div class="mi-title">' + esc(it.title) + '</div>' +
      '<div class="mi-note">' + noteHtml + '</div></div></div>';
  }
  function empty(t) { return '<div class="me-empty">' + t + '</div>'; }

  /* ---------- 详情弹层 ---------- */
  function byId(id) { for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === id) return ITEMS[i]; return null; }

  function openModal(id) {
    var it = byId(id); if (!it) return;
    var body = document.getElementById("modalBody");
    var fav = isFav(id);
    var notes = getNotes();
    var noteVal = notes[id] || "";

    var html = '<div class="modal-hero">' + imgTag(it) + '</div>' +
      '<div class="modal-pad">' +
        '<div class="modal-meta">' +
          '<span class="chip">' + esc(it.category) + '</span>' +
          '<span>' + secLabel(it.section) + '</span><span class="dot">·</span>' +
          '<span>' + esc(srcName(it.source)) + '</span><span class="dot">·</span>' +
          '<span>' + esc(it.date) + '</span>' +
        '</div>' +
        '<h2 class="modal-title">' + esc(it.title) + '</h2>' +
        (it.en ? '<div class="modal-en">' + esc(it.en) + '</div>' : '') +
        (it.body ? '<p>' + esc(it.body) + '</p>' : '<p>' + esc(it.summary) + '</p>');

    if (it.material) html += matBlock(it.material);

    if (it.tags && it.tags.length) {
      html += '<div class="modal-tags">' + it.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("") + '</div>';
    }

    html += '<div class="modal-note-box">' +
        '<label>我的笔记（仅本地保存）</label>' +
        '<textarea id="noteArea" placeholder="写下你的灵感、可借鉴方向、客户项目关联…">' + esc(noteVal) + '</textarea>' +
        '<div class="modal-actions">' +
          '<button class="btn-fav ' + (fav ? "on" : "") + '" id="favBtn">♥ ' + (fav ? "已收藏" : "收藏") + '</button>' +
          '<a class="btn-src" href="' + esc(srcUrl(it.source)) + '" target="_blank" rel="noopener">查看来源 ›</a>' +
        '</div>' +
      '</div>' +
      '</div>';

    body.innerHTML = html;

    var favBtn = document.getElementById("favBtn");
    favBtn.onclick = function () {
      var on = toggleFav(id);
      favBtn.classList.toggle("on", on);
      favBtn.textContent = "♥ " + (on ? "已收藏" : "收藏");
      renderStats(); renderSectionNav(); renderCards();
    };
    var noteArea = document.getElementById("noteArea");
    noteArea.onblur = function () { setNote(id, noteArea.value.trim()); renderSectionNav(); };

    document.getElementById("modalMask").classList.add("show");
  }
  function matBlock(m) {
    function row(k, v) { return '<div class="mat-row"><span class="k">' + k + '</span><span class="v">' + v + '</span></div>'; }
    var h = '<div class="mat-block"><h4>结构 · 工艺 · 触感拆解</h4>';
    if (m.role) h += row("角色", esc(m.role));
    if (m.composition) h += row("成分", esc(m.composition));
    if (m.structure) h += row("结构", esc(m.structure));
    if (m.process) h += row("工艺", esc(m.process));
    if (m.experience) h += row("体验语言", "<em>" + esc(m.experience) + "</em>");
    if (m.usedBy) h += row("用了它的爆款", esc(m.usedBy));
    if (m.consumerLang) h += row("消费者话术", esc(m.consumerLang));
    if (m.reference) h += row("可借鉴方向", "<em>" + esc(m.reference) + "</em>");
    h += '</div>';
    return h;
  }
  function closeModal() { document.getElementById("modalMask").classList.remove("show"); }

  /* ---------- 顶部标题/描述 ---------- */
  function renderHead() {
    document.getElementById("siteTitle").textContent = SITE_META.title;
    document.getElementById("siteSubtitle").textContent = SITE_META.subtitle;
    document.getElementById("siteDesc").textContent = SITE_META.desc;
  }

  /* ---------- 活动筛选提示 ---------- */
  function renderFilterHint() {
    var el = document.getElementById("activeFilter");
    var parts = [];
    if (state.category) parts.push('品类：<b>' + esc(state.category) + '</b>');
    if (state.search) parts.push('搜索：<b>' + esc(state.search) + '</b>');
    el.innerHTML = parts.join('　');
  }

  /* ---------- 总渲染 ---------- */
  function renderAll() {
    renderHead();
    renderCatBar();
    renderSectionNav();
    renderStats();
    // 标题
    var sec = SECTIONS.filter(function (s) { return s.key === state.section; })[0];
    document.getElementById("sectionTitle").textContent = sec ? sec.label : "今日动态";
    renderFilterHint();
    renderCards();
  }

  /* ---------- 事件 ---------- */
  document.getElementById("searchInput").addEventListener("input", function (e) {
    state.search = e.target.value.trim(); state.visible = FEED_LIMIT; renderCards(); renderFilterHint();
  });
  document.getElementById("sortSelect").addEventListener("change", function (e) {
    state.sort = e.target.value; renderCards();
  });
  document.getElementById("loadMoreBtn").onclick = function () {
    state.visible += 20; renderCards();
  };
  document.getElementById("modalClose").onclick = closeModal;
  document.getElementById("modalMask").onclick = function (e) { if (e.target.id === "modalMask") closeModal(); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  /* ---------- 启动 ---------- */
  renderAll();
})();
