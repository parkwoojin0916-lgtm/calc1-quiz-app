# 착한 도배 장판 인테리어 청주점 홈페이지 (v2)

Vite + 바닐라 JS로 만든 원페이지 사이트입니다.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # dist/ 에 배포용 파일 생성
```

## 자주 바꾸는 곳 — `src/data.js` 하나만 수정하면 됩니다

| 바꿀 내용 | 위치 |
| --- | --- |
| 전화번호 · 주소 · 방문 지역 | `SITE` |
| **네이버 예약 링크** | `SITE.reservationUrl` (`'#reservation'` → 실제 URL) |
| 서비스 카드 | `SERVICES` |
| **시공 사례 실제 사진** | `CASES[].before / after` 에 `/assets/cases/xxx.jpg` 경로 입력 (`public/assets/cases/`에 사진 저장) |
| 분위기 미리보기 색상 | `WALLS`, `FLOORS` |
| 진행 단계 · FAQ | `STEPS`, `FAQ` |

## v3 (현재)

**디자인**
- 따뜻한 차콜 · 크림 · 샌드 톤과 세리프(Instrument Serif) 포인트의 에디토리얼 스타일
- 히어로: 3D 로고 · 궤도 장식 대신 실사 인테리어 사진 + 정보 카드
- 움직이던 키워드 띠(✳ 기호가 iPhone · iPad에서 초록 이모지로 보이던 문제 포함)를 정적인 "14가지 시공 범위" 밴드로 교체

**분위기 미리보기 · 시공 전후 = 실사 이미지**
- Higgsfield(Seedream 5.0 Flash)로 거실 사진 1장을 만들고, 같은 구도에서 바닥재만 바꾼 사진 3장을 추가 생성
- 벽 영역을 자동으로 따서(`tools/wall_mask.py`) 6가지 벽지 색을 빛 · 그림자를 유지한 채 합성(`tools/compose_rooms.py`)
  → 바닥 4종 × 벽지 6색 = 24장 (`public/assets/rooms/`), 조명(주광/전구색)은 색 보정으로 표현
- 시공 전후 3사례: "전" 사진을 만들고 같은 방을 편집해 "후" 사진 생성 (`public/assets/cases/`)
- **모든 인테리어 사진은 AI 예시 이미지**이며, 사이트에도 그렇게 표시되어 있습니다.
  실제 시공 사진이 생기면 `src/data.js`의 `CASES` 경로만 바꾸면 됩니다.

## v2에서 달라진 점

**디자인**
- 한글 전용 폰트(Pretendard) 적용, 단어 중간 줄바꿈 방지(`keep-all`)
- 히어로: 줄 단위 텍스트 등장, 마우스를 따라오는 조명, 3D 틸트 로고, 떠다니는 정보 칩
- 둥근 카드형 레이아웃, 마우스 위치에 반응하는 서비스 카드, 2줄 키워드 티커
- 스크롤 진행바, 현재 섹션 메뉴 표시, 맨 위로 버튼, 전체화면 모바일 메뉴
- 로고 이미지 최적화 (2MB PNG → 40KB WebP), 파비콘·OG 이미지·검색엔진용 업체 정보(JSON-LD) 추가

**기능**
- **견적에 담기**: 서비스 카드에서 고른 항목이 견적 문의서에 자동 반영 (헤더에 개수 배지)
- **분위기 미리보기**: 벽지 6색 × 바닥재 5종 × 조명(주광/전구색) × 포인트 벽 조합을 일러스트 방에서 바로 확인 → "이 조합으로 상담하기"
- **시공 전후 비교**: 사례 3개 탭 + 드래그/키보드 슬라이더 (실제 사진으로 교체 가능)
- **30초 견적 문의서**: 공간·평수·항목·시기·지역 선택 → 휴대폰에서는 문자 앱이 내용이 채워진 채로 열리고, PC에서는 클립보드로 복사. 입력값은 기기에 임시 저장(서버 전송 없음)
- **FAQ 아코디언**, 진행 단계 스크롤 타임라인, 지도(네이버·카카오) 바로가기, 주소·전화번호 복사
- 모바일 하단 고정 바: 전화 / 견적 문의 / 예약

> 시공 사례 이미지는 현재 일러스트입니다. 실제 시공 사진으로 바꾸는 것을 추천드려요.

## 배포 (Cloudflare Pages)

- 주소: https://chakhan-interior.pages.dev (Cloudflare Pages 프로젝트 `chakhan-interior`, 직접 업로드 방식)
- 다시 배포하기: `npm run build` 후 `npx wrangler pages deploy dist --project-name chakhan-interior`
- 도메인 연결: Cloudflare 대시보드 → Workers & Pages → chakhan-interior → Custom domains
- GitHub 자동 배포를 원하면 GitHub 업로드 후 Cloudflare에서 Git 연동 프로젝트로 다시 만들면 됩니다
  (빌드 명령 `npm run build`, 출력 폴더 `dist`, 루트 폴더 `chakhan-interior`)
- 캐시: 해시가 붙은 빌드 파일만 1년, `rooms/` · `cases/` 사진은 1일 (`public/_headers`)
