import sys, os, numpy as np
from PIL import Image
OUT = sys.argv[1]; os.makedirs(OUT, exist_ok=True)
WALLS = {'white': '#e6e4df', 'ivory': '#e6dccb', 'greige': '#d0c8bc', 'sage': '#bcc3b0', 'blue': '#b6c0c8', 'charcoal': '#5b5853'}
FLOORS = {'oak': 'base', 'herring': 'herring', 'walnut': 'walnut', 'tile': 'tile'}
W = 1600
def s2l(c): c = c / 255.0; return np.where(c <= .04045, c / 12.92, ((c + .055) / 1.055) ** 2.4)
def l2s(c): c = np.clip(c, 0, 1); return np.where(c <= .0031308, c * 12.92, 1.055 * c ** (1 / 2.4) - .055) * 255
for fid, src in FLOORS.items():
    im = Image.open(src + '.png').convert('RGB'); mk = Image.open(src + '_mask.png').convert('L')
    h = round(im.height * W / im.width)
    im = im.resize((W, h), Image.LANCZOS); mk = mk.resize((W, h), Image.LANCZOS)
    rgb = s2l(np.asarray(im, np.float32)); a = (np.asarray(mk, np.float32) / 255.0)[..., None]
    lum = (rgb * [.2126, .7152, .0722]).sum(-1, keepdims=True)
    ref = np.median(lum[a[..., 0] > .9])
    ratio = lum / ref
    for wid, hexc in WALLS.items():
        t = s2l(np.array([int(hexc[i:i + 2], 16) for i in (1, 3, 5)], np.float32))
        # keep a little of the original texture/colour noise for realism
        rec = t * ratio * .96 + rgb * .04 * (t.mean() / max(ref, 1e-3))
        out = rgb * (1 - a) + rec * a
        Image.fromarray(l2s(out).astype(np.uint8)).save(f'{OUT}/room-{fid}-{wid}.webp', 'WEBP', quality=80, method=6)
    # real floor texture chip for the swatch
    fl = im.crop((int(W * .32), int(h * .86), int(W * .32) + 240, int(h * .86) + 120))
    fl.save(f'{OUT}/floor-{fid}.webp', 'WEBP', quality=82)
print('done')
