'use strict';
/* Dibujos de Glúcidos I. Todos usan las ayudas de kit.js y heredan colores del tema (claro/oscuro). */
const { svg, T, L, P, C, R, arrow, ring, fring } = require('./kit');

/* Proyección de Fischer: rows = [[izquierda, derecha, resaltar?], ...] */
function fischer(x, y, top, bottom, rows, title) {
  const gap = 34, h = gap * (rows.length + 1);
  let s = '';
  if (title) s += T(x, y - 34, title, 'b mid');
  s += T(x, y - 8, top, 'mid sm b');
  s += L(x, y, x, y + h);
  rows.forEach(([l, r, hi], i) => {
    const yy = y + gap * (i + 1);
    s += L(x - 42, yy, x + 42, yy, hi ? 'ac' : 'ln');
    s += T(x - 48, yy + 5, l, 'sm' + (hi && l.includes('OH') ? ' acc b' : '')).replace('<text', '<text text-anchor="end"');
    s += T(x + 48, yy + 5, r, 'sm' + (hi && r.includes('OH') ? ' acc b' : ''));
    if (hi) s += T(x + 2, yy - 6, 'C' + (i + 2), 'sm acc');
  });
  s += T(x, y + h + 20, bottom, 'mid sm b');
  return s;
}

/* Anillo de glucopiranosa en Haworth con sus sustituyentes.
   v[0]=C4, v[1]=C5, v[2]=O, v[3]=C1, v[4]=C2, v[5]=C3 */
function haworth(cx, cy, opt = {}) {
  const { anomer = 'b', w = 150, h = 64, sugar = 'glc', label = '', mark = false, cls = 'fa' } = opt;
  const r = ring(cx, cy, w, h, cls);
  const v = r.v;
  let s = r.svg;
  const up = (p, txt, c = '', len = 24) => L(p[0], p[1], p[0], p[1] - len) + `<text x="${p[0]}" y="${p[1] - len - 5}" class="sm mid ${c}">${txt}</text>`;
  const dn = (p, txt, c = '', len = 24) => L(p[0], p[1], p[0], p[1] + len) + `<text x="${p[0]}" y="${p[1] + len + 15}" class="sm mid ${c}">${txt}</text>`;
  s += up(v[1], 'CH₂OH');
  s += sugar === 'gal' ? up(v[0], 'OH', 'acc b') : dn(v[0], 'OH');
  s += up(v[5], 'OH', '', 18);
  s += sugar === 'man' ? up(v[4], 'OH', 'acc b', 18) : dn(v[4], 'OH');
  if (anomer === 'b') s += up(v[3], 'OH', 'acc b'); else if (anomer === 'a') s += dn(v[3], 'OH', 'acc b');
  if (mark) s += C(v[3][0], v[3][1], 6, 'dy');
  if (label) s += `<text x="${cx}" y="${cy + h / 2 + 62}" class="mid b">${label}</text>`;
  return s;
}

const F = {};

F.classes = svg(680, 250, (() => {
  let s = '';
  const mini = (x, y, c = 'fa') => ring(x, y, 46, 20, c, false).svg;
  s += T(20, 52, 'Monosacárido', 'b') + T(20, 72, '1 unidad', 'sm mut') + mini(250, 55);
  s += T(20, 132, 'Oligosacárido', 'b') + T(20, 152, '2 a ~10 unidades', 'sm mut');
  [230, 290, 350].forEach((x, i) => { s += mini(x, 135); if (i) s += L(x - 37, 135, x - 23, 135); });
  s += T(400, 140, 'ej.: disacárido = 2', 'sm mut');
  s += T(20, 212, 'Polisacárido', 'b') + T(20, 232, 'muchísimas unidades', 'sm mut');
  for (let i = 0; i < 7; i++) { const x = 230 + i * 60; s += mini(x, 215, 'fb'); if (i) s += L(x - 37, 215, x - 23, 215); }
  s += L(410, 205, 440, 182) + mini(462, 172, 'fb') + L(485, 172, 499, 172) + mini(522, 172, 'fb');
  s += T(560, 176, 'rama', 'sm mut');
  return s;
})(), 'Clasificación por número de unidades');

F.glyceraldehyde = svg(680, 230, (() => {
  let s = '';
  s += fischer(170, 70, 'CHO', 'CH₂OH', [['H', 'OH', true]], 'D-gliceraldehído');
  s += fischer(470, 70, 'CHO', 'CH₂OH', [['HO', 'H', true]], 'L-gliceraldehído');
  s += L(320, 40, 320, 190, 'dsh') + T(320, 214, 'espejo', 'mid sm mut');
  s += T(170, 214, 'OH a la DERECHA → D', 'mid sm acc b') + T(470, 214, 'OH a la IZQUIERDA → L', 'mid sm acc b');
  return s;
})(), 'D y L gliceraldehído');

F.epimers = svg(680, 330, (() => {
  let s = '';
  const glc = [['H', 'OH'], ['HO', 'H'], ['H', 'OH'], ['H', 'OH']];
  const man = [['HO', 'H', true], ['HO', 'H'], ['H', 'OH'], ['H', 'OH']];
  const gal = [['H', 'OH'], ['HO', 'H'], ['HO', 'H', true], ['H', 'OH']];
  s += fischer(120, 70, 'CHO', 'CH₂OH', glc, 'D-glucosa');
  s += fischer(340, 70, 'CHO', 'CH₂OH', man, 'D-manosa');
  s += fischer(560, 70, 'CHO', 'CH₂OH', gal, 'D-galactosa');
  s += T(340, 318, 'cambia sólo C2', 'mid sm acc b') + T(560, 318, 'cambia sólo C4', 'mid sm acc b');
  s += T(120, 318, 'referencia', 'mid sm mut');
  return s;
})(), 'Epímeros de la glucosa');

F.cyclization = svg(700, 280, (() => {
  let s = '';
  s += T(30, 30, 'Forma abierta (aldehído)', 'b');
  s += R(30, 50, 200, 200, 'fn', 12);
  s += T(50, 85, 'C1  H–C=O', 'sm b acc') + T(50, 115, 'C2  H–C–OH', 'sm') + T(50, 145, 'C3  HO–C–H', 'sm') + T(50, 175, 'C4  H–C–OH', 'sm') + T(50, 205, 'C5  H–C–OH', 'sm b acc') + T(50, 235, 'C6  CH₂OH', 'sm');
  s += P('M200 205 C 250 205 250 85 200 85', 'ac') + arrow(205, 88, 199, 85, 'ac');
  s += T(250, 140, 'el OH de C5', 'sm acc') + T(250, 158, 'ataca al C1', 'sm acc');
  s += arrow(345, 150, 395, 150);
  s += T(410, 30, 'Anillo (hemiacetal)', 'b');
  s += haworth(530, 150, { anomer: 'b', mark: true });
  s += arrow(655, 232, 612, 160, 'ac') + T(420, 252, 'C1 = carbono anomérico (nuevo centro quiral)', 'sm b acc');
  return s;
})(), 'Ciclación de la glucosa');

F.anomers = svg(680, 270, (() => {
  let s = '';
  s += haworth(150, 120, { anomer: 'a', label: 'α-D-glucopiranosa' });
  s += haworth(500, 120, { anomer: 'b', label: 'β-D-glucopiranosa' });
  s += T(150, 18, 'OH anomérico ABAJO (opuesto al CH₂OH)', 'mid sm acc b');
  s += T(500, 18, 'OH anomérico ARRIBA (igual que CH₂OH)', 'mid sm acc b');
  s += T(325, 105, '⇄', 'mid lg b') + T(325, 128, 'mutarrotación', 'mid sm mut');
  return s;
})(), 'Anómeros alfa y beta');

F.mutarotation = svg(680, 190, (() => {
  let s = '';
  const bar = (y, label, pct, w, cls) => T(20, y + 17, label, 'b') + R(220, y, w, 24, cls, 6) + T(230 + w, y + 17, pct, 'b');
  s += bar(20, 'β-D-glucopiranosa', '≈ 63,6 %', 350, 'fa');
  s += bar(70, 'α-D-glucopiranosa', '≈ 36,4 %', 200, 'fb');
  s += bar(120, 'forma abierta', '≈ 0,003 %', 2, 'fg');
  s += T(20, 178, 'La forma abierta es casi nada, pero es el «pasillo» por el que α y β se transforman uno en otro.', 'sm mut');
  return s;
})(), 'Equilibrio de mutarrotación');

F.reducing = svg(700, 250, (() => {
  let s = '';
  s += R(20, 95, 170, 60, 'fn', 10) + T(105, 120, '¿C anomérico', 'mid sm b') + T(105, 140, 'libre (hemiacetal)?', 'mid sm b');
  s += arrow(190, 112, 250, 60) + T(205, 70, 'sí', 'sm ok b');
  s += arrow(190, 140, 250, 195) + T(205, 190, 'no', 'sm acc b');
  s += R(255, 30, 140, 56, 'fg', 10) + T(325, 54, 'el anillo', 'mid sm') + T(325, 72, 'se abre', 'mid sm');
  s += arrow(395, 58, 430, 58);
  s += R(435, 30, 120, 56, 'fg', 10) + T(495, 54, 'aparece', 'mid sm') + T(495, 72, 'C=O libre', 'mid sm');
  s += arrow(555, 58, 585, 58);
  s += R(590, 22, 100, 72, 'fy', 10) + T(640, 46, 'reduce Cu²⁺', 'mid sm b') + T(640, 64, 'precipitado', 'mid sm') + T(640, 82, 'rojo ladrillo', 'mid sm');
  s += R(255, 170, 300, 56, 'fa', 10) + T(405, 194, 'anillo trabado en un acetal:', 'mid sm') + T(405, 212, 'no hay C=O → no reductor', 'mid sm b');
  return s;
})(), 'Cómo decidir si un azúcar es reductor');

F.derivatives = svg(700, 300, (() => {
  let s = '';
  s += R(260, 120, 180, 60, 'fa', 12) + T(350, 147, 'Glucosa', 'mid b') + T(350, 167, 'C1 … C6', 'mid sm mut');
  const box = (x, y, t1, t2, cls) => R(x, y, 190, 52, cls, 10) + T(x + 95, y + 22, t1, 'mid sm b') + T(x + 95, y + 40, t2, 'mid sm');
  s += box(20, 20, 'Oxido C1 (aldehído)', '→ ácido glucónico', 'fb') + arrow(210, 50, 262, 125);
  s += box(490, 20, 'Oxido C6 (alcohol)', '→ ácido glucurónico', 'fb') + arrow(490, 50, 438, 125);
  s += box(20, 230, 'OH de C2 → NH₂', '→ glucosamina → GlcNAc', 'fg') + arrow(210, 250, 262, 178);
  s += box(490, 230, 'Fosfato en C6', '→ glucosa-6-fosfato', 'fy') + arrow(490, 250, 438, 178);
  s += box(255, 230, 'Saco un OH (→ H)', '→ desoxiazúcar', 'fn') + arrow(350, 230, 350, 182);
  return s;
})(), 'Derivados de la glucosa');

function disacc(x, y, title, link, opt) {
  let s = T(x + 150, y + 18, title, 'mid b');
  s += T(x + 150, y + 38, link, 'mid sm acc');
  if (opt.fru) {
    s += ring(x + 80, y + 105, 100, 38, 'fa').svg;
    s += fring(x + 225, y + 105, 80, 46, 'fb').svg;
    s += L(x + 130, y + 105, x + 185, y + 108, 'ac');
  } else {
    s += ring(x + 80, y + 105, 100, 38, opt.left || 'fa').svg;
    s += ring(x + 220, y + 105, 100, 38, 'fa').svg;
    s += L(x + 130, y + 105, x + 170, y + 105, 'ac');
  }
  if (opt.free) s += C(x + 270, y + 105, 7, 'dy') + T(x + 240, y + 150, 'extremo reductor', 'sm b mid');
  else s += T(x + 150, y + 150, 'sin anomérico libre', 'sm b mid acc');
  s += T(x + 80, y + 172, opt.a, 'sm mid mut') + T(x + 222, y + 172, opt.b, 'sm mid mut');
  s += T(x + 150, y + 195, opt.free ? 'REDUCTORA' : 'NO REDUCTORA', 'mid b ' + (opt.free ? 'ok' : 'acc'));
  return s;
}
F.disaccharides = svg(700, 450, (() => {
  let s = '';
  s += disacc(20, 0, 'Maltosa', 'Glc α(1→4) Glc', { free: true, a: 'glucosa', b: 'glucosa' });
  s += disacc(370, 0, 'Lactosa', 'Gal β(1→4) Glc', { free: true, a: 'galactosa', b: 'glucosa', left: 'fg' });
  s += disacc(20, 225, 'Sacarosa', 'Glc α1 ↔ β2 Fru', { free: false, fru: true, a: 'glucosa', b: 'fructosa' });
  s += disacc(370, 225, 'Trehalosa', 'Glc α1 ↔ 1α Glc', { free: false, a: 'glucosa', b: 'glucosa' });
  return s;
})(), 'Los cuatro disacáridos');

F.alphaBeta = svg(700, 250, (() => {
  let s = '';
  s += T(30, 30, 'Enlaces α(1→4): la cadena se curva', 'b');
  s += P('M40 150 C70 80 110 80 140 150 C170 220 210 220 240 150 C270 80 310 80 340 150', 'ac');
  [40, 90, 140, 190, 240, 290, 340].forEach((x, i) => { const y = [150, 96, 150, 205, 150, 96, 150][i]; s += C(x, y, 7, 'da'); });
  s += T(40, 240, 'hélice → almidón y glucógeno (reserva)', 'sm acc b');
  s += T(390, 30, 'Enlaces β(1→4): la cadena queda recta', 'b');
  for (let k = 0; k < 3; k++) {
    const y = 90 + k * 50;
    s += L(400, y, 680, y, 'al');
    for (let i = 0; i < 7; i++) s += C(410 + i * 44, y, 6, 'db');
    if (k < 2) for (let i = 0; i < 6; i++) s += L(432 + i * 44, y + 7, 432 + i * 44, y + 43, 'dsh');
  }
  s += T(400, 228, 'fibras → celulosa (estructura)', 'sm alt b') + T(400, 246, '- - -  puentes de H entre cadenas', 'sm mut');
  return s;
})(), 'Alfa contra beta');

F.branching = svg(720, 250, (() => {
  let s = '';
  const dotEnd = (x, y) => C(x, y, 6, 'dy');
  s += T(20, 30, 'Amilosa', 'b') + T(20, 48, 'sin ramas', 'sm mut');
  s += L(20, 80, 200, 80, 'ac') + C(20, 80, 6, 'dk') + dotEnd(200, 80);
  s += T(240, 30, 'Amilopectina', 'b') + T(240, 48, 'rama cada 24–30', 'sm mut');
  s += L(240, 80, 440, 80, 'ac') + C(240, 80, 6, 'dk') + dotEnd(440, 80);
  s += L(310, 80, 380, 140, 'ac') + dotEnd(380, 140) + L(400, 80, 450, 125, 'ac') + dotEnd(450, 125);
  s += T(480, 30, 'Glucógeno', 'b') + T(480, 48, 'rama cada 8–12', 'sm mut');
  const tree = (x, y, len, depth, dir) => {
    const x2 = x + len * Math.cos(dir), y2 = y + len * Math.sin(dir);
    let out = L(x, y, x2, y2, 'ac');
    if (depth === 0) return out + dotEnd(x2, y2);
    const mx = x + (x2 - x) * 0.45, my = y + (y2 - y) * 0.45;
    out += tree(x2, y2, len * 0.75, depth - 1, dir - 0.35);
    out += tree(mx, my, len * 0.7, depth - 1, dir + 0.75);
    return out;
  };
  s += tree(480, 80, 70, 3, 0.15);
  s += C(480, 80, 6, 'dk');
  s += C(30, 230, 6, 'dk') + T(44, 235, '= extremo reductor (uno solo por molécula)', 'sm') + C(390, 230, 6, 'dy') + T(404, 235, '= extremos no reductores', 'sm');
  return s;
})(), 'Ramificación y extremos no reductores');

F.gag = svg(700, 230, (() => {
  let s = '';
  let x = 40;
  s += P('M30 120 L670 120', 'al');
  for (let i = 0; i < 7; i++) {
    s += R(x, 104, 70, 32, i % 2 ? 'fg' : 'fb', 8);
    s += T(x + 35, 125, i % 2 ? 'GalNAc' : 'GlcA', 'mid sm b');
    s += T(x + 35, i % 2 ? 160 : 92, i % 2 ? 'SO₃⁻' : 'COO⁻', 'mid sm acc b');
    x += 90;
  }
  for (let i = 0; i < 9; i++) if (i < 2 || i > 4 || i % 2) s += T(40 + i * 75, i % 2 ? 210 : 30, 'H₂O', 'sm ok');
  s += arrow(230, 62, 175, 62, 'ac') + arrow(330, 62, 385, 62, 'ac') + T(280, 67, 'se repelen', 'mid sm acc b');
  return s;
})(), 'Un GAG: cargas negativas y agua');

F.proteoglycan = svg(700, 260, (() => {
  let s = '';
  s += L(20, 220, 680, 220, 'ag') + T(20, 248, 'hialuronano (eje largo)', 'sm ok b');
  [120, 300, 480].forEach(x => {
    s += L(x, 220, x, 40, 'ac');
    for (let y = 60; y <= 200; y += 22) { s += L(x, y, x - 46, y - 14, 'al'); s += L(x, y, x + 46, y - 14, 'al'); }
    s += R(x - 10, 214, 20, 12, 'fy', 3);
  });
  s += T(140, 34, 'proteína central', 'sm acc b') + T(330, 34, 'cadenas de GAG', 'sm alt b') + T(500, 240, 'proteína de enlace', 'sm mut');
  return s;
})(), 'Agregado de proteoglicanos (agrecano)');

F.glycoprotein = svg(700, 230, (() => {
  let s = '';
  s += P('M30 170 C120 150 200 190 300 170 C400 150 480 190 670 170', 'ln') + T(30, 210, 'cadena de la proteína', 'sm mut');
  s += C(200, 176, 8, 'dy') + T(186, 202, 'Ser/Thr', 'sm b');
  s += L(200, 168, 200, 120, 'al') + C(200, 112, 9, 'fb') + L(200, 103, 185, 75, 'al') + C(182, 68, 9, 'fb');
  s += T(110, 60, 'O-unido', 'b alt') + T(110, 78, 'al OH', 'sm mut');
  s += C(470, 172, 8, 'dy') + T(460, 202, 'Asn', 'sm b');
  s += L(470, 164, 470, 125, 'ag') + C(470, 118, 9, 'fg') + L(470, 109, 470, 82, 'ag') + C(470, 75, 9, 'fg');
  s += L(470, 66, 440, 40, 'ag') + C(436, 34, 9, 'fg') + L(470, 66, 500, 40, 'ag') + C(504, 34, 9, 'fg');
  s += T(530, 90, 'N-unido', 'b ok') + T(530, 108, 'al N de la amida', 'sm mut');
  return s;
})(), 'Glicosilación O y N');

F.lectin = svg(700, 250, (() => {
  let s = '';
  s += L(20, 210, 680, 210, 'ln') + T(20, 240, 'superficie celular', 'sm mut');
  [80, 160, 240, 400, 480, 560, 640].forEach(x => { s += L(x, 210, x, 170, 'thin') + C(x, 162, 8, 'fb'); });
  s += R(130, 80, 140, 50, 'fa', 14) + T(200, 70, '1 sitio de unión', 'mid sm') + L(200, 130, 160, 155, 'ac');
  s += T(200, 110, 'débil', 'mid sm b acc');
  s += R(400, 70, 240, 50, 'fa', 14) + T(520, 60, 'varios sitios a la vez', 'mid sm');
  [400, 480, 560, 640].forEach((x, i) => { if (i < 3) s += L(410 + i * 110, 120, 400 + i * 80 + (i ? 0 : 0), 155, 'ac'); });
  s += T(520, 100, 'AVIDEZ alta', 'mid sm b acc');
  return s;
})(), 'Multivalencia de las lectinas');

F.selectin = svg(700, 230, (() => {
  let s = '';
  s += L(20, 180, 680, 180, 'ln') + T(20, 215, 'endotelio inflamado: expone selectinas', 'sm mut');
  s += arrow(30, 30, 680, 30, 'thin') + T(540, 22, 'flujo de sangre →', 'sm mut');
  const cell = (x, bonds, t, t2) => {
    let o = C(x, 128, 34, 'fb') + T(x, 62, t, 'mid sm b') + T(x, 82, t2, 'mid sm mut');
    bonds.forEach(dx => { o += L(x + dx, 160, x + dx, 180, 'ac'); });
    return o;
  };
  s += cell(110, [-6], 'rueda', '1–2 uniones');
  s += cell(300, [-10, 6], 'rueda lento', 'más uniones');
  s += cell(490, [-22, -10, 2, 14, 24], 'adhesión firme', 'integrinas');
  s += P('M585 150 C600 175 610 192 625 200', 'al') + C(632, 204, 13, 'fb') + T(610, 128, 'sale al', 'sm b') + T(610, 145, 'tejido', 'sm b');
  s += T(110, 196, 'sLeˣ + selectina', 'mid sm acc');
  return s;
})(), 'Selectinas y reclutamiento de leucocitos');

F.analysis = svg(700, 160, (() => {
  let s = '';
  const st = [['Liberar', 'glicosidasas'], ['Separar', 'cromatografía'], ['Componer', 'hidrólisis ácida'], ['Enlaces', 'metilación'], ['Secuencia', 'exoglicosidasas'], ['Confirmar', 'MS y RMN']];
  st.forEach(([a, b], i) => {
    const x = 10 + i * 115;
    s += R(x, 50, 102, 62, i % 2 ? 'fb' : 'fa', 10) + T(x + 51, 76, a, 'mid sm b') + T(x + 51, 96, b, 'mid sm');
    if (i < st.length - 1) s += arrow(x + 102, 81, x + 114, 81);
  });
  s += T(10, 30, 'Estrategia típica para descifrar un glicano', 'b');
  s += T(10, 145, 'Ningún método solo alcanza: cada uno responde una parte (qué hay, cómo se une, en qué orden, α o β).', 'sm mut');
  return s;
})(), 'Cómo se analiza un glicano');

module.exports = { F, haworth, fischer };
