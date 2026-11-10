// SVG 아이콘과 일러스트(방 장면) 생성 함수

const svg = (body, size = 24, extra = '') =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${body}</svg>`;

export const ICONS = {
  roll: svg('<rect x="3" y="4" width="13" height="7" rx="3.5"/><path d="M16 7.5h3.5V14H11v6"/><path d="M9.5 20h3"/>', 40),
  floor: svg('<path d="M3 17l5-10h13l-5 10H3z"/><path d="M8.5 17l5-10M14 17l5-10"/><path d="M5.5 12h13"/>', 40),
  door: svg('<rect x="6" y="3" width="12" height="18" rx="1"/><path d="M9 6h6v5H9zM9 14h6v4"/><circle cx="15.5" cy="12.5" r=".6" fill="currentColor"/>', 40),
  tile: svg('<rect x="3.5" y="3.5" width="17" height="17" rx="1.5"/><path d="M3.5 9.2h17M3.5 14.8h17M9.2 3.5v17M14.8 3.5v17"/>', 40),
  brush: svg('<path d="M14 4l6 6-7.5 7.5-6-6z"/><path d="M6.5 11.5L4 14c-1 1-1 3 0 4s3 1 4 0l2.5-2.5"/><path d="M11 7l6 6"/>', 40),
  store: svg('<path d="M4 9.5V20h16V9.5"/><path d="M3 9.5l2-5.5h14l2 5.5c0 1.4-1.2 2.5-2.6 2.5s-2.4-1.1-2.4-2.5c0 1.4-1.1 2.5-2.5 2.5S10 10.9 10 9.5c0 1.4-1.1 2.5-2.5 2.5S5 10.9 5 9.5"/><path d="M10 20v-5h4v5"/>', 40),
  phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>', 18),
  message: svg('<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>', 18),
  arrow: svg('<path d="M7 17L17 7M9 7h8v8"/>', 16),
  right: svg('<path d="M5 12h14M13 6l6 6-6 6"/>', 16),
  copy: svg('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h3"/>', 16),
  check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 16),
  plus: svg('<path d="M12 5v14M5 12h14"/>', 16),
  map: svg('<path d="M12 21s-7-6.2-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>', 18),
  calendar: svg('<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', 18),
  up: svg('<path d="M12 19V5M6 11l6-6 6 6"/>', 18),
  sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', 16),
  bulb: svg('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>', 16)
};

// ── 원근 방 장면 ────────────────────────────────────────────
// 소실점(400,190) 기준 1점 투시. 뒷벽: x 140~660, y 50~330
const VP = { x: 400, y: 190 };
const projectX = (x) => VP.x + (x - VP.x) * (330 - VP.y) / (500 - VP.y);
const depthY = (d) => VP.y + (500 - VP.y) / d; // d=1 → 500(앞), d≈2.21 → 330(뒤)

function floorPattern({ a, b, type }) {
  let out = '';
  const step = type === 'tile' ? 140 : type === 'herringbone' ? 60 : 80;
  let i = 0;
  for (let x = -900; x < 1700; x += step, i++) {
    const x2 = x + step;
    const fill = i % 2 ? b : a;
    out += `<polygon points="${x},500 ${x2},500 ${projectX(x2)},330 ${projectX(x)},330" fill="${fill}"/>`;
    out += `<line x1="${x}" y1="500" x2="${projectX(x)}" y2="330" stroke="rgba(0,0,0,.14)" stroke-width="1"/>`;
  }
  // 가로 이음매
  const depths = type === 'tile' ? [1.25, 1.6, 2.0] : [1.15, 1.35, 1.6, 1.9];
  depths.forEach((d, j) => {
    const y = depthY(d);
    if (type === 'plank') {
      // 판재 엇갈림: 짧은 이음선
      for (let x = -900 + (j % 2) * 40; x < 1700; x += 160) {
        const t = (500 - y) / (500 - 330);
        const px = x + (projectX(x) - x) * t;
        const px2 = (x + 80) + (projectX(x + 80) - (x + 80)) * t;
        out += `<line x1="${px}" y1="${y}" x2="${px2}" y2="${y}" stroke="rgba(0,0,0,.12)" stroke-width="1"/>`;
      }
    } else if (type === 'herringbone') {
      for (let x = -900; x < 1700; x += 60) {
        const t = (500 - y) / (500 - 330);
        const px = x + (projectX(x) - x) * t;
        const px2 = (x + 60) + (projectX(x + 60) - (x + 60)) * t;
        const dy = 10 * (1 - t * 0.6);
        const dir = Math.round(x / 60) % 2 ? 1 : -1;
        out += `<line x1="${px}" y1="${y - dy * dir}" x2="${px2}" y2="${y + dy * dir}" stroke="rgba(0,0,0,.16)" stroke-width="1"/>`;
      }
    } else {
      out += `<line x1="0" y1="${y}" x2="800" y2="${y}" stroke="rgba(255,255,255,.22)" stroke-width="1.5"/>`;
    }
  });
  return out;
}

/**
 * @param {object} o
 * @param {string} o.wall 뒷벽 색  @param {string} o.side 옆벽 색
 * @param {object} o.floor {a,b,type}
 * @param {'day'|'warm'} [o.light]
 * @param {boolean} [o.worn] 시공 전(얼룩·들뜸)
 * @param {boolean} [o.plant]
 */
export function roomSVG({ id, wall, side, floor, light = 'day', worn = false, plant = true }) {
  const clip = `floorClip-${id}`;
  const glow = light === 'warm' ? '#ffcf8a' : '#e9f2ff';
  return `
  <svg class="room-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
    <defs>
      <clipPath id="${clip}"><polygon points="0,500 140,330 660,330 800,500"/></clipPath>
      <linearGradient id="sky-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${worn ? '#6f8187' : '#9fc0cc'}"/><stop offset="1" stop-color="${worn ? '#b5c0bb' : '#eef3ec'}"/>
      </linearGradient>
      <radialGradient id="lamp-${id}" cx=".5" cy="0" r="1">
        <stop offset="0" stop-color="${glow}" stop-opacity="${light === 'warm' ? .55 : .28}"/><stop offset="1" stop-color="${glow}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="beam-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity="${worn ? .06 : .22}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <!-- 천장 / 벽 -->
    <polygon points="0,0 800,0 660,50 140,50" fill="${worn ? '#8e8b84' : '#f3f1ec'}"/>
    <polygon points="0,0 140,50 140,330 0,500" fill="${side}"/>
    <polygon points="800,0 660,50 660,330 800,500" fill="${side}"/>
    <rect x="140" y="50" width="520" height="280" fill="${wall}"/>
    <polygon points="0,0 140,50 140,330 0,500" fill="#000" opacity=".06"/>
    <!-- 창문 -->
    <rect x="210" y="96" width="210" height="158" fill="url(#sky-${id})"/>
    <rect x="210" y="96" width="210" height="158" fill="none" stroke="${worn ? '#5b5a55' : '#2b2a27'}" stroke-width="7"/>
    <path d="M315 96v158M210 175h210" stroke="${worn ? '#5b5a55' : '#2b2a27'}" stroke-width="4"/>
    <!-- 바닥 -->
    <g clip-path="url(#${clip})">
      ${floorPattern(floor)}
      <polygon points="210,330 420,330 470,500 120,500" fill="url(#beam-${id})"/>
      ${worn ? '<ellipse cx="560" cy="420" rx="90" ry="22" fill="#000" opacity=".16"/><path d="M640 470l60-30 40 34z" fill="#fff" opacity=".18"/>' : ''}
    </g>
    <!-- 걸레받이 -->
    <rect x="140" y="322" width="520" height="8" fill="${worn ? '#76736b' : '#fbfaf6'}"/>
    <!-- 소파 -->
    <g transform="translate(452 252)">
      <rect x="0" y="0" width="186" height="42" rx="10" fill="${worn ? '#5d5a54' : '#3a3834'}"/>
      <rect x="-8" y="30" width="202" height="36" rx="9" fill="${worn ? '#55524c' : '#2f2d2a'}"/>
      <rect x="10" y="8" width="44" height="30" rx="8" fill="${worn ? '#6b6861' : '#c8102e'}" opacity="${worn ? 1 : .9}"/>
      <rect x="6" y="64" width="6" height="12" fill="#1d1c1a"/><rect x="176" y="64" width="6" height="12" fill="#1d1c1a"/>
    </g>
    <!-- 조명 -->
    <line x1="560" y1="50" x2="560" y2="118" stroke="#2b2a27" stroke-width="2"/>
    <path d="M538 140 L560 116 L582 140 Z" fill="#2b2a27"/>
    <ellipse cx="560" cy="250" rx="${light === 'warm' ? 190 : 150}" ry="${light === 'warm' ? 150 : 120}" fill="url(#lamp-${id})"/>
    ${plant ? `
    <g transform="translate(168 236)">
      <path d="M8 96h34l-5 30H13z" fill="${worn ? '#6d6a63' : '#e9e3d6'}"/>
      <path d="M25 96C20 70 6 58-6 50M25 96c2-30 14-48 30-58M25 96c-2-24-2-48 4-70" stroke="#4d5f48" stroke-width="3" fill="none"/>
      <ellipse cx="-6" cy="48" rx="16" ry="7" transform="rotate(-30 -6 48)" fill="#5f7657"/>
      <ellipse cx="56" cy="38" rx="17" ry="7" transform="rotate(-38 56 38)" fill="#6b8462"/>
      <ellipse cx="30" cy="24" rx="7" ry="17" fill="#566c4f"/>
      <ellipse cx="6" cy="72" rx="13" ry="6" transform="rotate(-20 6 72)" fill="#6b8462"/>
    </g>` : ''}
    ${worn ? `
    <!-- 얼룩 · 들뜸 -->
    <ellipse cx="520" cy="120" rx="46" ry="30" fill="#5b4a2e" opacity=".16"/>
    <ellipse cx="590" cy="200" rx="22" ry="34" fill="#4c4636" opacity=".14"/>
    <path d="M140 50 L190 50 L150 92 Z" fill="#000" opacity=".1"/>
    <path d="M150 92 L190 50 L176 96 Z" fill="#fff" opacity=".22"/>
    <path d="M440 300 q20 -16 46 -4" stroke="#3a372f" stroke-width="1.2" fill="none" opacity=".5"/>
    <path d="M60 220 q10 40 -6 90" stroke="#3a372f" stroke-width="1.2" fill="none" opacity=".35"/>
    <rect x="0" y="0" width="800" height="500" fill="#2a2620" opacity=".22"/>` : ''}
    <rect x="0" y="0" width="800" height="500" fill="${light === 'warm' ? '#ff9a3c' : '#9cc0ff'}" opacity="${light === 'warm' ? .1 : .035}" style="mix-blend-mode:multiply"/>
  </svg>`;
}
