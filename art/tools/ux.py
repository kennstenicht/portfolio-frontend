import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import textwrap
from spr import load, blank, place, put, stamp, save

# juggling the hard parts of frontend work: a toggle, a date picker and a chart
IX, IY = 152, 158
g = blank(350, 246)
body = load('build/i-am.txt')
W = len(body[0])
mirror = lambda c: W - 1 - c

# head tilted back, looking up at the arc (as in lead-developer, without the turn)
for r in range(9, 27):
    for c in range(13, 34):
        body[r][c] = body[r + 1][c]
for c in range(13, 34):
    if body[9][c] == 'B' or body[10][c] == 'B':
        body[8][c], body[9][c], body[10][c] = body[9][c], body[10][c], 'S'

# forearms and hands go; each arm is redrawn from the sleeve hem as one outline, so the
# upper arm, elbow and forearm share their edges
for r in range(44, 64):
    for c in list(range(0, 12)) + list(range(35, W)):
        if body[r][c] in 'Ss':
            body[r][c] = '.'
for r in range(57, 60):                  # hips, where the hanging hands covered them
    for c, ch in ((11, 'o'), (12, 'p' if r == 57 else 'P')):
        body[r][c] = body[r][mirror(c)] = ch
place(g, body, IX, IY)

def arm(side, art, top):
    # drawn as the left arm (as seen) from column -14; the right one is its mirror image
    lines = textwrap.dedent(art).strip('\n').split('\n')
    if side == 'right':
        lines = [l[::-1] for l in lines]
        stamp(g, '\n'.join(lines), IX + W + 14 - len(lines[0]), IY + top)
    else:
        stamp(g, '\n'.join(lines), IX - 14, IY + top)

# the left hand (as seen) has just thrown and is still open; the right one waits lower,
# palm up, to catch
arm('left', '''
..s.s.s...................
.sSsSsSs..................
.sSsSsSs..................
.sSsSsSs..................
.sSSSSSs.ss...............
..sSSSSSsSSs.......sSSSSs.
..sSSSSSSSSssssssssSSSSSs.
...sSSSSSSSSSSSSSSSSSSSSs.
....sSSSSSSSSSSSSSSSSSSSs.
.....ssSSSSSSSSSSSSSSSSSs.
.......sssssSSSSSSSSSSSss.
............sssssssSSSs...
...................sss....
''', 39)
arm('right', '''
...................sSSSSs.
...................sSSSSs.
..................ssSSSSs.
...............sssSSSSSSs.
............sssSSSSSSSSSs.
ss.....ss.ssSSSSSSSSSSSSs.
SSs...sSSsSSSSSSSSSSSSSs..
sSSsssSSSSSSSSSSSSSSSss...
sSSSSSSSSSSSSSSSSSssss....
.sSSSSSSSSSSSSssss........
..sSSSSSSSssss............
...sssssss................
''', 44)

# the arc the elements fly along: a rounded curve from hand to hand, dotted at even
# distances along it, so the steep sides are not sparser than the top
import math
ARC = (175, 196, 32, 78)                     # centre x, base y, half width, height
def on_arc(deg):
    cx, cy, rx, ry = ARC
    return cx + rx * math.cos(math.radians(deg)), cy - ry * math.sin(math.radians(deg))
walked, last = 0.0, on_arc(180)
for i in range(1, 1801):
    p = on_arc(180 - i / 10)
    walked += math.dist(p, last); last = p
    if walked >= 5:
        put(g, round(p[0]), round(p[1]), 'c'); walked = 0.0

def toggle():
    # pill-shaped track, switched on, knob on the right
    w, h = 19, 10
    rows = [['.'] * w for _ in range(h)]
    r_ = h / 2
    for y in range(h):
        for x in range(w):
            cx = min(max(x + 0.5, r_), w - r_)
            if (x + 0.5 - cx) ** 2 + (y + 0.5 - r_) ** 2 <= r_ ** 2:
                rows[y][x] = 's' if y >= h - 2 else 'S'
            kx, ky = w - r_ , r_
            if (x + 0.5 - kx) ** 2 + (y + 0.5 - ky) ** 2 <= (r_ - 1.2) ** 2:
                rows[y][x] = 'c' if (x + 0.5 - kx) + (y + 0.5 - ky) > 2 else 'C'
    return '\n'.join(''.join(r) for r in rows)

def chart():
    rows = [['.'] * 18 for _ in range(13)]
    for i, h in enumerate([4, 8, 6, 11]):        # four bars, the last one tallest
        for r in range(12 - h, 12):
            for dc, ch in enumerate('SSs'):
                rows[r][2 + i * 4 + dc] = ch
    for c in range(18):
        rows[12][c] = 'C'
    for r in range(13):
        rows[r][0] = 'C'
    return '\n'.join(''.join(r) for r in rows)

def calendar():
    w, h = 19, 14
    rows = [['C'] * w for _ in range(h)]
    rows[0] = list('...k....k....k...k.'[:w])
    for r in (1, 2, 3):
        rows[r] = ['S'] * w
    for r in range(5, h - 1, 2):                 # day grid
        for c in range(2, w - 1, 3):
            rows[r][c] = 'c'
    for r in (7, 8):                             # the picked day
        for c in (10, 11):
            rows[r][c] = 's'
    rows[h - 1] = ['c'] * w
    return '\n'.join(''.join(r) for r in rows)

TOGGLE, CHART, CALENDAR = toggle(), chart(), calendar()
# thrown toggle high on the way up, calendar at the top, chart low, about to be caught
for art, deg in [(TOGGLE, 150), (CALENDAR, 90), (CHART, 5)]:
    lines = textwrap.dedent(art).strip('\n').split('\n')
    x, y = on_arc(deg)
    x0, y0 = round(x - len(lines[0]) / 2), round(y - len(lines) / 2)
    for yy in range(y0, y0 + len(lines)):            # no trail dots showing through the element
        for xx in range(x0, x0 + len(lines[0])):
            g[yy][xx] = '.'
    stamp(g, art, x0, y0)

save([r for r in g[100:]], 'build/ux-scene.txt', 'ux-background scene from y=100')
