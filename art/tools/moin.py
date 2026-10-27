import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from spr import load, pad, stamp, save

# i-am.txt is 3 px wider per side than stand.txt; padding 13 keeps stand column c at padded 16 + c
LEFT, TOP = 13, 8
TORSO = 16 + 9  # torso edge, padded
g = pad(load('build/i-am.txt'), left=LEFT, top=TOP)
S = lambda r: r + TOP  # stand row → padded row

# remove the hanging arm, the old sleeve and the left shoulder
for r in range(S(30), S(65)):
    for c in range(0, TORSO):
        g[r][c] = '.'
# torso edge where the arm used to hang, hem, and hips one pixel wider than the torso
for r in range(S(39), S(57)):
    g[r][TORSO] = 'o'
for r in range(S(57), S(65)):
    g[r][TORSO - 1] = 'o'
    g[r][TORSO] = 'p' if r == S(57) else 'P'

# forearm straight up; at the elbow both edges turn to 45° and run into the sleeve
for r in range(22, 32):
    stamp(g, 'sSSSSs', 11, r)
for k, r in enumerate(range(32, 38)):
    stamp(g, 'sSSSSSs', 11 + k, r)

# loose sleeve at 45°: underside from the armpit, shoulder line from the collar, short hem with flared corners
for r in range(33, 48):
    left = 53 - r if r <= 38 else r - 23      # hem, then the underside
    right = r - 13 if r <= 37 else TORSO      # shoulder line until the collar
    for c in range(left, right + 1):
        g[r][c] = 'T'
    g[r][left] = 'o'
    if r <= 37:
        g[r][right] = 'o'
g[32][21] = 'o'
g[39][14] = 'o'
g[39][15] = 'T'  # close the flap behind the flared corner

# open hand; forearm and upper arm now about equally long
stamp(g, '''
.....ss......
..ss.SS.ss...
..SS.SS.SS...
..SS.SS.SS.ss
..SS.SS.SS.SS
..SSsSSsSSsSS
ss.SSSSSSSSSS
SSsSSSSSSSSSs
.sSSSSSSSSSSs
..sSSSSSSSSs.
...sSSSSSSs..
....sSSSSs...
''', 7, 11)
# hand-drawn fixes at the elbow and along the sleeve (from a touch-up in Piskel)
stamp(g, '''
.....Ss........
Ts....Ss..T....
.......Ss......
...............
...............
.............o.
...............
...............
...T...........
...............
...............
...............
...............
...............
...............
...............
............oT.
.............oT
.............oT
.............oT
''', 11, 31)

# motion arcs on both sides of the open hand, so it reads as waving rather than raised
for c, r in [(7, 10), (6, 11), (5, 12), (5, 13), (5, 14), (6, 15),              # left, inner
             (4, 8), (3, 9), (2, 10), (1, 11), (1, 12), (1, 13), (2, 14),       # left, outer
             (17, 9), (18, 9), (19, 10), (20, 11), (21, 12), (21, 13),          # right, inner
             (18, 6), (19, 6), (20, 7), (21, 8), (22, 9), (23, 10), (23, 11)]:  # right, outer
    g[r][c] = 'c'

save(g, 'build/moin.txt', 'waving — full rows, from i-am.txt')
