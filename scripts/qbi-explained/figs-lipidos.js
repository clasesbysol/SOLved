'use strict';
/* Dibujos de Lípidos I y II. */
const { svg, T, L, P, C, R, arrow } = require('./kit');

/* Cola hidrocarbonada en zigzag hacia abajo (dir=1) o arriba (dir=-1). kink = índice de segmento donde se dobla (cis). */
function tail(x, y, len = 54, dir = 1, kink = -1, cls = 'ln') {
  let d = `M${x} ${y}`, cx = x, cy = y, slant = 0;
  const n = Math.round(len / 7);
  for (let i = 0; i < n; i++) {
    if (i === kink) slant = 0.9;
    cy += 7 * dir; cx += (i % 2 ? -3 : 3) + slant * 4;
    d += ` L${cx.toFixed(1)} ${cy.toFixed(1)}`;
  }
  return `<path d="${d}" class="${cls}"/>`;
}
/* Fosfolípido: cabeza + dos colas. */
function pl(x, y, opt = {}) {
  const { dir = 1, head = 'fa', r = 8, kink = -1, len = 46, single = false } = opt;
  let s = C(x, y, r, head);
  s += tail(x - 4, y + r * dir, len, dir, -1);
  if (!single) s += tail(x + 4, y + r * dir, len, dir, kink);
  return s;
}

const F = {};

F.families = svg(760, 240, (() => {
  let s = '';
  // TAG
  s += R(30, 40, 60, 26, 'fy', 6) + T(60, 58, 'glicerol', 'mid sm');
  [40, 60, 80].forEach(x => { s += tail(x, 66, 70); });
  s += T(60, 175, 'Triacilglicérido', 'mid b') + T(60, 193, 'sin cabeza polar', 'mid sm mut') + T(60, 211, '→ reserva', 'mid sm acc b');
  // GPL
  s += C(200, 45, 13, 'fa') + R(185, 60, 30, 16, 'fy', 4) + tail(194, 76, 64) + tail(206, 76, 64);
  s += T(200, 175, 'Glicerofosfolípido', 'mid b') + T(200, 193, 'cabeza + 2 colas', 'mid sm mut') + T(200, 211, '→ membranas', 'mid sm acc b');
  // Esfingolípido
  s += C(340, 45, 13, 'fg') + R(325, 60, 30, 16, 'fg', 4) + tail(334, 76, 64) + tail(346, 76, 64);
  s += T(340, 175, 'Esfingolípido', 'mid b') + T(340, 193, 'base esfingoide', 'mid sm mut') + T(340, 211, '→ membrana y señales', 'mid sm acc b');
  // Esterol
  s += C(470, 42, 6, 'da') + T(482, 46, 'OH', 'sm');
  const hx = (x, y) => `<path d="M${x} ${y} l12 -7 l12 7 l0 14 l-12 7 l-12 -7 z" class="fb"/>`;
  s += hx(458, 52) + hx(470, 73) + hx(458, 94) + `<path d="M482 94 l10 -6 l9 8 l-4 12 l-12 0 z" class="fb"/>` + tail(488, 112, 34);
  s += T(490, 175, 'Esterol', 'mid b') + T(490, 193, '4 anillos rígidos', 'mid sm mut') + T(490, 211, '→ regula la fluidez', 'mid sm acc b');
  // Cera
  s += tail(660, 40, 60) + R(648, 100, 24, 12, 'fy', 4) + tail(660, 112, 40);
  s += T(660, 175, 'Cera', 'mid b') + T(660, 193, 'AG largo + alcohol largo', 'mid sm mut') + T(660, 211, '→ impermeabiliza', 'mid sm acc b');
  return s;
})(), 'Familias de lípidos');

F.numbering = svg(720, 210, (() => {
  let s = '';
  const x0 = 70, dx = 33, pts = [];
  for (let i = 1; i <= 18; i++) pts.push([x0 + (i - 1) * dx, i % 2 ? 110 : 85]);
  s += T(18, 106, 'HOOC', 'b');
  s += L(58, 104, pts[0][0], pts[0][1]);
  for (let i = 0; i < 17; i++) s += L(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], i === 8 ? 'ac' : 'ln');
  s += T(pts[17][0] + 8, pts[17][1] + 4, 'CH₃', 'b');
  pts.forEach(([x, y], i) => {
    const n = i + 1;
    s += T(x, y > 100 ? 132 : 72, String(n), 'mid sm' + (n === 9 || n === 10 ? ' acc b' : ''));
    s += T(x, y > 100 ? 168 : 40, String(19 - n), 'mid sm alt' + (19 - n === 9 ? ' b' : ''));
  });
  s += T(70, 196, 'Δ cuenta desde el carboxilo (C1): el doble enlace está en el C9 → Δ9', 'sm acc b');
  s += T(70, 20, 'ω cuenta desde el metilo: el primer doble enlace está en el carbono 9 → ω-9 (n-9)', 'sm alt b');
  return s;
})(), 'Numeración del oleato 18:1');

F.cisTrans = svg(700, 200, (() => {
  let s = '';
  s += T(110, 24, 'Saturada', 'mid b') + tail(110, 40, 120, 1, -1, 'ac') + T(110, 190, 'recta', 'mid sm');
  s += T(350, 24, 'Insaturada cis', 'mid b') + tail(330, 40, 120, 1, 8, 'al') + T(350, 190, 'se dobla (codo)', 'mid sm');
  s += T(590, 24, 'Insaturada trans', 'mid b') + tail(590, 40, 120, 1, -1, 'ag') + T(590, 190, 'casi recta', 'mid sm');
  return s;
})(), 'Cis y trans');

F.packing = svg(700, 230, (() => {
  let s = '';
  s += T(160, 24, 'Colas saturadas', 'mid b');
  for (let i = 0; i < 8; i++) s += tail(70 + i * 26, 45, 120, 1, -1, 'ac');
  s += T(160, 200, 'se empaquetan juntas', 'mid sm') + T(160, 220, 'muchos contactos → Tm alta (sólido)', 'mid sm acc b');
  s += T(520, 24, 'Colas con dobles enlaces cis', 'mid b');
  for (let i = 0; i < 5; i++) s += tail(420 + i * 44, 45, 120, 1, 7 + (i % 2), 'al');
  s += T(520, 200, 'los codos dejan huecos', 'mid sm') + T(520, 220, 'pocos contactos → Tm baja (líquido)', 'mid sm alt b');
  return s;
})(), 'Empaquetamiento y punto de fusión');

F.omega = svg(720, 210, (() => {
  let s = '';
  const box = (x, y, w, t1, t2, cls) => R(x, y, w, 50, cls, 10) + T(x + w / 2, y + 21, t1, 'mid sm b') + T(x + w / 2, y + 39, t2, 'mid sm');
  s += T(10, 20, 'Familia ω-6', 'b acc');
  s += box(10, 30, 150, 'Linoleato', '18:2 ω-6 (dieta)', 'fa') + arrow(160, 55, 205, 55);
  s += box(210, 30, 160, 'Araquidonato (AA)', '20:4 ω-6', 'fa') + arrow(370, 55, 415, 55);
  s += box(420, 30, 290, 'Eicosanoides', 'prostaglandinas, tromboxanos, leucotrienos', 'fa');
  s += T(10, 120, 'Familia ω-3', 'b alt');
  s += box(10, 130, 150, 'α-linolenato (ALA)', '18:3 ω-3 (dieta)', 'fb') + arrow(160, 155, 205, 155);
  s += box(210, 130, 160, 'EPA → DHA', '20:5 → 22:6 ω-3', 'fb') + arrow(370, 155, 415, 155);
  s += box(420, 130, 290, 'Mediadores pro-resolutivos', 'resolvinas, protectinas, maresinas', 'fb');
  s += T(182, 100, 'alargar + desaturar', 'mid sm mut');
  return s;
})(), 'Rutas ω-6 y ω-3');

F.droplet = svg(700, 230, (() => {
  let s = '';
  const cx = 200, cy = 115, r = 80;
  s += C(cx, cy, r - 14, 'fy') + T(cx, cy - 4, 'TAG +', 'mid b') + T(cx, cy + 16, 'ésteres de colesterol', 'mid sm');
  for (let i = 0; i < 26; i++) {
    const a = i / 26 * Math.PI * 2, hx = cx + r * Math.cos(a), hy = cy + r * Math.sin(a);
    s += C(hx, hy, 6, 'fa') + L(hx - 9 * Math.cos(a), hy - 9 * Math.sin(a), hx - 16 * Math.cos(a), hy - 16 * Math.sin(a));
  }
  s += T(400, 70, 'Núcleo: lípidos neutros (sin agua)', 'sm b');
  s += T(400, 100, 'Borde: UNA sola capa de fosfolípidos,', 'sm') + T(400, 118, 'con las cabezas hacia el citoplasma', 'sm');
  s += T(400, 150, 'Lipasas: liberan ácidos grasos', 'sm acc b') + T(400, 168, 'cuando la célula los necesita', 'sm');
  return s;
})(), 'Gota lipídica');

F.fas = svg(720, 170, (() => {
  let s = '';
  const box = (x, t1, t2, cls) => R(x, 50, 120, 56, cls, 10) + T(x + 60, 74, t1, 'mid sm b') + T(x + 60, 93, t2, 'mid sm');
  s += box(10, 'Acetil-CoA', '2 C', 'fy') + arrow(130, 78, 150, 78);
  s += box(155, 'Malonil-CoA', 'donador de 2 C', 'fy') + arrow(275, 78, 295, 78);
  s += box(300, 'FAS', 'suma de a 2 C', 'fa') + arrow(420, 78, 440, 78);
  s += box(445, 'Palmitato', '16:0', 'fa') + arrow(565, 78, 585, 78);
  s += box(590, 'Elongar y', 'desaturar', 'fb');
  s += P('M335 50 C 330 22 390 22 385 50', 'ac') + T(360, 16, 'muchos ciclos', 'mid sm acc');
  s += T(10, 150, 'Como se agregan de a 2 carbonos, predominan los ácidos grasos con número PAR de carbonos.', 'sm mut');
  return s;
})(), 'Síntesis de ácidos grasos');

F.shapes = svg(720, 295, (() => {
  let s = '';
  // formas
  s += `<path d="M40 40 L120 40 L95 120 L65 120 Z" class="fa"/>` + T(80, 145, 'cono invertido', 'mid sm b') + T(80, 162, 'lisofosfolípido, AG libre', 'mid sm mut');
  s += `<path d="M280 40 L360 40 L360 120 L280 120 Z" class="fa"/>` + T(320, 145, 'cilindro', 'mid sm b') + T(320, 162, 'PC, PS', 'mid sm mut');
  s += `<path d="M545 40 L575 40 L620 120 L500 120 Z" class="fa"/>` + T(560, 145, 'cono', 'mid sm b') + T(560, 162, 'PE, PA, DAG, cardiolipina', 'mid sm mut');
  // micela
  const mc = [80, 230];
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; s += pl(mc[0] + 42 * Math.cos(a), mc[1] + 42 * Math.sin(a), { r: 6, single: true, len: 0 }); s += L(mc[0] + 36 * Math.cos(a), mc[1] + 36 * Math.sin(a), mc[0] + 14 * Math.cos(a), mc[1] + 14 * Math.sin(a)); }
  s += T(150, 235, 'micela', 'sm b');
  // bicapa
  for (let i = 0; i < 7; i++) { s += pl(250 + i * 22, 192, { r: 7, len: 26 }); s += pl(250 + i * 22, 268, { r: 7, len: 26, dir: -1 }); }
  s += T(410, 235, 'bicapa', 'sm b');
  // curvatura negativa: conos con las cabezas hacia adentro
  for (let i = 0; i < 7; i++) {
    const ang = -0.75 + i * 0.25, cx = 560, cy = 130;
    const hx = cx + 75 * Math.sin(ang), hy = cy + 75 * Math.cos(ang), tx1 = cx + 125 * Math.sin(ang - 0.08), ty1 = cy + 125 * Math.cos(ang - 0.08), tx2 = cx + 125 * Math.sin(ang + 0.08), ty2 = cy + 125 * Math.cos(ang + 0.08);
    s += C(hx, hy, 6, 'fa') + L(hx, hy, tx1, ty1) + L(hx, hy, tx2, ty2);
  }
  s += T(560, 282, 'monocapa curvada hacia las cabezas', 'mid sm b');
  return s;
})(), 'Forma de la molécula → tipo de agregado');

F.gpl = svg(700, 230, (() => {
  let s = '';
  s += R(40, 40, 110, 150, 'fy', 10) + T(95, 30, 'glicerol', 'mid sm b');
  s += T(95, 70, 'sn-1', 'mid b') + T(95, 120, 'sn-2', 'mid b') + T(95, 170, 'sn-3', 'mid b');
  s += arrow(150, 65, 210, 65) + R(215, 48, 200, 34, 'fn', 8) + T(315, 70, 'acilo (suele ser saturado)', 'mid sm');
  s += arrow(150, 115, 210, 115) + R(215, 98, 200, 34, 'fn', 8) + T(315, 120, 'acilo (suele ser insaturado)', 'mid sm');
  s += arrow(150, 165, 210, 165) + C(235, 165, 18, 'fy') + T(235, 170, 'P', 'mid b') + L(253, 165, 300, 165) + C(330, 165, 28, 'fa') + T(330, 170, 'cabeza', 'mid sm b');
  s += T(450, 60, 'Las cadenas definen', 'sm b') + T(450, 78, 'la ESPECIE molecular', 'sm');
  s += T(450, 155, 'La cabeza define', 'sm b') + T(450, 173, 'la CLASE: PC, PE, PS, PI…', 'sm');
  return s;
})(), 'Anatomía de un glicerofosfolípido');

F.sphingo = svg(700, 200, (() => {
  let s = '';
  const box = (x, w, t1, t2, cls) => R(x, 60, w, 56, cls, 10) + T(x + w / 2, 84, t1, 'mid sm b') + T(x + w / 2, 103, t2, 'mid sm');
  s += box(10, 140, 'Esfingosina', 'base con 1 cola', 'fg') + T(165, 92, '+', 'mid lg b');
  s += box(180, 120, 'Ácido graso', 'unido por AMIDA', 'fn') + arrow(300, 88, 330, 88);
  s += box(335, 120, 'Ceramida', '2 colas, sin cabeza', 'fg') + arrow(455, 88, 485, 88);
  s += box(490, 200, '+ cabeza polar', 'esfingomielina o glicolípido', 'fa');
  s += T(10, 160, 'No hay glicerol: la esfingosina aporta el esqueleto y una de las colas.', 'sm mut');
  return s;
})(), 'Cómo se arma un esfingolípido');

F.cholesterol = svg(720, 250, (() => {
  let s = '';
  const layer = (x0, tight) => {
    let o = '';
    for (let i = 0; i < 6; i++) { const x = x0 + i * 34; o += pl(x, 60, { r: 8, len: 60, kink: tight ? -1 : 4 }); }
    [x0 + 17, x0 + 85, x0 + 153].forEach(x => { o += C(x, 74, 5, 'da') + R(x - 6, 80, 12, 36, 'fb', 4) + L(x, 116, x, 135, 'ln'); });
    return o;
  };
  s += T(130, 24, 'Temperatura ALTA', 'mid b') + layer(45, false) + T(130, 170, 'las colas se mueven mucho;', 'mid sm') + T(130, 188, 'el anillo rígido las frena', 'mid sm') + T(130, 210, '→ más orden', 'mid sm acc b');
  s += T(510, 24, 'Temperatura BAJA', 'mid b') + layer(425, true) + T(510, 170, 'las colas tienden a cristalizar;', 'mid sm') + T(510, 188, 'el colesterol se mete en el medio', 'mid sm') + T(510, 210, '→ menos rigidez', 'mid sm acc b');
  s += T(360, 240, 'Resultado: la membrana cambia MENOS con la temperatura (buffer de fluidez)', 'mid sm b');
  return s;
})(), 'El colesterol como amortiguador');

F.asymmetry = svg(720, 250, (() => {
  let s = '';
  s += T(20, 26, 'EXTERIOR de la célula', 'sm b mut');
  const outer = ['fa', 'fg', 'fa', 'fy', 'fa', 'fg', 'fa', 'fy', 'fa', 'fg'];
  const inner = ['fb', 'fb', 'fn', 'fb', 'fn', 'fb', 'fb', 'fn', 'fb', 'fb'];
  outer.forEach((c, i) => { s += pl(80 + i * 42, 60, { head: c, r: 10, len: 46 }); });
  inner.forEach((c, i) => { s += pl(80 + i * 42, 190, { head: c, r: 10, len: 46, dir: -1 }); });
  s += T(20, 240, 'CITOPLASMA', 'sm b mut');
  s += T(520, 52, 'PC · esfingomielina · glicolípidos', 'sm acc b');
  s += T(520, 204, 'PE · PS (−) · PI y fosfoinosítidos', 'sm alt b');
  s += P('M640 70 C 690 100 690 150 640 180', 'ac') + arrow(645, 176, 640, 180, 'ac') + T(650, 128, 'flipasa', 'sm b');
  return s;
})(), 'Asimetría de la membrana plasmática');

F.secretory = svg(720, 200, (() => {
  let s = '';
  const mem = (x, gap, label, sub) => R(x, 100 - gap / 2 - 12, 150, 12, 'fa', 3) + R(x, 100 + gap / 2, 150, 12, 'fa', 3) + T(x + 75, 30, label, 'mid b') + T(x + 75, 50, sub, 'mid sm mut') + L(x - 6, 100 - gap / 2 - 12, x - 6, 112 + gap / 2, 'thin');
  s += mem(20, 30, 'Retículo', 'fino, desordenado') + arrow(180, 100, 245, 100);
  s += mem(260, 42, 'Golgi', 'intermedio') + arrow(420, 100, 485, 100);
  s += mem(500, 56, 'Membrana plasmática', 'gruesa, ordenada');
  s += T(20, 180, 'Hacia la membrana plasmática aumentan colesterol, esfingolípidos y cadenas saturadas → más espesor y orden.', 'sm');
  return s;
})(), 'Gradiente a lo largo de la vía secretora');

F.kennedy = svg(720, 260, (() => {
  let s = '';
  const box = (x, y, w, t, cls) => R(x, y, w, 40, cls, 10) + T(x + w / 2, y + 25, t, 'mid sm b');
  s += box(10, 20, 130, 'Glicerol-3-P', 'fy') + arrow(140, 40, 180, 40) + T(160, 30, 'GPAT', 'mid sm mut');
  s += box(185, 20, 90, 'LPA', 'fy') + arrow(275, 40, 315, 40) + T(295, 30, 'LPAAT', 'mid sm mut');
  s += box(320, 20, 80, 'PA', 'fa');
  s += arrow(360, 60, 230, 110) + box(150, 112, 90, 'DAG', 'fa') + arrow(195, 152, 195, 185);
  s += box(70, 188, 250, 'PC y PE (vía de Kennedy)', 'fg') + T(205, 172, 'con CDP-colina o CDP-etanolamina', 'sm mut');
  s += arrow(370, 60, 500, 110) + box(450, 112, 120, 'CDP-DAG', 'fa') + arrow(510, 152, 510, 185);
  s += box(400, 188, 220, 'PI, PG, cardiolipina', 'fb');
  return s;
})(), 'Síntesis de fosfolípidos desde el ácido fosfatídico');

F.lands = svg(720, 250, (() => {
  let s = '';
  const cx = 360, cy = 125;
  s += pl(cx - 170, cy - 30, { r: 12, len: 50, kink: -1 }) + T(cx - 170, cy + 60, 'fosfolípido', 'mid sm b') + T(cx - 170, cy + 78, 'cadenas «de fábrica»', 'mid sm mut');
  s += pl(cx, cy - 30, { r: 12, len: 50, single: true }) + T(cx, cy + 60, 'lisofosfolípido', 'mid sm b') + T(cx, cy + 78, '(falta la cadena sn-2)', 'mid sm mut');
  s += pl(cx + 170, cy - 30, { r: 12, len: 50, kink: 3 }) + T(cx + 170, cy + 60, 'fosfolípido', 'mid sm b') + T(cx + 170, cy + 78, 'con la cadena elegida', 'mid sm mut');
  s += arrow(cx - 140, cy - 60, cx - 30, cy - 60, 'ac') + T(cx - 85, cy - 72, 'PLA₂ saca sn-2', 'mid sm acc b');
  s += arrow(cx + 30, cy - 60, cx + 140, cy - 60, 'al') + T(cx + 85, cy - 72, 'aciltransferasa pone otra', 'mid sm alt b');
  s += T(cx, 240, 'Ciclo de Lands: se cambian cadenas sin rehacer toda la molécula', 'mid sm b');
  return s;
})(), 'Ciclo de Lands');

F.curvature = svg(720, 220, (() => {
  let s = '';
  s += T(170, 24, 'Lípidos cónicos juntos', 'mid b');
  for (let i = 0; i < 9; i++) {
    const ang = -0.9 + i * 0.225, cx = 170, cy = 30;
    const hx = cx + 90 * Math.sin(ang), hy = cy + 90 * Math.cos(ang);
    s += C(hx, hy, 7, 'fa') + L(hx, hy, cx + 135 * Math.sin(ang - 0.06), cy + 135 * Math.cos(ang - 0.06)) + L(hx, hy, cx + 135 * Math.sin(ang + 0.06), cy + 135 * Math.cos(ang + 0.06));
  }
  s += T(170, 200, 'cabeza chica + colas anchas: la capa se curva', 'mid sm acc b');
  s += T(530, 24, 'PUFA en las colas', 'mid b');
  for (let i = 0; i < 6; i++) s += tail(440 + i * 34, 45, 110, 1, 3 + (i % 3) * 3, 'al');
  s += T(530, 180, 'colas muy flexibles: la membrana', 'mid sm') + T(530, 198, 'se dobla, fusiona y divide con menos esfuerzo', 'mid sm alt b');
  return s;
})(), 'Curvatura y PUFA');

F.desk = svg(720, 260, (() => {
  let s = '';
  const box = (x, y, w, t1, t2, cls) => R(x, y, w, 56, cls, 12) + T(x + w / 2, y + 24, t1, 'mid sm b') + T(x + w / 2, y + 43, t2, 'mid sm');
  s += box(250, 10, 220, 'Baja la temperatura', 'membrana más rígida y gruesa', 'fb');
  s += arrow(470, 40, 560, 90);
  s += box(500, 95, 210, 'DesK lo detecta', 'pasa a quinasa → activa DesR', 'fa');
  s += arrow(560, 151, 470, 200);
  s += box(250, 190, 220, 'Se fabrica la desaturasa', 'pone dobles enlaces cis', 'fa');
  s += arrow(250, 220, 160, 151);
  s += box(10, 95, 210, 'Membrana vuelve a su estado', 'DesK se apaga (fosfatasa)', 'fg');
  s += arrow(160, 95, 250, 45);
  s += T(360, 128, 'retroalimentación', 'mid sm b acc');
  return s;
})(), 'Circuito DesK/DesR');

F.finalMap = svg(720, 120, (() => {
  let s = '';
  const st = [['Estructura', 'molecular'], ['Empaquetamiento', 'y curvatura'], ['Composición', 'de la membrana'], ['Proteínas', 'y señales'], ['Respuesta', 'fisiológica']];
  st.forEach(([a, b], i) => { const x = 8 + i * 142; s += R(x, 30, 128, 60, i % 2 ? 'fb' : 'fa', 10); s += T(x + 64, 56, a, 'mid sm b') + T(x + 64, 74, b, 'mid sm b'); if (i < 4) s += arrow(x + 128, 60, x + 141, 60); });
  return s;
})(), 'Mapa final de lípidos');

module.exports = { F };
