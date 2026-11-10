// SVG 아이콘

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
  bulb: svg('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>', 16),
  clock: svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>', 16),
  chat: svg('<path d="M12 4c4.7 0 8.5 3 8.5 6.8s-3.8 6.7-8.5 6.7c-.9 0-1.8-.1-2.6-.3L5 19.5l1.2-3.4C4.5 14.9 3.5 13 3.5 10.8 3.5 7 7.3 4 12 4z"/>', 16),
  ticket: svg('<path d="M4 7h16v3a2 2 0 000 4v3H4v-3a2 2 0 000-4z"/><path d="M14 7v10" stroke-dasharray="2 2"/>', 18),
  star: svg('<path d="M12 4l2.4 5 5.4.6-4 3.7 1.1 5.3L12 16l-4.9 2.6 1.1-5.3-4-3.7 5.4-.6z"/>', 14),
  instagram: svg('<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".6" fill="currentColor"/>', 16),
  blog: svg('<path d="M5 4h10l4 4v12H5z"/><path d="M15 4v4h4M8.5 12h7M8.5 15.5h5"/>', 16),
  cafe: svg('<path d="M5 9h11v5a5 5 0 01-5 5h-1a5 5 0 01-5-5z"/><path d="M16 10.5h1.5a2.5 2.5 0 010 5H16M8 3.5v2.5M11 3.5v2.5"/>', 16),
  youtube: svg('<rect x="3.5" y="6" width="17" height="12" rx="3.5"/><path d="M10.5 9.5l4 2.5-4 2.5z" fill="currentColor"/>', 16)
};
