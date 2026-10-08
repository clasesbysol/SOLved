'use strict';
/* Dibujos propios de Ácidos nucleicos I (esquemas explicativos; las estructuras químicas reales se muestran con las imágenes originales de la clase). */
const { svg, T, L, P, C, R, arrow } = require('./kit');

const F = {};
const box = (x, y, w, h, t1, t2, cls = 'fa', t3) => {
  const m = y + h / 2;
  let s = R(x, y, w, h, cls, 10);
  if (t3) s += T(x + w / 2, m - 12, t1, 'mid sm b') + T(x + w / 2, m + 5, t2, 'mid sm') + T(x + w / 2, m + 21, t3, 'mid sm mut');
  else if (t2) s += T(x + w / 2, m - 4, t1, 'mid sm b') + T(x + w / 2, m + 13, t2, 'mid sm');
  else s += T(x + w / 2, m + 5, t1, 'mid sm b');
  return s;
};
const inh = (x, y) => C(x, y, 9, 'fn') + L(x - 5, y, x + 5, y, 'ln');   // ⊖ inhibición
const pent = (cx, cy, cls = 'fb') => `<path d="M${cx - 22} ${cy - 2} L${cx} ${cy - 20} L${cx + 22} ${cy - 2} L${cx + 14} ${cy + 18} L${cx - 14} ${cy + 18} Z" class="${cls}"/>`;

/* 1 · Anatomía de un nucleótido y nombres de cada enlace */
F.anatomy = svg(760, 300, (() => {
  let s = '';
  // fosfatos γ β α
  const px = [70, 150, 230];
  ['γ', 'β', 'α'].forEach((g, i) => { s += C(px[i], 150, 26, 'fy') + T(px[i], 155, 'P', 'mid b') + T(px[i], 196, g, 'mid b'); });
  s += L(96, 150, 124, 150, 'ac') + L(176, 150, 204, 150, 'ac');
  s += T(110, 120, 'anhídrido', 'mid sm acc b') + T(190, 120, 'anhídrido', 'mid sm acc b');
  // enlace fosfoéster
  s += L(256, 150, 300, 150, 'ag') + L(300, 150, 330, 150, 'ln') + T(278, 140, 'éster', 'mid sm ok b') + T(300, 172, "C5'", 'mid sm');
  // pentosa
  s += `<path d="M330 150 L372 116 L414 150 L398 190 L346 190 Z" class="fb"/>` + T(372, 162, 'pentosa', 'mid sm b') + T(372, 132, 'O', 'mid sm b');
  s += T(330, 206, "3'", 'sm') + T(400, 206, "2'", 'sm') + T(418, 160, "1'", 'sm') + T(308, 146, "4'", 'sm');
  s += T(372, 228, "en 2': OH (ribosa) · H (desoxirribosa)", 'mid sm alt');
  // N-glicosídico
  s += L(414, 150, 470, 100, 'al') + T(440, 150, 'N-glicosídico', 'sm alt b');
  s += R(470, 60, 120, 70, 'fg', 12) + T(530, 92, 'base', 'mid b') + T(530, 112, 'purina o pirimidina', 'mid sm');
  s += T(600, 92, 'N9 (purinas)', 'sm mut') + T(600, 110, 'N1 (pirimidinas)', 'sm mut');
  // llaves
  s += P('M350 250 Q350 262 362 262 L520 262 Q532 262 532 250', 'thin') + T(441, 284, 'NUCLEÓSIDO = base + pentosa', 'mid sm b');
  s += P('M44 30 Q44 18 56 18 L580 18 Q592 18 592 30', 'thin') + T(318, 40, 'NUCLEÓTIDO = nucleósido + 1, 2 o 3 fosfatos (en C5′)', 'mid sm b acc');
  return s;
})(), 'Partes de un nucleótido y sus enlaces');

/* 2 · Enlaces dentro de una cadena y entre cadenas */
F.chainBonds = svg(760, 330, (() => {
  let s = '';
  const strand = (x, ys, up) => {
    let t = '';
    ys.forEach((y, i) => {
      t += pent(x, y, 'fb');
      if (i < ys.length - 1) {
        const y2 = ys[i + 1];
        t += L(x, y + 18, x, y2 - 20, 'ln') + C(x, (y + y2) / 2, 11, 'fy') + T(x, (y + y2) / 2 + 4, 'P', 'mid sm b');
      }
    });
    return t;
  };
  const ys = [60, 150, 240];
  s += strand(150, ys) + strand(610, ys);
  // bases
  const bl = ['A', 'G', 'C'], br = ['T', 'C', 'G'], hb = [2, 3, 3];
  ys.forEach((y, i) => {
    s += L(172, y, 250, y) + R(250, y - 16, 80, 32, 'fg', 8) + T(290, y + 5, bl[i], 'mid b');
    s += L(588, y, 510, y) + R(430, y - 16, 80, 32, 'fg', 8) + T(470, y + 5, br[i], 'mid b');
    for (let k = 0; k < hb[i]; k++) s += L(332, y - 8 + k * 8, 428, y - 8 + k * 8, 'dsh');
    s += T(380, y - 20, hb[i] + ' puentes H', 'mid sm acc');
  });
  s += T(150, 30, "5'", 'mid b') + T(150, 300, "3'", 'mid b') + T(610, 30, "3'", 'mid b') + T(610, 300, "5'", 'mid b');
  s += arrow(110, 50, 110, 280, 'al') + arrow(650, 280, 650, 50, 'al');
  s += T(98, 170, '5′→3′', 'sm alt b') + T(662, 170, '5′→3′', 'sm alt b');
  s += T(40, 108, 'fosfodiéster', 'sm b') + T(40, 124, "C3'–O–P–O–C5'", 'sm');
  s += T(380, 320, 'covalente dentro de cada cadena (fosfodiéster) · no covalente entre cadenas (puentes H)', 'mid sm mut');
  return s;
})(), 'Enlaces intracatenarios e intercatenarios');

/* 3 · Griffith */
F.griffith = svg(760, 300, (() => {
  let s = '';
  const rows = [
    ['R vivas', 'fg', 'vive', 'ok', 'poco virulentas'],
    ['S vivas', 'fa', 'muere', 'acc', 'cápsula: virulentas'],
    ['S muertas por calor', 'fy', 'vive', 'ok', 'el calor las inactiva'],
    ['R vivas + S muertas por calor', 'fb', 'muere', 'acc', 'se recuperan S vivas']
  ];
  rows.forEach(([a, cls, res, rc, note], i) => {
    const y = 20 + i * 68;
    s += R(20, y, 280, 50, cls, 10) + T(160, y + 30, a, 'mid sm b');
    s += arrow(304, y + 25, 380, y + 25) + T(342, y + 16, 'inyección', 'mid sm mut');
    s += R(386, y + 5, 120, 40, 'fn', 10) + T(446, y + 30, 'ratón ' + res, 'mid sm b ' + rc);
    s += T(520, y + 30, note, 'sm' + (i === 3 ? ' alt b' : ' mut'));
  });
  return s;
})(), 'Experimento de Griffith');

/* 4 · Avery, MacLeod y McCarty: descarte por enzimas */
F.avery = svg(760, 360, (() => {
  let s = '';
  const st = [
    ['Lisado de S muertas (sin tratar)', 'muere', 'el FT está en el lisado'],
    ['+ SIII (degrada la cápsula)', 'muere', 'FT ≠ polisacárido'],
    ['+ tripsina y quimiotripsina', 'muere', 'FT ≠ proteína'],
    ['ácidos nucleicos + ARNasa', 'muere', 'FT ≠ ARN'],
    ['ácidos nucleicos + ADNasa', 'VIVE', 'FT = ADN']
  ];
  st.forEach(([a, r, c], i) => {
    const y = 14 + i * 68, last = i === 4;
    s += R(20, y, 300, 46, last ? 'fa' : 'fb', 10) + T(170, y + 28, a, 'mid sm b');
    s += arrow(324, y + 23, 380, y + 23);
    s += R(384, y + 4, 140, 38, last ? 'fg' : 'fn', 10) + T(454, y + 28, (last ? 'ratón ' : 'ratón ') + r, 'mid sm b' + (last ? ' ok' : ' acc'));
    s += T(540, y + 28, c, 'sm' + (last ? ' acc b' : ''));
    if (i < 4) s += arrow(170, y + 48, 170, y + 66, 'thin');
  });
  return s;
})(), 'Experimento de Avery, MacLeod y McCarty');

/* 5 · Línea de tiempo de la diapositiva 21 */
F.timeline = svg(760, 190, (() => {
  let s = L(30, 90, 730, 90, 'ln');
  const ev = [[1865, 'Mendel'], [1909, 'Johannsen'], [1928, 'Griffith'], [1944, 'Avery'], [1952, 'Hershey–Chase'], [1953, 'Watson–Crick'], [1962, 'Premio Nobel']];
  const x = y => 40 + (y - 1865) / (1962 - 1865) * 680;
  ev.forEach(([y, n], i) => {
    const X = x(y) + (y === 1953 ? 14 : 0) - (y === 1952 ? 6 : 0);
    s += L(X, 80, X, 100, 'ac');
    const up = i % 2 === 0, lx = X + (y === 1952 ? -30 : 0) + (y === 1962 ? -14 : 0);
    s += T(lx, up ? 66 : 124, String(y), 'mid sm b acc') + T(lx, up ? 46 : 144, n, 'mid sm');
  });
  s += T(380, 180, 'Herencia (Mendel, Johannsen) → ¿qué molécula? (Griffith, Avery, Hershey–Chase) → ¿qué forma? (Watson–Crick)', 'mid sm mut');
  return s;
})(), 'Cronología');

/* 6 · Dimensiones de la hélice B */
F.helix = svg(760, 400, (() => {
  let s = '';
  const x0 = 120, top = 30, H = 320, w = 90;
  let d1 = '', d2 = '';
  for (let i = 0; i <= 64; i++) {
    const y = top + i * H / 64, a = i / 64 * 2 * Math.PI * 1;
    const xa = x0 + w / 2 * Math.sin(a), xb = x0 - w / 2 * Math.sin(a);
    d1 += (i ? ' L' : 'M') + xa.toFixed(1) + ' ' + y.toFixed(1);
    d2 += (i ? ' L' : 'M') + xb.toFixed(1) + ' ' + y.toFixed(1);
  }
  for (let k = 0; k < 10; k++) {
    const y = top + (k + 0.5) * H / 10, a = (k + 0.5) / 10 * 2 * Math.PI;
    s += L(x0 + w / 2 * Math.sin(a), y, x0 - w / 2 * Math.sin(a), y, 'thin');
  }
  s += `<path d="${d1}" class="ac"/><path d="${d2}" class="al"/>`;
  // cotas
  s += L(210, top, 210, top + H, 'ln') + L(204, top, 216, top) + L(204, top + H, 216, top + H);
  s += T(222, top + H / 2 - 8, '1 vuelta = 34 Å', 'sm b') + T(222, top + H / 2 + 10, '(3,4 nm)', 'sm');
  s += L(60, top + 4 * H / 10, 60, top + 5 * H / 10, 'ln') + L(54, top + 4 * H / 10, 66, top + 4 * H / 10) + L(54, top + 5 * H / 10, 66, top + 5 * H / 10);
  s += T(14, top + 4.5 * H / 10 - 6, '3,4 Å', 'sm b') + T(14, top + 4.5 * H / 10 + 10, 'por par', 'sm');
  s += L(75, top + H + 16, 165, top + H + 16, 'ln') + T(120, top + H + 34, '≈ 20 Å de diámetro', 'mid sm b');
  // texto
  const tx = 390;
  s += R(tx - 10, 30, 360, 300, 'fn', 14);
  s += T(tx + 170, 60, 'Cómo encajan los números', 'mid b');
  s += T(tx, 95, '• 10 pares por vuelta (modelo) · 10,4–10,5', 'sm');
  s += T(tx, 113, '  medidos en solución', 'sm mut');
  s += T(tx, 140, '• 34 Å / 10 pares = 3,4 Å por par', 'sm');
  s += T(tx, 167, '• 360° / 10 pares = 36° de giro por par', 'sm');
  s += T(tx, 185, '  (con 10,4 pares: ≈ 34,6°)', 'sm mut');
  s += T(tx, 212, '• diámetro ≈ 20 Å (20–24 Å según el método)', 'sm');
  s += T(tx, 239, '• surco mayor y surco menor', 'sm');
  s += T(tx, 266, '• bases adentro, casi perpendiculares al eje', 'sm');
  s += T(tx, 293, '• azúcar-fosfato afuera, en contacto con el agua', 'sm');
  return s;
})(), 'Dimensiones de la doble hélice B');

/* 7 · Curva de fusión: cómo leer la Tm */
F.melt = svg(760, 320, (() => {
  let s = '';
  const X = t => 70 + (t - 55) / 40 * 560, Y = a => 270 - (a - 1) / 0.45 * 230;
  s += L(70, 270, 650, 270) + L(70, 270, 70, 30);
  [1.0, 1.1, 1.2, 1.3, 1.4].forEach(a => { s += L(64, Y(a), 70, Y(a)) + T(34, Y(a) + 4, a.toFixed(1).replace('.', ','), 'sm'); });
  [55, 65, 75, 85, 95].forEach(t => { s += L(X(t), 270, X(t), 276) + T(X(t), 292, String(t), 'mid sm'); });
  const curve = (tm, cls) => {
    let d = '';
    for (let t = 55; t <= 95; t += 0.5) { const a = 1 + 0.4 / (1 + Math.exp(-(t - tm) / 1.6)); d += (t === 55 ? 'M' : ' L') + X(t).toFixed(1) + ' ' + Y(a).toFixed(1); }
    return `<path d="${d}" class="${cls}"/>`;
  };
  s += curve(68, 'al') + curve(76, 'ac') + curve(84, 'ag');
  s += L(70, Y(1.2), X(76), Y(1.2), 'dsh') + L(X(76), Y(1.2), X(76), 270, 'dsh');
  s += T(X(76) + 6, 262, 'Tm', 'sm b acc');
  s += T(X(68) - 30, Y(1.36), 'menos G+C', 'sm alt b') + T(X(84) + 10, Y(1.12), 'más G+C', 'sm ok b');
  s += T(360, 316, 'Temperatura (°C)', 'mid sm');
  s += T(470, 50, 'meseta superior = todo desapareado (ss)', 'sm mut');
  s += T(80, 22, 'Absorbancia relativa a 260 nm', 'sm b');
  return s;
})(), 'Lectura de la Tm');

/* 8 · Dogma central */
F.dogma = svg(760, 290, (() => {
  let s = '';
  s += box(60, 100, 150, 60, 'ADN', 'guarda', 'fb');
  s += box(310, 100, 150, 60, 'ARN', 'transporta', 'fg');
  s += box(560, 100, 150, 60, 'Proteína', 'ejecuta', 'fa');
  s += P('M110 98 C 90 30 180 30 160 98', 'ln') + arrow(162, 80, 160, 98) + T(135, 28, 'replicación', 'mid sm b');
  s += arrow(212, 130, 306, 130) + T(259, 120, 'transcripción', 'mid sm b');
  s += arrow(462, 130, 556, 130) + T(509, 120, 'traducción', 'mid sm b');
  s += P('M360 164 C 340 205 200 205 165 166', 'thin') + arrow(172, 172, 165, 166, 'thin') + T(262, 222, 'ARN → ADN (retrotranscripción)', 'mid sm mut') + T(262, 238, 'ampliación: no está prohibida', 'mid sm mut');
  s += P('M635 164 L635 230', 'dsh') + T(635, 250, '✗ de la proteína no vuelve', 'mid sm acc b') + T(635, 268, 'información de secuencia', 'mid sm acc b');
  return s;
})(), 'Dogma central');

/* 9 · Panorama del metabolismo (diapositiva 48) */
F.metab = svg(760, 400, (() => {
  let s = '';
  const cx = 380, w = 200;
  const lv = [['ADN / ARN', 'fa'], ['Oligonucleótidos', 'fy'], ['Nucleótidos', 'fb'], ['Nucleósidos + Pi', 'fg'], ['Base + ribosa-1-P', 'fy']];
  const en = ['nucleasas', 'fosfodiesterasas', 'nucleotidasas', 'nucleósido fosforilasa (+ Pi)'];
  lv.forEach(([t, c], i) => {
    const y = 20 + i * 76;
    s += R(cx - w / 2, y, w, 38, c, 10) + T(cx, y + 24, t, 'mid sm b');
    if (i < 4) s += arrow(cx, y + 40, cx, y + 74) + T(cx + 10, y + 62, en[i], 'sm');
  });
  s += R(20, 324, 150, 38, 'fn', 10) + T(95, 348, 'Degradación', 'mid sm b') + arrow(278, 343, 172, 343) + T(95, 382, 'purinas → ácido úrico', 'mid sm acc');
  s += R(590, 324, 150, 38, 'fg', 10) + T(665, 348, 'Rescate', 'mid sm b') + arrow(482, 343, 588, 343);
  s += P('M665 322 C 665 220 560 200 482 192', 'ag') + arrow(500, 194, 482, 192, 'ag') + T(500, 300, '+ PRPP → nucleótido', 'sm ok b');
  s += R(590, 60, 150, 50, 'fy', 10) + T(665, 82, 'Biosíntesis', 'mid sm b') + T(665, 100, '«de novo»', 'mid sm');
  s += arrow(600, 112, 482, 182, 'ac');
  s += P('M278 190 C 120 170 120 60 278 40', 'al') + arrow(262, 44, 278, 40, 'al') + T(110, 120, 'polimerización', 'mid sm alt b');
  return s;
})(), 'Degradación, síntesis de novo y rescate');

/* 10 · Síntesis de purinas y su regulación */
F.purines = svg(760, 430, (() => {
  let s = '';
  s += box(16, 40, 112, 46, 'Ribosa-5-P', '', 'fy');
  s += arrow(130, 63, 196, 63) + T(163, 34, 'ATP → AMP', 'mid sm') + T(163, 102, 'PRPP sintetasa', 'mid sm mut');
  s += box(198, 40, 82, 46, 'PRPP', '', 'fy');
  s += arrow(282, 63, 354, 63, 'ac') + T(318, 34, '+ Gln', 'mid sm');
  s += inh(318, 82);
  s += box(356, 40, 200, 46, '5-fosforribosil-1-amina', '', 'fa');
  s += arrow(558, 63, 636, 63) + T(597, 54, '9 pasos', 'mid sm b');
  s += box(638, 40, 106, 46, 'IMP', '(inosinato)', 'fb');
  s += T(318, 124, 'glutamina-PRPP amidotransferasa', 'mid sm acc b') + T(318, 140, '= PASO COMPROMETIDO', 'mid sm acc b');
  s += T(318, 158, '⊖ IMP, AMP y GMP', 'mid sm acc');
  // rama AMP
  s += arrow(712, 88, 690, 192) + inh(705, 140) + T(722, 144, 'AMP', 'sm acc b');
  s += box(560, 194, 190, 56, 'Adenilosuccinato', '+ Asp · GTP → GDP + Pi', 'fn');
  s += arrow(655, 252, 655, 300) + T(667, 282, '− fumarato', 'sm');
  s += box(595, 302, 120, 46, 'AMP', '', 'fg');
  // rama GMP
  s += arrow(650, 88, 480, 192) + inh(560, 142) + T(500, 146, 'GMP', 'sm acc b');
  s += box(360, 194, 170, 56, 'Xantilato (XMP)', 'NAD⁺ → NADH (oxida)', 'fn');
  s += arrow(445, 252, 445, 300) + T(260, 270, 'Gln → Glu · ATP → AMP + PPi', 'sm');
  s += box(385, 302, 120, 46, 'GMP', '', 'fg');
  s += T(380, 382, '⊖ productos finales frenan la entrada (retroinhibición) y cada uno su propia rama', 'mid sm acc b');
  s += T(380, 404, 'cruce de energía: GTP para hacer AMP · ATP para hacer GMP → se equilibran las dos', 'mid sm alt b');
  s += T(380, 424, 'PRPP también va a histidina, pirimidinas y rescate: por eso el compromiso está DESPUÉS del PRPP', 'mid sm mut');
  return s;
})(), 'Síntesis de purinas y regulación');

/* 11 · Síntesis de pirimidinas */
F.pyrimidines = svg(760, 300, (() => {
  let s = '';
  s += box(10, 30, 170, 54, 'HCO₃⁻ + Gln + 2 ATP', '→ carbamoil fosfato', 'fy');
  s += box(10, 120, 170, 46, 'Aspartato', '', 'fy');
  s += arrow(182, 57, 250, 92) + arrow(182, 143, 250, 110);
  s += T(220, 104, 'ATCasa', 'mid sm acc b');
  s += box(252, 78, 150, 46, 'Carbamoilaspartato', '', 'fa');
  s += T(327, 70, 'PASO COMPROMETIDO', 'mid sm acc b');
  s += arrow(404, 101, 450, 101);
  s += box(452, 78, 120, 46, 'Orotato', '', 'fn');
  s += T(470, 145, '(dihidroorotato en el medio)', 'sm mut');
  s += arrow(574, 101, 620, 101) + T(597, 90, '+ PRPP', 'mid sm b');
  s += box(622, 74, 130, 54, 'OMP', '(orotidilato)', 'fb');
  s += arrow(687, 126, 687, 180) + T(697, 158, '− CO₂', 'sm');
  s += box(622, 182, 130, 46, 'UMP', '', 'fg');
  s += arrow(620, 205, 560, 205) + box(470, 182, 88, 46, 'UDP', '', 'fg');
  s += arrow(468, 205, 410, 205) + box(320, 182, 88, 46, 'UTP', '', 'fg');
  s += arrow(318, 205, 262, 205) + T(290, 196, '+ NH₂', 'mid sm');
  s += box(160, 182, 100, 46, 'CTP', '', 'fg') + T(210, 246, 'CTP sintetasa', 'mid sm mut');
  s += P('M200 182 C 205 160 215 140 222 128', 'dsh') + inh(222, 122);
  s += T(380, 280, '⊖ CTP (producto final) inhibe la ATCasa · ⊕ ATP la activa (ejemplo clásico)', 'mid sm acc b');
  return s;
})(), 'Síntesis de pirimidinas');

/* 12 · Desoxirribonucleótidos y timidilato */
F.dntp = svg(760, 330, (() => {
  let s = '';
  const n = ['ADP', 'GDP', 'CDP', 'UDP'], d = ['dADP', 'dGDP', 'dCDP', 'dUDP'], t = ['dATP', 'dGTP', 'dCTP', ''];
  n.forEach((x, i) => {
    const X = 40 + i * 110;
    s += box(X, 20, 90, 40, x, '', 'fy') + L(X + 45, 62, X + 45, 74) + arrow(X + 45, 100, X + 45, 112);
    s += box(X, 114, 90, 40, d[i], '', 'fb');
    if (t[i]) s += arrow(X + 45, 156, X + 45, 206) + box(X, 208, 90, 40, t[i], '', 'fg');
  });
  s += R(30, 74, 440, 26, 'fa', 13) + T(250, 92, 'ribonucleótido reductasa (actúa sobre difosfatos)', 'mid sm b');
  // rama del timidilato
  const X = 370;
  s += arrow(X + 92, 134, 520, 134) + box(522, 114, 90, 40, 'dUTP', '', 'fn');
  s += arrow(567, 156, 567, 200) + T(578, 182, 'dUTPasa', 'sm b acc');
  s += box(522, 202, 90, 40, 'dUMP', '', 'fn');
  s += arrow(614, 222, 650, 222) + box(652, 202, 90, 40, 'dTMP', '', 'fg');
  s += T(697, 262, 'timidilato sintasa', 'mid sm b') + T(697, 278, '(+ metilo del', 'mid sm') + T(697, 294, 'N⁵,N¹⁰-metilen-THF)', 'mid sm');
  s += arrow(697, 200, 697, 160) + box(652, 118, 90, 40, 'dTTP', '', 'fg');
  s += T(250, 300, 'dUTPasa: saca dUTP del medio → el uracilo no entra al ADN', 'mid sm acc');
  s += T(250, 320, 'no existe el camino inverso: desoxi → ribo', 'mid sm mut');
  return s;
})(), 'Síntesis de desoxirribonucleótidos');

/* 13 · Ciclo del timidilato y fármacos */
F.thymidylate = svg(760, 370, (() => {
  let s = '';
  s += box(60, 30, 110, 44, 'dUMP', '', 'fn') + arrow(172, 52, 288, 52) + box(290, 30, 110, 44, 'dTMP', '', 'fg');
  s += T(230, 22, 'timidilato sintasa (TS)', 'mid sm b') + inh(230, 74);
  s += box(500, 24, 240, 56, 'Fluorouracilo', '→ FdUMP (inhibidor suicida)', 'fa');
  s += P('M560 82 C 520 130 300 120 238 80', 'dsh');
  s += box(30, 150, 210, 46, 'N⁵,N¹⁰-metilen-THF', '', 'fy');
  s += box(440, 150, 170, 56, 'DHF', '(dihidrofolato)', 'fy');
  s += box(220, 290, 200, 56, 'THF', '(tetrahidrofolato)', 'fy');
  s += arrow(242, 173, 436, 176) + T(340, 166, 'cede el metilo a dUMP', 'mid sm');
  s += arrow(525, 208, 424, 304) + T(560, 252, 'DHFR', 'sm b acc') + T(560, 270, 'NADPH + H⁺ → NADP⁺', 'sm') + inh(480, 252);
  s += arrow(218, 318, 120, 200) + T(40, 262, 'serina → glicina', 'sm');
  s += box(580, 296, 170, 56, 'Aminopterina', 'Metotrexato', 'fa') + P('M580 316 C 540 300 510 270 488 256', 'dsh');
  return s;
})(), 'Ciclo del timidilato y drogas');

/* 14 · Degradación de purinas a urato y rescate */
F.uric = svg(760, 360, (() => {
  let s = '';
  const st = [['AMP', 20], ['Adenosina', 145], ['Inosina', 290], ['Hipoxantina', 425]];
  st.forEach(([t, x]) => { s += box(x, 40, 110, 40, t, '', 'fn'); });
  s += arrow(132, 60, 143, 60) + T(137, 30, 'nucleotidasa', 'mid sm');
  s += arrow(257, 60, 288, 60) + T(272, 100, 'adenosina desaminasa (−NH₄⁺)', 'mid sm');
  s += arrow(402, 60, 423, 60) + T(412, 30, 'nucleósido fosforilasa (+Pi → ribosa-1-P)', 'mid sm');
  s += arrow(480, 82, 480, 140) + T(490, 116, 'xantina oxidasa', 'sm b acc');
  s += box(425, 142, 110, 40, 'Xantina', '', 'fy');
  s += box(620, 40, 110, 40, 'Guanina', '', 'fn') + arrow(675, 82, 540, 150) + T(640, 120, '(desde GMP)', 'sm mut');
  s += arrow(480, 184, 480, 240) + T(490, 216, 'xantina oxidasa', 'sm b acc');
  s += box(390, 242, 180, 40, 'Ácido úrico ⇄ urato', '', 'fa');
  s += box(588, 226, 168, 64, 'Otros mamíferos:', 'urato oxidasa', 'fg', '→ alantoína, más soluble');
  s += T(380, 312, 'humanos: sin urato oxidasa → excretamos urato; si se acumula → cristales → gota', 'mid sm acc b');
  s += box(20, 150, 200, 64, 'Alopurinol', 'análogo de hipoxantina', 'fa', 'inhibe la xantina oxidasa');
  s += P('M222 182 C 330 180 380 140 470 116', 'dsh') + inh(470, 116);
  s += P('M222 190 C 330 210 380 210 470 216', 'dsh') + inh(470, 216);
  s += T(380, 344, 'rescate: hipoxantina o guanina + PRPP → IMP o GMP + PPi (HGPRT) · adenina + PRPP → AMP + PPi', 'mid sm ok b');
  return s;
})(), 'Degradación de purinas a urato');

/* 15 · Por qué T en el ADN */
F.tvsu = svg(760, 250, (() => {
  let s = '';
  s += box(20, 26, 120, 52, 'C', '(en el ADN)', 'fb');
  s += arrow(142, 52, 222, 52) + T(182, 40, 'desaminación', 'mid sm') + T(182, 72, 'espontánea', 'mid sm');
  s += box(224, 26, 120, 52, 'U', '(error)', 'fa');
  s += T(380, 56, 'Si el ADN usara U normalmente:', 'sm b');
  s += T(380, 74, '¿cuál es «legítimo» y cuál era una C?', 'sm');
  s += box(20, 120, 200, 56, 'ADN usa T', '= U + metilo en C5', 'fg');
  s += arrow(222, 148, 300, 148) + T(262, 138, 'todo U', 'mid sm') + T(262, 170, 'es un error', 'mid sm');
  s += box(302, 120, 200, 56, 'uracilo-ADN', 'glicosilasa lo saca', 'fy');
  s += arrow(504, 148, 560, 148) + box(562, 120, 180, 56, 'reparación por', 'escisión de bases → C', 'fg');
  s += T(380, 220, 'sin reparar: C (aparea con G) pasa a U (aparea con A) → tras replicar, G–C se vuelve A–T', 'mid sm acc b');
  return s;
})(), 'Por qué el ADN tiene timina');

/* 16 · Ancho constante: purina + pirimidina */
F.pairWidth = svg(760, 250, (() => {
  let s = '';
  const rail = y => L(40, y, 40, y + 50, 'al') + L(300, y, 300, y + 50, 'al');
  const pur = (x, y, w, cls) => R(x, y, w, 34, cls, 8);
  // fila 1: purina + pirimidina (justo)
  s += rail(20) + pur(44, 28, 140, 'fa') + T(114, 50, 'purina (2 anillos)', 'mid sm b') + pur(188, 28, 108, 'fg') + T(242, 50, 'pirimidina', 'mid sm b');
  s += T(320, 50, '✓ encaja: ≈ 20 Å, siempre igual', 'sm ok b');
  // fila 2: purina + purina (no entra)
  s += rail(95) + pur(44, 103, 140, 'fa') + T(114, 125, 'purina', 'mid sm b') + pur(170, 103, 140, 'fa') + T(240, 125, 'purina', 'mid sm b');
  s += T(320, 125, '✗ demasiado ancho: no entra', 'sm acc b');
  // fila 3: pirimidina + pirimidina (corto)
  s += rail(170) + pur(44, 178, 108, 'fg') + T(98, 200, 'pirimidina', 'mid sm b') + pur(160, 178, 108, 'fg') + T(214, 200, 'pirimidina', 'mid sm b');
  s += T(320, 200, '✗ demasiado angosto: queda un hueco', 'sm acc b');
  s += T(170, 242, 'las líneas violetas son los dos esqueletos azúcar-fosfato', 'mid sm mut');
  return s;
})(), 'Por qué purina con pirimidina');

/* 17 · Cadena molde y cadena no molde en la transcripción */
F.strands = svg(760, 230, (() => {
  let s = '';
  const seq = (x, y, txt, cls) => txt.split('').map((c, i) => T(x + i * 34, y, c, 'mid lg b ' + (cls || ''))).join('');
  s += T(20, 40, 'ADN no molde', 'sm b') + T(130, 40, "5′", 'sm b') + seq(170, 42, 'ATGGCTTGG') + T(480, 40, "3′", 'sm b');
  s += T(20, 90, 'ADN molde', 'sm b') + T(130, 90, "3′", 'sm b') + seq(170, 92, 'TACCGAACC', 'alt') + T(480, 90, "5′", 'sm b');
  s += L(150, 62, 470, 62, 'dsh');
  s += arrow(180, 106, 180, 144, 'al') + T(200, 130, 'la ARN polimerasa lee el molde de 3′ a 5′', 'sm');
  s += T(20, 180, 'ARN', 'sm b') + T(130, 180, "5′", 'sm b') + seq(170, 182, 'AUGGCUUGG', 'ok') + T(480, 180, "3′", 'sm b');
  s += T(510, 52, 'misma secuencia', 'sm ok b') + T(510, 70, 'que el ARN (con T)', 'sm ok b');
  s += T(510, 182, 'complementario al', 'sm alt b') + T(510, 200, 'molde, con U', 'sm alt b');
  s += P('M500 60 C 560 100 560 150 500 175', 'ag');
  s += T(380, 224, 'el ARN se arma de 5′ a 3′, antiparalelo al molde', 'mid sm mut');
  return s;
})(), 'Cadena molde y no molde');

module.exports = { F };
