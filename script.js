/* ===========================
   Oracle AI Campus · Data Track
   선발 절차 데이터 & 렌더링
   =========================== */

/* ── 콘텐츠 데이터 ──────────────────────────────────────
   내용 수정은 이 부분만 편집
   각 스텝 객체의 필드:
     label     : 상단 표시 레이블 (예: "STEP 1")
     title     : 카드 제목
     meta      : 카드 부제 (날짜·조건 요약)
     desc      : 본문 설명 (\n 으로 줄바꿈)
     link      : CTA 버튼 { label, url }
     howPath   : 경로 안내 배열 (마지막 항목은 강조 표시)
     dates     : 날짜 목록 배열
     notice    : 유의사항 박스 (HTML 가능)
     extra     : 추가 안내 박스
     checks    : 체크리스트 배열 { yes, main, sub }
     isResult  : true 이면 결과 발표 배너로 렌더링
   ──────────────────────────────────────────────────── */
const STEPS = [
  {
    label: "STEP 1",
    title: "간편 신청",
    meta: "홈페이지를 통한 간편 신청",
    desc: "홈페이지를 통해 Oracle AI Campus에 간편 신청을 진행합니다.\n 전담 매니저와의 유선 상담이 필요하지 않은 경우, 서류 전형으로 바로 이동해 주세요! \n 간편 신청 후 1~2일 이내 서류 미제출 시 전담 매니저가 유선 연락드릴 예정입니다:) \n <em style='color: var(--purple-600'>(☎️ 02-6235-5089)</em>",
    link: { label: "서류 전형 바로가기", url: "https://forms.gle/g9go8SzFFu4M5k9U8" },
    checks: [
      { yes: true,  main: "내일배움카드 소지 중",       sub: "→ 서류 전형으로 이동하세요" },
      { yes: false, main: "아직 내일배움카드가 없어요", sub: "→ 내일배움카드를 먼저 발급해 주세요",
        links: [
          { label: "내배카 발급하러 가기", url: "https://www.gov.kr/portal/rcvfvrSvc/dtlEx/149200000026" },
          { label: "국민내일배움카드 A to Z", url: "https://innate-paprika-fed.notion.site/A-Z-34a5d646839a80c4a400e5e446a2314d" }
        ] }
    ]
  },
  {
    label: "STEP 2",
    title: "서류 전형",
    meta: "구글 폼을 통한 서류 전형 제출 (마감일 : 3/18(수))",
    desc: "내일배움카드 발급 완료 및 간편 신청이 완료되었다면 서류를 제출해 주세요!\n⚠️ 서류는 한 번만 제출 가능하니, 신중하게 작성 부탁드립니다.",
    link: { label: "서류 작성하러 가기", url: "https://forms.gle/g9go8SzFFu4M5k9U8" },
    notice: "<strong>서류 제출 후 안내 방식</strong><br>✅ 서류 작성 완료 → 합격 여부·절차를 <strong>문자</strong>로 안내드립니다<br>❎ 서류 미작성 → 담당 매니저가 <strong>유선으로 개별 상담</strong>을 도와드립니다",
    checks: [
      { yes: true,  main: "서류 제출 완료", sub: "→ 추후 <mark>서류 결과</mark>를 개별 안내 예정이니 잠시 기다려주세요 :)" },
      { yes: false, main: "아직 제출 전",   sub: "→ <mark>3/18(수)까지 제출 필수</mark>이며, 간편 신청과 서류 제출 모두 완료해야 신청이 완료됩니다 :)" }
    ]
  },
  {
    label: "STEP 3",
    title: "사전 테스트 · 면접",
    meta: "서류 합격자 대상 동일 날 진행",
    desc: "서류 합격자를 대상으로 사전 역량 테스트와 면접이 같은 날 진행됩니다.\n 일정은 개별 문자로 안내드립니다.",
    notice: "💡 <strong>사전 역량 테스트</strong><br>✅ 전공자 : 프로그래밍 기초, 자료 구조 등 기본적인 IT 역량 문항 <br> ✅ 비전공자 : 기초 논리력, 문제 해결력, IT 기초 이해도 확인 문항",
    // notice: "📌 <strong>사전 역량 테스트 유의사항</strong><br>테스트는 전반적인 교과 이해도 파악 목적입니다. AI 도움 없이 본인 지식 수준으로 응시해 주세요.<br>응시자 평균을 참고하여 6개월 학습이 설계되므로, 실력 그대로 응시하셔야 학습을 원활하게 따라오실 수 있습니다.",
    dates: [
      "📅 2026년 3월 24일(화), 25일(수)",
      "⏰ 면접·테스트 시간은 개별 안내",
      "🙋 그룹 면접으로 진행",
      "🏢 서울시 성동구 (자세한 장소 추후 안내)"
    ],
    extra: "⚠️ <strong>사전 역량 테스트 유의사항</strong><br>테스트는 전반적인 교과 이해도 파악 목적입니다. AI 도움 없이 본인 지식 수준으로 응시해 주세요.<br>응시자 평균을 참고하여 6개월 학습이 설계되므로, 실력 그대로 응시하셔야 학습을 원활하게 따라오실 수 있습니다."
  },
  {
    label: "STEP 4",
    title: "최종 합격 발표",
    meta: "2026년 3월 4주차 예정",
    isResult: true
  }
];

/* ── 렌더링 ──────────────────────────────────────────── */
let openIndex = 0;

function renderStep(s, i) {
  const isOpen = i === openIndex;

  const linkHTML = s.link
    ? `<a class="cta-link" href="${s.link.url}" target="_blank">${s.link.label} →</a>`
    : '';

  const howHTML = s.howPath
    ? `<div class="how-path">
        ${s.howPath.map((p, pi) => {
          const isLast = pi === s.howPath.length - 1;
          return (pi > 0 ? '<span class="arrow">›</span>' : '')
               + (isLast ? `<span class="kw">${p}</span>` : `<span>${p}</span>`);
        }).join('')}
       </div>`
    : '';

  const datesHTML = s.dates
    ? `<div class="date-list">
        ${s.dates.map(d => `<div class="date-row">${d}</div>`).join('')}
       </div>`
    : '';

  const noticeHTML = s.notice ? `<div class="notice">${s.notice}</div>` : '';
  const extraHTML  = s.extra  ? `<div class="notice">${s.extra}</div>`  : '';

  const checksHTML = s.checks
    ? `<div class="check-section">
        ${s.checks.map(c => `
          <div class="check-item ${c.yes ? 'yes' : 'no'}">
            <span class="check-icon">${c.yes ? '✅' : '❎'}</span>
            <div>
              <div class="check-main">${c.main}</div>
              <div class="check-sub">${c.sub}</div>
              ${c.link ? `<a class="cta-link" href="${c.link.url}" target="_blank" style="margin-top:8px;">${c.link.label} →</a>` : ''}
              ${c.links ? `<div class="cta-links">${c.links.map(l => `<a class="cta-link" href="${l.url}" target="_blank">${l.label} →</a>`).join('')}</div>` : ''}
            </div>
          </div>
        `).join('')}
       </div>`
    : '';

  const bodyContent = s.isResult
    ? `<div class="result-banner">
        <div class="emoji">🎓</div>
        <div class="title">최종 결과 개별 안내 예정</div>
        <div class="sub">2026년 3월 4주차 예정 · 일정은 변동될 수 있습니다</div>
       </div>`
    : `${s.desc ? `<p class="desc">${s.desc}</p>` : ''}
       ${linkHTML}${howHTML}${datesHTML}${noticeHTML}${extraHTML}${checksHTML}`;

  return `
    <div class="step${isOpen ? ' active' : ''}" id="step-${i}">
      <div class="step-header" onclick="toggle(${i})">
        <div class="step-num">${i + 1}</div>
        <div class="step-info">
          <div class="step-label">${s.label}</div>
          <div class="step-title">${s.title}</div>
          ${s.meta ? `<div class="step-meta">${s.meta}</div>` : ''}
        </div>
        <div class="step-chevron">▼</div>
      </div>
      <div class="step-body">
        <div class="step-content">${bodyContent}</div>
      </div>
    </div>`;
}

function render() {
  document.getElementById('stepsContainer').innerHTML =
    STEPS.map((s, i) => renderStep(s, i)).join('');
}

function updateProgress() {
  const current = openIndex >= 0 ? openIndex + 1 : 0;
  const pct = Math.round((current / STEPS.length) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressLabel').textContent = current + ' / ' + STEPS.length;
}

function toggle(i) {
  openIndex = openIndex === i ? -1 : i;
  render();
  updateProgress();
}

/* ── 초기화 ── */
render();
updateProgress();
