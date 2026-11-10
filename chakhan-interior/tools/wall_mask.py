import sys, cv2, numpy as np
src, out = sys.argv[1], sys.argv[2]
lo, hi = (int(sys.argv[3]), int(sys.argv[4])) if len(sys.argv) > 4 else (12, 36)
img = cv2.imread(src); h, w = img.shape[:2]
S = 1400 / w
small = cv2.resize(img, (1400, int(h * S)), interpolation=cv2.INTER_AREA)
H, W = small.shape[:2]
gray = cv2.cvtColor(small, cv2.COLOR_BGR2GRAY)
g = cv2.GaussianBlur(gray, (5, 5), 0)
edges = cv2.Canny(g, lo, hi)
barrier = cv2.dilate(edges, np.ones((3, 3), np.uint8), iterations=2)
work = barrier.copy()
mask = np.zeros((H + 2, W + 2), np.uint8)
seeds = [(.3, .15), (.5, .12), (.7, .25), (.88, .18), (.45, .45), (.3, .55), (.6, .5), (.14, .3), (.2, .7), (.95, .6)]
for x, y in seeds:
    sx, sy = int(W * x), int(H * y)
    if work[sy, sx] == 0 and mask[sy + 1, sx + 1] == 0:
        cv2.floodFill(work, mask, (sx, sy), 128, 0, 0, 4 | (255 << 8))
m = mask[1:-1, 1:-1]
# grow back over the dilated barrier but only into wall-like pixels
lab = cv2.cvtColor(small, cv2.COLOR_BGR2LAB).astype(np.float32)
ref = np.median(lab[m > 0], axis=0)
dist = np.linalg.norm((lab - ref) * np.array([.5, 1.5, 1.5]), axis=2)
near = (dist < 14).astype(np.uint8) * 255
grown = cv2.dilate(m, np.ones((5, 5), np.uint8), iterations=2)
m = np.where((grown > 0) & (near > 0), 255, m).astype(np.uint8)
cl = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((11, 11), np.uint8))
m = np.where((cl > 0) & (dist < 22), 255, m).astype(np.uint8)
inv = 255 - m; n, lbl, st, _ = cv2.connectedComponentsWithStats(inv, connectivity=4)
for i in range(1, n):
    if st[i, cv2.CC_STAT_AREA] < H * W * 0.0015: m[lbl == i] = 255
cols = m[:, int(W * .3):int(W * .9)] > 0
frac = cols.mean(axis=1)
top = int(np.argmax(frac > .95))
m[:top + 2, :] = 0
colsb = m[:, int(W * .2):int(W * .4)] > 0
fb = colsb.mean(axis=1)
rows = np.where(fb > .9)[0]
bottom = int(rows.max()) if len(rows) else H
m[bottom + 1:, :] = 0
print('top', top, 'bottom', bottom, 'of', H)
m = cv2.resize(m, (w, h), interpolation=cv2.INTER_LINEAR)
m = cv2.GaussianBlur(m, (3, 3), 0)
cv2.imwrite(out, m)
print(src, 'wall coverage', round((m > 127).mean(), 3))
