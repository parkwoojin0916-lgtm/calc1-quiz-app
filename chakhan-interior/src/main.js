import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './style.css';
import { SITE, PLACEHOLDER_RESERVATION, SERVICES, TICKER, BRANDS, PRICE_ITEMS, PILLARS, WALLS, FLOORS, CASES, STEPS, METRICS, FAQ, QUOTE_OPTIONS } from './data.js';
import { ICONS } from './scene.js';

const { phone: PHONE } = SITE;
const TEL = `tel:${PHONE.replace(/-/g, '')}`;
const RES = SITE.reservationUrl;
const NAVER_MAP = SITE.links.naverMap;
const KAKAO_MAP = SITE.links.kakaoMap;
const PLACE_TEL = `tel:${SITE.placePhone.replace(/-/g, '')}`;
const ext = 'target="_blank" rel="noopener"';
const SOCIALS = [
  ['instagram', '인스타그램', SITE.links.instagram],
  ['blog', '네이버 블로그', SITE.links.blog],
  ['cafe', '네이버 카페', SITE.links.cafe],
  ['youtube', '유튜브', SITE.links.youtube]
];

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const isTouch = window.matchMedia('(pointer: coarse)').matches;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const roomSrc = (floor, wall) => `/assets/rooms/room-${floor}-${wall}.webp`;

const store = {
  get(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* 저장 불가 환경 무시 */ } }
};

// ── 상태 ────────────────────────────────────────────────────
const saved = store.get('chakhan-quote', {});
const state = {
  services: new Set(Array.isArray(saved.services) ? saved.services.filter((id) => SERVICES.some((s) => s.id === id)) : []),
  space: QUOTE_OPTIONS.space.includes(saved.space) ? saved.space : QUOTE_OPTIONS.space[0],
  size: Number(saved.size) >= 3 && Number(saved.size) <= 100 ? Number(saved.size) : 24,
  timing: QUOTE_OPTIONS.timing.includes(saved.timing) ? saved.timing : QUOTE_OPTIONS.timing[0],
  area: SITE.areas.includes(saved.area) ? saved.area : SITE.areas[0],
  name: typeof saved.name === 'string' ? saved.name : '',
  contact: typeof saved.contact === 'string' ? saved.contact : '',
  memo: typeof saved.memo === 'string' ? saved.memo : '',
  mood: null,
  viz: { wall: 'greige', floor: 'herring', light: 'day' }
};

// ── 마크업 ──────────────────────────────────────────────────
const btn = (cls, href, label, icon = ICONS.arrow, attrs = '') => `<a class="btn ${cls}" href="${href}" ${attrs}><span class="btn-label">${label}</span><span class="btn-icon">${icon}</span></a>`;
const kicker = (num, en, ko) => `<p class="kicker reveal"><span class="kicker-num">${num}</span><span class="kicker-en">${en}</span><span class="kicker-ko">${ko}</span></p>`;

const app = document.querySelector('#app');
app.innerHTML = `
<a class="skip-link" href="#main">본문 바로가기</a>
<div class="progress" aria-hidden="true"><span></span></div>

<header class="site-header">
  <a class="brand" href="#top" aria-label="${SITE.name} 홈">
    <span class="brand-mark"><img src="/assets/brand/mark.png" width="257" height="160" alt="" /></span>
    <span class="brand-name"><strong>착한 인테리어</strong><span>도배 · 장판 · 마루 · 필름 <em>청주점</em></span></span>
  </a>
  <nav class="nav" id="site-nav" aria-label="주요 메뉴">
    <a href="#services">서비스</a>
    <a href="#materials">자재 · 가격</a>
    <a href="#studio">분위기 미리보기</a>
    <a href="#portfolio">시공 전후</a>
    <a href="#process">진행 방식</a>
    <a href="#faq">FAQ</a>
    <a href="#contact">오시는 길</a>
    <div class="nav-mobile-extra">
      <a class="btn btn-light" href="${TEL}"><span class="btn-label">${PHONE}</span><span class="btn-icon">${ICONS.phone}</span></a>
    </div>
  </nav>
  <div class="header-actions">
    <a class="header-call" href="${TEL}">${ICONS.phone}<span>${PHONE}</span></a>
    <a class="header-quote" href="#quote">견적 문의 <span class="quote-badge" data-count-badge hidden>0</span></a>
    <button class="menu-toggle" type="button" aria-label="메뉴 열기" aria-expanded="false" aria-controls="site-nav"><span></span><span></span></button>
  </div>
</header>

<main id="main">
  <section class="hero" id="top" data-section>
    <div class="hero-copy">
      <p class="eyebrow reveal"><span class="dot"></span>청주 · 오창 · 오송 · 세종 무료 방문 견적</p>
      <h1 class="hero-title">
        <span class="line"><span>집의 분위기를</span></span>
        <span class="line"><span><em>바꾸는 건</em>,</span></span>
        <span class="line"><span><span class="dim">마감의 정밀도</span><wbr />입니다.</span></span>
      </h1>
      <p class="hero-lede reveal reveal-d2">청주 전 지역 도배·장판·마루·부분 인테리어. <br />대표가 직접 상담하고, 처음부터 마감 확인까지 꼼꼼하게 관리합니다.</p>
      <div class="hero-actions reveal reveal-d3">
        ${btn('btn-light', TEL, '전화 상담', ICONS.phone)}
        ${btn('btn-ghost', '#quote', '30초 견적 문의', ICONS.right)}
      </div>
      <dl class="hero-stats reveal reveal-d4">
        <div><dt>무료</dt><dd>방문 견적</dd></div>
        <div><dt>대표 직접</dt><dd>상담 · 시공 관리</dd></div>
        <div><dt><a href="${SITE.reviews.url}" ${ext}>${SITE.reviews.count}<span class="stat-star">${ICONS.star}</span></a></dt><dd><a href="${SITE.reviews.url}" ${ext}>네이버 방문자 리뷰 ↗</a></dd></div>
      </dl>
    </div>
    <figure class="hero-media reveal reveal-d1">
      <div class="hero-photo"><img src="/assets/hero.webp" width="1100" height="1375" alt="헤링본 마루와 그레이지 실크 벽지로 마감한 밝은 거실 (AI 예시 이미지)" fetchpriority="high" /></div>
      <figcaption class="hero-card">
        <span class="hero-card-logo"><img src="/assets/brand/mark.png" width="257" height="160" alt="" /></span>
        <span><strong>그레이지 실크 · 헤링본</strong><small>분위기 미리보기에서 직접 바꿔보세요</small></span>
        <a href="#studio" aria-label="분위기 미리보기로 이동">${ICONS.right}</a>
      </figcaption>
      <span class="hero-tag">AI 예시 이미지</span>
    </figure>
  </section>

  <section class="scope" aria-label="시공 가능 항목 ${TICKER.length}가지">
    <p class="scope-label"><span>${TICKER.length}</span>가지<br />시공 범위</p>
    <div class="marquee">
      <div class="marquee-track">
        <ul class="marquee-list">${TICKER.map((t) => `<li>${t}</li>`).join('')}</ul>
        <ul class="marquee-list" aria-hidden="true">${TICKER.map((t) => `<li>${t}</li>`).join('')}</ul>
      </div>
    </div>
  </section>

  <section class="intro section" id="intro">
    <div class="wrap">
      ${kicker('01', 'Why Chakhan', '착한 인테리어')}
      <div class="intro-grid">
        <h2 class="reveal">좋은 공간은<br /><span class="dim">보이는 것보다</span><br />더 많은 걸 바꿉니다.</h2>
        <div class="intro-body reveal reveal-d1">
          <p>벽지 한 장, 바닥 한 칸을 고를 때도 집의 구조와 빛, 생활 습관을 먼저 생각합니다. 예쁜 결과보다 오래 만족하는 과정을 설계합니다.</p>
          <blockquote class="promise"><p>작은 견적, 큰 견적 구분 없이 늘 최선을 다하고 있습니다. 편안하게 문의 주시면 최선을 다해 상담해 드리겠습니다.</p><cite>— ${SITE.name}</cite></blockquote>
          <a class="text-link" href="#process">우리가 일하는 방식 보기 ${ICONS.right}</a>
        </div>
      </div>
      <div class="pillars">
        ${PILLARS.map((p, i) => `<article class="pillar reveal reveal-d${i + 1}"><span class="pillar-num">${p.k}</span><h3>${p.title}</h3><p>${p.body}</p></article>`).join('')}
      </div>
    </div>
  </section>

  <section class="services section" id="services" data-section>
    <div class="wrap">
      <div class="section-head">
        <div>${kicker('02', 'Capabilities', '서비스')}<h2 class="reveal">필요한 만큼,<br />정확하게.</h2></div>
        <p class="head-note reveal reveal-d1">관심 있는 항목을 <b>견적에 담기</b>로 골라두면 <br />아래 견적 문의서에 자동으로 채워집니다.</p>
      </div>
      <div class="service-grid">
        ${SERVICES.map((s, i) => `
        <article class="service-card reveal reveal-d${(i % 3) + 1}" data-service="${s.id}">
          <div class="card-top"><span class="card-num">${s.num}</span><span class="card-icon">${ICONS[s.icon]}</span></div>
          <h3>${s.title}</h3>
          <ul class="card-tags">${s.meta.map((m) => `<li>${m}</li>`).join('')}</ul>
          <p class="card-desc">${s.desc}</p>
          <button class="card-pick" type="button" aria-pressed="false" data-pick="${s.id}"><span class="pick-icon">${ICONS.plus}</span><span class="pick-label">견적에 담기</span></button>
        </article>`).join('')}
      </div>
    </div>
  </section>

  <section class="materials section" id="materials" data-section>
    <div class="wrap">
      <div class="section-head">
        <div>${kicker('03', 'Materials & Price', '자재 · 가격표')}<h2 class="reveal">믿을 수 있는 자재,<br /><span class="dim">투명한 견적.</span></h2></div>
        <p class="head-note reveal reveal-d1">검증된 브랜드 자재로 시공합니다. <br />가격은 자재 · 면적 · 현장 상태에 따라 달라 방문 후 정확히 안내드려요.</p>
      </div>
      <div class="materials-grid">
        <div class="brand-card reveal">
          <h3>취급 자재 브랜드</h3>
          ${BRANDS.map((b) => `<div class="brand-group"><span class="brand-group-name">${b.group}</span><ul>${b.items.map((i) => `<li>${i}</li>`).join('')}</ul></div>`).join('')}
        </div>
        <div class="price-card reveal reveal-d1">
          <div class="price-head"><h3>가격표 항목</h3><span>네이버 플레이스 기준</span></div>
          <ul class="price-list">${PRICE_ITEMS.map((i) => `<li><span>${i}</span><em>변동 · 상담 후 안내</em></li>`).join('')}</ul>
        </div>
        <a class="coupon-card reveal reveal-d2" href="${SITE.coupon.url}" ${ext}>
          <span class="coupon-icon">${ICONS.ticket}</span>
          <span class="coupon-text"><small>네이버 플레이스 쿠폰</small><strong>${SITE.coupon.amount} 할인 쿠폰</strong><span>네이버 플레이스에서 다운로드 후 상담 시 말씀해 주세요</span></span>
          <span class="coupon-cta">쿠폰 받기 ${ICONS.arrow}</span>
        </a>
      </div>
    </div>
  </section>

  <section class="studio section" id="studio" data-section>
    <div class="wrap">
      <div class="section-head">
        <div>${kicker('04', 'Mood Studio', '분위기 미리보기')}<h2 class="reveal">우리 집 분위기,<br /><span class="dim">미리 맞춰보세요.</span></h2></div>
        <p class="head-note reveal reveal-d1">벽지 색과 바닥재를 바꿔보며 원하는 느낌을 찾아보세요. <br />고른 조합은 견적 문의서에 함께 담깁니다.</p>
      </div>
      <div class="studio-grid reveal">
        <figure class="studio-view" data-light="day">
          <img class="studio-img is-front" alt="" />
          <img class="studio-img" alt="" aria-hidden="true" />
          <span class="studio-warm" aria-hidden="true"></span>
          <span class="studio-loading" aria-hidden="true"></span>
          <figcaption class="studio-caption"><span>선택한 조합</span><strong id="studio-name"></strong></figcaption>
          <span class="photo-tag">AI 예시 이미지</span>
        </figure>
        <div class="studio-panel">
          <fieldset class="swatch-group">
            <legend>벽지 컬러 <span id="wall-name"></span></legend>
            <div class="wall-swatches" data-group="wall">
              ${WALLS.map((w) => `<button type="button" class="wall-swatch" data-value="${w.id}" style="--sw:${w.hex}" aria-pressed="false" aria-label="${w.name}" title="${w.name}"><span></span></button>`).join('')}
            </div>
          </fieldset>
          <fieldset class="swatch-group">
            <legend>바닥재</legend>
            <div class="floor-swatches" data-group="floor">
              ${FLOORS.map((f) => `<button type="button" class="floor-swatch" data-value="${f.id}" aria-pressed="false"><img src="/assets/rooms/floor-${f.id}.webp" width="240" height="120" alt="" loading="lazy" /><span><b>${f.name}</b><small>${f.sub}</small></span></button>`).join('')}
            </div>
          </fieldset>
          <fieldset class="swatch-group">
            <legend>조명</legend>
            <div class="segmented" role="group" aria-label="조명">
              <button type="button" data-light="day" aria-pressed="true">${ICONS.sun}주광색 (낮)</button>
              <button type="button" data-light="warm" aria-pressed="false">${ICONS.bulb}전구색 (저녁)</button>
            </div>
          </fieldset>
          <button class="btn btn-light btn-block" type="button" id="studio-apply"><span class="btn-label">이 조합으로 상담하기</span><span class="btn-icon">${ICONS.right}</span></button>
          <p class="fine">AI로 만든 예시 사진에 벽지 색을 합성한 이미지예요. 실제 색감은 방문 시 샘플로 확인해 주세요.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="portfolio section" id="portfolio" data-section>
    <div class="wrap">
      <div class="section-head">
        <div>${kicker('05', 'Before / After', '시공 전후')}<h2 class="reveal">달라지는 건<br /><span class="dim">한눈에 보입니다.</span></h2></div>
        <div class="case-tabs reveal reveal-d1" role="tablist" aria-label="시공 전후 예시">
          ${CASES.map((c, i) => `<button type="button" role="tab" id="tab-${c.id}" aria-controls="case-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-case="${i}">${c.tab}</button>`).join('')}
        </div>
      </div>
      <div class="case reveal" id="case-panel" role="tabpanel">
        <div class="compare" style="--pos:50%">
          <div class="compare-layer compare-before"></div>
          <div class="compare-layer compare-after"></div>
          <span class="compare-tag tag-after">AFTER</span>
          <span class="compare-tag tag-before">BEFORE</span>
          <div class="compare-line"><button class="compare-handle" type="button" role="slider" aria-label="시공 전후 비교 위치" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-valuetext="50%">${ICONS.right}</button></div>
          <span class="photo-tag">AI 예시 이미지</span>
        </div>
        <div class="case-copy">
          <p class="case-label"></p>
          <h3 class="case-title"></h3>
          <p class="case-body"></p>
          <ol class="case-steps"></ol>
        </div>
      </div>
      <div class="portfolio-foot reveal"><span>* 시공 전후 사진은 이해를 돕기 위해 AI로 생성한 예시입니다. 실제 시공 사진은 상담 시 현장 유형에 맞춰 보여드립니다.</span><a class="text-link" href="#quote">비슷한 공간 상담하기 ${ICONS.right}</a></div>
    </div>
  </section>

  <section class="process section" id="process" data-section>
    <div class="wrap">
      ${kicker('06', 'The Process', '진행 방식')}
      <div class="process-grid">
        <div class="process-intro">
          <h2 class="reveal">과정을<br /><span class="dim">숨기지 않습니다.</span></h2>
          <p class="reveal reveal-d1">견적이 달라지는 이유, 공정이 필요한 이유를 먼저 설명합니다. 그래야 결과를 함께 고를 수 있으니까요.</p>
          <dl class="metrics">
            ${METRICS.map((m) => `<div class="metric reveal"><dt><span data-count="${m.value}">0</span>${m.suffix ? `<i>${m.suffix}</i>` : ''}</dt><dd>${m.label.replace('\n', '<br />')}</dd></div>`).join('')}
          </dl>
        </div>
        <ol class="timeline">
          <span class="timeline-rail" aria-hidden="true"><span class="timeline-fill"></span></span>
          ${STEPS.map((s) => `<li class="step reveal"><span class="step-dot" aria-hidden="true"></span><span class="step-num">Step ${s.n}</span><h3>${s.title}</h3><p class="step-sub">${s.sub}</p><p>${s.body}</p></li>`).join('')}
        </ol>
      </div>
    </div>
  </section>

  <section class="faq section" id="faq" data-section>
    <div class="wrap faq-grid">
      <div>
        ${kicker('07', 'FAQ', '자주 묻는 질문')}
        <h2 class="reveal">궁금한 점,<br /><span class="dim">먼저 답해드려요.</span></h2>
        <p class="faq-note reveal reveal-d1">더 궁금한 점은 편하게 전화 주세요.<br /><a class="text-link" href="${TEL}">${PHONE} ${ICONS.phone}</a></p>
      </div>
      <div class="faq-list">
        ${FAQ.map((f, i) => `<details class="faq-item reveal" name="faq" ${i === 0 ? 'open' : ''}><summary><span class="faq-q">${String(i + 1).padStart(2, '0')}</span><span class="faq-text">${f.q}</span><span class="faq-plus" aria-hidden="true"></span></summary><div class="faq-a"><p>${f.a}</p></div></details>`).join('')}
      </div>
    </div>
  </section>

  <section class="quote section" id="quote" data-section>
    <div class="wrap">
      <div class="quote-panel reveal">
        <div class="quote-intro">
          <p class="kicker"><span class="kicker-num">08</span><span class="kicker-en">Let's Talk</span><span class="kicker-ko">견적 문의</span></p>
          <h2>이번 공간은<br /><em>어디부터</em> 바꿀까요?</h2>
          <p>몇 가지만 골라주시면 견적 문의 문자가 자동으로 완성됩니다. 사진은 문자에 함께 첨부해 주세요.</p>
          <ul class="quote-points">
            <li>${ICONS.check}입력 내용은 이 기기에만 임시 저장돼요</li>
            <li>${ICONS.check}서버로 전송되지 않고, 문자 앱에서 직접 보내요</li>
            <li>${ICONS.check}대표가 직접 확인하고 연락드립니다</li>
          </ul>
          <div class="quote-alt">
            ${btn('btn-light', TEL, '바로 전화하기', ICONS.phone)}
            ${btn('btn-ghost', SITE.links.talk, '네이버 톡톡 문의', ICONS.chat, ext)}
            ${btn('btn-ghost booking-link', RES, '네이버 예약', ICONS.calendar, RES.startsWith('http') ? ext : '')}
          </div>
        </div>
        <form class="quote-form" id="quote-form" novalidate>
          <div class="field">
            <span class="field-label" id="lbl-space">공간 유형</span>
            <div class="chips" role="radiogroup" aria-labelledby="lbl-space" data-field="space">
              ${QUOTE_OPTIONS.space.map((o) => `<button type="button" role="radio" class="chip" data-value="${o}" aria-checked="false">${o}</button>`).join('')}
            </div>
          </div>
          <div class="field">
            <label class="field-label" for="size">평수 <output id="size-out" for="size"></output></label>
            <input type="range" id="size" min="3" max="100" step="1" />
            <div class="range-scale" aria-hidden="true"><span>3평</span><span>50평</span><span>100평</span></div>
          </div>
          <div class="field">
            <span class="field-label" id="lbl-svc">시공 항목 <small>(여러 개 선택)</small></span>
            <div class="chips" role="group" aria-labelledby="lbl-svc" data-field="services">
              ${SERVICES.map((s) => `<button type="button" class="chip" data-value="${s.id}" aria-pressed="false">${s.title}</button>`).join('')}
            </div>
            <p class="field-error" id="svc-error" role="alert" hidden>시공 항목을 하나 이상 골라주세요.</p>
          </div>
          <div class="field-row">
            <div class="field">
              <label class="field-label" for="timing">희망 시기</label>
              <div class="select"><select id="timing">${QUOTE_OPTIONS.timing.map((o) => `<option>${o}</option>`).join('')}</select></div>
            </div>
            <div class="field">
              <label class="field-label" for="area">지역</label>
              <div class="select"><select id="area">${SITE.areas.map((o) => `<option>${o}</option>`).join('')}</select></div>
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label class="field-label" for="name">성함 <small>(선택)</small></label>
              <input type="text" id="name" autocomplete="name" placeholder="홍길동" maxlength="20" />
            </div>
            <div class="field">
              <label class="field-label" for="contact">연락처 <small>(선택)</small></label>
              <input type="tel" id="contact" autocomplete="tel" inputmode="tel" placeholder="010-0000-0000" maxlength="16" />
            </div>
          </div>
          <div class="field">
            <label class="field-label" for="memo">요청 사항 <small>(선택)</small></label>
            <textarea id="memo" rows="3" maxlength="400" placeholder="예) 거실·방 2개 실크 도배, 이사 전 시공 희망"></textarea>
          </div>
          <div class="mood-tag" id="mood-tag" hidden><span>분위기</span><strong></strong><button type="button" aria-label="분위기 선택 지우기">×</button></div>
          <details class="preview">
            <summary>보낼 내용 미리보기</summary>
            <pre id="quote-preview"></pre>
          </details>
          <div class="form-actions">
            <button class="btn btn-dark btn-block" type="submit"><span class="btn-label">${isTouch ? '문자로 견적 문의 보내기' : '견적 문의 내용 복사하기'}</span><span class="btn-icon">${isTouch ? ICONS.message : ICONS.copy}</span></button>
            ${isTouch ? `<button class="btn btn-outline-dark" type="button" id="copy-quote"><span class="btn-label">내용 복사</span><span class="btn-icon">${ICONS.copy}</span></button>` : ''}
          </div>
          <p class="form-hint">${isTouch ? '문자 앱이 열리면 사진을 첨부해 보내주세요.' : `복사한 내용을 휴대폰 문자(${PHONE})로 보내주시면 빠르게 안내드립니다.`}</p>
        </form>
      </div>
      <div class="reservation-note" id="reservation" role="status"><span class="dot"></span><span><strong>네이버 예약 링크 연결 준비 중</strong><small>예약 링크가 연결되기 전까지는 전화나 문자로 먼저 상담해 주세요.</small></span><a class="text-link" href="${TEL}">우선 전화로 상담하기 ${ICONS.right}</a></div>
    </div>
  </section>

  <section class="contact section" id="contact" data-section>
    <div class="wrap contact-grid">
      <div>
        ${kicker('09', 'Visit', '오시는 길')}
        <h2 class="reveal">청주에서,<br /><span class="dim">충청권 어디든.</span></h2>
        <ul class="area-chips reveal reveal-d1" aria-label="방문 견적 지역">${SITE.areas.map((a) => `<li>${a}</li>`).join('')}</ul>
      </div>
      <div class="contact-cards">
        <div class="info-card reveal">
          <span class="info-label">${ICONS.map}주소</span>
          <p class="info-big">${SITE.address}</p>
          <div class="pill-links">
            <a href="${NAVER_MAP}" target="_blank" rel="noopener">네이버 지도 ${ICONS.arrow}</a>
            <a href="${KAKAO_MAP}" target="_blank" rel="noopener">카카오맵 ${ICONS.arrow}</a>
            <button type="button" data-copy="${SITE.address}" data-copy-msg="주소를 복사했어요">주소 복사 ${ICONS.copy}</button>
          </div>
        </div>
        <div class="info-card reveal reveal-d1">
          <span class="info-label">${ICONS.phone}대표 직통</span>
          <a class="info-phone" href="${TEL}">${PHONE}</a>
          <dl class="info-rows">
            <div><dt>네이버 플레이스</dt><dd><a href="${PLACE_TEL}">${SITE.placePhone}</a></dd></div>
            <div><dt>영업시간</dt><dd>${SITE.hours} <a href="${NAVER_MAP}" ${ext}>요일별 시간 보기 ↗</a></dd></div>
            <div><dt>방문</dt><dd>방문 접수 · 출장 견적 · 예약 가능</dd></div>
          </dl>
          <div class="pill-links">
            <a href="${TEL}">전화 걸기 ${ICONS.phone}</a>
            <a href="${SITE.links.talk}" ${ext}>네이버 톡톡 ${ICONS.chat}</a>
            <button type="button" data-copy="${PHONE}" data-copy-msg="전화번호를 복사했어요">번호 복사 ${ICONS.copy}</button>
          </div>
        </div>
        <div class="info-card reveal reveal-d2">
          <span class="info-label">${ICONS.star}시공 사례 · 소식</span>
          <p class="info-sub">실제 시공 사진과 후기는 아래 채널에서 보실 수 있어요.</p>
          <div class="social-grid">
            <a href="${SITE.reviews.url}" ${ext}>${ICONS.star}<span><b>네이버 리뷰</b><small>방문자 리뷰 ${SITE.reviews.count}개</small></span></a>
            ${SOCIALS.map(([icon, label, url]) => `<a href="${url}" ${ext}>${ICONS[icon]}<span><b>${label}</b><small>바로가기</small></span></a>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <div class="footer-lockup"><img src="/assets/brand/mark.png" width="257" height="160" alt="" loading="lazy" /><span><b>착한 인테리어</b><small>INTERIOR DESIGN</small></span></div>
      <div><strong>${SITE.name}</strong><p>소통으로 만들어지는 아름다운 생활공간</p></div>
    </div>
    <ul class="footer-info">
      <li><span>TEL</span><a href="${TEL}">${PHONE}</a> · <a href="${PLACE_TEL}">${SITE.placePhone}</a></li>
      <li><span>HOURS</span>${SITE.hours}</li>
      <li><span>ADDR</span>${SITE.address}</li>
      <li><span>AREA</span>청주 전 지역 · 오창 · 오송 · 세종 등 충청권</li>
    </ul>
    <nav class="footer-nav" aria-label="하단 메뉴"><a href="#services">서비스</a><a href="#materials">자재 · 가격표</a><a href="#studio">분위기 미리보기</a><a href="#quote">견적 문의</a></nav>
    <div class="footer-social">${SOCIALS.map(([icon, label, url]) => `<a href="${url}" ${ext} aria-label="${label}" title="${label}">${ICONS[icon]}</a>`).join('')}<a href="${SITE.links.talk}" ${ext} aria-label="네이버 톡톡" title="네이버 톡톡">${ICONS.chat}</a></div>
  </div>
  <div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} Chakhan Interior. All rights reserved.</span><span>사이트 내 인테리어 사진은 AI로 생성한 예시 이미지입니다.</span></div>
</footer>

<div class="mobile-cta" aria-label="빠른 상담">
  <a href="${TEL}">${ICONS.phone}<span>전화</span></a>
  <a href="#quote">${ICONS.message}<span>견적 문의</span></a>
  <a class="booking-link" href="${RES}" ${RES.startsWith('http') ? ext : ''}>${ICONS.calendar}<span>예약</span></a>
</div>
<button class="to-top" type="button" aria-label="맨 위로">${ICONS.up}</button>
<div class="toast" role="status" aria-live="polite"></div>
`;

// ── 공통 유틸 ───────────────────────────────────────────────
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const header = $('.site-header');
const toastEl = $('.toast');
let toastTimer;
function toast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
}
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    const ta = Object.assign(document.createElement('textarea'), { value: text });
    ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0';
    document.body.append(ta); ta.select();
    let ok = false; try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove(); return ok;
  }
}
function scrollToEl(el) { el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' }); }
const preload = (src) => new Promise((res) => { const i = new Image(); i.onload = i.onerror = () => res(i); i.src = src; });

// ── 등장 애니메이션 ─────────────────────────────────────────
document.documentElement.classList.add('js');
requestAnimationFrame(() => document.body.classList.add('loaded'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0 });
  $$('.reveal').forEach((el) => io.observe(el));
} else {
  $$('.reveal').forEach((el) => el.classList.add('in'));
}

// ── 헤더 · 진행바 · 스크롤스파이 · 맨 위로 ────────────────────
const progress = $('.progress span');
const toTop = $('.to-top');
const timelineFill = $('.timeline-fill');
const timeline = $('.timeline');
const heroPhoto = $('.hero-photo img');
let ticking = false;
function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  header.classList.toggle('scrolled', y > 16);
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  toTop.classList.toggle('show', y > window.innerHeight * 1.2);
  if (!reducedMotion && y < window.innerHeight * 1.2) heroPhoto.style.transform = `translateY(${y * 0.08}px) scale(1.06)`;
  if (timeline) {
    const r = timeline.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
    timelineFill.style.transform = `scaleY(${p})`;
    $$('.step', timeline).forEach((s) => s.classList.toggle('active', s.getBoundingClientRect().top < window.innerHeight * 0.6));
  }
  ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));

const navLinks = $$('.nav > a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    navLinks.forEach((a) => {
      const on = a.getAttribute('href') === `#${e.target.id}`;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('[data-section]').forEach((s) => spy.observe(s));

// ── 모바일 메뉴 ─────────────────────────────────────────────
const toggle = $('.menu-toggle');
function setMenu(open) {
  header.classList.toggle('menu-open', open);
  document.body.classList.toggle('lock', open);
  document.documentElement.classList.toggle('lock', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
}
toggle.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')));
$$('.nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && header.classList.contains('menu-open')) { setMenu(false); toggle.focus(); } });
window.matchMedia('(min-width: 961px)').addEventListener('change', (m) => { if (m.matches) setMenu(false); });

// ── 숫자 카운트업 ───────────────────────────────────────────
const countIO = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (!e.isIntersecting) return;
  countIO.unobserve(e.target);
  const el = e.target; const target = Number(el.dataset.count);
  if (reducedMotion) { el.textContent = target; return; }
  const start = performance.now(); const dur = 1200;
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}), { threshold: 0.6 });
$$('[data-count]').forEach((el) => countIO.observe(el));

// ── 서비스 선택 ↔ 견적 문의서 동기화 ─────────────────────────
const badge = $('[data-count-badge]');
function syncServices() {
  $$('[data-pick]').forEach((b) => {
    const on = state.services.has(b.dataset.pick);
    b.setAttribute('aria-pressed', String(on));
    b.querySelector('.pick-label').textContent = on ? '견적에 담김' : '견적에 담기';
    b.querySelector('.pick-icon').innerHTML = on ? ICONS.check : ICONS.plus;
    b.closest('.service-card').classList.toggle('picked', on);
  });
  $$('[data-field="services"] .chip').forEach((c) => c.setAttribute('aria-pressed', String(state.services.has(c.dataset.value))));
  badge.hidden = state.services.size === 0;
  badge.textContent = state.services.size;
  if (state.services.size) $('#svc-error').hidden = true;
  updateQuote();
}
function toggleService(id, announce) {
  const svc = SERVICES.find((s) => s.id === id);
  if (state.services.has(id)) { state.services.delete(id); if (announce) toast(`${svc.title} 항목을 뺐어요`); }
  else { state.services.add(id); if (announce) toast(`${svc.title} 항목을 견적에 담았어요 · 총 ${state.services.size}개`); }
  syncServices();
  badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump');
}
$$('[data-pick]').forEach((b) => b.addEventListener('click', () => toggleService(b.dataset.pick, true)));

// ── 분위기 미리보기 (실사 사진 크로스페이드) ───────────────────
const view = $('.studio-view');
const [imgA, imgB] = $$('.studio-img');
let front = imgA;
let renderToken = 0;
const moodLabel = () => {
  const wall = WALLS.find((w) => w.id === state.viz.wall);
  const floor = FLOORS.find((f) => f.id === state.viz.floor);
  return `${wall.name} 벽지 · ${floor.name} · ${state.viz.light === 'warm' ? '전구색' : '주광색'}`;
};
async function renderStudio(first = false) {
  const wall = WALLS.find((w) => w.id === state.viz.wall);
  const floor = FLOORS.find((f) => f.id === state.viz.floor);
  $('#studio-name').textContent = moodLabel();
  $('#wall-name').textContent = wall.name;
  $$('.wall-swatch').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.value === wall.id)));
  $$('.floor-swatch').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.value === floor.id)));
  $$('[data-light]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.light === state.viz.light)));
  view.dataset.light = state.viz.light;
  const src = roomSrc(floor.id, wall.id);
  const alt = `${wall.name} 벽지와 ${floor.name} 바닥으로 꾸민 거실 (AI 예시 이미지)`;
  if (first) { front.src = src; front.alt = alt; return; }
  if (front.getAttribute('src') === src) return;
  const token = ++renderToken;
  view.classList.add('loading');
  await preload(src);
  if (token !== renderToken) return;
  view.classList.remove('loading');
  const back = front === imgA ? imgB : imgA;
  back.src = src; back.alt = alt; back.removeAttribute('aria-hidden');
  back.classList.add('is-front'); front.classList.remove('is-front'); front.setAttribute('aria-hidden', 'true');
  front = back;
}
$$('[data-group]').forEach((group) => group.addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return;
  state.viz[group.dataset.group] = b.dataset.value;
  renderStudio();
}));
$$('[data-light]').forEach((b) => b.addEventListener('click', () => { state.viz.light = b.dataset.light; renderStudio(); }));
$('#studio-apply').addEventListener('click', () => {
  state.mood = moodLabel();
  state.services.add('wallpaper'); state.services.add('floor');
  syncServices();
  toast('분위기 조합을 견적 문의서에 담았어요');
  scrollToEl($('#quote'));
});
renderStudio(true);
// 섹션에 가까워지면 같은 바닥의 다른 벽 색 사진을 미리 받아둡니다.
new IntersectionObserver((entries, obs) => {
  if (!entries[0].isIntersecting) return;
  obs.disconnect();
  WALLS.forEach((w) => preload(roomSrc(state.viz.floor, w.id)));
  FLOORS.forEach((f) => preload(roomSrc(f.id, state.viz.wall)));
}, { rootMargin: '600px 0px' }).observe(view);

// ── 시공 전후 비교 ──────────────────────────────────────────
const compare = $('.compare');
const handle = $('.compare-handle');
let pos = 50;
function setPos(v) {
  pos = Math.max(0, Math.min(100, v));
  compare.style.setProperty('--pos', `${pos}%`);
  handle.setAttribute('aria-valuenow', String(Math.round(pos)));
  handle.setAttribute('aria-valuetext', `시공 후 ${Math.round(pos)}% 표시`);
}
const layer = (c, which) => `<img src="${esc(c[which])}" alt="${esc(c.tab)} 시공 ${which === 'before' ? '전' : '후'} (AI 예시 이미지)" loading="lazy" draggable="false" />`;
let caseIndex = 0;
function renderCase(i, focus = false) {
  caseIndex = i;
  const c = CASES[i];
  $('.compare-before').innerHTML = layer(c, 'before');
  $('.compare-after').innerHTML = layer(c, 'after');
  $('.case-label').textContent = c.label;
  $('.case-title').innerHTML = `${esc(c.title[0])}<br /><em>${esc(c.title[1])}</em>${esc(c.title[2])}`;
  $('.case-body').textContent = c.body;
  $('.case-steps').innerHTML = c.steps.map((s, n) => `<li><b>${String(n + 1).padStart(2, '0')}</b>${esc(s)}</li>`).join('');
  $$('[role="tab"]').forEach((t, n) => { t.setAttribute('aria-selected', String(n === i)); t.tabIndex = n === i ? 0 : -1; if (n === i && focus) t.focus(); });
  $('#case-panel').setAttribute('aria-labelledby', `tab-${c.id}`);
  $('.case').classList.remove('swap'); void $('.case').offsetWidth; $('.case').classList.add('swap');
  setPos(50);
  const next = CASES[(i + 1) % CASES.length]; preload(next.before); preload(next.after);
}
$$('[role="tab"]').forEach((t) => {
  t.addEventListener('click', () => renderCase(Number(t.dataset.case)));
  t.addEventListener('keydown', (e) => {
    const n = CASES.length;
    if (e.key === 'ArrowRight') { e.preventDefault(); renderCase((caseIndex + 1) % n, true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); renderCase((caseIndex - 1 + n) % n, true); }
  });
});
let dragging = false;
const fromEvent = (e) => { const r = compare.getBoundingClientRect(); setPos(((e.clientX - r.left) / r.width) * 100); };
compare.addEventListener('pointerdown', (e) => { dragging = true; compare.setPointerCapture(e.pointerId); compare.classList.add('dragging'); fromEvent(e); });
compare.addEventListener('pointermove', (e) => { if (dragging) fromEvent(e); });
['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => compare.addEventListener(ev, () => { dragging = false; compare.classList.remove('dragging'); }));
handle.addEventListener('keydown', (e) => {
  const map = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5, PageDown: -20, PageUp: 20 };
  if (e.key in map) { e.preventDefault(); setPos(pos + map[e.key]); }
  if (e.key === 'Home') { e.preventDefault(); setPos(0); }
  if (e.key === 'End') { e.preventDefault(); setPos(100); }
});
renderCase(0);
if (!reducedMotion) {
  const hintIO = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    hintIO.disconnect();
    const frames = [[0, 50], [600, 28], [1300, 72], [1900, 50]];
    const t0 = performance.now() + 400;
    const run = (now) => {
      if (dragging) return;
      const t = now - t0;
      if (t < 0) { requestAnimationFrame(run); return; }
      const k = frames.findIndex((f) => f[0] > t);
      if (k === -1) { setPos(50); return; }
      const [ta, va] = frames[k - 1]; const [tb, vb] = frames[k];
      const p = (t - ta) / (tb - ta); const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setPos(va + (vb - va) * ease);
      requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, { threshold: 0.5 });
  hintIO.observe(compare);
}

// ── FAQ: 하나만 열기 (name 속성 미지원 브라우저용) ─────────────
$$('.faq-item').forEach((d) => d.addEventListener('toggle', () => { if (d.open) $$('.faq-item').forEach((o) => { if (o !== d) o.open = false; }); }));

// ── 견적 문의서 ─────────────────────────────────────────────
const form = $('#quote-form');
const sizeInput = $('#size');
const fields = { timing: $('#timing'), area: $('#area'), name: $('#name'), contact: $('#contact'), memo: $('#memo') };

function buildMessage() {
  const svc = SERVICES.filter((s) => state.services.has(s.id)).map((s) => s.title).join(', ') || '(미선택)';
  const lines = [
    '[착한 인테리어 견적 문의]',
    `· 공간: ${state.space} / 약 ${state.size}평`,
    `· 시공 항목: ${svc}`,
    `· 희망 시기: ${state.timing}`,
    `· 지역: ${state.area}`
  ];
  if (state.mood) lines.push(`· 원하는 분위기: ${state.mood}`);
  if (state.name.trim()) lines.push(`· 성함: ${state.name.trim()}`);
  if (state.contact.trim()) lines.push(`· 연락처: ${state.contact.trim()}`);
  if (state.memo.trim()) lines.push(`· 요청 사항: ${state.memo.trim()}`);
  return lines.join('\n');
}
function updateQuote() {
  $$('[data-field="space"] .chip').forEach((c) => c.setAttribute('aria-checked', String(c.dataset.value === state.space)));
  $('#size-out').textContent = `약 ${state.size}평`;
  sizeInput.style.setProperty('--fill', `${((state.size - 3) / 97) * 100}%`);
  const moodTag = $('#mood-tag');
  moodTag.hidden = !state.mood;
  if (state.mood) moodTag.querySelector('strong').textContent = state.mood;
  $('#quote-preview').textContent = buildMessage();
  store.set('chakhan-quote', { services: [...state.services], space: state.space, size: state.size, timing: state.timing, area: state.area, name: state.name, contact: state.contact, memo: state.memo });
}

sizeInput.value = state.size;
Object.entries(fields).forEach(([k, el]) => { el.value = state[k]; el.addEventListener('input', () => { state[k] = el.value; updateQuote(); }); });
sizeInput.addEventListener('input', () => { state.size = Number(sizeInput.value); updateQuote(); });
$('[data-field="space"]').addEventListener('click', (e) => { const c = e.target.closest('.chip'); if (c) { state.space = c.dataset.value; updateQuote(); } });
$('[data-field="space"]').addEventListener('keydown', (e) => {
  if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) return;
  e.preventDefault();
  const opts = QUOTE_OPTIONS.space; const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
  state.space = opts[(opts.indexOf(state.space) + d + opts.length) % opts.length];
  updateQuote();
  $(`[data-field="space"] .chip[data-value="${state.space}"]`).focus();
});
$('[data-field="services"]').addEventListener('click', (e) => { const c = e.target.closest('.chip'); if (c) toggleService(c.dataset.value, false); });
$('#mood-tag button').addEventListener('click', () => { state.mood = null; updateQuote(); });

function validate() {
  if (state.services.size === 0) {
    $('#svc-error').hidden = false;
    $('[data-field="services"] .chip').focus();
    return false;
  }
  return true;
}
async function copyQuote() {
  const ok = await copyText(buildMessage());
  toast(ok ? `견적 내용을 복사했어요 · ${PHONE}로 보내주세요` : '복사에 실패했어요. 미리보기 내용을 직접 선택해 복사해 주세요');
  if (!ok) form.querySelector('.preview').open = true;
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validate()) return;
  if (isTouch) {
    const sep = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent) ? '&' : '?';
    window.location.href = `sms:${PHONE.replace(/-/g, '')}${sep}body=${encodeURIComponent(buildMessage())}`;
  } else {
    copyQuote();
  }
});
$('#copy-quote')?.addEventListener('click', () => { if (validate()) copyQuote(); });

// ── 복사 버튼 · 예약 링크 ───────────────────────────────────
$$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
  const ok = await copyText(b.dataset.copy);
  toast(ok ? b.dataset.copyMsg : '복사에 실패했어요');
}));
$$('.booking-link').forEach((a) => a.addEventListener('click', (e) => {
  if (RES !== PLACEHOLDER_RESERVATION) return;
  e.preventDefault();
  const note = $('#reservation');
  scrollToEl(note);
  note.classList.remove('pulse'); void note.offsetWidth; note.classList.add('pulse');
  toast('네이버 예약은 준비 중이에요. 전화나 문자로 먼저 상담해 주세요');
}));
if (RES !== PLACEHOLDER_RESERVATION) $('#reservation').hidden = true;

syncServices();
