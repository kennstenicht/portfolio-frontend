import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from spr import load, blank, place, put, stamp, rot_box, thick_line, ellipse, ring, cloud, save

X0, Y0 = 147, 158  # i-am.txt is 3 px wider per side than stand.txt
g = blank(350, 246)
place(g, load('build/i-am.txt'), X0, Y0)
A = lambda c, r: (X0 + 3 + c, Y0 + r)  # stand coords → scene

def setc(c, r, ch):
    x, y = A(c, r); g[y][x] = ch
def getc(c, r):
    x, y = A(c, r); return g[y][x]

# head turned a little towards the can: features slide 2 px inside the outline, far ear shrinks
for r in range(10, 24):
    row = {c: getc(c, r) for c in range(12, 31)}
    for c in range(14, 31):
        setc(c, r, row[c - 2])
    setc(13, r, row[12])            # widen the near cheek with plain skin, keep the edge shading single
for r in range(14, 19):
    setc(34, r, '.')

# drop the right arm; the torso edge starts at the raised armpit
for r in range(31, 65):
    for c in range(31, 46):
        setc(c, r, '.')
for r in range(40, 57):
    setc(31, r, 'o')
for r in range(57, 65):
    setc(32, r, 'o')
    setc(31, r, 'p' if r == 57 else 'P')

# as in the original: upper arm straight out inside a short sleeve, elbow at the hem,
# forearm rising to the hand on the handle; upper arm and forearm both about 13 px
for r in range(31, 40):
    for c in range(31, 42):
        setc(c, r, 'T')
for c in range(31, 36):
    setc(c, 31, 'o')                                   # shoulder, continuing the collar line
for c in range(35, 42):
    setc(c, 32, 'o')                                   # top of the sleeve
for c in range(31, 35):
    setc(c, 31 if c < 35 else 32, 'o')
for r in range(31, 32):
    for c in range(36, 42):
        setc(c, r, '.')
for c in range(33, 42):
    setc(c, 39, 'o')                                   # underside
setc(32, 39, 'o'); setc(31, 39, 'T')
for r in range(32, 40):
    setc(41, r, 'o')                                   # hem
setc(42, 31, 'o'); setc(42, 40, 'o')                   # loose hem corners
for c in range(42, 45):                                # bare bit of upper arm out of the hem
    for r in range(33, 39):
        setc(c, r, 's' if r in (33, 38) else 'S')
for c in range(44, 55):                                # forearm, about 35° up
    mid = 35.5 - (c - 44) * 0.7
    top, bottom = round(mid - 2.5), round(mid + 2.5)
    for r in range(top, bottom + 1):
        setc(c, r, 's' if r in (top, bottom) else 'S')
setc(44, 38, 's'); setc(45, 39, '.')                   # outside of the elbow

# watering can hangs from the fist: handle loop over the top, body tilted forward, spout to the rose
fx, fy = A(53, 25)
cx, cy = fx + 4, fy + 15                           # body hangs where the loop ends
rot_box(g, cx, cy, 12, 13, 25, lambda u, v: 'P' if v > 0.88 or u > 0.86 else ('m' if u > 0.62 else 'l'))
# handle: short leg from the fist down to the back edge, arch from the fist down to the front edge
thick_line(g, fx + 3, fy + 5, fx + 3, fy + 8, 2, 'm')
for (x0, y0, x1, y1) in [(fx + 7, fy + 2, fx + 10, fy + 4), (fx + 10, fy + 4, fx + 11, fy + 8), (fx + 11, fy + 8, fx + 10, fy + 10)]:
    thick_line(g, x0, y0, x1, y1, 2, 'm')
thick_line(g, cx + 6, cy + 4, cx + 15, cy - 3, 2, 'm')
thick_line(g, cx + 7, cy + 5, cx + 15, cy - 2, 1, 'P')
stamp(g, 'll\nlW\nll', cx + 15, cy - 6)
rx, ry = cx + 18, cy - 3
for dx, dy in [(1, 0), (3, 4), (2, 8), (5, 10), (4, 14)]:
    put(g, rx + dx, ry + dy, 'l')
for dx, dy in [(0, 2), (6, 6), (7, 12)]:
    put(g, rx + dx, ry + dy, 'm')
stamp(g, '''
.sSSSs.
sSSSSSs
SsSsSSS
SsSsSSs
sSSSSSs
.ssss..
''', fx, fy)

# bonsai: shallow pot, curved trunk, three cloud pads
stamp(g, '''
oooooooooooooooooooooo
llllllllllllllllllllll
.mmmmmmmmmmmmmmmmmmmm.
.mmmmmmmmmmmmmmmmmmmm.
..PPPPPPPPPPPPPPPPPP..
..oooooooooooooooooo..
''', 212, 240)
for (x0, y0, x1, y1, w) in [(223, 240, 221, 233, 3), (221, 233, 225, 226, 2), (225, 226, 221, 219, 2), (222, 230, 214, 225, 1), (224, 228, 233, 222, 1)]:
    thick_line(g, x0, y0, x1, y1, w, 'B')
shade = lambda v, exposed: 'l' if exposed and v < 0.6 else ('P' if v > 0.7 else 'm')
for blobs in [
    [(217, 214, 4, 2.5), (222, 212, 4, 3), (227, 214, 4, 2.5), (222, 216, 7, 2)],    # crown
    [(228, 221, 4, 2.2), (233, 219, 4, 2.6), (238, 221, 3.5, 2), (233, 223, 7, 1.8)], # right
    [(209, 224, 3.5, 2), (213, 222, 3.5, 2.4), (216, 225, 3, 1.8), (212, 226, 6, 1.6)], # left
    [(227, 229, 3, 1.8), (230, 228, 3, 2), (229, 230, 4.5, 1.4)],                      # low right
]:
    cloud(g, blobs, shade)
def shift(y0, y1, dx, x0=X0 - 2, x1=300):
    for y in range(y0, y1):
        for x in range(x1 - 1, x0 + dx - 1, -1):
            g[y][x] = g[y][x - dx]
        for x in range(x0, x0 + dx):
            g[y][x] = '.'
shift(Y0, Y0 + 30, 2)       # head, bending at the neck
shift(Y0 + 30, Y0 + 50, 1)  # chest, bending at the waist

# hand-drawn fixes (from a touch-up in Piskel): spout tip and the outside of the hanging elbow
for x, y, ch in [(224, 193, 'm'), (225, 193, 'm'), (223, 194, 'm'), (224, 194, 'm'), (225, 194, 'm'),
                 (226, 194, 'l'), (224, 195, 'm'), (225, 195, 'm'), (226, 195, 'm'), (227, 195, 'm'),
                 (153, 205, 'S'), (153, 206, 'S'), (152, 207, 's'), (153, 207, 'S')]:
    g[y][x] = ch

# the scene was composed 5 px left of the other images; moving it whole keeps the figure on
# the same spot when the hover switches images, without retyping every prop coordinate
shift(0, 246, 5, x0=0, x1=350)

save([r for r in g[140:]], 'build/water-scene.txt', 'products-that-last scene from y=140')
