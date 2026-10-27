import math, os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from spr import load, blank, place, put, stamp, polygon, save

VARIANT = 'front'  # 'front', 'sign' or 'arrow'

# waving sprite: padded 16 left / 8 top around stand coords, placed as in moin
LEFT, TOP = 16, 8
MX, MY = 139, 150
g = blank(350, 246)

fx, fy = MX + 10, MY + 15                    # fist, as in playful-ideas

# a sign on a pole: board above the head with a painted arrow pointing the way
def draw_sign():
    px = fx + 2                              # pole runs through the fist
    for y in range(fy - 38, fy + 16):
        for i, ch in enumerate('lmP'):
            put(g, px + i, y, ch)
    bx, by, bw, bh = px + 1 - 22, fy - 62, 44, 24
    for y in range(by, by + bh):
        for x in range(bx, bx + bw):
            ring = min(x - bx, bx + bw - 1 - x, y - by, by + bh - 1 - y)
            put(g, x, y, 'P' if ring == 0 else ('m' if ring == 1 else ('c' if y == by + 2 else 'l')))
    for nx in (px, px + 2):
        put(g, nx, by + bh - 3, 'k')
    ax, ay = bx + 8, by + bh // 2            # painted arrow, centred on the board
    for x in range(ax, ax + 20):
        for y in range(ay - 2, ay + 3):
            put(g, x, y, 'k')
    for i in range(10):
        h = round(7 - i * 0.7)
        for y in range(ay - h, ay + h + 1):
            put(g, ax + 18 + i, y, 'k')

def draw_arrow():
    # huge wooden arrow, pointing up and to the right; drawn first so it passes behind the head
    cx, cy = fx + 3.5, fy + 3
    d = (math.cos(math.radians(30)), -math.sin(math.radians(30)))
    n = (-d[1], d[0])                            # across the arrow, pointing down-right
    at = lambda t, w: (cx + d[0] * t + n[0] * w, cy + d[1] * t + n[1] * w)
    SHAFT, HEAD = 6, 17
    pts = [at(-10, -SHAFT), at(50, -SHAFT), at(50, -HEAD), at(82, 0), at(50, HEAD), at(50, SHAFT), at(-10, SHAFT)]
    polygon(g, pts, wood)


def wood(x, y, inside):
    if not inside(x, y - 1) or not inside(x - 1, y):
        return 'c'                           # lit top and left edges
    if not inside(x, y + 1) or not inside(x, y + 2):
        return 'P'                           # shadowed underside
    if not inside(x + 1, y):
        return 'm'
    return 'l'

if VARIANT == 'front':
    # standing, holding a huge arrow across the hips with both hands, pointing the way
    IX, IY = 152, 158
    body = load('build/i-am.txt')
    # face turned towards where the arrow points, as in products-that-last
    for r in range(10, 24):
        row = {c: body[r][c] for c in range(15, 34)}
        for c in range(17, 34):
            body[r][c] = row[c - 2]
        body[r][16] = row[15]
    for r in range(14, 19):
        body[r][37] = '.'
    # head tilted back to look up: the face slides 1 px up inside the outline and the brows
    # rise one more; shortening the eyes instead reads as squinting
    for r in range(9, 27):
        for c in range(13, 34):
            body[r][c] = body[r + 1][c]
    for c in range(13, 34):
        if body[9][c] == 'B' or body[10][c] == 'B':
            body[8][c], body[9][c], body[10][c] = body[9][c], body[10][c], 'S'
    # lift the hanging hands off; they come back flipped, gripping the shaft
    hands = {'left': {}, 'right': {}}
    for r in range(55, 65):
        for c, ch in enumerate(body[r]):
            if ch in 'Ss':
                hands['left' if c < 23 else 'right'][(c, r)] = ch
                body[r][c] = '.'
    place(g, body, IX, IY)

    # tilted 15° up around the point between the hands: the way leads forward and up
    t = math.radians(-15)
    pivot = (175, 215)
    turn = lambda x, y: (pivot[0] + (x - pivot[0]) * math.cos(t) - (y - pivot[1]) * math.sin(t),
                         pivot[1] + (x - pivot[0]) * math.sin(t) + (y - pivot[1]) * math.cos(t))
    shaft_top = lambda x: pivot[1] + (x - pivot[0]) * math.tan(t) - 7 / math.cos(t)

    def draw_hand(px, flip, rise):
        cols = [c for c, _ in px]; rows = [r for _, r in px]
        r0, r1 = min(rows), max(rows)
        top = round(shaft_top(IX + (min(cols) + max(cols)) / 2)) - rise
        for (c, r), ch in px.items():
            put(g, IX + c, top + ((r1 - r) if flip else (r - r0)), ch)

    # the figure's left hand (right in the image) behind the arrow: upside down, only the
    # fingertips show over the top edge
    draw_hand(hands['right'], flip=True, rise=4)
    polygon(g, [turn(x, y) for x, y in [(138, 208), (213, 208), (213, 197), (240, 215), (213, 233), (213, 222), (138, 222)]], wood)
    # the figure's right hand (left in the image) in front, fingers down over the face of the arrow
    draw_hand(hands['left'], flip=False, rise=1)
else:
    (draw_sign if VARIANT == 'sign' else draw_arrow)()

    # the waving sprite on top, without its open hand, then the fist around the pole or shaft
    moin = load('build/moin.txt')
    for r in range(10, 23):
        for c in range(5, 21):
            moin[r][c] = '.'
    place(g, moin, MX, MY)
    stamp(g, '''
    .sSSSSs.
    sSSSSSSs
    SsSsSsSS
    SsSsSsSs
    sSSSSSSs
    .sSSSSs.
    ..sSSs..
    ''', fx, fy)


save([r for r in g[100:]], 'build/lead-scene.txt', 'lead-developer scene from y=100')
