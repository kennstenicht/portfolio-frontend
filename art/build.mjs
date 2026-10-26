// Builds the home illustrations into app/components/intro/images/.
// Usage: pnpm art
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ART = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ART, '..', 'app/components/intro/images');
const SIZE = 350;
const WALL = 246;
const BG = '#312d2c';

const PALETTE = {
  o: ['#24211e', 'outline'],
  k: ['#171412', 'eyes, shoes'],
  S: ['#fcb484', 'skin'],
  s: ['#ea9563', 'skin shade'],
  H: ['#63432d', 'hair'],
  B: ['#533a29', 'beard, hair outline'],
  T: ['#312d2c', 'shirt (same as the background, read through its outline)'],
  U: ['#3b3633', 'shirt fold, shoe highlight'],
  P: ['#6c5c51', 'trousers'],
  p: ['#5b4d44', 'trousers shade'],
  K: ['#1d1a18', 'shoes'],
  W: ['#f9f0d8', 'soles, teeth, highlights'],
  l: ['#a48b7a', 'props light'],
  m: ['#897364', 'props mid'],
  C: ['#f7e2cb', 'cursor, bulb'],
  c: ['#d9c2a9', 'cursor, bulb shade'],
};
const WALL_COLOURS = {
  gap: '#3a322d',
  light: '#b39885',
  fill: '#8d7667',
  shade: '#7e6a5c',
};
const LIGHT_BANDS = ['#4a3f38', '#5b4d41', '#725d4d', '#9b7d64', '#c39c7b'];

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

function canvas() {
  const data = Buffer.alloc(SIZE * SIZE * 3);
  const bg = hex(BG);
  for (let i = 0; i < data.length; i += 3) data.set(bg, i);
  return data;
}

const set = (data, x, y, rgb) => {
  if (x >= 0 && y >= 0 && x < SIZE && y < SIZE)
    data.set(rgb, (y * SIZE + x) * 3);
};

// One regular brick tile, shared by every scene so the wall stays put when the image switches.
function drawWall(data) {
  const [BW, BH, PHASE] = [24, 12, 4];
  const C = Object.fromEntries(
    Object.entries(WALL_COLOURS).map(([k, v]) => [k, hex(v)]),
  );
  for (let y = WALL; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const ty = y - WALL;
      const row = Math.floor(ty / BH);
      const ly = ty % BH;
      const lx = (((x - PHASE - (row % 2 ? BW / 2 : 0)) % BW) + BW) % BW;
      let c = C.fill;
      if (ly === BH - 1 || lx === BW - 1) c = C.gap;
      else if (ly === 0 || (lx === 0 && ly <= 2)) c = C.light;
      else if (ly === BH - 2 || lx === BW - 2) c = C.shade;
      set(data, x, y, c);
    }
  }
}

// Drawn rather than sampled: the source's soft gradient turned into banding with a fringe.
function drawSpotlight(data) {
  const BANDS = LIGHT_BANDS.map(hex);
  const TOP = { y: 101, l: 158, r: 192 };
  const FLOOR = { y: WALL, l: 114, r: 238 };
  const BAYER = [
    [0, 2],
    [3, 1],
  ];
  const level = (x, y) => {
    const pool = 1 - ((x - 175) / 62) ** 2 - ((y - WALL) / 9) ** 2;
    const poolLevel = pool > 0 ? pool * 4 : -1;
    if (y < TOP.y) return poolLevel;
    const t = (y - TOP.y) / (FLOOR.y - TOP.y);
    const l = TOP.l + (FLOOR.l - TOP.l) * t;
    const r = TOP.r + (FLOOR.r - TOP.r) * t;
    if (x < l || x > r) return poolLevel;
    const glow = Math.max(0, 1 - Math.hypot((x - 175) / 40, (y - TOP.y) / 75));
    return Math.max(1 + glow * 3.2, pool > 0 ? 1 + pool * 3 : 0);
  };
  for (let y = 0; y < WALL; y++) {
    for (let x = 0; x < SIZE; x++) {
      const v = level(x, y);
      if (v < 0) continue;
      // ordered dither only in a narrow seam at each band edge; wider reads as noise
      const f = Math.min(1, Math.max(0, (v - Math.floor(v) - 0.5) * 3 + 0.5));
      const b = Math.floor(v) + (f > (BAYER[y & 1][x & 1] + 0.5) / 4 ? 1 : 0);
      if (b > 0) set(data, x, y, BANDS[Math.min(b, BANDS.length) - 1]);
    }
  }
}

function drawSprite(data, file, left, top) {
  const rows = readFileSync(path.join(ART, file), 'utf8')
    .split('\n')
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const m = line.match(/^(.*)\|(.?)$/);
      return m ? m[1] + m[2] + [...m[1]].reverse().join('') : line;
    });
  rows.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch === '.') return;
      if (!PALETTE[ch])
        throw new Error(`${file}: unknown "${ch}" at ${x},${y}`);
      set(data, left + x, top + y, hex(PALETTE[ch][0]));
    }),
  );
}

const readRgba = (file) =>
  sharp(path.join(ART, file))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

const toHex = (px, i) =>
  '#' + [0, 1, 2].map((k) => px[i + k].toString(16).padStart(2, '0')).join('');

async function drawImage(data, file, left, top) {
  const { data: px, info } = await readRgba(file);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      if (px[i + 3])
        set(data, left + x, top + y, [px[i], px[i + 1], px[i + 2]]);
    }
  }
}

// The pose scripts work on character grids, so the editable PNG is turned into one.
async function spriteToGrid(file, out) {
  const { data: px, info } = await readRgba(file);
  const letter = Object.fromEntries(
    Object.entries(PALETTE).map(([k, [v]]) => [v, k]),
  );
  const rows = [];
  for (let y = 0; y < info.height; y++) {
    let row = '';
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      if (!px[i + 3]) {
        row += '.';
        continue;
      }
      const ch = letter[toHex(px, i)];
      if (!ch)
        throw new Error(
          `${file}: ${toHex(px, i)} at ${x},${y} is not in the palette (art/palette.gpl)`,
        );
      row += ch;
    }
    rows.push(row);
  }
  writeFileSync(path.join(ART, out), `# from ${file}\n${rows.join('\n')}\n`);
}

// An edited copy of a finished scene becomes an overlay of just the changed pixels,
// so hand touch-ups survive rebuilds of everything underneath.
async function applyTouchUps(data, name) {
  const edit = `sprites/${name}.edit.png`;
  const overlay = `sprites/${name}.overlay.png`;
  if (existsSync(path.join(ART, edit))) {
    const { data: px, info } = await readRgba(edit);
    if (info.width !== SIZE || info.height !== SIZE)
      throw new Error(`${edit}: must be ${SIZE}×${SIZE}`);
    const diff = Buffer.alloc(SIZE * SIZE * 4);
    let changed = 0;
    for (let p = 0; p < SIZE * SIZE; p++) {
      const [i, j] = [p * 4, p * 3];
      if (!px[i + 3]) continue;
      if (
        px[i] === data[j] &&
        px[i + 1] === data[j + 1] &&
        px[i + 2] === data[j + 2]
      )
        continue;
      diff.set([px[i], px[i + 1], px[i + 2], 255], i);
      changed++;
    }
    await sharp(diff, { raw: { width: SIZE, height: SIZE, channels: 4 } })
      .png()
      .toFile(path.join(ART, overlay));
    unlinkSync(path.join(ART, edit));
    console.log(`art: ${edit} → ${overlay} (${changed} px changed)`);
  }
  if (!existsSync(path.join(ART, overlay))) return;
  const known = new Set(paletteEntries().map(([, c]) => c));
  const { data: px } = await readRgba(overlay);
  for (let p = 0; p < SIZE * SIZE; p++) {
    if (px[p * 4 + 3] && !known.has(toHex(px, p * 4))) {
      console.warn(
        `art: ${overlay} uses ${toHex(px, p * 4)} at ${p % SIZE},${Math.floor(p / SIZE)}, which is not in the palette`,
      );
      break;
    }
  }
  await drawImage(data, overlay, 0, 0);
}

const paletteEntries = () => [
  ['background', BG],
  ...Object.entries(PALETTE).map(([k, [v, name]]) => [`${name} (${k})`, v]),
  ...Object.entries(WALL_COLOURS).map(([k, v]) => [`wall ${k}`, v]),
  ...LIGHT_BANDS.map((v, i) => [`light ${i + 1}`, v]),
];

// GIMP palette, which Piskel, Pixelorama and Aseprite all import.
function writePalette() {
  const seen = new Set();
  const lines = paletteEntries()
    .filter(([, c]) => !seen.has(c) && seen.add(c))
    .map(([name, c]) => `${hex(c).join('\t')}\t${name}`);
  writeFileSync(
    path.join(ART, 'palette.gpl'),
    `GIMP Palette\nName: Portfolio pixel art\nColumns: 8\n#\n${lines.join('\n')}\n`,
  );
}

const write = (data, name) =>
  sharp(data, { raw: { width: SIZE, height: SIZE, channels: 3 } })
    .png({
      palette: true,
      colours: 256,
      dither: 0,
      compressionLevel: 9,
      effort: 10,
    })
    .toFile(path.join(OUT, `${name}.png`));

// Every pose starts from the standing figure in art/sprites/i-am.png; the scene
// scripts write their grids to art/build/.
writePalette();
mkdirSync(path.join(ART, 'build'), { recursive: true });
await spriteToGrid('sprites/i-am.png', 'build/i-am.txt');
for (const tool of ['moin', 'water', 'ux', 'playful', 'lead']) {
  execFileSync('python3', ['-I', '-B', path.join('tools', `${tool}.py`)], {
    cwd: ART,
    stdio: 'inherit',
  });
}

const scenes = {
  'i-am': async (d) => {
    drawSpotlight(d);
    await drawImage(d, 'sprites/lamp.png', 150, 70);
    drawSprite(d, 'build/i-am.txt', 152, 158);
  },
  'moin': (d) => drawSprite(d, 'build/moin.txt', 139, 150),
  'products-that-last': (d) => drawSprite(d, 'build/water-scene.txt', 0, 140),
  'ux-background': (d) => drawSprite(d, 'build/ux-scene.txt', 0, 100),
  'playful-ideas': (d) => drawSprite(d, 'build/playful-scene.txt', 0, 80),
  'lead-developer': (d) => drawSprite(d, 'build/lead-scene.txt', 0, 100),
};

for (const [name, draw] of Object.entries(scenes)) {
  const data = canvas();
  await draw(data);
  drawWall(data);
  await applyTouchUps(data, name);
  await write(data, name);
  console.log(`art: ${name}.png`);
}
