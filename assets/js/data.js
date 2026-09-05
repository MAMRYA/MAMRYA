/* =========================================================
   MAMRYA — 내용 파일
   관리자 페이지(admin.html)에서 만들어진 파일입니다.
   직접 고쳐도 되고, 관리자 페이지에서 다시 만들어도 됩니다.
   ========================================================= */

var DATA = {
  site: {
    stage: "MAMRYA STAGE",
    title: "MAMRYA",
    subtitle: "musical · 맘랸 · 2026",
    hall: "MAMRYA홀 1관",
    url: "onmaeum-rian.github.io",
    background: "assets/img/해바라기 타입.png",
    poster: "assets/img/죠잉님(합본).png"
  },
  theme: {
    font: "pretendard",
    fontSize: 11.5,
    windowW: 1120,
    windowH: 720,
    glass: 0.5,
    colors: {
      wall: "#c3d6a9",
      ink: "#17340a",
      moss: "#639922",
      amber: "#fac775",
      leaf: "#c0dd97",
      cream: "#faeeda",
      mint: "#eaf3de",
      butter: "#f7efc9",
      sky: "#e8eff5"
    }
  },
  info: [
    {
      label: "GENRE",
      value: "TRAGICOMEDY"
    },
    {
      label: "RELEASE",
      value: "2026.04.18"
    },
    {
      label: "RATING",
      value: "★ 6.66"
    },
    {
      label: "RUNTIME",
      value: "4H 18M"
    }
  ],
  since: "2023-09-07",
  anniversaries: [
    {
      label: "리안 생일",
      date: "09-30"
    },
    {
      label: "마음 생일",
      date: "06-21"
    },
    {
      label: "첫 여행",
      date: "12-04"
    },
    {
      label: "기념일",
      date: "04-09"
    }
  ],
  ticket: {
    date: "2026.09.07 MON",
    time: "19:30",
    seat: "R석 B4 · B5",
    no: "NO. 0907 — 2026"
  },
  banners: [
    {
      tag: "D-5 · 2ND OPEN",
      title: "MAMRYA",
      note: "09.07 월 14:00 오픈",
      image: "assets/img/해바라기 헤더.png"
    },
    {
      tag: "NOW ON STAGE",
      title: "여름의 한가운데",
      note: "~10.12 소극장",
      image: "assets/img/GW9p7JXaMAAR2lG.jpeg"
    }
  ],
  shows: [
    {
      title: "MAMRYA",
      note: "~09.30",
      image: "assets/img/GREsDehb0AAkabQ.jpeg"
    },
    {
      title: "여름의 한가운데",
      note: "~10.12",
      image: "assets/img/GXjtysfbIAAZZST.jpeg"
    },
    {
      title: "다시, 초가을",
      note: "11.01 개막",
      image: "assets/img/HEYeR97bgAAzwqt.jpeg"
    },
    {
      title: "겨울의 약속",
      note: "12.20 개막",
      image: "assets/img/IMG_8695.JPG"
    }
  ],
  numbers: [
    {
      title: "개강 첫날",
      length: "3:24",
      file: ""
    },
    {
      title: "벚꽃이 지기 전에",
      length: "4:02",
      file: ""
    },
    {
      title: "열람실 창가",
      length: "2:58",
      file: ""
    },
    {
      title: "여름의 한가운데",
      length: "3:47",
      file: ""
    },
    {
      title: "다시, 초가을",
      length: "3:12",
      file: ""
    }
  ],
  cast: [
    {
      name: "온마음",
      role: "as Milo",
      image: "",
      link: "#"
    },
    {
      name: "김리안",
      role: "as River",
      image: "",
      link: "#"
    }
  ],
  calendarStart: "2026-04",
  days: {
    "2026-04-09": {
      image: "",
      tags: [
        "기념일"
      ],
      artist: "",
      type: "",
      note: "3주년."
    },
    "2026-04-14": {
      image: "",
      tags: [
        "봄"
      ],
      artist: "@artist",
      type: "커미션",
      note: ""
    },
    "2026-04-16": {
      image: "",
      tags: [
        "봄"
      ],
      artist: "",
      type: "",
      note: ""
    },
    "2026-04-17": {
      image: "",
      tags: [
        "봄"
      ],
      artist: "@artist",
      type: "커미션",
      note: ""
    },
    "2026-04-18": {
      image: "",
      tags: [
        "기념일",
        "커미션"
      ],
      artist: "@artist",
      type: "커미션",
      note: "3주년 기념 커미션."
    },
    "2026-04-19": {
      image: "",
      tags: [
        "봄"
      ],
      artist: "",
      type: "",
      note: ""
    },
    "2026-04-21": {
      image: "",
      tags: [
        "봄"
      ],
      artist: "",
      type: "",
      note: ""
    },
    "2026-04-24": {
      image: "",
      tags: [
        "봄"
      ],
      artist: "@artist",
      type: "커미션",
      note: ""
    }
  },
  booking: {
    dates: [
      "03.02",
      "03.04",
      "04.18",
      "05.17",
      "09.07"
    ],
    times: [
      {
        time: "15:00",
        left: 12
      },
      {
        time: "19:30",
        left: 9
      },
      {
        time: "22:00",
        left: 0
      }
    ],
    seats: {
      A: "ooxoooxo",
      B: "oooooooo",
      C: "oxoooooo",
      D: "ooooxooo"
    }
  },
  links: [
    {
      label: "트위터",
      url: "#",
      icon: "x"
    },
    {
      label: "티스토리",
      url: "#",
      icon: "note"
    },
    {
      label: "관람 안내",
      url: "#",
      icon: "info"
    }
  ],
  dialogues: [
    [
      {
        who: "rian",
        text: "오늘 몇 시에 끝나?"
      },
      {
        who: "maeum",
        text: "여섯 시쯤. 데리러 올 거야?"
      },
      {
        who: "rian",
        text: "응, 정문에서 기다릴게"
      }
    ],
    [
      {
        who: "maeum",
        text: "비 온대. 우산 챙겼어?"
      },
      {
        who: "rian",
        text: "깜빡했어"
      },
      {
        who: "maeum",
        text: "그럴 줄 알았어. 하나 더 가져갈게"
      }
    ],
    [
      {
        who: "rian",
        text: "도서관 자리 맡아놨어"
      },
      {
        who: "maeum",
        text: "창가 쪽?"
      },
      {
        who: "rian",
        text: "당연하지"
      }
    ]
  ],
  replies: [
    {
      keywords: [
        "밥",
        "식사",
        "먹"
      ],
      who: "maeum",
      text: "아직. 같이 먹을래?"
    },
    {
      keywords: [
        "생일"
      ],
      who: "rian",
      text: "9월 30일이야. 기억해줘."
    },
    {
      keywords: [
        "안녕",
        "하이",
        "반가"
      ],
      who: "maeum",
      text: "어, 왔네. 오늘 뭐 했어?"
    },
    {
      keywords: [
        "사랑",
        "좋아"
      ],
      who: "rian",
      text: "갑자기 그런 말 하지 마…"
    },
    {
      keywords: [
        "어디"
      ],
      who: "maeum",
      text: "지금 학교. 곧 끝나."
    }
  ],
  fallback: {
    who: "maeum",
    text: "음, 무슨 말인지 잘 모르겠어."
  },
  notice: {
    everyMinutes: 5,
    firstAfterSeconds: 20,
    staySeconds: 8,
    lines: [
      {
        who: "rian",
        text: "도서관 자리 맡아놨어"
      },
      {
        who: "maeum",
        text: "오늘 강의 세 개, 살려줘"
      },
      {
        who: "rian",
        text: "창가 자리 비었더라"
      },
      {
        who: "maeum",
        text: "끝나고 뭐 먹을까?"
      },
      {
        who: "rian",
        text: "우산 챙겨. 비 온대"
      },
      {
        who: "maeum",
        text: "벌써 벚꽃 다 졌네"
      },
      {
        who: "rian",
        text: "나 먼저 가 있을게"
      },
      {
        who: "maeum",
        text: "오늘도 늦잠 잤지"
      }
    ]
  }
};
