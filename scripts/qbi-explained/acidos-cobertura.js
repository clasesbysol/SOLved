'use strict';
/* Genera docs/acidos-nucleicos-i-cobertura.md: para cada página física (1–64) de la clase,
   en qué capítulo, figura, cita o pregunta quedó dentro de la app. Uso: node scripts/qbi-explained/acidos-cobertura.js */
const fs = require('fs');
const path = require('path');
const chapters = [1, 2, 3, 4, 5].flatMap(i => [...require('./acidos-' + i)]);
const strip = h => String(h).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const pagesOf = v => {
  const out = new Set();
  String(v ?? '').replace(/(\d+)\s*[–-]\s*(\d+)|(\d+)/g, (m, a, b, c) => { if (c) out.add(+c); else for (let i = +a; i <= +b; i++) out.add(i); return m; });
  return [...out];
};
const rows = Array.from({ length: 64 }, () => ({ caps: new Set(), items: [] }));
const add = (p, cap, what) => { if (p >= 1 && p <= 64) { rows[p - 1].caps.add(cap); if (what) rows[p - 1].items.push(what); } };
for (const ch of chapters) {
  for (const p of pagesOf(ch.pages)) add(p, ch.n);
  for (const b of ch.blocks) {
    const [k, a, c, d] = b;
    if (k === 'img') pagesOf(d).forEach(p => add(p, ch.n, `figura \`${a}\``));
    if (k === 'gallery') pagesOf(c).forEach(p => add(p, ch.n, 'galería: ' + a.map(x => '`' + x[0] + '`').join(', ')));
    if (k === 'quote') pagesOf(c).forEach(p => add(p, ch.n, 'cita textual'));
    if (k === 'quiz' && a.page) pagesOf(a.page).forEach(p => add(p, ch.n, 'pregunta: ' + strip(a.q).slice(0, 60)));
  }
}
const mapa = require('./acidos-5').MAPA;
let md = '# Ácidos nucleicos I · matriz de cobertura\n\n';
md += 'Clase de Javier De Gaudenzi (06/10/2026), 64 páginas físicas. Cada página → capítulo del resumen de Química Biológica (sección «Ácidos nucleicos», caps. 58–79, archivo `qbi-acidos-nucleicos-extension.js`) y recursos donde quedó.\n\n';
md += 'Generado por `node scripts/qbi-explained/acidos-cobertura.js` a partir de los mismos datos que arman la app.\n\n';
md += '| Pág. | Contenido | Capítulos | Dónde quedó en la app |\n|---|---|---|---|\n';
let missing = [];
const OMITTED = { 64: 'Memes de cierre: se omitieron porque no agregan contenido.' };
rows.forEach((r, i) => {
  const caps = [...r.caps].sort((a, b) => a - b);
  if (!caps.length && !OMITTED[i + 1]) missing.push(i + 1);
  const items = [...new Set(r.items)];
  md += `| ${i + 1} | ${mapa[i][1]} | ${caps.join(', ') || (OMITTED[i + 1] ? '—' : '**FALTA**')} | ${OMITTED[i + 1] || items.join(' · ') || 'texto desarrollado en el capítulo'} |\n`;
});
md += '\n## Lecturas inciertas o aclaraciones\n\n';
md += '- Todas las erratas o imprecisiones de las diapositivas se conservaron y se explican en recuadros «Aclaración» (p. ej. FADH, CoA, «nucleótidos beta», «intercatenarios», McLeod/McCartney, metrotexate, oritidilato, transcarbomilasa, fechas de la Foto 51).\n';
md += '- El resumen no menciona diapositivas: la página de origen queda solo como dato interno de cada figura (atributo data-page).\n';
md += '- Diapositiva 37: no se leen valores exactos de Tm para cada curva; el resumen solo indica que la Tm marcada (66 % G+C) queda algo por encima de 75 °C.\n';
fs.writeFileSync(path.join(__dirname, '../../docs/acidos-nucleicos-i-cobertura.md'), md);
console.log('Cobertura: 64 páginas, faltan: ' + (missing.join(', ') || 'ninguna'));
if (missing.length) process.exit(1);
