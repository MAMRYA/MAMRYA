/* =========================================================
   MAMRYA — 관리자 페이지 동작
   ========================================================= */
(function () {
  'use strict';

  var D = JSON.parse(JSON.stringify(typeof DATA !== 'undefined' ? DATA : {}));
  var root = document.getElementById('form');

  function el(t, c, h) {
    var n = document.createElement(t);
    if (c) n.className = c;
    if (h != null) n.innerHTML = h;
    return n;
  }
  function field(label, value, onInput, type) {
    var w = el('div');
    w.appendChild(el('label', null, label));
    var i = document.createElement(type === 'area' ? 'textarea' : 'input');
    i.value = value == null ? '' : value;
    if (type === 'number') i.type = 'number';
    i.addEventListener('input', function () { onInput(i.value); });
    w.appendChild(i);
    return w;
  }
  function card(title, hint) {
    var c = el('div', 'card');
    c.appendChild(el('h2', null, title));
    if (hint) c.appendChild(el('p', 'hint', hint));
    root.appendChild(c);
    return c;
  }
  function grid(parent, cls) {
    var g = el('div', 'grid ' + (cls || ''));
    parent.appendChild(g);
    return g;
  }

  /* 반복 항목 편집기 */
  function list(parent, arr, cols, make, blank, labelFn) {
    var box = el('div');
    parent.appendChild(box);

    function draw() {
      box.innerHTML = '';
      arr.forEach(function (item, i) {
        var r = el('div', 'rowbox');
        var top = el('div', 'rowtop');
        top.appendChild(el('span', 'rownum', labelFn ? labelFn(item, i) : (i + 1) + '번'));
        var del = el('button', 'btn btn--del', '삭제');
        del.type = 'button';
        del.onclick = function () { arr.splice(i, 1); draw(); };
        top.appendChild(del);
        r.appendChild(top);
        var g = el('div', 'grid ' + cols);
        make(g, item);
        r.appendChild(g);
        box.appendChild(r);
      });
      var add = el('button', 'btn btn--add', '+ 추가');
      add.type = 'button';
      add.onclick = function () { arr.push(JSON.parse(JSON.stringify(blank))); draw(); };
      box.appendChild(add);
    }
    draw();
  }

  /* ---------- 화면 구성 ---------- */
  function build() {
    root.innerHTML = '';

    // 기본 정보
    var c1 = card('기본 정보', '사이트 맨 위와 정보창에 쓰이는 내용입니다.');
    var g1 = grid(c1, 'g2');
    g1.appendChild(field('작품명', D.site.title, function (v) { D.site.title = v; }));
    g1.appendChild(field('작품명 아래 한 줄', D.site.subtitle, function (v) { D.site.subtitle = v; }));
    g1.appendChild(field('공연장', D.site.hall, function (v) { D.site.hall = v; }));
    g1.appendChild(field('주소창에 보일 글자', D.site.url, function (v) { D.site.url = v; }));
    g1.appendChild(field('배경 사진 경로', D.site.background, function (v) { D.site.background = v; }));
    g1.appendChild(field('자컾 사진 경로', D.site.poster, function (v) { D.site.poster = v; }));

    // 정보창 항목
    var c2 = card('정보창 항목', 'GENRE, RELEASE 처럼 정보창에 줄줄이 뜨는 항목입니다.');
    list(c2, D.info, 'g2', function (g, it) {
      g.appendChild(field('왼쪽 이름', it.label, function (v) { it.label = v; }));
      g.appendChild(field('오른쪽 값', it.value, function (v) { it.value = v; }));
    }, { label: '', value: '' }, function (it) { return it.label || '새 항목'; });

    // 사귄 날
    var c3 = card('사귄 날', 'D+숫자와 N년차가 이 날짜를 기준으로 매일 자동 계산됩니다.');
    var g3 = grid(c3, 'g2');
    g3.appendChild(field('날짜 (2023-04-09 형식)', D.since, function (v) { D.since = v; }));

    // 기념일
    var c4 = card('다가오는 날짜', '매년 반복됩니다. 월-일만 적으세요. (09-30)');
    list(c4, D.anniversaries, 'g2', function (g, it) {
      g.appendChild(field('이름', it.label, function (v) { it.label = v; }));
      g.appendChild(field('날짜 (MM-DD)', it.date, function (v) { it.date = v; }));
    }, { label: '', date: '' }, function (it) { return it.label || '새 기념일'; });

    // 티켓
    var c5 = card('대문 티켓', '들어올 때 보이는 티켓에 적히는 내용입니다.');
    var g5 = grid(c5, 'g4');
    g5.appendChild(field('날짜', D.ticket.date, function (v) { D.ticket.date = v; }));
    g5.appendChild(field('시간', D.ticket.time, function (v) { D.ticket.time = v; }));
    g5.appendChild(field('좌석', D.ticket.seat, function (v) { D.ticket.seat = v; }));
    g5.appendChild(field('티켓 번호', D.ticket.no, function (v) { D.ticket.no = v; }));

    // 배너
    var c6 = card('홈 배너', '두 개 이상 넣으면 좌우 화살표로 넘어갑니다.');
    list(c6, D.banners, 'g2', function (g, it) {
      g.appendChild(field('작은 글씨', it.tag, function (v) { it.tag = v; }));
      g.appendChild(field('제목', it.title, function (v) { it.title = v; }));
      g.appendChild(field('아래 한 줄', it.note, function (v) { it.note = v; }));
      g.appendChild(field('사진 경로', it.image, function (v) { it.image = v; }));
    }, { tag: '', title: '', note: '', image: '' }, function (it) { return it.title || '새 배너'; });

    // 공연 중
    var c7 = card('공연 중 포스터', '홈에 세로로 뜨는 포스터입니다.');
    list(c7, D.shows, 'g3', function (g, it) {
      g.appendChild(field('제목', it.title, function (v) { it.title = v; }));
      g.appendChild(field('아래 한 줄', it.note, function (v) { it.note = v; }));
      g.appendChild(field('사진 경로', it.image, function (v) { it.image = v; }));
    }, { title: '', note: '', image: '' }, function (it) { return it.title || '새 포스터'; });

    // 넘버
    var c8 = card('넘버 (노래)', 'mp3를 assets/music 폴더에 올린 뒤 경로를 적으면 재생됩니다.');
    list(c8, D.numbers, 'g3', function (g, it) {
      g.appendChild(field('곡 제목', it.title, function (v) { it.title = v; }));
      g.appendChild(field('길이 (3:24)', it.length, function (v) { it.length = v; }));
      g.appendChild(field('mp3 경로', it.file, function (v) { it.file = v; }));
    }, { title: '', length: '', file: '' }, function (it) { return it.title || '새 곡'; });

    // 캐스트
    var c9 = card('캐스트', '두 사람의 사진과 프로필 링크입니다.');
    list(c9, D.cast, 'g4', function (g, it) {
      g.appendChild(field('이름', it.name, function (v) { it.name = v; }));
      g.appendChild(field('배역 (as Milo)', it.role, function (v) { it.role = v; }));
      g.appendChild(field('사진 경로', it.image, function (v) { it.image = v; }));
      g.appendChild(field('프로필 링크', it.link, function (v) { it.link = v; }));
    }, { name: '', role: '', image: '', link: '#' }, function (it) { return it.name || '새 인물'; });

    // 캘린더
    var c10 = card('캘린더 기록', '날짜를 누르면 사진이 크게 뜹니다. 태그는 쉼표로 구분하세요.');
    var g10 = grid(c10, 'g2');
    g10.appendChild(field('처음 열릴 달 (2026-04)', D.calendarStart, function (v) { D.calendarStart = v; }));

    var dayArr = Object.keys(D.days || {}).sort().map(function (k) {
      var v = D.days[k];
      return { date: k, image: v.image, tags: (v.tags || []).join(', '), artist: v.artist, type: v.type, note: v.note };
    });
    list(c10, dayArr, 'g3', function (g, it) {
      g.appendChild(field('날짜 (2026-04-18)', it.date, function (v) { it.date = v; }));
      g.appendChild(field('사진 경로', it.image, function (v) { it.image = v; }));
      g.appendChild(field('태그 (기념일, 커미션)', it.tags, function (v) { it.tags = v; }));
      g.appendChild(field('그린 사람', it.artist, function (v) { it.artist = v; }));
      g.appendChild(field('종류', it.type, function (v) { it.type = v; }));
      g.appendChild(field('한 줄 설명', it.note, function (v) { it.note = v; }));
    }, { date: '', image: '', tags: '', artist: '', type: '', note: '' },
      function (it) { return it.date || '새 기록'; });
    D.__days = dayArr;

    // 예매
    var c11 = card('예매', '좌석은 o 가 예매 가능, x 가 매진입니다. 한 줄에 8글자.');
    var g11 = grid(c11, 'g2');
    g11.appendChild(field('날짜 목록 (쉼표로 구분)', (D.booking.dates || []).join(', '),
      function (v) { D.booking.dates = v.split(',').map(function (x) { return x.trim(); }).filter(Boolean); }));
    var g11b = grid(c11, 'g4');
    ['A', 'B', 'C', 'D'].forEach(function (r) {
      g11b.appendChild(field(r + '열 (예: ooxoooxo)', D.booking.seats[r],
        function (v) { D.booking.seats[r] = v.trim(); }));
    });
    c11.appendChild(el('label', null, '회차'));
    list(c11, D.booking.times, 'g2', function (g, it) {
      g.appendChild(field('시간', it.time, function (v) { it.time = v; }));
      g.appendChild(field('잔여석 (0이면 매진)', it.left, function (v) { it.left = Number(v) || 0; }, 'number'));
    }, { time: '', left: 0 }, function (it) { return it.time || '새 회차'; });

    // 링크
    var c12 = card('바깥 링크', '예매창 아래에 뜨는 링크입니다.');
    list(c12, D.links, 'g2', function (g, it) {
      g.appendChild(field('이름', it.label, function (v) { it.label = v; }));
      g.appendChild(field('주소', it.url, function (v) { it.url = v; }));
    }, { label: '', url: '' }, function (it) { return it.label || '새 링크'; });

    // 대화
    var c13 = card('대화 세트', '들어올 때마다 하나가 무작위로 뜹니다. 한 줄에 하나씩, 앞에 이름을 적으세요.');
    var setArr = (D.dialogues || []).map(function (set) {
      return { text: set.map(function (l) { return (l.who === 'rian' ? '리안' : '마음') + ': ' + l.text; }).join('\n') };
    });
    list(c13, setArr, '', function (g, it) {
      g.appendChild(field('대화 (리안: 내용 / 마음: 내용)', it.text, function (v) { it.text = v; }, 'area'));
    }, { text: '리안: \n마음: ' }, function (it, i) { return '세트 ' + (i + 1); });
    D.__sets = setArr;

    // 답변
    var c14 = card('말을 걸었을 때의 답', '적어둔 낱말이 들어오면 그 답이 나갑니다.');
    var repArr = (D.replies || []).map(function (r) {
      return { keywords: (r.keywords || []).join(', '), who: r.who, text: r.text };
    });
    list(c14, repArr, 'g3', function (g, it) {
      g.appendChild(field('낱말 (쉼표로 구분)', it.keywords, function (v) { it.keywords = v; }));
      var w = el('div');
      w.appendChild(el('label', null, '답하는 사람'));
      var sel = document.createElement('select');
      sel.innerHTML = '<option value="maeum">마음</option><option value="rian">리안</option>';
      sel.value = it.who || 'maeum';
      sel.onchange = function () { it.who = sel.value; };
      w.appendChild(sel);
      g.appendChild(w);
      g.appendChild(field('답', it.text, function (v) { it.text = v; }));
    }, { keywords: '', who: 'maeum', text: '' }, function (it) { return it.keywords || '새 답'; });
    D.__reps = repArr;

    var g14 = grid(c14, 'g2');
    g14.appendChild(field('등록 안 된 말에 대한 기본 답', D.fallback.text, function (v) { D.fallback.text = v; }));

    // 알림
    var c15 = card('알림', '정해진 시간마다 대사가 알림처럼 떴다 사라집니다.');
    var g15 = grid(c15, 'g3');
    g15.appendChild(field('몇 분마다', D.notice.everyMinutes, function (v) { D.notice.everyMinutes = Number(v) || 5; }, 'number'));
    g15.appendChild(field('첫 알림까지 (초)', D.notice.firstAfterSeconds, function (v) { D.notice.firstAfterSeconds = Number(v) || 20; }, 'number'));
    g15.appendChild(field('떠 있는 시간 (초)', D.notice.staySeconds, function (v) { D.notice.staySeconds = Number(v) || 8; }, 'number'));
    list(c15, D.notice.lines, 'g3', function (g, it) {
      var w = el('div');
      w.appendChild(el('label', null, '말하는 사람'));
      var sel = document.createElement('select');
      sel.innerHTML = '<option value="maeum">마음</option><option value="rian">리안</option>';
      sel.value = it.who || 'maeum';
      sel.onchange = function () { it.who = sel.value; };
      w.appendChild(sel);
      g.appendChild(w);
      var f = field('대사', it.text, function (v) { it.text = v; });
      f.style.gridColumn = 'span 2';
      g.appendChild(f);
    }, { who: 'maeum', text: '' }, function (it) { return it.text ? it.text.slice(0, 14) : '새 대사'; });
  }

  /* ---------- 저장 ---------- */
  function collect() {
    var out = JSON.parse(JSON.stringify(D));

    var days = {};
    (D.__days || []).forEach(function (d) {
      if (!d.date) return;
      days[d.date] = {
        image: d.image || '',
        tags: (d.tags || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean),
        artist: d.artist || '', type: d.type || '', note: d.note || ''
      };
    });
    out.days = days;

    out.dialogues = (D.__sets || []).map(function (s) {
      return (s.text || '').split('\n').map(function (line) {
        var at = line.indexOf(':');
        if (at < 0) return null;
        var who = line.slice(0, at).trim();
        return { who: (who === '리안' || who === 'rian') ? 'rian' : 'maeum', text: line.slice(at + 1).trim() };
      }).filter(function (x) { return x && x.text; });
    }).filter(function (s) { return s.length; });

    out.replies = (D.__reps || []).map(function (r) {
      return {
        keywords: (r.keywords || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean),
        who: r.who || 'maeum', text: r.text || ''
      };
    }).filter(function (r) { return r.keywords.length && r.text; });

    delete out.__days; delete out.__sets; delete out.__reps;
    return out;
  }

  function toFile(obj) {
    var body = JSON.stringify(obj, null, 2)
      .replace(/"([A-Za-z_][A-Za-z0-9_]*)":/g, '$1:');
    return '/* =========================================================\n' +
      '   MAMRYA — 내용 파일\n' +
      '   관리자 페이지(admin.html)에서 만들어진 파일입니다.\n' +
      '   직접 고쳐도 되고, 관리자 페이지에서 다시 만들어도 됩니다.\n' +
      '   ========================================================= */\n\n' +
      'var DATA = ' + body + ';\n';
  }

  document.getElementById('saveBtn').onclick = function () {
    var text = toFile(collect());
    var blob = new Blob([text], { type: 'text/javascript;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data.js';
    document.body.appendChild(a); a.click(); a.remove();
    document.getElementById('msg').textContent = '내려받았습니다. GitHub의 assets/js 에 덮어쓰세요.';
  };

  document.getElementById('loadBtn').onclick = function () {
    if (!confirm('지금 화면에서 고친 내용이 사라지고, 사이트에 올라간 내용으로 되돌아갑니다. 계속할까요?')) return;
    D = JSON.parse(JSON.stringify(typeof DATA !== 'undefined' ? DATA : {}));
    build();
    document.getElementById('msg').textContent = '';
  };

  build();
})();
