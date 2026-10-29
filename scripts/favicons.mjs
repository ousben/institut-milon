// Génère les favicons à partir du masque alpha de l'emblème (public/assets/logo/embleme-masque-400.png).
// Aucune dépendance : lecture/écriture PNG avec zlib. Usage : npm run favicons
import { readFileSync, writeFileSync } from 'node:fs';
import { inflateSync, deflateSync } from 'node:zlib';

const CARMIN = [0xa4, 0x10, 0x34];
const BLANC = [0xff, 0xff, 0xff];

const TABLE = new Int32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c;
});
function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function lirePng(buf) {
  let pos = 8;
  let width = 0;
  let height = 0;
  let colorType = 6;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      colorType = data[9];
      if (data[8] !== 8 || data[12] !== 0) throw new Error('PNG attendu : 8 bits, non entrelacé');
    } else if (type === 'IDAT') idat.push(data);
    pos += 12 + len;
  }
  const bpp = { 0: 1, 2: 3, 4: 2, 6: 4 }[colorType];
  const stride = width * bpp;
  const raw = inflateSync(Buffer.concat(idat));
  const out = Buffer.alloc(stride * height);
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const filtre = raw[y * (stride + 1)];
    const ligne = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
    const cur = Buffer.alloc(stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev[x];
      const c = x >= bpp ? prev[x - bpp] : 0;
      let v = ligne[x];
      if (filtre === 1) v += a;
      else if (filtre === 2) v += b;
      else if (filtre === 3) v += Math.floor((a + b) / 2);
      else if (filtre === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      cur[x] = v & 255;
    }
    cur.copy(out, y * stride);
    prev = cur;
  }
  // Alpha : dernier canal pour les types avec alpha, sinon luminance inversée
  const alpha = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    alpha[i] = colorType === 6 || colorType === 4 ? out[i * bpp + bpp - 1] / 255 : 1 - out[i * bpp] / 255;
  }
  return { width, height, alpha };
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}

function ecrirePng(width, height, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0;
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/** Dessine l'emblème (couleur fg) centré dans un carré de `size` px, sur fond bg (ou transparent). */
function rendre(masque, size, { fg, bg = null, echelle = 1 }) {
  const ratio = masque.width / masque.height;
  const eh = size * echelle;
  const ew = eh * ratio;
  const ox = (size - ew) / 2;
  const oy = (size - eh) / 2;
  const SS = 8; // sur-échantillonnage
  const rgba = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let somme = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const px = x + (sx + 0.5) / SS;
          const py = y + (sy + 0.5) / SS;
          const mx = Math.floor(((px - ox) / ew) * masque.width);
          const my = Math.floor(((py - oy) / eh) * masque.height);
          if (mx >= 0 && my >= 0 && mx < masque.width && my < masque.height) {
            somme += masque.alpha[my * masque.width + mx];
          }
        }
      }
      const a = somme / (SS * SS);
      const i = (y * size + x) * 4;
      if (bg) {
        rgba[i] = Math.round(bg[0] + (fg[0] - bg[0]) * a);
        rgba[i + 1] = Math.round(bg[1] + (fg[1] - bg[1]) * a);
        rgba[i + 2] = Math.round(bg[2] + (fg[2] - bg[2]) * a);
        rgba[i + 3] = 255;
      } else {
        rgba[i] = fg[0];
        rgba[i + 1] = fg[1];
        rgba[i + 2] = fg[2];
        rgba[i + 3] = Math.round(a * 255);
      }
    }
  }
  return ecrirePng(size, size, rgba);
}

const masque = lirePng(readFileSync(new URL('../public/assets/logo/embleme-masque-400.png', import.meta.url)));
const sorties = [
  ['favicon-32.png', rendre(masque, 32, { fg: CARMIN })],
  ['favicon-192.png', rendre(masque, 192, { fg: CARMIN })],
  ['apple-touch-icon.png', rendre(masque, 180, { fg: BLANC, bg: CARMIN, echelle: 0.66 })],
];
for (const [nom, png] of sorties) {
  writeFileSync(new URL(`../public/${nom}`, import.meta.url), png);
  console.log(`public/${nom} (${png.length} octets)`);
}
