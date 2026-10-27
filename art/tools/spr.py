"""Helpers for sprite text grids: expand mirrored rows, pad, stamp."""
import re
import textwrap

def load(path):
    rows = []
    for line in open(path):
        line = line.rstrip('\n')
        if not line or line.startswith('#'):
            continue
        m = re.match(r'^(.*)\|(.?)$', line)
        rows.append(list(m.group(1) + m.group(2) + m.group(1)[::-1] if m else line))
    return rows

def pad(rows, left=0, top=0, right=0, bottom=0):
    w = len(rows[0]) + left + right
    out = [['.'] * w for _ in range(top)]
    out += [['.'] * left + r + ['.'] * right for r in rows]
    out += [['.'] * w for _ in range(bottom)]
    return out

def stamp(rows, art, x, y, transparent='.'):
    """Draw a text block onto rows; `transparent` cells keep what is below, '_' erases."""
    for dy, line in enumerate(textwrap.dedent(art).strip('\n').split('\n')):
        for dx, ch in enumerate(line):
            if ch == transparent:
                continue
            put(rows, x + dx, y + dy, '.' if ch == '_' else ch)

def save(rows, path, title):
    with open(path, 'w') as f:
        f.write(f'# {title}\n' + '\n'.join(''.join(r) for r in rows) + '\n')

import math

def blank(w, h):
    return [['.'] * w for _ in range(h)]

def place(dst, src, x, y):
    for dy, row in enumerate(src):
        for dx, ch in enumerate(row):
            if ch != '.' and 0 <= y + dy < len(dst) and 0 <= x + dx < len(dst[0]):
                dst[y + dy][x + dx] = ch

def put(g, x, y, ch):
    if 0 <= y < len(g) and 0 <= x < len(g[0]):
        g[y][x] = ch

def rot_box(g, cx, cy, w, h, deg, shade):
    """Rasterise a w×h box rotated by deg around (cx, cy); shade(u, v) picks the colour from box coords in [0,1]."""
    t = math.radians(deg)
    r = int(max(w, h)) + 2
    for y in range(int(cy) - r, int(cy) + r + 1):
        for x in range(int(cx) - r, int(cx) + r + 1):
            dx, dy = x + 0.5 - cx, y + 0.5 - cy
            u = (dx * math.cos(t) + dy * math.sin(t)) / w + 0.5
            v = (-dx * math.sin(t) + dy * math.cos(t)) / h + 0.5
            if 0 <= u < 1 and 0 <= v < 1:
                put(g, x, y, shade(u, v))

def thick_line(g, x0, y0, x1, y1, width, ch):
    n = int(max(abs(x1 - x0), abs(y1 - y0)) * 2) + 1
    for i in range(n + 1):
        x, y = x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n
        for oy in range(width):
            for ox in range(width):
                put(g, int(x - width / 2 + ox + 0.5), int(y - width / 2 + oy + 0.5), ch)

def ellipse(g, cx, cy, rx, ry, shade):
    for y in range(int(cy - ry) - 1, int(cy + ry) + 2):
        for x in range(int(cx - rx) - 1, int(cx + rx) + 2):
            d = ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2
            if d <= 1:
                put(g, x, y, shade((y + 0.5 - (cy - ry)) / (2 * ry), (x + 0.5 - (cx - rx)) / (2 * rx)))

def ring(g, cx, cy, r, a0, a1, width, ch):
    """Arc of a ring from angle a0 to a1 in degrees, 0° = right, clockwise (screen y down)."""
    for y in range(int(cy - r - width) - 1, int(cy + r + width) + 2):
        for x in range(int(cx - r - width) - 1, int(cx + r + width) + 2):
            dx, dy = x + 0.5 - cx, y + 0.5 - cy
            d = math.hypot(dx, dy)
            a = math.degrees(math.atan2(dy, dx)) % 360
            if r - width / 2 <= d <= r + width / 2 and (a0 <= a <= a1 if a0 <= a1 else (a >= a0 or a <= a1)):
                put(g, x, y, ch)

def cloud(g, blobs, shade):
    """Union of ellipses (cx, cy, rx, ry), shaded by relative height within the whole cloud."""
    cells = set()
    for (cx, cy, rx, ry) in blobs:
        for y in range(int(cy - ry) - 1, int(cy + ry) + 2):
            for x in range(int(cx - rx) - 1, int(cx + rx) + 2):
                if ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1:
                    cells.add((x, y))
    top = min(y for _, y in cells); bottom = max(y for _, y in cells)
    for (x, y) in cells:
        # light only where nothing of the cloud is directly above, so every bump gets its own highlight
        exposed = (x, y - 1) not in cells
        put(g, x, y, shade((y - top) / max(1, bottom - top), exposed))

def polygon(g, pts, shade):
    """Fill a polygon; shade(x, y, inside) gets a predicate to find edges."""
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    def inside(x, y):
        px, py, c = x + 0.5, y + 0.5, False
        for i in range(len(pts)):
            (x1, y1), (x2, y2) = pts[i], pts[i - 1]
            if (y1 > py) != (y2 > py) and px < (x2 - x1) * (py - y1) / (y2 - y1) + x1:
                c = not c
        return c
    for y in range(int(min(ys)) - 1, int(max(ys)) + 2):
        for x in range(int(min(xs)) - 1, int(max(xs)) + 2):
            if inside(x, y):
                put(g, x, y, shade(x, y, inside))
