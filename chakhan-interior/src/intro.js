// ─────────────────────────────────────────────────────────────
//  첫 방문 로고 인트로 — 유리 렌즈 속에서 로고가 나타난 뒤 홈페이지가 열립니다.
//  · 같은 탭(세션)에서는 한 번만 재생  · 화면 클릭 / Esc / 건너뛰기로 즉시 넘김
//  · 주소 뒤에 ?intro 를 붙이면 언제든 다시 볼 수 있어요 (?nointro 는 끄기)
//  · 동작 줄이기 설정, WebGL2 미지원 기기에서는 간단한 페이드로 대체
// ─────────────────────────────────────────────────────────────
import { createGlassReveal } from './components/ui/liquid-glass-logo-reveal.ts';

const SEEN_KEY = 'chakhan-intro-seen';
const LOGO = '/assets/brand/mark-hires.png';

function seen() { try { return sessionStorage.getItem(SEEN_KEY) === '1'; } catch { return false; } }
function markSeen() { try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* 저장 불가 환경 */ } }

export function runIntro(onDone) {
  const params = new URLSearchParams(location.search);
  // 개발용: ?introAt=1.5 → 인트로를 1.5초 지점에 멈춰서 보여줍니다.
  const freezeAt = params.has('introAt') ? Number(params.get('introAt')) : undefined;
  const force = params.has('intro') || freezeAt !== undefined;
  if ((seen() && !force) || params.has('nointro')) { onDone(); return; }
  markSeen();

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  root.classList.add('splash-active');

  const el = document.createElement('div');
  el.className = 'splash';
  el.innerHTML = `
    <div class="splash-stage" role="img" aria-label="착한 인테리어 로고"></div>
    <div class="splash-word" aria-hidden="true"><strong>착한 인테리어</strong><span>INTERIOR DESIGN</span></div>
    <button class="splash-skip" type="button">건너뛰기</button>`;
  document.body.prepend(el);
  const stage = el.querySelector('.splash-stage');

  let finished = false;
  let reveal = null;
  function onKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish();
  }
  function finish() {
    if (finished) return;
    finished = true;
    document.removeEventListener('keydown', onKey);
    el.classList.add('is-leaving');
    root.classList.remove('splash-active');
    onDone();
    setTimeout(() => { reveal?.dispose(); el.parentNode?.removeChild(el); }, 900);
  }
  el.querySelector('.splash-skip').addEventListener('click', (e) => { e.stopPropagation(); finish(); });
  el.addEventListener('click', finish);
  document.addEventListener('keydown', onKey);

  // 대체 연출: 로고 페이드인 → 잠시 머무름 → 홈페이지
  function fallback() {
    if (finished) return;
    el.classList.add('is-fallback');
    stage.innerHTML = `<img class="splash-fallback" src="${LOGO}" alt="" />`;
    requestAnimationFrame(() => el.classList.add('show-word'));
    setTimeout(finish, reduced ? 900 : 1800);
  }
  if (reduced) { fallback(); return; }

  reveal = createGlassReveal(stage, {
    logo: LOGO,
    look: 'dark',
    background: '#0f0e0c', // 홈페이지 배경색
    plateColor: '#1b1a16', // 유리 판 뒤 카드 색 (홈페이지 카드와 같은 톤)
    logoColor: '#f4efe5', // 크림색 로고
    originalColors: true, // 창문의 브랜드 레드를 살림
    tileSize: 300,
    logoScale: 0.66,
    finalScale: 0.92,
    speed: 1.1,
    tuning: { halo: 0.55, present: 2.1 },
    time: freezeAt,
    onTime(t, end) {
      lastFrame = performance.now();
      if (t > end - 1.0) el.classList.add('show-word');
    },
    onEnd() { setTimeout(finish, 700); },
    onError() { fallback(); },
  });
  if (!reveal) { fallback(); return; }

  // 안전장치: 로고 준비나 그리기가 3초 넘게 멈추면, 또는 전체가 9초를 넘기면 바로 홈페이지로 넘어갑니다.
  let lastFrame = performance.now();
  const startedAt = lastFrame;
  if (window.__SPLASH_NO_TIMEOUT || freezeAt !== undefined) return; // 테스트용
  const watchdog = setInterval(() => {
    if (finished) { clearInterval(watchdog); return; }
    const now = performance.now();
    if (now - lastFrame > 3000 || now - startedAt > 9000) { clearInterval(watchdog); finish(); }
  }, 500);
}
