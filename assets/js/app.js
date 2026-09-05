/* =========================================================
   MAMRYA — 동작
   내용을 바꾸려면 data.js 를 고치세요. 이 파일은 손대지 않아도 됩니다.
   ========================================================= */
(function () {
  'use strict';

  var D = (typeof DATA !== 'undefined' && DATA) ? DATA : (window.DATA || {});
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var el = function (t, c, h) {
    var n = document.createElement(t);
    if (c) n.className = c;
    if (h != null) n.innerHTML = h;
    return n;
  };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m];
    });
  };
  var bgImg = function (src) { return src ? 'background-image:url(\'' + src + '\')' : ''; };


  /* ---------- 디자인 적용 ---------- */
  var FONTS = {
    pretendard: { name: "'Pretendard Variable',Pretendard", url: '' },
    gowun:      { name: "'Gowun Dodum'", url: 'https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap' },
    myeongjo:   { name: "'Nanum Myeongjo'", url: 'https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700&display=swap' },
    gaegu:      { name: "'Gaegu'", url: 'https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&display=swap' }
  };

  function hex2rgb(h) {
    h = String(h || '').replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgba(hex, a) {
    var c = hex2rgb(hex);
    return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')';
  }
  function shade(hex, amt) {
    var c = hex2rgb(hex).map(function (v) {
      return Math.max(0, Math.min(255, Math.round(v + amt)));
    });
    return 'rgb(' + c.join(',') + ')';
  }

  function applyTheme() {
    var t = D.theme || {};
    var c = t.colors || {};
    var r = document.documentElement.style;

    if (c.ink) {
      r.setProperty('--ink', c.ink);
      [90, 75, 55, 40, 28, 12, 7].forEach(function (n) {
        r.setProperty('--ink-' + ('0' + n).slice(-2), rgba(c.ink, n / 100));
      });
    }
    if (c.wall)  r.setProperty('--wall', c.wall);
    if (c.moss)  { r.setProperty('--moss', c.moss); r.setProperty('--moss-deep', shade(c.moss, -40)); }
    if (c.amber) { r.setProperty('--amber', c.amber); r.setProperty('--amber-deep', shade(c.amber, -60)); }
    if (c.cream) r.setProperty('--cream', c.cream);
    if (c.mint)  r.setProperty('--leaf', c.mint);
    if (c.butter)r.setProperty('--butter', c.butter);
    if (c.sky)   r.setProperty('--sky', c.sky);
    if (c.leaf)  r.setProperty('--seat-s', c.leaf);

    if (t.fontSize) {
      r.setProperty('--fz', t.fontSize + 'px');
      r.setProperty('--fz-s', (t.fontSize - 1) + 'px');
      r.setProperty('--fz-l', (t.fontSize + 1.5) + 'px');
      r.setProperty('--fz-xl', (t.fontSize + 3.5) + 'px');
    }
    if (t.infoGap != null) r.setProperty('--info-gap', t.infoGap + 'px');
    if (t.infoLine != null) r.setProperty('--info-line', t.infoLine);
    if (t.windowW) r.setProperty('--win-w', t.windowW + 'px');
    if (t.windowH) r.setProperty('--win-h', t.windowH + 'px');
    if (t.glass != null) r.setProperty('--glass', 'rgba(255,255,255,' + t.glass + ')');

    var f = FONTS[t.font] || FONTS.pretendard;
    if (f.url) {
      var link = document.createElement('link');
      link.rel = 'stylesheet'; link.href = f.url;
      document.head.appendChild(link);
    }
    document.body.style.fontFamily = f.name + ",-apple-system,system-ui,sans-serif";
  }


  /* ---------- 꽃잎 ---------- */
  var Petals = {
    on: false, raf: null, list: [], cv: null, cx: null, w: 0, h: 0,

    start: function () {
      var t = D.theme || {};
      this.cv = $('#petals');
      if (!this.cv || t.petals === false) { if (this.cv) this.cv.style.display = 'none'; return; }

      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) { this.cv.style.display = 'none'; return; }

      this.cx = this.cv.getContext('2d');
      this.on = true;
      this.resize();
      var self = this;
      window.addEventListener('resize', function () { self.resize(); });

      var n = t.petalCount || 26;
      this.list = [];
      for (var i = 0; i < n; i++) this.list.push(this.make(true));
      this.loop();
    },

    resize: function () {
      var d = window.devicePixelRatio || 1;
      this.w = window.innerWidth; this.h = window.innerHeight;
      this.cv.width = this.w * d; this.cv.height = this.h * d;
      this.cv.style.width = this.w + 'px'; this.cv.style.height = this.h + 'px';
      this.cx.setTransform(d, 0, 0, d, 0, 0);
    },

    make: function (anywhere) {
      var t = D.theme || {};
      var size = (t.petalSize || 1);
      var speed = (t.petalSpeed || 1);
      return {
        x: Math.random() * this.w,
        y: anywhere ? Math.random() * this.h : -20,
        r: (6 + Math.random() * 7) * size,
        vy: (0.25 + Math.random() * 0.5) * speed,
        sway: 0.4 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
        rot: Math.random() * Math.PI * 2,
        alpha: 0.4 + Math.random() * 0.45
      };
    },

    draw: function (p) {
      var c = this.cx;
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rot);
      c.globalAlpha = p.alpha;
      c.fillStyle = ((D.theme || {}).petalColor) || '#f7d3dc';
      c.beginPath();
      c.moveTo(0, -p.r * 0.5);
      c.bezierCurveTo(p.r * 0.6, -p.r * 0.5, p.r * 0.5, p.r * 0.5, 0, p.r * 0.6);
      c.bezierCurveTo(-p.r * 0.5, p.r * 0.5, -p.r * 0.6, -p.r * 0.5, 0, -p.r * 0.5);
      c.fill();
      c.restore();
    },

    loop: function () {
      var self = this;
      this.cx.clearRect(0, 0, this.w, this.h);
      this.list.forEach(function (p, i) {
        p.phase += 0.012;
        p.y += p.vy;
        p.x += Math.sin(p.phase) * p.sway;
        p.rot += p.spin;
        if (p.y - p.r > self.h || p.x < -60 || p.x > self.w + 60) {
          self.list[i] = self.make(false);
        } else {
          self.draw(p);
        }
      });
      this.raf = requestAnimationFrame(function () { self.loop(); });
    }
  };

  /* ---------- 날짜 계산 ---------- */
  var today = new Date(); today.setHours(0, 0, 0, 0);

  function daysSince(iso) {
    if (!iso) return 0;
    var p = iso.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return Math.floor((today - d) / 86400000);
  }
  function yearsSince(iso) {
    if (!iso) return 0;
    var p = iso.split('-');
    var y = today.getFullYear() - +p[0];
    var passed = (today.getMonth() + 1) > +p[1] ||
      ((today.getMonth() + 1) === +p[1] && today.getDate() >= +p[2]);
    return y + (passed ? 1 : 0);
  }
  function daysUntil(mmdd) {
    var p = mmdd.split('-');
    var d = new Date(today.getFullYear(), +p[0] - 1, +p[1]);
    if (d < today) d.setFullYear(d.getFullYear() + 1);
    return Math.round((d - today) / 86400000);
  }

  /* ---------- 대문 ---------- */
  function buildGate() {
    var s = D.site || {}, t = D.ticket || {};
    $('#gateTitle').textContent = s.title || '';
    $('#gateSub').textContent = s.subtitle || '';
    $('#gateNo').textContent = t.no || '';

    var rows = [['DATE', t.date], ['TIME', t.time], ['HALL', s.hall], ['SEAT', t.seat]];
    var box = $('#gateRows');
    rows.forEach(function (r) {
      if (!r[1]) return;
      var w = el('div');
      w.appendChild(el('dt', null, esc(r[0])));
      w.appendChild(el('dd', null, esc(r[1])));
      box.appendChild(w);
    });

    var hintEl = document.querySelector('.ticket__hint');
    if (hintEl) {
      if (t.hint) hintEl.textContent = t.hint;
      else hintEl.style.display = 'none';
    }

    var bc = $('#gateBarcode'), widths = [2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2];
    widths.forEach(function (w) {
      var i = el('i'); i.style.width = w + 'px'; bc.appendChild(i);
    });
  }

  /* ---------- 정보창 ---------- */
  function infoRows() {
    var rows = (D.info || []).slice();
    rows.push({ label: 'STATUS', value: 'SHOWING NOW' });
    if (D.since) {
      rows.push({ label: 'SINCE', value: 'D+' + daysSince(D.since) + ' · ' + yearsSince(D.since) + ' YEARS' });
    }
    return rows;
  }

  function buildSide() {
    var s = D.site || {}, side = $('#side');
    side.innerHTML = '';

    var ph = el('div', 'side__photo', s.poster ? '' : '자컾 사진');
    if (s.poster) ph.style.cssText = bgImg(s.poster);
    side.appendChild(ph);

    var head = el('div');
    head.appendChild(el('p', 'side__title', esc(s.title)));
    head.appendChild(el('p', 'side__sub', esc(s.subtitle)));
    side.appendChild(head);

    var wrap = el('div');
    wrap.appendChild(el('p', 'label', 'INFORMATION'));
    var dl = el('dl', 'side__rows');
    (D.info || []).forEach(function (r) {
      var d = el('div');
      d.appendChild(el('dt', null, esc(r.label)));
      d.appendChild(el('dd', null, esc(r.value)));
      dl.appendChild(d);
    });
    wrap.appendChild(dl);
    side.appendChild(wrap);

    var st = el('div');
    st.appendChild(el('p', 'label', 'STATUS'));
    var tiles = el('div', 'tiles');
    tiles.appendChild(el('div', 'tile', '<b>SHOWING</b><span>NOW</span>'));
    if (D.since) {
      tiles.appendChild(el('div', 'tile',
        '<b>D+' + daysSince(D.since) + '</b><span>' + yearsSince(D.since) + ' YEARS</span>'));
    }
    st.appendChild(tiles);
    side.appendChild(st);

    var np = el('div');
    np.appendChild(el('p', 'label', 'NOW PLAYING'));
    var box = el('div', 'nowbox',
      '<span aria-hidden="true">▶</span><span class="nowbox__t"><b id="sideNowT">—</b><span id="sideNowX"></span></span>');
    np.appendChild(box);
    side.appendChild(np);
  }

  function buildDrawer() {
    var s = D.site || {}, body = $('#drawerBody');
    body.innerHTML = '';
    var ph = el('div', 'drawer__photo', s.poster ? '' : '자컾 사진');
    if (s.poster) ph.style.cssText = bgImg(s.poster);
    body.appendChild(ph);
    body.appendChild(el('p', 'side__title', esc(s.title)));
    body.appendChild(el('p', 'side__sub', esc(s.subtitle)));
    var dl = el('dl', 'drawer__rows');
    infoRows().forEach(function (r) {
      var d = el('div');
      d.appendChild(el('dt', null, esc(r.label)));
      d.appendChild(el('dd', null, esc(r.value)));
      dl.appendChild(d);
    });
    body.appendChild(dl);
  }

  /* ---------- 홈 ---------- */
  var bannerAt = 0;
  var bannerTimer = null;

  function pageHome() {
    var v = $('#view');
    v.innerHTML = '';

    var head = el('div', 'head');
    head.appendChild(el('span', 'head__name', esc((D.site || {}).stage || '')));
    var seg = el('div', 'seg');
    ['전체', '봄', '여름', '가을', '겨울'].forEach(function (t, i) {
      var b = el('button', i === 0 ? 'is-on' : '', t);
      b.type = 'button';
      b.onclick = function () {
        $$('button', seg).forEach(function (x) { x.classList.remove('is-on'); });
        b.classList.add('is-on');
      };
      seg.appendChild(b);
    });
    head.appendChild(seg);
    v.appendChild(head);

    var banners = D.banners || [];
    var ban = el('div', 'banner');
    function drawBanner() {
      var b = banners[bannerAt] || {};
      ban.style.cssText = bgImg(b.image);
      ban.innerHTML =
        '<div><p class="banner__tag">' + esc(b.tag) + '</p>' +
        '<p class="banner__title">' + esc(b.title) + '</p>' +
        '<p class="banner__note">' + esc(b.note) + '</p></div>';
      if (banners.length > 1) {
        var prev = el('button', 'banner__nav banner__nav--prev', '‹');
        var next = el('button', 'banner__nav banner__nav--next', '›');
        prev.type = next.type = 'button';
        prev.setAttribute('aria-label', '이전 배너');
        next.setAttribute('aria-label', '다음 배너');
        prev.onclick = function () { bannerAt = (bannerAt - 1 + banners.length) % banners.length; drawBanner(); };
        next.onclick = function () { bannerAt = (bannerAt + 1) % banners.length; drawBanner(); };
        ban.appendChild(prev); ban.appendChild(next);
        var dots = el('div', 'banner__dots');
        banners.forEach(function (_, i) { dots.appendChild(el('i', i === bannerAt ? 'is-on' : '')); });
        ban.appendChild(dots);
      }
    }
    drawBanner();
    v.appendChild(ban);

    if (bannerTimer) { clearInterval(bannerTimer); bannerTimer = null; }
    var secs = ((D.theme || {}).bannerSeconds) || 0;
    if (secs > 0 && banners.length > 1) {
      bannerTimer = setInterval(function () {
        if (!document.body.contains(ban)) { clearInterval(bannerTimer); return; }
        bannerAt = (bannerAt + 1) % banners.length;
        drawBanner();
      }, secs * 1000);
    }

    var sec = el('div');
    var lab = el('p', 'sect__label', '<span>공연 중</span>');
    var more = el('button', 'sect__more', '전체보기');
    more.type = 'button';
    more.onclick = openShows;
    lab.appendChild(more);
    sec.appendChild(lab);
    var grid = el('div', 'posters');
    (D.shows || []).forEach(function (s) {
      var c = el('div', 'poster');
      var im = el('div', 'poster__img');
      if (s.image) im.style.cssText = bgImg(s.image);
      c.appendChild(im);
      c.appendChild(el('p', 'poster__t', esc(s.title)));
      c.appendChild(el('p', 'poster__n', esc(s.note)));
      grid.appendChild(c);
    });
    sec.appendChild(grid);
    v.appendChild(sec);

    var w = el('div', 'widgets');

    var w1 = el('div', 'widget');
    w1.appendChild(el('div', 'widget__head',
      '<span class="label">NUMBERS</span><span class="sect__more">전체보기</span>'));
    (D.numbers || []).forEach(function (n, i) {
      var r = el('div', 'row' + (i === Player.index ? ' is-on' : ''));
      r.appendChild(el('span', 'row__no', i === Player.index ? '▶' : ('0' + (i + 1)).slice(-2)));
      r.appendChild(el('span', 'row__t', esc(n.title)));
      r.appendChild(el('span', 'row__x', esc(n.length)));
      r.style.cursor = 'pointer';
      r.onclick = function () { Player.play(i); pageHome(); };
      w1.appendChild(r);
    });
    w.appendChild(w1);

    var w2 = el('div', 'widget');
    w2.appendChild(el('div', 'widget__head',
      '<span class="label">UPCOMING</span><span class="row__x">' + today.getFullYear() + '</span>'));
    (D.anniversaries || [])
      .map(function (a) { return { label: a.label, date: a.date, d: daysUntil(a.date) }; })
      .sort(function (a, b) { return a.d - b.d; })
      .forEach(function (a, i) {
        var r = el('div', 'row' + (i === 0 ? ' is-near' : ''));
        r.appendChild(el('span', 'row__dot'));
        r.appendChild(el('span', 'row__t', esc(a.label)));
        r.appendChild(el('span', 'row__x', esc(a.date.replace('-', '.'))));
        r.appendChild(el('span', 'row__d', a.d === 0 ? 'D-DAY' : 'D-' + a.d));
        w2.appendChild(r);
      });
    w.appendChild(w2);

    v.appendChild(w);
  }


  /* ---------- 공연 전체보기 ---------- */
  function openShows() {
    var box = $('#shows');
    var grid = $('#showsGrid');
    grid.innerHTML = '';
    (D.shows || []).forEach(function (s) {
      var c = el('div', 'showcard');
      var im = el('div', 'showcard__img');
      if (s.image) im.style.cssText = bgImg(s.image);
      else im.textContent = '포스터';
      c.appendChild(im);
      c.appendChild(el('p', 'showcard__t', esc(s.title)));
      c.appendChild(el('p', 'showcard__n', esc(s.note)));
      grid.appendChild(c);
    });
    box.hidden = false;
  }

  /* ---------- 캘린더 ---------- */
  var calMonth = null;

  function pageCalendar() {
    var v = $('#view');
    v.innerHTML = '';

    if (!calMonth) {
      var st = (D.calendarStart || '').split('-');
      calMonth = st.length === 2 ? new Date(+st[0], +st[1] - 1, 1)
        : new Date(today.getFullYear(), today.getMonth(), 1);
    }

    var head = el('div', 'cal__head');
    var prev = el('button', 'iconbtn', '‹'), next = el('button', 'iconbtn', '›');
    prev.type = next.type = 'button';
    prev.setAttribute('aria-label', '이전 달'); next.setAttribute('aria-label', '다음 달');
    prev.onclick = function () { calMonth.setMonth(calMonth.getMonth() - 1); pageCalendar(); };
    next.onclick = function () { calMonth.setMonth(calMonth.getMonth() + 1); pageCalendar(); };
    head.appendChild(prev);
    head.appendChild(el('span', 'cal__month',
      calMonth.getFullYear() + ' · ' + ('0' + (calMonth.getMonth() + 1)).slice(-2)));
    head.appendChild(next);

    var y = calMonth.getFullYear(), m = calMonth.getMonth();
    var keys = Object.keys(D.days || {}).filter(function (k) {
      return k.indexOf(y + '-' + ('0' + (m + 1)).slice(-2)) === 0;
    });
    head.appendChild(el('span', 'cal__count', '기록 ' + keys.length + '개'));
    v.appendChild(head);

    var dows = el('div', 'cal__dows');
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(function (d) { dows.appendChild(el('span', null, d)); });
    v.appendChild(dows);

    var grid = el('div', 'cal__grid');
    var first = new Date(y, m, 1).getDay();
    var last = new Date(y, m + 1, 0).getDate();
    var prevLast = new Date(y, m, 0).getDate();

    for (var i = 0; i < first; i++) {
      grid.appendChild(el('div', 'cell cell--out',
        '<span class="cell__n">' + (prevLast - first + i + 1) + '</span>'));
    }
    for (var d = 1; d <= last; d++) {
      var key = y + '-' + ('0' + (m + 1)).slice(-2) + '-' + ('0' + d).slice(-2);
      var rec = (D.days || {})[key];
      var cls = 'cell';
      if (rec) cls += ' cell--has';
      if (rec && (rec.tags || []).indexOf('기념일') > -1) cls += ' cell--tag';
      var c = el('div', cls);
      if (rec && rec.image) c.style.cssText = bgImg(rec.image);
      c.appendChild(el('span', 'cell__n', String(d)));
      if (rec) {
        var mark = (rec.tags && rec.tags[0]) ? rec.tags[0] : '사진';
        c.appendChild(el('span', 'cell__mark', esc(mark)));
        c.setAttribute('role', 'button');
        c.setAttribute('tabindex', '0');
        (function (k) {
          c.onclick = function () { Lightbox.open(k); };
          c.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); Lightbox.open(k); } };
        })(key);
      }
      grid.appendChild(c);
    }
    var rest = (7 - ((first + last) % 7)) % 7;
    for (var j = 1; j <= rest; j++) {
      grid.appendChild(el('div', 'cell cell--out', '<span class="cell__n">' + j + '</span>'));
    }
    v.appendChild(grid);
  }

  /* ---------- 캐스트 ---------- */
  function pageCast() {
    var v = $('#view');
    v.innerHTML = '';
    v.appendChild(el('span', 'label', 'CAST'));
    var wrap = el('div', 'cast');
    (D.cast || []).forEach(function (c) {
      var card = el('a', 'castcard');
      card.href = c.link || '#';
      card.style.cssText = bgImg(c.image);
      card.setAttribute('aria-label', c.name + ' 프로필 보기');
      if (!c.image) card.appendChild(el('span', 'castcard__ph', '사진'));
      card.appendChild(el('span', 'castcard__scrim'));
      var t = el('div', 'castcard__text');
      t.appendChild(el('div', 'castcard__name',
        '<b>' + esc(c.name) + '</b><span>' + esc(c.role) + '</span>'));
      t.appendChild(el('span', 'castcard__more', '프로필 보기 ↗'));
      card.appendChild(t);
      wrap.appendChild(card);
    });
    v.appendChild(wrap);
  }

  /* ---------- 예매 ---------- */
  var pick = { date: null, time: null, seats: [] };

  function pageBooking() {
    var v = $('#view');
    v.innerHTML = '';
    var b = D.booking || {}, dates = b.dates || [], times = b.times || [];
    if (pick.date == null) pick.date = dates.length - 1;
    if (pick.time == null) {
      pick.time = 0;
      times.forEach(function (t, i) { if (t.left > 0 && pick.time === 0) pick.time = i; });
    }

    var head = el('div', 'head');
    head.appendChild(el('span', 'label', 'BOOKING'));
    head.appendChild(el('span', 'row__x', esc((D.site || {}).hall)));
    v.appendChild(head);

    var dc = el('div', 'chips');
    dates.forEach(function (d, i) {
      var c = el('button', 'chip' + (i === pick.date ? ' is-on' : ''), esc(d));
      c.type = 'button';
      c.onclick = function () { pick.date = i; pick.seats = []; pageBooking(); };
      dc.appendChild(c);
    });
    v.appendChild(dc);

    var tc = el('div', 'chips');
    times.forEach(function (t, i) {
      var out = !t.left;
      var c = el('button',
        'chip chip--time' + (i === pick.time && !out ? ' is-on' : '') + (out ? ' chip--soldout' : ''),
        esc(t.time) + ' · ' + (out ? '매진' : t.left));
      c.type = 'button';
      if (!out) c.onclick = function () { pick.time = i; pick.seats = []; pageBooking(); };
      tc.appendChild(c);
    });
    v.appendChild(tc);

    v.appendChild(buildHall());

    var bar = el('div', 'pickbar');
    bar.id = 'pickbar';
    if (!pick.seats.length) bar.hidden = true;
    var names = pick.seats.join(' · ');
    var t = times[pick.time] || {};
    bar.innerHTML =
      '<div class="pickbar__t"><b>' + (names || '좌석을 선택하세요') + '</b>' +
      '<span>' + esc(dates[pick.date] || '') + ' ' + esc(t.time || '') +
      ' · ' + pick.seats.length + '매</span></div>';
    var go = el('button', 'pickbar__go', '예매하러 가기 →');
    go.type = 'button';
    bar.appendChild(go);
    v.appendChild(bar);

    var links = el('div', 'links');
    (D.links || []).forEach(function (l) {
      var a = el('a', null, esc(l.label));
      a.href = l.url || '#';
      if (a.href.indexOf('#') !== 0) { a.target = '_blank'; a.rel = 'noopener'; }
      links.appendChild(a);
    });
    v.appendChild(links);
  }

  function buildHall() {
    var seats = (D.booking || {}).seats || {};
    var rows = Object.keys(seats);
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 300 ' + (52 + rows.length * 22 + 14));
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', '좌석 배치도');

    function add(tag, attrs, text) {
      var n = document.createElementNS(NS, tag);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      if (text != null) n.textContent = text;
      svg.appendChild(n);
      return n;
    }

    var h = 52 + rows.length * 22 + 6;
    add('rect', { x: 18, y: 8, width: 264, height: h, rx: 12, fill: 'rgba(255,255,255,.45)', stroke: 'rgba(23,52,4,.16)', 'stroke-width': 1.2 });
    var th = (D.theme || {}).colors || {};
    add('path', { d: 'M 58 46 Q 150 16 242 46 L 242 34 Q 150 4 58 34 Z', fill: rgba(th.leaf || '#c0dd97', .55), stroke: rgba(th.moss || '#639922', .35), 'stroke-width': .8 });
    add('text', { x: 150, y: 30, 'text-anchor': 'middle', 'font-size': 9, 'letter-spacing': 3, fill: 'rgba(39,80,10,.75)' }, 'STAGE');
    add('path', { d: 'M 18 76 L 10 84 L 18 92 Z', fill: 'rgba(23,52,4,.18)' });
    add('path', { d: 'M 282 76 L 290 84 L 282 92 Z', fill: 'rgba(23,52,4,.18)' });

    var dip = [6, 3, 1, 0, 0, 1, 3, 6];
    rows.forEach(function (rowName, ri) {
      var base = 70 + ri * 22;
      add('text', { x: 58, y: base + 10, 'text-anchor': 'middle', 'font-size': 8, fill: 'rgba(23,52,4,.35)' }, rowName);
      add('text', { x: 242, y: base + 10, 'text-anchor': 'middle', 'font-size': 8, fill: 'rgba(23,52,4,.35)' }, rowName);
      var line = seats[rowName] || '';
      for (var i = 0; i < 8; i++) {
        var open = line.charAt(i) !== 'x';
        var id = rowName + (i + 1);
        var on = pick.seats.indexOf(id) > -1;
        var tc = (D.theme || {}).colors || {};
        var fill = !open ? rgba(tc.ink || '#17340a', .12)
          : on ? shade(tc.amber || '#fac775', -60)
          : (ri < 2 ? (tc.amber || '#fac775') : (tc.leaf || '#c0dd97'));
        var r = add('rect', {
          x: 70 + i * 20, y: base - 6 + dip[i], width: 16, height: 12, rx: 2,
          fill: fill, class: 'seat' + (open ? '' : ' seat--x')
        });
        if (open) {
          r.setAttribute('tabindex', '0');
          r.setAttribute('role', 'button');
          r.setAttribute('aria-label', id + '번 좌석');
          (function (sid) {
            var toggle = function () {
              var at = pick.seats.indexOf(sid);
              if (at > -1) pick.seats.splice(at, 1); else pick.seats.push(sid);
              pageBooking();
            };
            r.addEventListener('click', toggle);
            r.addEventListener('keydown', function (e) {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
            });
          })(id);
        }
      }
    });

    var box = el('div', 'hall');
    box.appendChild(svg);
    var wrap = el('div');
    wrap.style.cssText = 'flex:0 0 auto;display:flex;flex-direction:column;gap:8px';
    wrap.appendChild(box);
    var tcl = (D.theme || {}).colors || {};
    var lg = el('div', 'legend',
      '<span><i style="background:' + (tcl.amber || '#fac775') + '"></i>R석</span>' +
      '<span><i style="background:' + (tcl.leaf || '#c0dd97') + '"></i>S석</span>' +
      '<span><i style="background:' + shade(tcl.amber || '#fac775', -60) + '"></i>선택</span>' +
      '<span><i style="background:' + rgba(tcl.ink || '#17340a', .12) + '"></i>매진</span>');
    wrap.appendChild(lg);
    return wrap;
  }

  /* ---------- 사진 확대 ---------- */
  var Lightbox = {
    keys: [], at: 0,
    open: function (key) {
      this.keys = Object.keys(D.days || {}).sort();
      this.at = Math.max(0, this.keys.indexOf(key));
      $('#lightbox').hidden = false;
      this.draw();
      $('#lightboxClose').focus();
    },
    close: function () { $('#lightbox').hidden = true; },
    step: function (n) {
      this.at = (this.at + n + this.keys.length) % this.keys.length;
      this.draw();
    },
    draw: function () {
      var key = this.keys[this.at];
      var r = (D.days || {})[key] || {};
      var img = $('#lbImg');
      img.style.cssText = bgImg(r.image);
      img.textContent = r.image ? '' : '사진';

      var tagCls = ['tag--a', 'tag--b', 'tag--c'];
      var tags = (r.tags || []).map(function (t, i) {
        return '<span class="tag ' + tagCls[i % 3] + '">' + esc(t) + '</span>';
      }).join('');

      var rows = '';
      if (r.artist) rows += '<div><dt>ARTIST</dt><dd>' + esc(r.artist) + '</dd></div>';
      if (r.type) rows += '<div><dt>TYPE</dt><dd>' + esc(r.type) + '</dd></div>';

      $('#lbInfo').innerHTML =
        '<div><p class="lightbox__date">' + esc(key.replace(/-/g, '.')) + '</p>' +
        (tags ? '<div class="lightbox__tags">' + tags + '</div>' : '<div style="height:6px"></div>') +
        (rows ? '<dl class="lightbox__rows">' + rows + '</dl>' : '') + '</div>' +
        (r.note ? '<p class="lightbox__note">' + esc(r.note) + '</p>' : '');
    }
  };

  /* ---------- 음악 ---------- */
  var Player = {
    index: 0, playing: false, audio: null,
    init: function () {
      this.audio = $('#audio');
      var self = this;
      this.audio.addEventListener('timeupdate', function () { self.tick(); });
      this.audio.addEventListener('ended', function () { self.step(1); });
      $('#playBtn').onclick = function () { self.toggle(); };
      $('#prevBtn').onclick = function () { self.step(-1); };
      $('#nextBtn').onclick = function () { self.step(1); };
      $('#playerClose').onclick = function () { self.panel(false); };
      $('#musicFab').onclick = function () { self.panel($('#player').hidden); };
      $('#playerTrack').onclick = function (e) {
        if (!self.audio.duration) return;
        var b = this.getBoundingClientRect();
        self.audio.currentTime = ((e.clientX - b.left) / b.width) * self.audio.duration;
      };
      this.label();
    },
    panel: function (show) {
      $('#player').hidden = !show;
      $('#musicFab').classList.toggle('is-on', !!show);
    },
    track: function () { return (D.numbers || [])[this.index] || {}; },
    play: function (i) {
      if (i != null) this.index = i;
      var t = this.track();
      if (!t.file) { this.playing = false; this.label(); return; }
      if (this.audio.getAttribute('src') !== t.file) this.audio.src = t.file;
      var p = this.audio.play();
      if (p && p.catch) p.catch(function () { });
      this.playing = true;
      this.label();
    },
    toggle: function () {
      if (this.playing) { this.audio.pause(); this.playing = false; this.label(); }
      else { this.play(); }
    },
    step: function (n) {
      var len = (D.numbers || []).length || 1;
      this.index = (this.index + n + len) % len;
      this.play();
      if (current === 'home') pageHome();
    },
    tick: function () {
      var a = this.audio;
      if (!a.duration) return;
      $('#playerFill').style.width = (a.currentTime / a.duration * 100) + '%';
      $('#playerCur').textContent = fmt(a.currentTime);
      $('#playerDur').textContent = fmt(a.duration);
      var x = $('#sideNowX');
      if (x) x.textContent = fmt(a.currentTime) + ' / ' + fmt(a.duration);
    },
    label: function () {
      var t = this.track();
      $('#playerTitle').textContent = t.title || '—';
      $('#playerMeta').textContent = (D.site || {}).title || '';
      $('#playIcon').textContent = this.playing ? '❚❚' : '▶';
      var n = $('#sideNowT');
      if (n) n.textContent = t.title || '—';
      var x = $('#sideNowX');
      if (x && !this.audio.duration) x.textContent = t.length || '';
    }
  };
  function fmt(s) {
    s = Math.floor(s || 0);
    return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2);
  }

  /* ---------- 대화 ---------- */
  var Talk = {
    unread: 0,
    init: function () {
      var self = this;
      $('#talkFab').onclick = function () { self.open(); };
      $('#talkClose').onclick = function () { $('#talk').hidden = true; };
      $('#talkForm').onsubmit = function (e) { e.preventDefault(); self.send(); };
      this.reset();
    },
    reset: function () {
      var sets = D.dialogues || [];
      var set = sets[Math.floor(Math.random() * sets.length)] || [];
      var log = $('#talkLog');
      log.innerHTML = '';
      log.appendChild(el('p', 'bub--me', '오늘의 대화'));
      set.forEach(function (line) { Talk.push(line.who, line.text); });
    },
    open: function () {
      $('#talk').hidden = false;
      this.unread = 0;
      this.badge();
      $('#talkInput').focus();
    },
    push: function (who, text) {
      var log = $('#talkLog');
      var name = who === 'rian' ? ((D.cast || [])[1] || {}).name : ((D.cast || [])[0] || {}).name;
      var b = el('div', 'bub ' + (who === 'rian' ? 'bub--l' : 'bub--r'));
      if (who === 'rian') b.appendChild(el('span', 'bub__who', esc(name || '')));
      b.appendChild(el('div', 'bub__body', esc(text)));
      log.appendChild(b);
      log.scrollTop = log.scrollHeight;
    },
    send: function () {
      var inp = $('#talkInput');
      var text = inp.value.trim();
      if (!text) return;
      inp.value = '';
      var log = $('#talkLog');
      log.appendChild(el('div', 'bub--me', esc(text)));
      log.scrollTop = log.scrollHeight;

      var hit = null;
      (D.replies || []).forEach(function (r) {
        if (hit) return;
        var found = (r.keywords || []).some(function (k) { return text.indexOf(k) > -1; });
        if (found) hit = r;
      });
      var ans = hit || D.fallback || { who: 'maeum', text: '…' };
      setTimeout(function () { Talk.push(ans.who, ans.text); }, 500);
    },
    badge: function () {
      var fab = $('#talkFab');
      var old = fab.querySelector('.badge');
      if (old) old.remove();
      if (this.unread > 0) {
        var b = el('span', 'badge', String(this.unread));
        fab.appendChild(b);
      }
    }
  };

  /* ---------- 알림 ---------- */
  var Notice = {
    timer: null,
    start: function () {
      var n = D.notice || {};
      if (!(n.lines || []).length) return;
      var first = (n.firstAfterSeconds || 20) * 1000;
      var every = (n.everyMinutes || 5) * 60000;
      setTimeout(function () {
        Notice.show();
        Notice.timer = setInterval(function () { Notice.show(); }, every);
      }, first);
    },
    show: function () {
      if (document.hidden) return;
      var n = D.notice || {};
      var line = n.lines[Math.floor(Math.random() * n.lines.length)];
      var cast = D.cast || [];
      var name = line.who === 'rian' ? (cast[1] || {}).name : (cast[0] || {}).name;

      var old = $('#toast');
      if (old) old.remove();

      var t = el('div', 'toast');
      t.id = 'toast';
      t.setAttribute('role', 'status');
      t.innerHTML =
        '<span class="toast__av">' + esc((name || ' ').charAt(0)) + '</span>' +
        '<div class="toast__b"><div class="toast__top"><b>' + esc(name || '') +
        '</b><span>지금</span></div><p>' + esc(line.text) + '</p></div>';
      t.onclick = function () {
        Talk.push(line.who, line.text);
        Talk.open();
        t.remove();
      };
      $('.win').appendChild(t);
      requestAnimationFrame(function () { t.classList.add('is-in'); });

      Talk.push(line.who, line.text);
      if ($('#talk').hidden) { Talk.unread++; Talk.badge(); }

      setTimeout(function () {
        t.classList.remove('is-in');
        setTimeout(function () { if (t.parentNode) t.remove(); }, 300);
      }, (n.staySeconds || 8) * 1000);
    }
  };

  /* ---------- 페이지 전환 ---------- */
  var current = 'home';
  var pages = { home: pageHome, booking: pageBooking, calendar: pageCalendar, cast: pageCast };

  function go(name) {
    current = name;
    (pages[name] || pageHome)();
    $$('[data-go]').forEach(function (b) {
      b.classList.toggle('is-on', b.getAttribute('data-go') === name);
    });
    $('#drawer').hidden = (name === 'booking');
    $('#view').scrollTop = 0;
  }

  /* ---------- 시작 ---------- */
  function boot() {
    applyTheme();
    var s = D.site || {};
    if (s.background) $('#bg').style.cssText = bgImg(s.background);
    if (s.backgroundVideo) {
      var v = $('#bgvid');
      v.src = s.backgroundVideo;
      v.hidden = false;
      v.muted = true;
      var vp = v.play();
      if (vp && vp.catch) vp.catch(function () { v.hidden = true; });
    }
    if (s.title) document.title = s.title;
    $('#urlText').textContent = s.url || '';

    buildGate();
    buildSide();
    buildDrawer();
    Player.init();
    Talk.init();

    $$('[data-go]').forEach(function (b) {
      b.onclick = function () { go(b.getAttribute('data-go')); };
    });

    $('#enterBtn').onclick = function () {
      $('#gate').hidden = true;
      $('#app').hidden = false;
      go('home');
      Player.play(0);
      Notice.start();
      Petals.start();
    };

    $('#showsClose').onclick = function () { $('#shows').hidden = true; };
    $('#shows').addEventListener('click', function (e) {
      if (e.target === this) this.hidden = true;
    });

    $('#lightboxClose').onclick = function () { Lightbox.close(); };
    $('#lbPrev').onclick = function () { Lightbox.step(-1); };
    $('#lbNext').onclick = function () { Lightbox.step(1); };
    $('#lightbox').addEventListener('click', function (e) {
      if (e.target === this) Lightbox.close();
    });
    document.addEventListener('keydown', function (e) {
      if ($('#lightbox').hidden) return;
      if (e.key === 'Escape') Lightbox.close();
      if (e.key === 'ArrowLeft') Lightbox.step(-1);
      if (e.key === 'ArrowRight') Lightbox.step(1);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
