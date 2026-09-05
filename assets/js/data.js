/* =========================================================
   MAMRYA — 내용 파일
   이 파일만 고치면 사이트 내용이 전부 바뀝니다.
   따옴표(' ') 안의 글자만 바꾸세요. 쉼표와 괄호는 그대로 두세요.
   ========================================================= */

var DATA = {

  /* --- 기본 정보 ------------------------------------------------ */
  site: {
    stage: 'ONMAEUM STAGE',                 // 홈 왼쪽 위에 뜨는 사이트 이름
    title: 'MAMRYA',                       // 작품명
    subtitle: 'musical · 맘랸 · 2026',      // 작품명 아래 한 줄
    hall: '온마음홀 1관',                    // 공연장 이름
    url: 'onmaeum-rian.github.io',          // 창 위 주소창에 보일 글자
    background: 'assets/img/background.jpg',// 배경 사진 (없으면 연둣빛 배경)
    poster: 'assets/img/poster.jpg'         // 정보창에 들어갈 자컾 사진
  },

  /* --- 디자인 (관리자 페이지에서 바꿀 수 있습니다) ------------------ */
  theme: {
    font: 'pretendard',   // pretendard / gowun / myeongjo / gaegu
    fontSize: 11.5,       // 기본 글자 크기 (px)
    windowW: 1120,        // 창 최대 가로 (px)
    windowH: 720,         // 창 최대 세로 (px)
    glass: 0.5,           // 창 투명도 (0~1, 낮을수록 배경이 많이 비침)
    colors: {
      wall:  '#c3d6a9',   // 배경색 (배경 사진이 없을 때)
      ink:   '#17340a',   // 글자색
      moss:  '#639922',   // 강조색 (선택된 것, 초록 버튼)
      amber: '#fac775',   // 포인트색 (배너, R석)
      leaf:  '#c0dd97',   // 보조 초록 (S석)
      cream: '#faeeda',   // 포스터 색 1
      mint:  '#eaf3de',   // 포스터 색 2
      butter:'#f7efc9',   // 포스터 색 3
      sky:   '#e8eff5'    // 포스터 색 4
    }
  },

  /* --- 정보창 항목 (원하는 만큼 늘리거나 지울 수 있음) ------------- */
  info: [
    { label: 'GENRE',   value: 'TRAGICOMEDY' },
    { label: 'RELEASE', value: '2026.04.18' },
    { label: 'RATING',  value: '★ 6.66' },
    { label: 'RUNTIME', value: '4H 18M' }
  ],

  /* --- 사귄 날 (D+ 숫자와 N년차가 자동 계산됩니다) ----------------- */
  since: '2023-04-09',   // YYYY-MM-DD

  /* --- 다가오는 날짜 (매년 반복, D-일수 자동 계산) ----------------- */
  anniversaries: [
    { label: '리안 생일', date: '09-30' },   // MM-DD
    { label: '마음 생일', date: '06-21' },
    { label: '첫 여행',   date: '12-04' },
    { label: '기념일',    date: '04-09' }
  ],

  /* --- 대문 티켓 ------------------------------------------------- */
  ticket: {
    date: '2026.09.07 MON',
    time: '19:30',
    seat: 'R석 B4 · B5',
    no:   'NO. 0907 — 2026'
  },

  /* --- 배너 (여러 개 넣으면 좌우 화살표로 넘어갑니다) --------------- */
  banners: [
    { tag: 'D-5 · 2ND OPEN', title: 'MAMRYA', note: '09.07 월 14:00 오픈', image: '' },
    { tag: 'NOW ON STAGE',   title: '여름의 한가운데', note: '~10.12 소극장', image: '' }
  ],

  /* --- 공연 중 (포스터 목록) ------------------------------------- */
  shows: [
    { title: 'MAMRYA',        note: '~09.30',    image: '' },
    { title: '여름의 한가운데', note: '~10.12',    image: '' },
    { title: '다시, 초가을',   note: '11.01 개막', image: '' },
    { title: '겨울의 약속',    note: '12.20 개막', image: '' }
  ],

  /* --- 넘버 (노래) -----------------------------------------------
     file 에 mp3 경로를 넣으면 재생됩니다.
     mp3 는 assets/music/ 폴더에 올리세요. 아직 없으면 '' 로 두세요. */
  numbers: [
    { title: '개강 첫날',       length: '3:24', file: '' },
    { title: '벚꽃이 지기 전에', length: '4:02', file: '' },
    { title: '열람실 창가',     length: '2:58', file: '' },
    { title: '여름의 한가운데',  length: '3:47', file: '' },
    { title: '다시, 초가을',    length: '3:12', file: '' }
  ],

  /* --- 캐스트 ---------------------------------------------------- */
  cast: [
    { name: '온마음', role: 'as Milo',  image: '', link: '#' },
    { name: '김리안', role: 'as River', image: '', link: '#' }
  ],

  /* --- 캘린더에 표시할 첫 달 ------------------------------------- */
  calendarStart: '2026-04',

  /* --- 캘린더 사진 ------------------------------------------------
     날짜: { image: 사진경로, tags: [태그들], artist: 그린이, type: 종류, note: 한 줄 }
     사진은 assets/img/ 폴더에 올리고 경로를 적으세요. */
  days: {
    '2026-04-09': { image: '', tags: ['기념일'],          artist: '',        type: '',      note: '3주년.' },
    '2026-04-14': { image: '', tags: ['봄'],              artist: '@artist', type: '커미션', note: '' },
    '2026-04-16': { image: '', tags: ['봄'],              artist: '',        type: '',      note: '' },
    '2026-04-17': { image: '', tags: ['봄'],              artist: '@artist', type: '커미션', note: '' },
    '2026-04-18': { image: '', tags: ['기념일', '커미션'], artist: '@artist', type: '커미션', note: '3주년 기념 커미션.' },
    '2026-04-19': { image: '', tags: ['봄'],              artist: '',        type: '',      note: '' },
    '2026-04-21': { image: '', tags: ['봄'],              artist: '',        type: '',      note: '' },
    '2026-04-24': { image: '', tags: ['봄'],              artist: '@artist', type: '커미션', note: '' }
  },

  /* --- 예매창 ----------------------------------------------------- */
  booking: {
    dates: ['03.02', '03.04', '04.18', '05.17', '09.07'],  // 마지막이 기본 선택
    times: [
      { time: '15:00', left: 12 },
      { time: '19:30', left: 9 },
      { time: '22:00', left: 0 }   // 0 이면 매진으로 표시
    ],
    /* 좌석표: A~D열 각 8석.
       o = 예매 가능 / x = 매진 / 앞 두 줄은 R석, 뒤 두 줄은 S석 */
    seats: {
      A: 'ooxoooxo',
      B: 'oooooooo',
      C: 'oxoooooo',
      D: 'ooooxooo'
    }
  },

  /* --- 바깥으로 나가는 링크 --------------------------------------- */
  links: [
    { label: '트위터',   url: '#', icon: 'x' },
    { label: '티스토리', url: '#', icon: 'note' },
    { label: '관람 안내', url: '#', icon: 'info' }
  ],

  /* --- 두 사람의 대화 ---------------------------------------------
     방문할 때마다 아래 세트 중 하나가 무작위로 뜹니다.
     who 는 'rian'(왼쪽) 또는 'maeum'(오른쪽) 입니다. */
  dialogues: [
    [
      { who: 'rian',  text: '오늘 몇 시에 끝나?' },
      { who: 'maeum', text: '여섯 시쯤. 데리러 올 거야?' },
      { who: 'rian',  text: '응, 정문에서 기다릴게' }
    ],
    [
      { who: 'maeum', text: '비 온대. 우산 챙겼어?' },
      { who: 'rian',  text: '깜빡했어' },
      { who: 'maeum', text: '그럴 줄 알았어. 하나 더 가져갈게' }
    ],
    [
      { who: 'rian',  text: '도서관 자리 맡아놨어' },
      { who: 'maeum', text: '창가 쪽?' },
      { who: 'rian',  text: '당연하지' }
    ]
  ],

  /* --- 말을 걸었을 때의 답 -----------------------------------------
     keywords 중 하나라도 들어 있으면 그 답이 나옵니다.
     위에 있는 것부터 먼저 확인합니다. */
  replies: [
    { keywords: ['밥', '식사', '먹'],      who: 'maeum', text: '아직. 같이 먹을래?' },
    { keywords: ['생일'],                  who: 'rian',  text: '9월 30일이야. 기억해줘.' },
    { keywords: ['안녕', '하이', '반가'],  who: 'maeum', text: '어, 왔네. 오늘 뭐 했어?' },
    { keywords: ['사랑', '좋아'],          who: 'rian',  text: '갑자기 그런 말 하지 마…' },
    { keywords: ['어디'],                  who: 'maeum', text: '지금 학교. 곧 끝나.' }
  ],

  /* --- 등록되지 않은 말에 대한 기본 답 ----------------------------- */
  fallback: { who: 'maeum', text: '음, 무슨 말인지 잘 모르겠어.' },

  /* --- 알림 ---------------------------------------------------------
     아래 대사 중 하나가 정해진 시간마다 알림처럼 떴다가 사라집니다.
     everyMinutes : 몇 분마다 뜰지 (5 = 5분)
     firstAfterSeconds : 들어온 뒤 몇 초 뒤에 첫 알림을 띄울지
     staySeconds : 알림이 몇 초 동안 떠 있을지 */
  notice: {
    everyMinutes: 5,
    firstAfterSeconds: 20,
    staySeconds: 8,
    lines: [
      { who: 'rian',  text: '도서관 자리 맡아놨어' },
      { who: 'maeum', text: '오늘 강의 세 개, 살려줘' },
      { who: 'rian',  text: '창가 자리 비었더라' },
      { who: 'maeum', text: '끝나고 뭐 먹을까?' },
      { who: 'rian',  text: '우산 챙겨. 비 온대' },
      { who: 'maeum', text: '벌써 벚꽃 다 졌네' },
      { who: 'rian',  text: '나 먼저 가 있을게' },
      { who: 'maeum', text: '오늘도 늦잠 잤지' }
    ]
  }
};
