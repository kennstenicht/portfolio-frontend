import os, re, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from spr import load, blank, place, put, stamp, thick_line, ellipse, ring, save

def mirrored(lines):
    out = []
    for l in lines.strip('\n').split('\n'):
        m = re.match(r'^(.*)\|(.?)$', l)
        out.append(list(m.group(1) + m.group(2) + m.group(1)[::-1]))
    return out

# waving sprite: padded 16 left / 8 top around stand coords
LEFT, TOP = 16, 8
X0, Y0 = 155, 147          # stand origin in the scene; high enough to read as a jump
g = blank(350, 246)
place(g, load('build/moin.txt'), X0 - LEFT, Y0 - TOP)
A = lambda c, r: (X0 + c, Y0 + r)

# open hand → fist on the raised arm
for y in range(Y0 - TOP + 10, Y0 - TOP + 22):
    for x in range(X0 - LEFT + 5, X0 - LEFT + 21):
        g[y][x] = '.'
stamp(g, '''
.sSSSSs.
sSSSSSSs
SsSsSsSS
SsSsSsSs
sSSSSSSs
.sSSSSs.
..sSSs..
''', X0 - LEFT + 10, Y0 - TOP + 15)

# laughing face: brows raised and arched, mouth open with upper teeth and a lower lip
for r, line in [(9, '........BsSSSBBBBSSS|S'), (10, '........BsSSBSSSSSSS|S'), (11, '........BsSSSSSSSSSS|S'),
                (23, '........BBHHHHBBoWWW|W'), (24, '........BBHBBBBBBokk|k'), (25, '..........BBBBBBBBsS|S')]:
    for c, ch in enumerate(mirrored(line)[0]):
        if ch != '.':
            x, y = A(c, r); g[y][x] = ch

# the other arm is the raised one turned 180°: pointing down and out, sleeve on the right shoulder.
# Pick up the raised arm (sleeve, elbow, fist) without the ear and beard next to it.
raised = {}
for y in range(Y0 - TOP + 10, Y0 - TOP + 48):
    for x in range(X0 - LEFT + 5, X0 - LEFT + 25):
        pr, pc = y - (Y0 - TOP), x - (X0 - LEFT)
        if pr < 37 and pc > 21:
            continue
        if g[y][x] != '.':
            raised[(x, y)] = g[y][x]
for y in range(Y0 + 29, Y0 + 57):
    for x in range(X0 + 31, X0 + 50):
        g[y][x] = '.'
for r in range(40, 57):
    x, y = A(31, r); g[y][x] = 'o'

# the standing legs from i-am, without the hands that hang over the hips there
for y in range(Y0 + 57, 246):
    for x in range(X0 - 10, X0 + 46):
        g[y][x] = '.'
stand = load('build/i-am.txt')
for r in range(57, 65):
    for c, ch in enumerate(stand[r]):
        if ch == '.' or ch in 'Ss':
            continue
        x, y = A(c - 3, r); g[y][x] = ch
# bend the knees a little, each leg differently: per source row an x offset (knee out, shin
# back in) and rows dropped to pull the foot up. Uneven 1 px steps keep it from looking drawn.
LEGS = [
    # left leg: bends more, foot pulled up 3 px
    (range(0, 24), {65: 0, 66: 0, 67: -1, 68: -1, 69: -1, 70: -2, 71: -2, 72: -2, 73: -1, 74: -1,
                    75: 0, 76: 0, 77: 1, 78: 1, 79: 1}, 1, {68, 74, 77}),
    # right leg: bends less, foot up 1 px
    (range(24, 47), {65: 0, 66: 0, 67: 0, 68: 1, 69: 1, 70: 1, 71: 2, 72: 2, 73: 1, 74: 1,
                     75: 0, 76: 0, 77: 0, 78: 0, 79: 0}, 0, {75}),
]
# shoes tilt with the toes dropping outwards: each column sinks with its distance from the ankle
TILT = [(16, -1, 0.2), (30, 1, 0.15)]  # ankle column, outward direction, px per column
for (cols, offset, shoe_offset, dropped), (ankle, out, tilt) in zip(LEGS, TILT):
    for r in range(65, len(stand)):
        if r in dropped:
            continue
        dy = sum(1 for d in dropped if d < r)
        dx = offset.get(r, shoe_offset)
        for c in cols:
            ch = stand[r][c]
            if ch != '.':
                sink = round(max(0, (c - ankle) * out) * tilt) if r >= 80 else 0
                x, y = A(c - 3 + dx, r - dy + sink); g[y][x] = ch
# close the hip outline where the hands covered it
for r in range(57, 60):
    for c, ch in [(11, 'o'), (35, 'o'), (12, 'p' if r == 57 else 'P'), (34, 'p' if r == 57 else 'P')]:
        x, y = A(c - 3, r); g[y][x] = ch

# paste the turned arm after the legs, which would otherwise clear its fist; the pivot puts
# its sleeve where the raised sleeve meets the other shoulder, mirrored
px, py = X0 - LEFT + 36, Y0 - TOP + 42
for (x, y), ch in raised.items():
    put(g, 2 * px - x, 2 * py - y, ch)

# block with rivets, nudged up by the hit
bx, by, bw, bh = 162, 116, 26, 24
for y in range(by, by + bh):
    for x in range(bx, bx + bw):
        edge = x in (bx, bx + bw - 1) or y in (by, by + bh - 1)
        hi = x == bx + 1 or y == by + 1
        lo = x == bx + bw - 2 or y == by + bh - 2
        put(g, x, y, 'o' if edge else ('l' if hi and not lo else ('P' if lo else 'm')))
for (rx, ry) in [(bx + 3, by + 3), (bx + bw - 5, by + 3), (bx + 3, by + bh - 5), (bx + bw - 5, by + bh - 5)]:
    stamp(g, 'kk\nkk', rx, ry)
# impact lines between block and head
for (x, y0, n) in [(168, 142, 3), (174, 143, 3), (180, 142, 3)]:
    for i in range(n):
        put(g, x + (i if x == 180 else (-i if x == 168 else 0)) // 2, y0 + i, 'C')

# light bulb with a screw base and rays
ux, uy = 175, 104  # screw base ends just above the block
ellipse(g, ux, uy, 6, 6.5, lambda v, u: 'W' if u < 0.4 and v < 0.4 else ('c' if u + v > 1.3 else 'C'))
stamp(g, '''
.CCCCC.
..CCC..
.mllllm
.PPPPPP
.mllllm
..PPPP.
''', ux - 3, uy + 5)
put(g, ux - 2, uy - 2, 'W'); put(g, ux - 3, uy - 1, 'W')
import math
for a in (-90, -50, -130, -10, -170):
    for d in (10, 11, 12):
        put(g, round(ux + math.cos(math.radians(a)) * d - 0.5), round(uy + math.sin(math.radians(a)) * d), 'C')
# hand-drawn fixes (from a touch-up in Piskel): bulb base, impact lines, shoulder, knees and shoes
for x, y, ch in [
    (173, 110, 'C'), (172, 111, 'm'), (173, 111, 'l'), (177, 111, 'm'), (178, 111, 'T'), (172, 112, 'P'), (178, 112, 'T'), (172, 113, 'm'), (173, 113, 'l'), (177, 113, 'm'), (178, 113, 'T'), (173, 114, 'P'), (177, 114, 'T'),
    (169, 142, 'C'), (174, 142, 'C'), (175, 142, 'C'), (181, 142, 'C'), (168, 143, 'C'), (175, 143, 'C'), (181, 143, 'C'), (168, 144, 'C'), (175, 144, 'C'), (182, 144, 'C'), (166, 145, 'C'), (167, 145, 'C'), (175, 145, 'C'), (182, 145, 'C'), (183, 145, 'C'),
    (186, 176, 'o'), (187, 176, 'o'), (188, 176, 'T'), (186, 177, 'o'), (187, 177, 'o'), (188, 178, 'o'), (189, 179, 'o'), (187, 187, 'o'), (188, 187, 'o'), (189, 188, 'o'),
    (162, 211, 'o'), (162, 212, 'o'), (163, 212, 'P'), (162, 213, 'o'), (163, 213, 'P'), (161, 215, 'o'), (162, 215, 'P'), (180, 220, 'T'), (181, 220, 'o'), (182, 220, 'p'), (188, 223, 'o'), (189, 223, 'T'), (163, 224, 'P'), (164, 224, 'P'), (165, 224, 'P'), (166, 224, 'P'), (188, 224, 'o'), (189, 224, 'T'), (188, 225, 'o'), (189, 225, 'T'), (171, 226, 'k'), (172, 226, 'o'), (185, 226, 'P'), (186, 226, 'P'), (187, 226, 'P'), (188, 226, 'o'), (171, 227, 'k'), (172, 227, 'o'), (171, 228, 'k'), (172, 228, 'o'), (173, 228, 'o'), (172, 229, 'o'), (179, 229, 'o'), (180, 229, 'k'), (170, 230, 'o'), (179, 230, 'o'), (180, 230, 'k'), (170, 231, 'T'), (179, 231, 'o'), (180, 231, 'W'), (181, 232, 'o'), (181, 233, 'T')
]:
    g[y][x] = ch

save([r for r in g[80:]], 'build/playful-scene.txt', 'playful-ideas scene from y=80')
