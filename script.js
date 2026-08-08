// ---------- 난이도 선택 ----------
const diffButtons = document.querySelectorAll(".diff-btn");
diffButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    diffButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// ---------- 개념 선택 ----------
const conceptSelect = document.getElementById("conceptSelect");
conceptSelect.addEventListener("change", () => {
  // 문제 데이터 연동 시 여기서 필터링 처리
});

// ---------- 정답 확인 / 다음 문제 / 비슷한 문제 (문제 데이터 연동 전 placeholder) ----------
const checkAnswerBtn = document.getElementById("checkAnswerBtn");
const nextBtn = document.getElementById("nextBtn");
const similarBtn = document.getElementById("similarBtn");
const feedback = document.getElementById("feedback");

checkAnswerBtn.addEventListener("click", () => {
  feedback.textContent = "문제 데이터가 연결되면 채점이 가능합니다.";
  feedback.className = "feedback";
});

nextBtn.addEventListener("click", () => {
  feedback.textContent = "";
});

similarBtn.addEventListener("click", () => {
  feedback.textContent = "";
});

// ---------- 노트 캔버스 (손글씨/펜) ----------
const canvas = document.getElementById("noteCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let currentColor = "#1d4ed8";
let currentWidth = 3;
let toolMode = "pen"; // "pen" | "eraser"

// 완성된 선(획) 목록. 지우개는 이 목록에서 통째로 하나를 지운다.
let strokes = [];
let currentStroke = null;
let erasedSomething = false;

const ERASER_TOUCH_RADIUS = 14; // 지우개가 선에 "닿았다"고 판단하는 여유 반경(px)

// 고해상도 화면(레티나 등)에서 선이 계단처럼 보이지 않도록
// 캔버스의 실제 픽셀 크기를 devicePixelRatio에 맞춰 보정한다.
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);

  // 매번 새로 설정해야 리사이즈를 반복해도 배율이 누적되지 않는다.
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  redrawAll();
}

window.addEventListener("resize", resizeCanvas);

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top, pressure: e.pressure || 0.5 };
}

function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

// 점과 점을 직선(lineTo)으로 잇지 않고, 최근 세 점을 2차 베지어 곡선으로
// 이어 그려서 손글씨처럼 매끄러운 곡선이 나오게 한다.
function drawSegment(p0, p1, p2, isFirst, color, width) {
  const start = isFirst ? p0 : midpoint(p0, p1);
  const end = midpoint(p1, p2);
  const pressureScale = 0.6 + p1.pressure * 0.8;

  ctx.strokeStyle = color;
  ctx.lineWidth = width * pressureScale;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.quadraticCurveTo(p1.x, p1.y, end.x, end.y);
  ctx.stroke();
}

function drawStrokeFull(stroke) {
  const pts = stroke.points;
  if (pts.length < 2) return;
  if (pts.length === 2) {
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    ctx.lineTo(pts[1].x, pts[1].y);
    ctx.stroke();
    return;
  }
  for (let i = 0; i < pts.length - 2; i++) {
    drawSegment(pts[i], pts[i + 1], pts[i + 2], i === 0, stroke.color, stroke.width);
  }
}

function redrawAll() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.globalCompositeOperation = "source-over";
  strokes.forEach(drawStrokeFull);
}

// 점 p가 선분 v-w에서 얼마나 떨어져 있는지(제곱 거리)
function distToSegmentSq(p, v, w) {
  const l2 = (w.x - v.x) ** 2 + (w.y - v.y) ** 2;
  if (l2 === 0) return (p.x - v.x) ** 2 + (p.y - v.y) ** 2;
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  const projX = v.x + t * (w.x - v.x);
  const projY = v.y + t * (w.y - v.y);
  return (p.x - projX) ** 2 + (p.y - projY) ** 2;
}

// 지우개가 닿은 선(획) 전체를 목록에서 제거한다. 지운 것이 있으면 true.
function eraseAt(pos) {
  for (let i = strokes.length - 1; i >= 0; i--) {
    const stroke = strokes[i];
    const threshold = ERASER_TOUCH_RADIUS + stroke.width / 2;
    const thresholdSq = threshold * threshold;
    const pts = stroke.points;

    let hit = pts.length === 1 && distToSegmentSq(pos, pts[0], pts[0]) <= thresholdSq;
    for (let j = 0; !hit && j < pts.length - 1; j++) {
      if (distToSegmentSq(pos, pts[j], pts[j + 1]) <= thresholdSq) hit = true;
    }

    if (hit) {
      strokes.splice(i, 1);
      redrawAll();
      return true;
    }
  }
  return false;
}

function startDraw(e) {
  drawing = true;
  erasedSomething = false;
  canvas.setPointerCapture(e.pointerId);
  const pos = getPos(e);

  if (toolMode === "eraser") {
    if (eraseAt(pos)) erasedSomething = true;
  } else {
    currentStroke = { points: [pos], color: currentColor, width: currentWidth };
  }
}

function draw(e) {
  if (!drawing) return;
  const pos = getPos(e);

  if (toolMode === "eraser") {
    if (eraseAt(pos)) erasedSomething = true;
    return;
  }

  currentStroke.points.push(pos);
  const pts = currentStroke.points;
  if (pts.length < 3) return;
  const [p0, p1, p2] = pts.slice(-3);
  drawSegment(p0, p1, p2, pts.length === 3, currentStroke.color, currentStroke.width);
}

function endDraw() {
  if (drawing) {
    if (toolMode === "pen" && currentStroke && currentStroke.points.length >= 2) {
      strokes.push(currentStroke);
      pushHistory();
    } else if (toolMode === "eraser" && erasedSomething) {
      pushHistory();
    }
  }
  drawing = false;
  currentStroke = null;
  erasedSomething = false;
}

canvas.addEventListener("pointerdown", startDraw);
canvas.addEventListener("pointermove", draw);
canvas.addEventListener("pointerup", endDraw);
canvas.addEventListener("pointerleave", endDraw);
canvas.addEventListener("pointercancel", endDraw);

// ---------- 도구 선택 (펜 / 지우개) ----------
const penBtn = document.getElementById("penBtn");
const eraserBtn = document.getElementById("eraserBtn");
const penPopover = document.getElementById("penPopover");
const penToolWrap = document.querySelector(".pen-tool-wrap");

function setToolMode(mode) {
  toolMode = mode;
  penBtn.classList.toggle("active", mode === "pen");
  eraserBtn.classList.toggle("active", mode === "eraser");
  canvas.style.cursor = mode === "eraser" ? "cell" : "crosshair";
}

function openPopover() {
  penPopover.classList.add("open");
}

function closePopover() {
  penPopover.classList.remove("open");
}

// 펜이 이미 선택된 상태에서 펜 버튼을 한 번 더 누르면 색상/굵기 설정 창을 연다.
penBtn.addEventListener("click", () => {
  if (toolMode !== "pen") {
    setToolMode("pen");
    closePopover();
  } else {
    penPopover.classList.toggle("open");
  }
});

eraserBtn.addEventListener("click", () => {
  setToolMode("eraser");
  closePopover();
});

document.addEventListener("pointerdown", (e) => {
  if (!penToolWrap.contains(e.target)) {
    closePopover();
  }
});

// ---------- 펜 색상 ----------
const colorSwatches = document.querySelectorAll(".color-swatch");
colorSwatches.forEach((sw) => {
  sw.addEventListener("click", () => {
    colorSwatches.forEach((s) => s.classList.remove("active"));
    sw.classList.add("active");
    currentColor = sw.dataset.color;
  });
});

// ---------- 굵기 ----------
const thicknessRange = document.getElementById("thicknessRange");
thicknessRange.addEventListener("input", () => {
  currentWidth = Number(thicknessRange.value);
});

// ---------- 실행 취소 / 다시 실행 ----------
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
let historyStack = [];
let historyIndex = -1;
const MAX_HISTORY = 30;

function updateHistoryButtons() {
  undoBtn.disabled = historyIndex <= 0;
  redoBtn.disabled = historyIndex >= historyStack.length - 1;
}

function pushHistory() {
  historyStack = historyStack.slice(0, historyIndex + 1);
  historyStack.push(JSON.parse(JSON.stringify(strokes)));
  if (historyStack.length > MAX_HISTORY) historyStack.shift();
  historyIndex = historyStack.length - 1;
  updateHistoryButtons();
}

function restoreHistoryAt(index) {
  strokes = index < 0 ? [] : JSON.parse(JSON.stringify(historyStack[index]));
  redrawAll();
  updateHistoryButtons();
}

undoBtn.addEventListener("click", () => {
  if (historyIndex <= 0) {
    historyIndex = -1;
    restoreHistoryAt(-1);
    return;
  }
  historyIndex--;
  restoreHistoryAt(historyIndex);
});

redoBtn.addEventListener("click", () => {
  if (historyIndex >= historyStack.length - 1) return;
  historyIndex++;
  restoreHistoryAt(historyIndex);
});

pushHistory(); // 빈 캔버스 상태를 초기 이력으로 저장

// ---------- 모두 지우기 ----------
const clearNoteBtn = document.getElementById("clearNoteBtn");
clearNoteBtn.addEventListener("click", () => {
  strokes = [];
  redrawAll();
  pushHistory();
});

resizeCanvas();
