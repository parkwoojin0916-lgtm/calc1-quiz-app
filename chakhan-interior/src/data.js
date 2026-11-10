// ─────────────────────────────────────────────────────────────
//  사이트 설정 · 콘텐츠
//  업체 정보나 문구를 바꿀 때는 이 파일만 수정하면 됩니다.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: '착한 도배 장판 인테리어 청주점',
  shortName: '착한',
  phone: '010-8887-4785',
  address: '충북 청주시 청원구 향군로 113, 1층',
  addressLines: ['충북 청주시 청원구', '향군로 113, 1층'],
  // 실제 네이버 예약 URL을 받으면 이 한 줄만 교체하면 모든 예약 버튼에 반영됩니다.
  reservationUrl: '#reservation',
  areas: ['청주 상당구', '청주 서원구', '청주 흥덕구', '청주 청원구', '오창', '오송', '세종', '충청권 상담']
};

export const PLACEHOLDER_RESERVATION = '#reservation';

// [번호, 이름, 세부 항목, 설명, 아이콘 키]
export const SERVICES = [
  { id: 'wallpaper', num: '01', title: '도배', meta: ['실크', '합지', '부분도배'], desc: '벽면 상태와 채광을 먼저 보고, 오래 편안한 색을 고릅니다.', icon: 'roll' },
  { id: 'floor', num: '02', title: '장판 · 마루', meta: ['장판', '강마루', '데코타일'], desc: '생활 방식과 예산에 맞춰 바닥의 질감과 내구도를 제안합니다.', icon: 'floor' },
  { id: 'film', num: '03', title: '필름 · 목공', meta: ['문', '샤시', '가구', '몰딩'], desc: '보이는 면과 손이 닿는 면의 마감을 같은 기준으로 관리합니다.', icon: 'door' },
  { id: 'bath', num: '04', title: '욕실 · 주방', meta: ['타일', '욕실', '싱크대'], desc: '매일 쓰는 공간일수록 동선과 관리 편의성을 함께 봅니다.', icon: 'tile' },
  { id: 'partial', num: '05', title: '부분 리모델링', meta: ['누수', '도장', '수납'], desc: '필요한 곳만 정확하게. 공사 범위를 줄여도 결과는 선명하게.', icon: 'brush' },
  { id: 'store', num: '06', title: '상가 인테리어', meta: ['학원', '사무실', '매장'], desc: '업종과 사용자를 고려해 공정과 마감 순서를 설계합니다.', icon: 'store' }
];

export const TICKER = ['도배', '장판', '마루', '데코타일', '필름', '목공', '욕실', '타일', '주방', '수납', '도장', '누수', '리모델링', '상가 인테리어'];

export const PILLARS = [
  { k: '01', title: '먼저 듣고, 직접 봅니다', body: '사진·평수·원하는 분위기를 듣고 방문해 벽면과 바닥 상태, 채광을 직접 확인합니다.' },
  { k: '02', title: '이유가 있는 견적', body: '자재와 공정이 왜 필요한지 설명합니다. 꼭 필요한 범위만 제안합니다.' },
  { k: '03', title: '대표가 끝까지 관리', body: '보양부터 마감 확인까지 대표가 직접 챙기고, 사용·A/S 방법까지 안내합니다.' }
];

// 분위기 미리보기 — 벽/바닥 팔레트
export const WALLS = [
  { id: 'white', name: '퓨어 화이트', hex: '#f4f2ec', shade: '#dedad0' },
  { id: 'ivory', name: '웜 아이보리', hex: '#efe6d4', shade: '#d9ccb4' },
  { id: 'greige', name: '그레이지', hex: '#d6cfc4', shade: '#bdb4a6' },
  { id: 'sage', name: '세이지 그린', hex: '#c9d0bd', shade: '#adb69e' },
  { id: 'blue', name: '더스티 블루', hex: '#c3ccd3', shade: '#a6b1ba' },
  { id: 'charcoal', name: '차콜 포인트', hex: '#55534f', shade: '#43413e' }
];

export const FLOORS = [
  { id: 'oak', name: '라이트 오크', a: '#c9a57f', b: '#b8936c', type: 'plank' },
  { id: 'natural', name: '내추럴 메이플', a: '#d9bf98', b: '#c9ac83', type: 'plank' },
  { id: 'walnut', name: '월넛', a: '#7a5a43', b: '#6a4c37', type: 'plank' },
  { id: 'herring', name: '헤링본', a: '#b38d68', b: '#9f7a57', type: 'herringbone' },
  { id: 'stone', name: '그레이 타일', a: '#a9a7a1', b: '#97958f', type: 'tile' }
];

// 현장 기록 — 실제 사진이 생기면 before/after 에 이미지 경로를 넣으세요.
// 예) before: '/assets/cases/apt-before.jpg', after: '/assets/cases/apt-after.jpg'
export const CASES = [
  {
    id: 'apt',
    tab: '아파트 거실',
    label: 'CASE 01 / APARTMENT',
    title: ['화이트 벽지 하나로', '빛의 밀도', '를 바꾼 현장'],
    body: '얼룩진 벽면을 정리하고, 생활광이 잘 퍼지는 톤을 선택했습니다. 색을 바꾸는 일은 공간의 쓰임을 다시 설계하는 일입니다.',
    steps: ['현장 체크', '실크 벽지 제안', '마감 확인'],
    scene: { beforeWall: '#9d9b92', afterWall: '#f4f1e8', beforeFloor: ['#6e6d67', '#7f7e76'], afterFloor: ['#c9a57f', '#b8936c'], plant: true },
    before: null,
    after: null
  },
  {
    id: 'room',
    tab: '원룸 바닥',
    label: 'CASE 02 / STUDIO',
    title: ['들뜬 장판을', '강마루', '로 바꾼 원룸'],
    body: '들뜨고 변색된 장판을 걷어내고 바닥 수평부터 다시 잡았습니다. 작은 공간일수록 바닥 톤이 공간의 넓이를 결정합니다.',
    steps: ['바닥 수평 확인', '강마루 시공', '걸레받이 마감'],
    scene: { beforeWall: '#b8b3a6', afterWall: '#ebe5d8', beforeFloor: ['#8a7a5a', '#7a6b4e'], afterFloor: ['#d9bf98', '#c9ac83'], plant: false },
    before: null,
    after: null
  },
  {
    id: 'store',
    tab: '상가 · 학원',
    label: 'CASE 03 / COMMERCIAL',
    title: ['집중이 잘 되는', '차분한 톤', '의 학원'],
    body: '학생 동선과 조명 반사를 고려해 벽은 차분하게, 바닥은 관리가 쉬운 데코타일로 마감했습니다.',
    steps: ['동선 확인', '데코타일 · 도장', '야간 공정'],
    scene: { beforeWall: '#a49e90', afterWall: '#c9d0bd', beforeFloor: ['#77746d', '#6a6760'], afterFloor: ['#a9a7a1', '#97958f'], plant: true },
    before: null,
    after: null
  }
];

export const STEPS = [
  { n: '01', title: '상담 · 현장 체크', sub: '벽면 · 바닥 · 빛', body: '전화나 문자로 공간 사진과 평수를 먼저 받고, 일정을 맞춰 무료로 방문해 상태를 확인합니다.' },
  { n: '02', title: '견적 제안', sub: '자재 · 범위 · 일정', body: '샘플을 보며 자재를 고르고, 범위와 일정, 비용이 달라지는 이유를 함께 정리합니다.' },
  { n: '03', title: '시공 관리', sub: '공정 · 보양 · 마감', body: '가구와 바닥 보양부터 시작해 공정 순서대로 진행하고, 진행 상황을 공유합니다.' },
  { n: '04', title: '마감 확인 · A/S', sub: '사용 · 관리 안내', body: '시공이 끝나면 함께 마감을 확인하고, 관리 방법과 A/S 절차를 안내합니다.' }
];

export const METRICS = [
  { value: 4, suffix: '', label: '단계로 이어지는\n상담과 시공' },
  { value: 13, suffix: '+', label: '가지 이상의\n마감 공정 대응' },
  { value: 1, suffix: '', label: '대표 직통\n상담 라인' }
];

export const FAQ = [
  { q: '방문 견적에 비용이 드나요?', a: '청주 전 지역과 오창·오송·세종 등 충청권은 무료로 방문 견적을 드립니다. 일정만 미리 맞춰 주세요.' },
  { q: '견적 전에 무엇을 준비하면 좋을까요?', a: '공간 사진 몇 장, 대략적인 평수, 원하는 분위기(참고 이미지)면 충분합니다. 아래 견적 문의 양식으로 정리해 문자로 보내주셔도 됩니다.' },
  { q: '시공 기간은 얼마나 걸리나요?', a: '공간 크기, 시공 항목, 기존 마감 상태에 따라 달라집니다. 방문 후 공정별 일정을 정리해 미리 안내드립니다.' },
  { q: '짐이 있는 상태에서도 시공할 수 있나요?', a: '가능한 경우가 많습니다. 현장 확인 시 가구 이동과 보양 범위를 함께 협의합니다.' },
  { q: '부분 도배나 작은 수리도 맡길 수 있나요?', a: '네. 방 한 칸 도배, 누수 흔적 보수, 부분 장판 교체처럼 필요한 곳만 정확하게 시공합니다.' },
  { q: '시공 후 문제가 생기면 어떻게 하나요?', a: '마감 확인 시 A/S 방법을 안내드리며, 대표 직통 번호로 바로 연락하실 수 있습니다.' }
];

export const QUOTE_OPTIONS = {
  space: ['아파트', '주택 · 빌라', '원룸 · 오피스텔', '상가 · 사무실'],
  timing: ['가능한 빨리', '1개월 이내', '1~3개월', '일정 미정']
};
