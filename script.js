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
    desc: "홈페이지를 통해 Oracle AI Campus에 간편 신청한 단계로, \n 이후 순차적으로 담당 매니저가 프로세스를 개별 안내드립니다:)",
    link: { label: "내배카 발급하러 가기", url: "https://www.gov.kr/portal/rcvfvrSvc/dtlEx/149200000026" },
    checks: [
      { yes: true,  main: "내일배움카드 소지 중",       sub: "→ 서류 전형으로 이동하세요" },
      { yes: false, main: "아직 내일배움카드가 없어요", sub: "→ 내일배움카드 발급 방법을 먼저 확인하세요" }
    ]
  },
  {
    label: "STEP 2",
    title: "서류 전형",
    meta: "구글 폼을 통한 서류 전형 제출 (마감일 : 3/18(수))",
    desc: "내일배움카드 발급 완료 및 담당 매니저와 유선 통화로 수강 가능 여부를 확인하셨다면 서류를 제출해 주세요!\n⚠️ 서류는 한 번만 제출 가능하니, 신중하게 작성 부탁드립니다.",
    link: { label: "서류 작성하러 가기", url: "https://forms.gle/g9go8SzFFu4M5k9U8" },
    checks: [
      { yes: true,  main: "서류 제출 완료", sub: "→ 합격 시 사전 테스트와 면접 일정을 개별 안내드립니다" },
      { yes: false, main: "아직 제출 전",   sub: "→ 3/18(수)까지 제출 필수이며, 간편 신청과 서류 제출 모두 완료해야 신청이 완료됩니다:)" }
    ]
  },
  {
    label: "STEP 3",
    title: "사전 역량 테스트",
    meta: "서류 합격자 대상 개별 안내",
    desc: "서류 합격자 대상으로 사전 역량 테스트가 진행됩니다! \n 일정은 개별 안내 예정입니다.",
    notice: "<strong>유의사항</strong><br>테스트는 전반적인 교과 이해도 파악 목적입니다. AI 도움 없이 본인 지식 수준으로 응시해 주세요. <br/> 응시자 평균을 참고하여 6개월 학습이 설계되므로, 실력 그대로 응시하셔야 학습을 원활하게 따라오실 수 있습니다.",
    extra: "💡 온라인 입학 설명회가 해당 기간 중 화상으로 진행됩니다! 신청 링크는 순차 발송 예정입니다😉"
  },
  {
    label: "STEP 4",
    title: "고용24 수강신청",
    meta: "내일배움카드 필수",
    desc: "서류 합격자는 고용24 홈페이지에서 수강신청을 진행해 주세요! \n 💳 내일배움카드를 반드시 소지하셔야 합니다.",
    howPath: ["고용24", "취업지원", "훈련 찾기·신청", "오라클 AI Campus 검색"],
    checks: [
      { yes: true,  main: "수강신청 완료",   sub: "→ 담당 매니저의 면접 안내를 기다려 주세요👏" },
      { yes: false, main: "수강신청 미완료", sub: "→ 내일배움카드 발급·수강신청에 어려움이 있다면 언제든 문의주세요:)" }
    ]
  },
  {
    label: "STEP 5",
    title: "면접 전형",
    meta: "3/24(화) · 3/25(수) · 서울 성동구",
    desc: "고용24 수강신청을 완료한 면접 대상자에게 개별 문자·전화로 일정이 안내됩니다. \n 📞 문자에 답장이 없을 경우 유선 연락드리니 전화를 꼭 받아주세요!",
    dates: [
      "📅 2026년 3월 24일(화), 25일(수)",
      "⏰ 면접 시간은 개별 안내",
      "🙋 그룹 면접으로 진행",
      "🏢 서울시 성동구 (자세한 장소 추후 안내)"
    ],
    checks: [
      { yes: true,  main: "참석 문자 회신 완료", sub: "→ 면접장에서 만나요!" },
      { yes: false, main: "아직 회신 전",         sub: "→ 참석 의사를 알려주셔야 면접이 확정됩니다. 지금 바로 회신해 주세요!" }
    ]
  },
  {
    label: "STEP 6",
    title: "최종 결과 발표",
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

  const noticeHTML  = s.notice ? `<div class="notice">${s.notice}</div>`  : '';
  const extraHTML   = s.extra  ? `<div class="notice">${s.extra}</div>`   : '';

  const checksHTML = s.checks
    ? `<div class="check-section">
        ${s.checks.map(c => `
          <div class="check-item ${c.yes ? 'yes' : 'no'}">
            <span class="check-icon">${c.yes ? '✅' : '❎'}</span>
            <div>
              <div class="check-main">${c.main}</div>
              <div class="check-sub">${c.sub}</div>
            </div>
          </div>
        `).join('')}
       </div>`
    : '';

  const bodyContent = s.isResult
    ? `<div class="result-banner">
        <div class="emoji">🎓</div>
        <div class="title">합격자 대상 개별 안내 예정</div>
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
