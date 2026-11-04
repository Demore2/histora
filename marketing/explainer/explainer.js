/* Histora explainer — Soft 3D Clay set, real app on the phone screen.
   Shared by the storyboard and the final player. Every frame is a pure function of t.
   Needs: window.H (harness), window.IMG (decoded images keyed like ASSETS in build.mjs). */

/* ===================== Soft 3D Clay: reference helpers ===================== */
function roundedPoly(pts) {
  const p = new Path2D(); const n = pts.length;
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const start = mid(pts[n - 1], pts[0]); p.moveTo(start[0], start[1]);
  for (let i = 0; i < n; i++) { const c = pts[i], nx = pts[(i + 1) % n]; const m = mid(c, nx); p.arcTo(c[0], c[1], m[0], m[1], c[2] || 0); }
  p.closePath(); return p;
}
function innerShadow(ctx, path, rule, bb, color, blur, dx, dy) {
  const OFF = 5000;
  ctx.save(); ctx.clip(path, rule);
  const p2 = new Path2D(); const m = 400;
  p2.rect(bb[0] - m, bb[1] - m, bb[2] - bb[0] + 2 * m, bb[3] - bb[1] + 2 * m); p2.addPath(path);
  const M = ctx.getTransform();
  ctx.setTransform(new DOMMatrix().translate(OFF, 0).multiply(M));
  ctx.shadowColor = color; ctx.shadowBlur = blur; ctx.shadowOffsetX = dx - OFF; ctx.shadowOffsetY = dy;
  ctx.fillStyle = '#000'; ctx.fill(p2, 'evenodd'); ctx.restore();
}
let EXT = null;
function puffy(ctx, o) {
  const rule = o.rule || 'nonzero';
  const [ex, ey] = o.ext;
  const n = Math.ceil(Math.hypot(ex, ey) * 1.5);
  const W = ctx.canvas.width, Hh = ctx.canvas.height;
  const base = ctx.getTransform();
  let lc = ctx;
  if (!o.fast) {
    if (!EXT || EXT.width !== W || EXT.height !== Hh) EXT = H.layer(W, Hh);
    lc = EXT.getContext('2d'); lc.setTransform(1, 0, 0, 1, 0, 0); lc.clearRect(0, 0, W, Hh);
  } else ctx.save();
  const bounce = H.mix(o.side[0], '#ffffff', 0.35);
  for (let i = n; i >= 1; i--) {
    const k = i / n;
    lc.setTransform(base); lc.translate(o.x + ex * k, o.y + ey * k); lc.rotate(o.rot || 0); lc.scale(o.s, o.s);
    const c = k > 0.86 ? H.mix(o.side[1], bounce, (k - 0.86) / 0.14) : k < 0.25 ? H.mix(o.face[2], o.side[0], k / 0.25) : H.mix(o.side[0], o.side[1], (k - 0.25) / 0.61);
    lc.fillStyle = H.rgba(c); lc.fill(o.path, rule);
  }
  if (!o.fast) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = 'blur(1.4px)'; ctx.drawImage(EXT, 0, 0); ctx.restore(); }
  else { ctx.restore(); ctx.setTransform(base); }
  ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.rot || 0); ctx.scale(o.s, o.s);
  const bb = o.bb;
  const g = ctx.createLinearGradient(bb[0], bb[1], bb[2], bb[3]);
  g.addColorStop(0, H.rgba(o.face[0])); g.addColorStop(0.5, H.rgba(o.face[1])); g.addColorStop(1, H.rgba(o.face[2]));
  ctx.fillStyle = g; ctx.fill(o.path, rule);
  const S = o.s * Math.hypot(base.a, base.b);
  innerShadow(ctx, o.path, rule, bb, H.rgba(o.side[1], 0.5), 40 * S, -16 * S, -20 * S);
  innerShadow(ctx, o.path, rule, bb, H.rgba(o.side[0], 0.35), 14 * S, 0, 0);
  innerShadow(ctx, o.path, rule, bb, `rgba(255,255,255,${o.rim ?? 0.72})`, 26 * S, 12 * S, 14 * S);
  if (o.spec) {
    ctx.save(); ctx.clip(o.path, rule);
    const [sx, sy, rx, ry] = o.spec;
    const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, rx);
    sg.addColorStop(0, 'rgba(255,255,255,0.95)'); sg.addColorStop(0.35, 'rgba(255,255,255,0.45)'); sg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.translate(sx, sy); ctx.scale(1, ry / rx); ctx.translate(-sx, -sy);
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sx, sy, rx, 0, 7); ctx.fill(); ctx.restore();
  }
  ctx.restore();
}
function sphere(ctx, x, y, r, light, mid, dark) {
  const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.05, x, y, r * 1.05);
  g.addColorStop(0, H.rgba(light)); g.addColorStop(0.55, H.rgba(mid)); g.addColorStop(1, H.rgba(dark));
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  const p = new Path2D(); p.arc(x, y, r, 0, 7);
  innerShadow(ctx, p, 'nonzero', [x - r, y - r, x + r, y + r], H.rgba(H.mix(light, '#ffffff', 0.5), 0.8), r * 0.12, -r * 0.05, -r * 0.06);
  const s = ctx.createRadialGradient(x - r * 0.38, y - r * 0.45, 0, x - r * 0.38, y - r * 0.45, r * 0.42);
  s.addColorStop(0, 'rgba(255,255,255,0.9)'); s.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = s; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
}
// contact shadow, tinted warm brown for the parchment sweep (same recipe as the reference)
function contactShadow(ctx, x, y, w, h, alpha, blur) {
  ctx.save(); ctx.filter = `blur(${blur}px)`;
  ctx.fillStyle = `rgba(120,82,45,${alpha})`;
  ctx.beginPath(); ctx.ellipse(x, y, w, h, 0, 0, 7); ctx.fill();
  ctx.filter = `blur(${blur * 0.4}px)`; ctx.fillStyle = `rgba(95,62,32,${alpha * 0.8})`;
  ctx.beginPath(); ctx.ellipse(x, y, w * 0.55, h * 0.45, 0, 0, 7); ctx.fill();
  ctx.restore();
}
const cursorPath = () => roundedPoly([[0, 0, 10], [0, 150, 12], [38, 114, 8], [64, 168, 10], [92, 154, 10], [66, 102, 8], [114, 102, 12]]);
const CURSOR_BB = [0, 0, 114, 168];
const HX = (h) => H.hex(h);
// Histora clay palette: parchment, cream, accent orange, era terracotta, gold, quiz green, the black phone
const PAL = {
  cream: { face: [HX('#fffbf2'), HX('#f7f1e4'), HX('#e7d9bd')], side: [HX('#dccaa7'), HX('#a98d63')] },
  parch: { face: [HX('#f6eedd'), HX('#eee4d0'), HX('#dccdab')], side: [HX('#cdb994'), HX('#9a7f56')] },
  orange: { face: [HX('#ffd9bf'), HX('#ef8a4c'), HX('#d8622a')], side: [HX('#c9541c'), HX('#8f3a12')] },
  terra: { face: [HX('#f3cbb8'), HX('#cf8a6e'), HX('#b4694f')], side: [HX('#a35e45'), HX('#6e3b2a')] },
  gold: { face: [HX('#fff6d6'), HX('#f6d27a'), HX('#e2aa45')], side: [HX('#d99a3a'), HX('#a8701f')] },
  green: { face: [HX('#e6f4e3'), HX('#93c99e'), HX('#5a9f68')], side: [HX('#4a8857'), HX('#2c5a37')] },
  black: { face: [HX('#5a554f'), HX('#2e2a26'), HX('#191613')], side: [HX('#171412'), HX('#050404')] },
};
const pill = (w, h) => roundedPoly([[-w / 2, -h / 2, h / 2], [w / 2, -h / 2, h / 2], [w / 2, h / 2, h / 2], [-w / 2, h / 2, h / 2]]);
const rrect = (w, h, r) => roundedPoly([[-w / 2, -h / 2, r], [w / 2, -h / 2, r], [w / 2, h / 2, r], [-w / 2, h / 2, r]]);
const circ = (r) => { const p = new Path2D(); p.arc(0, 0, r, 0, Math.PI * 2); return p; };
function clay(ctx, path, bb, x, y, pal, o = {}) {
  puffy(ctx, { x, y, rot: o.rot || 0, s: o.s || 1, path, bb, face: pal.face, side: pal.side, ext: o.ext || [6, 11], spec: o.spec, fast: o.fast, rim: o.rim });
}
const INK = '#2b2219';
function clayLabel(ctx, x, y, text, pal, o = {}) {
  const k = o.k ?? 1; if (k <= 0.01) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.font = o.font || '700 28px "Fredoka"';
  const fsz = parseInt((ctx.font.match(/(\d+)px/) || [0, 28])[1]);
  const w = ctx.measureText(text).width + (o.padX || fsz * 1.5), h = o.h || Math.round(fsz * 1.8);
  clay(ctx, pill(w, h), [-w / 2, -h / 2, w / 2, h / 2], 0, 0, pal, { ext: [3, 6], fast: true });
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const col = o.col || INK;
  if (col === '#fff') { ctx.fillStyle = 'rgba(110,45,10,0.35)'; ctx.fillText(text, fsz * 0.06, 2 + fsz * 0.09); }
  else { ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillText(text, 0, 3.5); }
  ctx.fillStyle = col; ctx.fillText(text, 0, 2);
  ctx.restore();
}
function clayTube(ctx, a, c, b, prog, pal, w = 14) {
  if (prog <= 0) return null;
  const q = (u) => [(1 - u) * (1 - u) * a[0] + 2 * u * (1 - u) * c[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * u * (1 - u) * c[1] + u * u * b[1]];
  const N = 36, pts = []; for (let i = 0; i <= N; i++) pts.push(q(prog * i / N * 0.93));
  const path = (off) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0] + off[0], p[1] + off[1]) : ctx.moveTo(p[0] + off[0], p[1] + off[1])); };
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = 'rgba(120,82,45,0.2)'; ctx.lineWidth = w; path([3, 7]); ctx.stroke();
  ctx.strokeStyle = H.rgba(pal.side[1]); ctx.lineWidth = w; path([0, 0]); ctx.stroke();
  ctx.strokeStyle = H.rgba(pal.face[1]); ctx.lineWidth = w * 0.72; path([-w * 0.1, -w * 0.12]); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.75)'; ctx.lineWidth = w * 0.2; path([-w * 0.2, -w * 0.25]); ctx.stroke();
  const e = q(prog), e0 = q(Math.max(0, prog - 0.05)), ang = Math.atan2(e[1] - e0[1], e[0] - e0[0]);
  ctx.restore();
  const hp = roundedPoly([[w * 1.3, 0, w * 0.35], [-w * 0.9, -w * 1.15, w * 0.35], [-w * 0.9, w * 1.15, w * 0.35]]);
  clay(ctx, hp, [-w, -w, w, w], e[0], e[1], pal, { rot: ang, ext: [3, 6], fast: true });
  return q;
}

/* ===================== timing helpers ===================== */
const DURATION = 25;
let T = 0;
const ph = (a, b) => H.clamp((T - a) / (b - a));
const spring = (t0, d = 0.8) => { const p = ph(t0, t0 + d); if (p <= 0) return 0; return p >= 1 ? 1 : 1 - Math.exp(-6.5 * p) * Math.cos(10 * p); };
const outK = (t1) => 1 - H.ease.in(ph(t1, t1 + 0.3));
const bump = (t0, d = 0.3, a = 0.15) => 1 + a * Math.sin(H.clamp((T - t0) / d) * Math.PI);
function drop(t0, h = 420) {
  if (T < t0) return null;
  const fall = 0.35, p = H.clamp((T - t0) / fall);
  if (p < 1) return { dy: -h * (1 - p * p), sx: 0.94, sy: 1.08, sh: p };
  const u = T - t0 - fall, w = Math.exp(-7 * u) * Math.cos(16 * u);
  return { dy: 0, sx: 1 + 0.1 * w, sy: 1 - 0.16 * w, sh: 1 };
}
function squash(ctx, x, gy, d, fn) { ctx.save(); ctx.translate(x, gy + d.dy); ctx.scale(d.sx, d.sy); ctx.translate(-x, -gy); fn(); ctx.restore(); }
function deboss(ctx, text, x, y, font, col, align = 'center') {
  ctx.save(); ctx.font = font; ctx.textAlign = align; ctx.textBaseline = 'middle';
  if (col === '#fff') { ctx.fillStyle = 'rgba(110,45,10,0.35)'; ctx.fillText(text, x + 2, y + 3); }
  else { ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillText(text, x, y + 1.5); }
  ctx.fillStyle = col; ctx.fillText(text, x, y); ctx.restore();
}

/* ===================== set: layouts, camera, sweep, depth props ===================== */
// The phone and its screens are modelled once (PX/PY/SCR below); each layout places that model in its own frame.
const FLOOR = 646;
const PX = 440, PY = FLOOR - 316;                 // phone model centre
const SCR = { w: 276, h: 592 }; SCR.k = SCR.w / 1080; SCR.x = PX - SCR.w / 2; SCR.y = PY - SCR.h / 2;
const SW = 1080, SH = Math.round(SCR.h / SCR.k);  // app coordinates, same scale as the 1080-wide screenshots
// wide = 1280x720 (YouTube, site); tall = 1080x1920 (Shorts, Reels, TikTok) with the platform UI zones kept clear:
// nothing that matters above y 230, below y 1560, or right of x 950 next to the phone.
const LAYOUTS = {
  wide: { W: 1280, H: 720, px: 440, py: 330, ps: 1, floor: 646, fs: 1, os: 1, ms: 1, bs: 1, cs: 1,
    head: [940, 112], ann: [940, 588], obj: [940, 330], name: [940, 500],
    readObj: [940, 320], readAnn: [940, 540], quizNote: [940, 250], quizPill: [940, 380], quizAnn: [940, 490],
    flame: [775, 646], badge: [1060, 360], ducats: [1060, 540],
    medal: [940, 336], medalName: [940, 522], medalAnn: [940, 600],
    card: [940, 330], endCard: [940, 300], endLogo: [940, 500], fox: [150, 646, 250],
    sweepY: 360, cursor: [1180, 760], header: [1240, 40, 'right'], cam: [640, 360], punch: [690, 350], endCam: [640, 368],
    groundShadow: true, far: { x: [-100, 1400], y: [70, 560], n: 16 } },
  tall: { W: 1080, H: 1920, px: 540, py: 1150, ps: 1.25, floor: 1545, fs: 1.35, os: 1.1, ms: 1, bs: 1.2, cs: 1.18,
    head: [540, 300], ann: [540, 425], obj: [540, 600], name: [540, 795],
    readObj: [540, 600], readAnn: [540, 800], quizNote: [540, 425], quizPill: [540, 600], quizAnn: [540, 795],
    flame: [345, 748], badge: [735, 595], ducats: [540, 800],
    medal: [540, 600], medalName: [540, 800], medalAnn: [540, 425],
    card: [540, 560], endCard: [540, 570], endLogo: [540, 365], fox: [185, 1545, 300],
    sweepY: 1000, cursor: [1000, 1750], header: [540, 178, 'center'], cam: [540, 960], punch: [540, 700], endCam: [540, 975],
    groundShadow: false, far: { x: [-100, 1180], y: [150, 1750], n: 24 } },
};
let L = LAYOUTS.wide, KF = [], FAR = [];
function setLayout(name) {
  L = LAYOUTS[name] || LAYOUTS.wide;
  KF = [[0, ...L.cam, 1], [17.9, ...L.cam, 1], [18.2, ...L.punch, 1.07], [19.9, ...L.punch, 1.07], [20.4, ...L.cam, 1], [25, ...L.endCam, 0.97]];
  const r = H.rng('histora-far-2'), pals = ['cream', 'orange', 'terra', 'gold', 'parch'];
  FAR = []; for (let i = 0; i < L.far.n; i++) FAR.push({ x: r.range(...L.far.x), y: r.range(...L.far.y), r: r.range(22, 60) * Math.sqrt(L.ps), pal: r.pick(pals), ph: r.range(0, 6) });
  return L;
}
// app coordinates on the phone screen -> world coordinates of the current layout
const at = (ax, ay) => [L.px + (SCR.x + ax * SCR.k - PX) * L.ps, L.py + (SCR.y + ay * SCR.k - PY) * L.ps];
const F = (px) => `700 ${Math.round(px * L.fs)}px "Fredoka"`;
function camera(t) {
  let k = 0; while (k < KF.length - 2 && t > KF[k + 1][0]) k++;
  const A = KF[k], B = KF[k + 1], u = H.ease.inOut(H.clamp((t - A[0]) / (B[0] - A[0])));
  return { x: H.lerp(A[1], B[1], u), y: H.lerp(A[2], B[2], u), z: H.lerp(A[3], B[3], u) };
}
const SPRITES = {};
function blurSprite(palName) {
  if (SPRITES[palName]) return SPRITES[palName];
  const pal = PAL[palName], a = H.layer(260, 260), ac = a.getContext('2d');
  sphere(ac, 130, 130, 80, pal.face[0], pal.face[1], pal.face[2]);
  const b = H.layer(260, 260), bc = b.getContext('2d'); bc.filter = 'blur(8px)'; bc.drawImage(a, 0, 0);
  return (SPRITES[palName] = b);
}
function drawSweep(ctx, W, H_, cam) {
  const fy = H_ / 2 + (L.floor - cam.y) * cam.z, f = H.clamp(fy / H_, 0.06, 0.96);
  const g = ctx.createLinearGradient(0, 0, 0, H_);
  g.addColorStop(0, '#efe5d0'); g.addColorStop(Math.max(0.001, f - 0.3), '#f3ead8'); g.addColorStop(f, '#ece0c6');
  g.addColorStop(Math.min(1, f + 0.05), '#f5eedf'); g.addColorStop(1, '#fbf7ee');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H_);
  const R = 760 * Math.max(W, H_) / 1280;
  const pool = ctx.createRadialGradient(W * 0.55, fy, 0, W * 0.55, fy, R);
  pool.addColorStop(0, 'rgba(255,255,255,0.55)'); pool.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = pool; ctx.fillRect(0, 0, W, H_);
}
function drawFar(ctx, W, H_, cam, t) {
  for (const p of FAR) {
    const sx = W / 2 + (p.x - cam.x) * cam.z * 0.6, sy = H_ / 2 + (p.y - cam.y) * cam.z * 0.6 + Math.sin(t * 1.1 + p.ph) * 6;
    const s = (p.r / 80) * cam.z;
    ctx.globalAlpha = 0.42; ctx.drawImage(blurSprite(p.pal), sx - 130 * s, sy - 130 * s, 260 * s, 260 * s); ctx.globalAlpha = 1;
  }
}

/* ===================== the phone and the real app screens ===================== */
const C = { bg: '#F7F1E4', el: '#EEE4D0', sel: '#E3D6B8', ink: '#211F1A', muted: '#6B6355', accent: '#C9541C', route: '#B8735C', inactive: '#B7AE99', ok: '#3F7A4B' };
const UI = (w, px) => `${w} ${px}px "Roboto", system-ui, sans-serif`;
function img(name) { const i = window.IMG && window.IMG[name]; return i && i.complete && i.naturalWidth ? i : null; }
function cover(c, im, x, y, w, h) {
  if (!im) { c.fillStyle = C.sel; c.fillRect(x, y, w, h); return; }
  const s = Math.max(w / im.naturalWidth, h / im.naturalHeight), iw = im.naturalWidth * s, ih = im.naturalHeight * s;
  c.drawImage(im, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih);
}
function contain(c, im, cx, cy, h) { if (!im) return; const w = h * im.naturalWidth / im.naturalHeight; c.drawImage(im, cx - w / 2, cy - h / 2, w, h); }
function rr(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
function txt(c, s, x, y, font, col, align = 'left') { c.font = font; c.fillStyle = col; c.textAlign = align; c.textBaseline = 'alphabetic'; c.fillText(s, x, y); }
function wrap(c, s, x, y, maxW, lh, font, col, maxLines = 99) {
  c.font = font; const words = s.split(' '); let line = '', n = 0;
  for (const w of words) { const test = line ? line + ' ' + w : w; if (c.measureText(test).width > maxW && line) { txt(c, line, x, y + n * lh, font, col); line = w; if (++n >= maxLines) return; } else line = test; }
  if (line) txt(c, line, x, y + n * lh, font, col);
}
function check(c, x, y, s, col = '#fff', lw = 7) {
  c.save(); c.strokeStyle = col; c.lineWidth = lw * s; c.lineCap = 'round'; c.lineJoin = 'round';
  c.beginPath(); c.moveTo(x - 13 * s, y + 1 * s); c.lineTo(x - 4 * s, y + 10 * s); c.lineTo(x + 14 * s, y - 10 * s); c.stroke(); c.restore();
}
function lockIcon(c, x, y, s, col) { c.save(); c.strokeStyle = col; c.fillStyle = col; c.lineWidth = 6 * s; c.beginPath(); c.arc(x, y - 8 * s, 13 * s, Math.PI, 0); c.stroke(); rr(c, x - 19 * s, y - 8 * s, 38 * s, 30 * s, 6 * s); c.fill(); c.restore(); }
function statusBar(c, dark) {
  const col = dark ? '#fff' : C.ink;
  txt(c, '9:41', 70, 84, UI(500, 44), col);
  c.fillStyle = col; rr(c, 920, 52, 82, 40, 12); c.fill(); c.fillRect(1004, 64, 8, 16);
  for (let i = 0; i < 4; i++) c.fillRect(800 + i * 22, 82 - i * 10, 14, 10 + i * 10);
}
function portraitStop(c, x, y, r, im, state, numeral) {
  // state: done | next | lock
  if (state === 'next') { const p = (T * 0.8) % 1; c.strokeStyle = `rgba(201,84,28,${0.35 * (1 - p)})`; c.lineWidth = 14; c.beginPath(); c.arc(x, y, r + 22 + p * 28, 0, 7); c.stroke(); c.strokeStyle = 'rgba(184,115,92,0.35)'; c.lineWidth = 8; c.beginPath(); c.arc(x, y, r + 26, 0, 7); c.stroke(); }
  if (state === 'lock') { c.fillStyle = '#D9D0BD'; c.beginPath(); c.arc(x, y, r + 12, 0, 7); c.fill(); c.fillStyle = '#CFC5B0'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); lockIcon(c, x, y + 4, 1.1, '#A99F8A'); return; }
  c.fillStyle = C.route; c.beginPath(); c.arc(x, y, r + 12, 0, 7); c.fill();
  c.save(); c.beginPath(); c.arc(x, y, r, 0, 7); c.clip(); cover(c, im, x - r, y - r, 2 * r, 2 * r);
  if (numeral) { c.fillStyle = 'rgba(0,0,0,0.25)'; c.fillRect(x - r, y - r, 2 * r, 2 * r); txt(c, numeral, x, y + 26, UI(900, 78), '#fff', 'center'); }
  c.restore();
  if (state === 'done') { c.fillStyle = C.route; c.beginPath(); c.arc(x + r * 0.72, y - r * 0.72, 30, 0, 7); c.fill(); c.strokeStyle = C.bg; c.lineWidth = 5; c.stroke(); check(c, x + r * 0.72, y - r * 0.72, 1.1, '#fff', 5); }
}
function routeCurve(c, a, b, dotted, prog = 1) {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
  const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40 * prog; pts.push([H.lerp(a[0], b[0], H.smooth(0, 1, u)), H.lerp(a[1], b[1], u)]); }
  c.save(); c.lineCap = 'round'; c.strokeStyle = dotted ? '#CFC5B0' : C.route; c.lineWidth = dotted ? 22 : 30;
  if (dotted) c.setLineDash([2, 52]);
  c.beginPath(); pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); c.stroke(); c.restore();
  return [mx, my];
}
function stopText(c, x, y, align, eyebrow, title, sub, dim) {
  if (eyebrow) { c.save(); c.letterSpacing = '6px'; txt(c, eyebrow, x, y - 70, UI(700, 40), C.accent, align); c.restore(); }
  txt(c, title, x, y, UI(700, 54), dim ? C.inactive : C.ink, align);
  txt(c, sub, x, y + 62, UI(500, 44), dim ? C.inactive : C.muted, align);
}

function scrSplash(c) {
  c.fillStyle = C.bg; c.fillRect(0, 0, SW, SH);
  contain(c, img('foxWave'), 540, 1000, 760 * bump(1.05, 0.4, 0.06));
  const k = spring(1.2, 0.6); if (k > 0) { c.save(); c.translate(540, 1560); c.scale(k, k); txt(c, 'Histora', 0, 0, UI(900, 140), C.ink, 'center'); c.restore(); }
  statusBar(c);
}
function scrEra(c) {
  c.fillStyle = C.bg; c.fillRect(0, 0, SW, SH);
  c.strokeStyle = C.ink; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(100, 160); c.lineTo(72, 190); c.lineTo(100, 220); c.stroke();
  c.fillStyle = C.route; c.fillRect(0, 270, SW, 420);
  txt(c, 'Antiquity', 64, 470, UI(900, 112), '#fff'); txt(c, '3000 BC – 500 AD', 64, 556, UI(500, 52), '#fff');
  contain(c, img('foxEra'), 800, 520, 330);
  rr(c, 250, 760, 580, 130, 36); c.fillStyle = C.accent; c.fill(); txt(c, 'Continue the route  →', 540, 842, UI(700, 50), '#fff', 'center');
  const A = [290, 1140], B = [790, 1520], D = [290, 1900];
  routeCurve(c, A, B, false); routeCurve(c, B, D, true);
  portraitStop(c, ...A, 108, img('pAlexander'), 'done'); stopText(c, 450, 1140, 'left', '', 'Alexander', '356 – 323 BC');
  portraitStop(c, ...B, 108, img('pCaesar'), 'next'); stopText(c, 630, 1520, 'right', 'NEXT STOP', 'Julius Caesar', '100 – 44 BC');
  contain(c, img('foxGo'), 965, 1560, 230);
  portraitStop(c, ...D, 108, null, 'lock'); stopText(c, 450, 1900, 'left', '', 'Cleopatra', '69 – 30 BC', true);
  if (T > 5.45 && T < 6.1) tapRipple(c, ...B, 5.45);
  statusBar(c);
}
const P1 = 'In the heart of the Roman Republic, where power was contested and ambition drove men to extraordinary deeds, one figure would reshape the course of history: Gaius Julius Caesar. Born into a patrician family in 100 BC, Caesar was not destined for greatness from birth, yet through cunning, military genius, and an unrelenting appetite for power, he would transform Rome.';
function scrReader(c) {
  c.fillStyle = C.bg; c.fillRect(0, 0, SW, SH);
  const s = -560 * H.ease.inOut(ph(7.6, 8.8));
  c.save(); c.translate(0, s);
  txt(c, 'Chapter 1', 64, 420, UI(500, 46), C.muted);
  txt(c, 'The Rise of an', 64, 520, UI(900, 92), C.ink); txt(c, 'Ambitious Youth', 64, 622, UI(900, 92), C.ink);
  c.save(); rr(c, 64, 680, 952, 536, 40); c.clip(); cover(c, img('scene1'), 64, 680, 952, 536); c.restore();
  wrap(c, 'Rome, around 80 BC: the Forum was where careers were made and unmade.', 540 - 470, 1290, 940, 52, UI(500, 38), C.muted, 2);
  wrap(c, P1, 64, 1440, 952, 70, UI(400, 48), C.ink);
  c.restore();
  c.fillStyle = C.bg; c.fillRect(0, 0, SW, 300);
  rr(c, 64, 150, 952, 110, 18); c.fillStyle = C.el; c.fill(); txt(c, '←  Back to Chapters', 540, 222, UI(500, 46), C.ink, 'center');
  c.fillStyle = C.sel; c.fillRect(0, 296, SW, 6);
  const pb = bump(9.3, 0.25, -0.05);
  c.save(); c.translate(540, 2190); c.scale(pb, pb); rr(c, -500, -64, 1000, 128, 64); c.fillStyle = C.accent; c.fill(); txt(c, 'Mark Complete  ✓', 0, 18, UI(700, 50), '#fff', 'center'); c.restore();
  if (T > 9.3 && T < 9.9) tapRipple(c, 540, 2190, 9.3);
  statusBar(c);
}
const QOPTS = ['Marius and Sulla', 'Pompey and Crassus', 'Brutus and Cassius', 'Antony and Octavian'];
function scrQuiz(c) {
  scrReader(c);
  const u = H.ease.out(ph(9.8, 10.25)), d = H.ease.in(ph(13.55, 13.85));
  c.fillStyle = `rgba(0,0,0,${0.42 * u * (1 - d)})`; c.fillRect(0, 0, SW, SH);
  const sy = H.lerp(SH, 170, u) + d * SH;
  c.save(); c.translate(0, sy);
  rr(c, 0, 0, SW, SH, 64); c.fillStyle = C.bg; c.fill();
  txt(c, 'Before you go on', 64, 110, UI(700, 46), C.accent);
  const right = T >= 12.0;
  contain(c, img(right ? 'foxCheer' : 'foxPoint'), 190, 330, 330 * (right ? bump(12.0, 0.35, 0.08) : 1));
  if (right) { const k = spring(12.05, 0.5); c.save(); c.translate(360, 330); c.scale(k, k); rr(c, 0, -70, 640, 140, 70); c.fillStyle = C.el; c.fill(); c.beginPath(); c.moveTo(4, -20); c.lineTo(-26, 0); c.lineTo(4, 20); c.fill(); txt(c, 'Great job!', 60, 18, UI(700, 52), C.ink); c.restore(); }
  rr(c, 90, 540, 990, 1500, 48); c.fillStyle = C.el; c.fill(); c.strokeStyle = '#E0CBB0'; c.lineWidth = 3; c.stroke();
  c.strokeStyle = C.accent; c.lineWidth = 4; c.beginPath(); c.arc(206, 630, 22, 0, 7); c.stroke(); txt(c, '?', 206, 644, UI(700, 32), C.accent, 'center');
  c.save(); c.letterSpacing = '3px'; txt(c, 'QUICK CHECK', 250, 646, UI(700, 40), C.accent); c.restore();
  txt(c, 'With whom did Caesar form', 150, 760, UI(700, 58), C.ink); txt(c, 'the First Triumvirate?', 150, 834, UI(700, 58), C.ink);
  QOPTS.forEach((o, i) => {
    const y = 900 + i * 172, isB = i === 1, sel = right && isB;
    const s = isB ? bump(11.95, 0.25, -0.03) : 1;
    c.save(); c.translate(580, y + 72); c.scale(s, s); c.translate(-580, -(y + 72));
    rr(c, 150, y, 860, 146, 40); c.fillStyle = C.bg; c.fill(); c.lineWidth = sel ? 5 : 3; c.strokeStyle = sel ? C.ok : '#E3D6B8'; c.stroke();
    c.fillStyle = C.el; c.beginPath(); c.arc(240, y + 73, 40, 0, 7); c.fill();
    txt(c, 'ABCD'[i], 240, y + 90, UI(700, 42), C.ink, 'center'); txt(c, o, 310, y + 90, UI(500, 50), C.ink);
    if (sel) { c.fillStyle = C.ok; c.beginPath(); c.arc(940, y + 73, 30, 0, 7); c.fill(); check(c, 940, y + 73, 1, '#fff', 5); }
    c.restore();
  });
  if (right) {
    const k = H.ease.out(ph(12.1, 12.45)); c.globalAlpha = k;
    rr(c, 150, 1600, 860, 330, 40); c.fillStyle = '#DCD7BF'; c.fill();
    c.fillStyle = C.ok; c.beginPath(); c.arc(220, 1672, 26, 0, 7); c.fill(); check(c, 220, 1672, 0.9, '#fff', 5);
    txt(c, 'Correct', 270, 1690, UI(700, 50), C.ok);
    wrap(c, 'It was a private deal rather than an official office, yet it was enough to win Caesar the consulship in 59 BC.', 190, 1770, 790, 58, `italic ${UI(400, 42)}`, C.muted, 3);
    c.globalAlpha = 1;
  }
  const fb = bump(13.25, 0.25, -0.05);
  c.save(); c.translate(540, SH - 170 - sy); c.scale(fb, fb); rr(c, -476, -66, 952, 132, 50); c.fillStyle = right ? C.accent : '#D9B8A0'; c.fill(); txt(c, 'Finish chapter', 0, 18, UI(700, 50), '#fff', 'center'); c.restore();
  if (T > 11.95 && T < 12.5) tapRipple(c, 580, 900 + 172 + 73, 11.95);
  c.restore();
}
const CH = [['The Rise of an', 'Ambitious Youth', 'Chapter 1'], ['The Conquest', 'of Gaul', 'Chapter 2'], ['The Return and', 'the Rubicon', 'Chapter 3'], ['Civil War', 'and Victory', 'Chapter 4']];
function scrChapters(c, allDone) {
  c.fillStyle = C.bg; c.fillRect(0, 0, SW, SH);
  rr(c, 64, 150, 230, 110, 30); c.fillStyle = C.el; c.fill(); txt(c, 'Home', 179, 222, UI(700, 46), C.ink, 'center');
  const S = [[290, 560], [790, 1000], [290, 1440], [790, 1880]];
  const un = allDone ? 1 : H.ease.inOut(ph(14.5, 15.0));
  routeCurve(c, S[0], S[1], true); routeCurve(c, S[0], S[1], false, un);
  routeCurve(c, S[1], S[2], !allDone); routeCurve(c, S[2], S[3], !allDone);
  S.forEach((p, i) => {
    let st = allDone ? 'done' : i === 0 ? 'done' : i === 1 ? (T >= 14.9 ? 'next' : 'lock') : 'lock';
    const s = i === 1 && !allDone ? bump(14.9, 0.35, 0.12) : 1;
    c.save(); c.translate(p[0], p[1]); c.scale(s, s); portraitStop(c, 0, 0, 104, img('scene' + (i + 1)), st, ['I', 'II', 'III', 'IV'][i]); c.restore();
    const left = i % 2 === 0, dim = st === 'lock';
    const tx = left ? 450 : 630, al = left ? 'left' : 'right';
    if (st === 'next') { c.save(); c.letterSpacing = '6px'; txt(c, 'NEXT STOP', tx, p[1] - 92, UI(700, 40), C.accent, al); c.restore(); }
    txt(c, CH[i][0], tx, p[1] - 22, UI(700, 52), dim ? C.inactive : C.ink, al); txt(c, CH[i][1], tx, p[1] + 40, UI(700, 52), dim ? C.inactive : C.ink, al);
    txt(c, CH[i][2], tx, p[1] + 100, UI(500, 42), dim ? C.inactive : C.muted, al);
  });
  if (!allDone && T >= 14.9) contain(c, img('foxGo'), 965, 1040, 230);
  statusBar(c);
}
function scrUnlock(c) {
  scrChapters(c, true);
  const u = H.ease.out(ph(17.55, 17.9));
  c.fillStyle = `rgba(0,0,0,${0.5 * u})`; c.fillRect(0, 0, SW, SH);
  const k = spring(17.6, 0.6); if (k <= 0) return;
  c.save(); c.translate(540, 1180); c.scale(k, k); c.translate(-540, -1180);
  rr(c, 80, 470, 920, 1340, 60); c.fillStyle = C.bg; c.fill();
  const g = 0.6 + 0.3 * Math.sin(T * 5);
  const gl = c.createRadialGradient(540, 820, 150, 540, 820, 300); gl.addColorStop(0, `rgba(201,84,28,${0.45 * g})`); gl.addColorStop(1, 'rgba(201,84,28,0)'); c.fillStyle = gl; c.beginPath(); c.arc(540, 820, 300, 0, 7); c.fill();
  c.fillStyle = C.accent; c.beginPath(); c.arc(540, 820, 206, 0, 7); c.fill();
  c.save(); c.beginPath(); c.arc(540, 820, 190, 0, 7); c.clip(); cover(c, img('pCaesar'), 350, 630, 380, 380); c.restore();
  txt(c, 'Character Unlocked!', 540, 1140, UI(900, 70), C.ink, 'center');
  txt(c, 'Julius Caesar', 540, 1232, UI(700, 60), C.accent, 'center');
  txt(c, "You've unlocked a new character! View", 540, 1320, UI(400, 40), C.muted, 'center'); txt(c, 'your collection in the Profile tab.', 540, 1372, UI(400, 40), C.muted, 'center');
  rr(c, 190, 1480, 700, 140, 70); c.fillStyle = C.accent; c.fill(); txt(c, 'Continue to Home', 540, 1566, UI(700, 48), '#fff', 'center');
  c.restore();
}
function scrHome(c) {
  c.fillStyle = C.bg; c.fillRect(0, 0, SW, SH);
  txt(c, 'Home', 64, 260, UI(900, 104), C.ink);
  rr(c, 430, 175, 150, 100, 50); c.fillStyle = C.el; c.fill(); c.fillStyle = '#E8743B'; c.beginPath(); c.arc(475, 233, 20, 0, 7); c.moveTo(457, 225); c.lineTo(475, 190); c.lineTo(493, 225); c.fill(); txt(c, '7', 525, 245, UI(700, 46), C.ink, 'center');
  rr(c, 600, 175, 190, 100, 50); c.fillStyle = C.el; c.fill(); c.fillStyle = '#E2AA45'; c.beginPath(); c.arc(650, 225, 24, 0, 7); c.fill(); txt(c, '290', 735, 245, UI(700, 46), C.ink, 'center');
  c.save(); rr(c, 64, 360, 952, 660, 48); c.clip(); cover(c, img('cleo1'), 64, 360, 952, 660);
  const sh = c.createLinearGradient(0, 360, 0, 1020); sh.addColorStop(0, 'rgba(0,0,0,0.05)'); sh.addColorStop(1, 'rgba(0,0,0,0.65)'); c.fillStyle = sh; c.fillRect(64, 360, 952, 660); c.restore();
  c.save(); c.letterSpacing = '5px'; txt(c, 'CONTINUE YOUR JOURNEY', 120, 760, UI(700, 38), '#fff'); c.restore();
  txt(c, 'Cleopatra', 120, 850, UI(900, 80), '#fff');
  rr(c, 120, 890, 260, 100, 30); c.fillStyle = C.accent; c.fill(); txt(c, 'Start', 250, 956, UI(700, 46), '#fff', 'center');
  rr(c, 64, 1080, 952, 380, 48); c.fillStyle = C.el; c.fill();
  txt(c, 'Test your history skills!', 120, 1190, UI(700, 52), C.ink); contain(c, img('foxCheer'), 870, 1300, 260);
  rr(c, 120, 1250, 300, 100, 30); c.fillStyle = C.accent; c.fill(); txt(c, 'Play', 270, 1316, UI(700, 46), '#fff', 'center');
  c.fillStyle = C.bg; c.fillRect(0, SH - 230, SW, 230); c.fillStyle = C.sel; c.fillRect(0, SH - 230, SW, 3);
  ['Home', 'Explore', 'Profile'].forEach((n, i) => { const x = 180 + i * 360; c.fillStyle = i ? C.inactive : C.accent; c.beginPath(); c.arc(x, SH - 150, 30, 0, 7); c.fill(); txt(c, n, x, SH - 72, UI(500, 40), i ? C.muted : C.accent, 'center'); });
  statusBar(c);
}
function tapRipple(c, x, y, t1) { const p = ph(t1, t1 + 0.5); if (p <= 0 || p >= 1) return; c.strokeStyle = `rgba(201,84,28,${0.6 * (1 - p)})`; c.lineWidth = 10; c.beginPath(); c.arc(x, y, 40 + p * 120, 0, 7); c.stroke(); }
// push navigation like the app: the old screen slides a third left, the new one comes in from the right
function push(c, from, to, u, dir = 1) {
  if (u <= 0) return from(c); if (u >= 1) return to(c);
  const e = H.ease.inOut(u);
  c.save(); c.translate(-dir * SW * 0.3 * e, 0); from(c); c.fillStyle = `rgba(0,0,0,${0.18 * e})`; c.fillRect(0, 0, SW, SH); c.restore();
  c.save(); c.translate(dir * SW * (1 - e), 0); c.shadowColor = 'rgba(0,0,0,0.25)'; c.shadowBlur = 40; c.fillStyle = C.bg; c.fillRect(0, 0, SW, SH); c.shadowBlur = 0; to(c); c.restore();
}
function fade(c, from, to, u) { if (u <= 0) return from(c); from(c); c.globalAlpha = H.clamp(u); to(c); c.globalAlpha = 1; }
function screen(c) {
  if (T < 2.4) return scrSplash(c);
  if (T < 6.2) return push(c, scrSplash, scrEra, ph(2.4, 2.85));
  if (T < 9.8) return push(c, scrEra, scrReader, ph(6.15, 6.6));
  if (T < 13.85) return scrQuiz(c);
  if (T < 17.0) return push(c, scrReader, (cc) => scrChapters(cc, false), ph(13.85, 14.25), -1);
  if (T < 20.7) return fade(c, (cc) => scrChapters(cc, false), scrUnlock, ph(17.0, 17.45));
  return fade(c, scrUnlock, scrHome, ph(20.7, 21.1));
}
function drawPhone(ctx) {
  clay(ctx, rrect(304, 624, 56), [-152, -312, 152, 312], PX, PY, PAL.black, { ext: [8, 14], spec: [-90, -250, 70, 22], rim: 0.35 });
  // side buttons
  ctx.fillStyle = '#1a1714'; ctx.beginPath(); ctx.roundRect(PX + 150, PY - 170, 8, 70, 4); ctx.fill(); ctx.beginPath(); ctx.roundRect(PX + 150, PY - 80, 8, 110, 4); ctx.fill();
  const scr = new Path2D(); scr.roundRect(SCR.x, SCR.y, SCR.w, SCR.h, 40);
  ctx.save(); ctx.clip(scr); ctx.translate(SCR.x, SCR.y); ctx.scale(SCR.k, SCR.k);
  const on = T < 0.55 ? 0 : T < 0.75 ? (Math.sin(T * 95) > 0 ? 1 : 0.3) : 1;
  ctx.fillStyle = '#0d0c0b'; ctx.fillRect(0, 0, SW, SH);
  if (on > 0) { ctx.globalAlpha = on; screen(ctx); ctx.globalAlpha = 1; }
  ctx.restore();
  ctx.save(); ctx.clip(scr);
  const gl = ctx.createLinearGradient(SCR.x, SCR.y, SCR.x + SCR.w, SCR.y + SCR.h * 0.6);
  gl.addColorStop(0, 'rgba(255,255,255,0.16)'); gl.addColorStop(0.42, 'rgba(255,255,255,0.03)'); gl.addColorStop(0.43, 'rgba(255,255,255,0)');
  ctx.fillStyle = gl; ctx.fillRect(SCR.x, SCR.y, SCR.w, SCR.h);
  ctx.fillStyle = '#0d0c0b'; ctx.beginPath(); ctx.arc(PX, SCR.y + 16, 7, 0, 7); ctx.fill();
  ctx.restore();
}

/* ===================== clay that comes out of the screen ===================== */
function drawCursor(ctx, x, y, s) {
  ctx.save(); ctx.filter = 'blur(6px)'; ctx.fillStyle = 'rgba(95,62,32,0.25)';
  ctx.translate(x + 12, y + 20); ctx.scale(0.42 * s * L.ps, 0.42 * s * L.ps); ctx.fill(cursorPath()); ctx.restore();
  clay(ctx, cursorPath(), CURSOR_BB, x, y, PAL.cream, { s: 0.42 * s * L.ps, ext: [3, 6], fast: true });
}
function cursorMove(ctx, from, to, t0, t1) {
  if (T < t0 || T > t1 + 0.8) return;
  const u = H.ease.out(ph(t0, t1)), cx = H.lerp(from[0], to[0], u), cy = H.lerp(from[1], to[1], u) - Math.sin(u * Math.PI) * 50;
  const press = T >= t1 ? 1 - 0.15 * Math.sin(H.clamp((T - t1) / 0.25) * Math.PI) : 1;
  const out = T > t1 + 0.45 ? H.ease.in(ph(t1 + 0.45, t1 + 0.8)) : 0;
  drawCursor(ctx, cx + out * 380 * L.ps, cy + out * 260 * L.ps, press);
}
// fly a clay object from a point on the screen to its place in the column, with an orange tube tracing the path
function flight(from, to, t0, d = 0.55) {
  const u = H.ease.out(ph(t0, t0 + d));
  return { x: H.lerp(from[0], to[0], u), y: H.lerp(from[1], to[1], u) - Math.sin(u * Math.PI) * 70, s: 0.25 + 0.75 * spring(t0, d + 0.3), on: T >= t0 };
}
function tube(ctx, from, to, t0, t1, d = 0.5) {
  const p = H.ease.inOut(ph(t0, t0 + d)) * (1 - H.ease.in(ph(t1, t1 + 0.3)));
  const tall = L.H > L.W, c = tall ? [L.px + 360, (from[1] + to[1]) / 2 + 60] : [(from[0] + to[0]) / 2, Math.min(from[1], to[1]) - 90];
  if (p > 0) clayTube(ctx, from, c, to, p, PAL.orange, 13 * L.ps);
}
// where a tube ends beside its object: left of it in the wide set, right of it (coming up past the phone) in the tall one
const tubeEnd = (to, dx, dy) => (L.H > L.W ? [to[0] + dx * 1.15, to[1] + 70] : [to[0] - dx, to[1] + dy]);
function heading(ctx, text, t0, t1) { clayLabel(ctx, L.head[0], L.head[1] + Math.sin(T * 1.6) * 3, text, PAL.cream, { k: spring(t0, 0.7) * outK(t1), font: F(44) }); }
function bob(p = 0) { return Math.sin(T * 1.6 + p) * 4; }
function coin(ctx, x, y, r, im, k) {
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  clay(ctx, circ(r), [-r, -r, r, r], 0, 0, PAL.gold, { ext: [7, 12], spec: [-r * 0.45, -r * 0.6, r * 0.45, r * 0.18], fast: r < 130 });
  const ir = r * 0.8, p = circ(ir);
  ctx.save(); ctx.clip(p); cover(ctx, im, -ir, -ir, 2 * ir, 2 * ir); ctx.restore();
  innerShadow(ctx, p, 'nonzero', [-ir, -ir, ir, ir], 'rgba(120,70,20,0.55)', 18, 6, 8);
  ctx.restore();
}
function star4(ctx, x, y, r, a) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.beginPath();
  for (let i = 0; i < 8; i++) { const rr_ = i % 2 ? r * 0.28 : r, an = i * Math.PI / 4; ctx.lineTo(Math.cos(an) * rr_, Math.sin(an) * rr_); }
  ctx.closePath(); const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#f6d27a'); ctx.fillStyle = g; ctx.fill(); ctx.restore();
}
function flamePath(s) {
  const p = new Path2D();
  p.moveTo(0, 140 * s);
  p.bezierCurveTo(-118 * s, 140 * s, -128 * s, 30 * s, -84 * s, -32 * s);
  p.bezierCurveTo(-62 * s, -66 * s, -22 * s, -96 * s, -8 * s, -168 * s);
  p.bezierCurveTo(30 * s, -120 * s, 38 * s, -86 * s, 52 * s, -66 * s);
  p.bezierCurveTo(62 * s, -92 * s, 70 * s, -100 * s, 86 * s, -112 * s);
  p.bezierCurveTo(130 * s, -40 * s, 124 * s, 40 * s, 112 * s, 72 * s);
  p.bezierCurveTo(98 * s, 122 * s, 56 * s, 140 * s, 0, 140 * s);
  p.closePath(); return p;
}
function twoLineCard(ctx, x, y, l1, l2, k, size = 58) {
  if (k <= 0.01) return;
  ctx.save(); ctx.translate(x, y + bob(1)); ctx.scale(k, k);
  ctx.font = `700 ${size}px "Fredoka"`; const w = Math.max(ctx.measureText(l1).width, ctx.measureText(l2).width) + 90, h = size * 2.9;
  clay(ctx, rrect(w, h, 46), [-w / 2, -h / 2, w / 2, h / 2], 0, 0, PAL.cream, { ext: [6, 11], fast: true, spec: [-w * 0.3, -h * 0.32, 60, 16] });
  deboss(ctx, l1, 0, -size * 0.62, `700 ${size}px "Fredoka"`, INK); deboss(ctx, l2, 0, size * 0.62, `700 ${size}px "Fredoka"`, C.accent);
  ctx.restore();
}

function beatHook(ctx) {
  twoLineCard(ctx, ...L.card, 'History you', 'actually finish.', spring(0.85, 0.7) * outK(2.45), Math.round(58 * L.cs));
}
function beatPick(ctx) {
  heading(ctx, 'Pick a real life', 2.95, 5.95);
  const from = at(790, 1520), to = L.obj;
  tube(ctx, from, tubeEnd(to, 120 * L.os, 20), 3.5, 5.95);
  const f = flight(from, to, 3.55);
  if (f.on) {
    const k = f.s * outK(5.95);
    if (k > 0.01) { if (L.groundShadow) contactShadow(ctx, f.x, L.floor - 20, 110 * k, 14 * k, 0.25 * k, 12); coin(ctx, f.x, f.y + bob(), 128 * L.os, img('pCaesar'), k); }
  }
  clayLabel(ctx, L.name[0], L.name[1] + bob(2), 'Julius Caesar', PAL.orange, { k: spring(4.15, 0.6) * outK(5.95), font: F(34), col: '#fff' });
  clayLabel(ctx, L.ann[0], L.ann[1] + bob(3), 'Real people from every era', PAL.cream, { k: spring(4.45, 0.6) * outK(5.95), font: F(29) });
}
function beatRead(ctx) {
  heading(ctx, 'One chapter at a time', 6.55, 9.55);
  const from = at(540, 950), to = L.readObj;
  tube(ctx, from, tubeEnd(to, 250 * L.os, 30), 6.85, 9.55);
  const f = flight(from, to, 6.9, 0.6);
  if (f.on) {
    const k = f.s * outK(9.55); if (k > 0.01) {
      ctx.save(); ctx.translate(f.x, f.y + bob()); ctx.scale(k * L.os, k * L.os); ctx.rotate(-0.03);
      clay(ctx, rrect(470, 292, 30), [-235, -146, 235, 146], 0, 0, PAL.parch, { ext: [6, 11], fast: true });
      const p = new Path2D(); p.roundRect(-212, -122, 424, 244, 16);
      ctx.save(); ctx.clip(p); cover(ctx, img('scene1'), -212, -122, 424, 244); ctx.restore();
      innerShadow(ctx, p, 'nonzero', [-212, -122, 212, 122], 'rgba(60,40,20,0.5)', 16, 4, 6);
      ctx.restore();
    }
  }
  clayLabel(ctx, L.readAnn[0], L.readAnn[1] + bob(2), 'Every chapter opens with a painting', PAL.cream, { k: spring(7.55, 0.6) * outK(9.55), font: F(28) });
}
function beatQuiz(ctx) {
  heading(ctx, 'Answer one question', 10.3, 13.4);
  clayLabel(ctx, L.quizNote[0], L.quizNote[1] + bob(1), 'After every chapter', PAL.cream, { k: spring(10.7, 0.6) * outK(13.4), font: F(30) });
  const from = at(580, 170 + 900 + 172 + 73), to = L.quizPill;
  tube(ctx, from, tubeEnd(to, 230 * L.os, 10), 12.05, 13.4, 0.4);
  const f = flight(from, to, 12.1, 0.5);
  if (f.on) {
    const k = f.s * outK(13.4), sx = 190 * L.fs;
    clayLabel(ctx, f.x + 18 * L.fs, f.y + bob(), 'Pompey and Crassus', PAL.green, { k, font: F(34), col: '#fff', padX: 110 * L.fs });
    if (k > 0.01) { ctx.save(); ctx.translate(f.x - sx * k, f.y + bob()); ctx.scale(k * L.fs, k * L.fs); sphere(ctx, 0, 0, 30, HX('#ffffff'), HX('#e6f4e3'), HX('#93c99e')); check(ctx, 0, 1, 1.05, '#3F7A4B', 7); ctx.restore(); }
  }
  clayLabel(ctx, L.quizAnn[0], L.quizAnn[1] + bob(2), 'Right or wrong, you learn why', PAL.cream, { k: spring(12.6, 0.6) * outK(13.4), font: F(29) });
}
function beatStreak(ctx) {
  heading(ctx, 'Keep your streak', 14.25, 16.75);
  const [fx, gy] = L.flame, d = drop(14.3, 480 * L.bs);
  const days = T < 15.2 ? 6 : 7;
  if (d) {
    const s = 0.35 + 0.65 * d.sh, ko = outK(16.75); contactShadow(ctx, fx, gy, 115 * s * ko * L.bs, 18 * s * ko, 0.32 * d.sh * ko, 14);
    if (ko > 0.01) squash(ctx, fx, gy, d, () => {
      const fl = 1 + 0.03 * Math.sin(T * 9), grow = (T < 15.2 ? 0.86 : 0.86 + 0.14 * H.ease.back(ph(15.2, 15.6))) * ko * L.bs;
      ctx.save(); ctx.translate(fx, gy - 140 * grow * fl); ctx.scale(grow, grow * fl);
      clay(ctx, flamePath(1), [-128, -168, 128, 140], 0, 0, PAL.orange, { ext: [6, 11], fast: true, spec: [-50, -40, 40, 60] });
      clay(ctx, flamePath(0.5), [-64, -84, 64, 70], 4, 62, PAL.gold, { ext: [3, 6], fast: true });
      ctx.restore();
    });
  }
  const bk = spring(14.85, 0.7) * outK(16.75);
  if (bk > 0.01) {
    ctx.save(); ctx.translate(L.badge[0], L.badge[1] + bob(1)); ctx.scale(bk * L.bs, bk * L.bs);
    clay(ctx, rrect(240, 220, 46), [-120, -110, 120, 110], 0, 0, PAL.gold, { ext: [5, 10], fast: true, spec: [-55, -65, 50, 18] });
    const st = bump(15.2, 0.3, 0.3);
    ctx.save(); ctx.translate(0, -24); ctx.scale(st, st); deboss(ctx, String(days), 0, 0, '700 104px "Fredoka"', INK); ctx.restore();
    deboss(ctx, 'day streak', 0, 66, '700 30px "Fredoka"', INK);
    ctx.restore();
  }
  // ducats: +10 for the finished chapter
  const ck = spring(15.75, 0.6) * outK(16.75);
  if (ck > 0.01) {
    ctx.save(); ctx.translate(L.ducats[0], L.ducats[1] + bob(2)); ctx.scale(ck * L.bs, ck * L.bs);
    clayLabel(ctx, 22, 0, '+10 Ducats', PAL.cream, { font: '700 32px "Fredoka"', padX: 96 });
    sphere(ctx, -78, 0, 26, HX('#fff3c4'), HX('#f2c24f'), HX('#c98a1f'));
    ctx.restore();
  }
}
function beatUnlock(ctx) {
  // time-jump marker: a clay pill sweeps across the set
  const sw = ph(16.9, 17.75);
  if (sw > 0 && sw < 1) { const x = H.lerp(L.W + 320, -400, H.ease.inOut(sw)); clayLabel(ctx, x, L.sweepY, 'A few chapters later…', PAL.parch, { font: F(46) }); }
  heading(ctx, 'Unlock the figure', 18.4, 20.45);
  const from = at(540, 820), to = L.medal, R = 150 * L.ms;
  const f = flight(from, to, 17.95, 0.3);
  const glow = H.ease.out(ph(18.25, 18.8)) * outK(20.45);
  if (glow > 0) { const g = ctx.createRadialGradient(to[0], to[1], R * 0.66, to[0], to[1], R * 2); g.addColorStop(0, `rgba(255,214,140,${0.7 * glow})`); g.addColorStop(1, 'rgba(255,214,140,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(to[0], to[1], R * 2, 0, 7); ctx.fill(); }
  if (f.on) {
    const k = (T < 18.25 ? f.s : bump(18.25, 0.3, 0.12)) * outK(20.45);
    if (k > 0.01) { if (L.groundShadow) contactShadow(ctx, f.x, L.floor - 10, 140 * k, 18 * k, 0.3 * k, 14); coin(ctx, f.x, f.y + (T > 18.6 ? bob() : 0), R, img('pCaesar'), k); }
  }
  if (T > 18.25 && T < 20.75) for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4 + 0.3, tw = 0.6 + 0.4 * Math.sin(T * 6 + i * 1.7), k = spring(18.27 + i * 0.03, 0.6) * outK(20.45), rad = (205 + 18 * Math.sin(T * 2 + i)) * L.ms;
    star4(ctx, to[0] + Math.cos(a) * rad * (L.W < L.H ? 1.25 : 1), to[1] + Math.sin(a) * rad * 0.9, (i % 2 ? 15 : 24) * tw * k * L.fs, T * 0.8 + i);
  }
  clayLabel(ctx, L.medalName[0], L.medalName[1] + bob(2), 'Julius Caesar', PAL.orange, { k: spring(18.6, 0.6) * outK(20.45), font: F(36), col: '#fff' });
  clayLabel(ctx, L.medalAnn[0], L.medalAnn[1] + bob(3), 'Added to your collection', PAL.cream, { k: spring(18.95, 0.6) * outK(20.45), font: F(29) });
}
function beatEnd(ctx) {
  twoLineCard(ctx, ...L.endCard, 'Real stories,', 'one chapter at a time.', spring(21.0, 0.7), Math.round(50 * L.cs));
  clayLabel(ctx, L.endLogo[0], L.endLogo[1] + bob(2), 'Histora', PAL.orange, { k: spring(23.5, 0.7), font: F(66), col: '#fff' });
  const d = drop(20.75, 420), [fx, gy, fh] = L.fox;
  if (d) { contactShadow(ctx, fx, gy, 80 * (fh / 250) * (0.4 + 0.6 * d.sh), 13, 0.3 * d.sh, 10); squash(ctx, fx, gy, d, () => contain(ctx, img('foxWave'), fx, gy - fh * 0.48, fh)); }
}

function overlay(ctx) {
  const a = H.smooth(2.5, 3.0, T) * (1 - H.smooth(20.4, 20.8, T));
  if (a > 0.01) { ctx.save(); ctx.globalAlpha = a; deboss(ctx, 'How Histora works', L.header[0], L.header[1], `600 ${Math.round(28 * L.fs)}px "Fredoka"`, '#6B6355', L.header[2]); ctx.restore(); }
}

function explainer(ctx, W, H_, t) {
  T = t;
  const cam = camera(t);
  drawSweep(ctx, W, H_, cam);
  drawFar(ctx, W, H_, cam, t);
  ctx.save();
  ctx.translate(W / 2, H_ / 2); ctx.scale(cam.z, cam.z); ctx.translate(-cam.x, -cam.y);
  const d = drop(0.1, 560 * L.ps);
  if (d) {
    const s = 0.35 + 0.65 * d.sh; contactShadow(ctx, L.px, L.floor + 2, 175 * s * L.ps, 24 * s * L.ps, 0.4 * d.sh, 16);
    squash(ctx, L.px, L.floor, d, () => { ctx.save(); ctx.translate(L.px, L.py); ctx.scale(L.ps, L.ps); ctx.translate(-PX, -PY); drawPhone(ctx); ctx.restore(); });
  }
  if (t < 2.9) beatHook(ctx);
  if (t > 2.8 && t < 6.4) beatPick(ctx);
  if (t > 6.4 && t < 10) beatRead(ctx);
  if (t > 10 && t < 13.9) beatQuiz(ctx);
  if (t > 13.9 && t < 17.2) beatStreak(ctx);
  if (t > 16.8 && t < 21) beatUnlock(ctx);
  if (t > 20.6) beatEnd(ctx);
  cursorMove(ctx, L.cursor, at(790, 1520), 4.85, 5.45);
  cursorMove(ctx, L.cursor, at(540, 2190), 8.75, 9.3);
  cursorMove(ctx, L.cursor, at(580, 170 + 900 + 172 + 73), 11.45, 11.95);
  cursorMove(ctx, L.cursor, at(540, SH - 170), 12.85, 13.25);
  ctx.restore();
  overlay(ctx);
  H.vignette(ctx, W, H_, 0.13, '80,55,30');
  H.grain(ctx, W, H_, 0.035, 7);
}
setLayout(window.LAYOUT_NAME || 'wide');
window.explainer = explainer; window.DURATION = DURATION; window.setLayout = setLayout;

/* ===================== sound score (same clock as the picture) ===================== */
// Voiceover lines (Benji, Higgsfield): where each cut of vo/benji-raw.mp3 sits on the explainer clock.
const VO_CUTS = [
  { from: 0.0, to: 1.75, at: 0.85 },   // History you actually finish.
  { from: 3.35, to: 7.1, at: 2.5 },    // Pick a real life, from any era. Julius Caesar, for instance.
  { from: 8.3, to: 12.12, at: 6.4 },   // Read one short chapter at a time, each one opening with a painting.
  { from: 13.28, to: 16.98, at: 10.2 },// Then answer one question. Right or wrong, you learn why.
  { from: 17.76, to: 19.98, at: 14.05 },// Every chapter keeps your streak alive.
  { from: 21.15, to: 23.7, at: 18.0 }, // Finish the story, and the figure is yours.
  { from: 26.1, to: 28.6, at: 20.95 }, // Real stories, one chapter at a time.
  { from: 24.9, to: 25.62, at: 23.5 },// Histora.
];
function scoreSound(k) {
  const D = DURATION, m = { minor: true };
  k.bed('room', 0, D, { gain: 0.8 });
  k.music('pad', 0.4, D - 0.3, { bpm: 92, gain: 0.5, chords: [['F3', 'A3', 'C4', 'E4'], ['D3', 'F3', 'A3', 'C4'], ['Bb2', 'D3', 'F3', 'A3'], ['C3', 'E3', 'G3', 'Bb3']] });
  // 1 hook
  k.play('thud', 0.45, { gain: 0.9 });
  [0.55, 0.62, 0.7].forEach((t, i) => k.play('blip', t, { ...m, f: ['C6', 'G5', 'E6'][i], gain: 0.7 }));
  k.play('pop', 0.85, { f: 560 });
  k.play('pop', 1.2, { f: 820, gain: 0.8 });
  // 2 pick a real life
  k.play('swish', 2.4, { dur: 0.3 });
  k.play('pop', 2.95, { f: 600 });
  k.play('tape', 3.5, { ...m, dur: 0.5, pan: 0.3 });
  k.play('thud', 4.1, { f: 170, gain: 0.5, pan: 0.4 });
  k.play('pop', 4.15, { f: 700, pan: 0.4 }); k.play('pop', 4.45, { ...m, f: 760, pan: 0.4 });
  k.play('swish', 4.85, { ...m, gain: 0.6, pan: 0.5 }); k.play('click', 5.45, { pan: -0.2 });
  // 3 one chapter at a time
  k.play('swish', 6.15, { dur: 0.3 });
  k.play('pop', 6.55, { f: 600 });
  k.play('tape', 6.85, { ...m, dur: 0.6, pan: 0.3 });
  k.play('thud', 7.5, { f: 150, gain: 0.45, pan: 0.4 });
  k.play('pop', 7.55, { ...m, f: 720, pan: 0.4 });
  k.play('paper', 7.6, { ...m, dur: 1.2, gain: 0.6, pan: -0.2 });
  k.play('swish', 8.75, { ...m, gain: 0.6, pan: 0.4 }); k.play('click', 9.3, { pan: -0.2 });
  // 4 answer one question
  k.play('whoosh', 9.8, { dur: 0.45, top: 1800, pan: -0.2 });
  k.play('pop', 10.3, { f: 600 }); k.play('pop', 10.7, { ...m, f: 680 });
  k.play('swish', 11.45, { ...m, gain: 0.6, pan: 0.4 }); k.play('click', 11.95, { pan: -0.2 });
  k.play('success', 12.0, { gain: 0.8 });
  k.play('tape', 12.05, { ...m, dur: 0.4, pan: 0.2 });
  k.play('pop', 12.6, { f: 700, pan: 0.4 }); k.play('pop', 12.65, { ...m, f: 780, pan: 0.4 });
  k.play('swish', 12.85, { ...m, gain: 0.6, pan: 0.4 }); k.play('click', 13.25, { pan: -0.2 });
  // 5 keep your streak
  k.play('swish', 13.85, { dur: 0.3, pan: -0.3 });
  k.play('pop', 14.25, { f: 600 });
  k.play('thud', 14.65, { gain: 0.8, pan: 0.2 });
  k.play('pop', 14.85, { ...m, f: 660, pan: 0.5 });
  k.play('ding', 14.9, { f: 'G6', gain: 0.5, pan: -0.4 });
  k.play('stamp', 15.2, { pan: 0.4 });
  k.play('coin', 15.75, { gain: 0.9, pan: 0.4 });
  // 6 unlock the figure (time jump, then the biggest hit)
  k.play('whoosh', 16.9, { dur: 0.8, top: 2200 });
  k.play('pop', 17.6, { ...m, f: 520, pan: -0.3 });
  k.play('riser', 17.55, { dur: 0.7, gain: 0.8 });
  k.play('impact', 18.25, { gain: 1.0, pan: 0.3 });
  k.play('sparkle', 18.3, { n: 8 });
  k.play('pop', 18.4, { f: 600 }); k.play('pop', 18.6, { f: 700, pan: 0.4 }); k.play('pop', 18.95, { ...m, f: 760, pan: 0.4 });
  // 7 takeaway
  k.play('swish', 20.45, { ...m, dur: 0.25 });
  k.play('pop', 21.0, { f: 560 });
  k.play('thud', 21.1, { f: 160, gain: 0.5, pan: -0.6 });
  k.play('success', 23.5, { f: 'F5', gain: 0.9 });
}
window.scoreSound = scoreSound; window.VO_CUTS = VO_CUTS;
