'use strict';
/*
 * Arma los capítulos explicados de Química Biológica:
 *   - Glúcidos I (caps. 29–41) → se escriben dentro de qbi-static.html
 *   - Lípidos I y II (caps. 42–57) → se escriben dentro de qbi-lipidos-extension.js
 *   - Ácidos nucleicos I (caps. 58–79) → genera qbi-acidos-nucleicos-extension.js (la carga qbi-lipidos-extension.js)
 * Uso: node scripts/qbi-explained/build.js
 */
const fs = require('fs');
const path = require('path');
const { chapterHtml, CSS } = require('./kit');

const UNIT = path.join(__dirname, '../../content/subjects/quimica_biologica1/units/proteinas-i');
const STATIC = path.join(UNIT, 'qbi-static.html');
const LIPIDS = path.join(UNIT, 'qbi-lipidos-extension.js');
const cssMin = CSS.replace(/\n/g, '');

/* ---------- Glúcidos ---------- */
const glucidos = require('./glucidos');
let html = fs.readFileSync(STATIC, 'utf8');
const start = html.indexOf('<section id="cap29"');
const footer = html.indexOf('<footer class="qb-footer">', start);
const end = html.lastIndexOf('</section>', footer) + '</section>'.length;
if (start < 0 || footer < 0 || end < start) throw new Error('No se encontraron los capítulos 29–41 en qbi-static.html');
const glu = glucidos.map((ch, i) => chapterHtml(ch, { cls: 'qbi-glu-native-chapter', attrs: { 'data-qbi-glucidos-chapter': i + 1 } })).join('\n');
html = html.slice(0, start) + glu + html.slice(end);

const styleTag = `<style id="qbi-explained-style">${cssMin}</style>`;
html = /<style id="qbi-explained-style">[\s\S]*?<\/style>/.test(html)
  ? html.replace(/<style id="qbi-explained-style">[\s\S]*?<\/style>/, styleTag)
  : html.replace('</head>', styleTag + '</head>');

for (const ch of glucidos) {
  const rx = new RegExp(`(<a href="#cap${ch.n}"[^>]*>)[^<]*(</a>)`);
  const plain = ch.title.replace(/<[^>]+>/g, '');
  html = html.replace(rx, `$1${ch.n}. ${plain}$2`);
}
fs.writeFileSync(STATIC, html);
console.log('Glúcidos: ' + glucidos.length + ' capítulos escritos en qbi-static.html');

/* ---------- Lípidos ---------- */
const lipidos = require('./lipidos');
let ext = fs.readFileSync(LIPIDS, 'utf8');
const data = lipidos.map(ch => ({ n: ch.n, group: ch.group, title: ch.title.replace(/<[^>]+>/g, ''), html: chapterHtml(ch, { cls: 'qbi-lip-chapter', attrs: { 'data-qbi-lipidos': ch.group } }) }));
const generated = `/*QBX-LIPIDS:START · generado por scripts/qbi-explained/build.js, no editar a mano*/\nconst QBX_CSS=${JSON.stringify(cssMin)};\nconst chapters=${JSON.stringify(data)};\n/*QBX-LIPIDS:END*/`;
if (ext.includes('/*QBX-LIPIDS:START')) {
  ext = ext.replace(/\/\*QBX-LIPIDS:START[\s\S]*?\/\*QBX-LIPIDS:END\*\//, generated);
} else {
  const a = ext.indexOf('const chapters=[');
  const b = ext.indexOf('\n];\n', a) + '\n];\n'.length;
  if (a < 0 || b < a) throw new Error('No se encontró la lista de capítulos en qbi-lipidos-extension.js');
  ext = ext.slice(0, a) + generated + '\n' + ext.slice(b);
  const oldSection = ext.slice(ext.indexOf('function sectionHtml(ch){'), ext.indexOf('\n}\n', ext.indexOf('function sectionHtml(ch){')) + 3);
  ext = ext.replace(oldSection, "function sectionHtml(ch){\n if(!document.getElementById('qbi-explained-style')){const s=document.createElement('style');s.id='qbi-explained-style';s.textContent=QBX_CSS;document.head.append(s)}\n return ch.html;\n}\n");
}
fs.writeFileSync(LIPIDS, ext);
console.log('Lípidos: ' + lipidos.length + ' capítulos escritos en qbi-lipidos-extension.js');

/* ---------- Ácidos nucleicos I ---------- */
const kitAn = require('./kit-an');
const acidos = [1, 2, 3, 4, 5].flatMap(i => require('./acidos-' + i));
const AN_VERSION = '1.2.0';
const AN_OUT = path.join(UNIT, 'qbi-acidos-nucleicos-extension.js');
const anData = acidos.map(ch => ({ n: ch.n, group: ch.group, pages: ch.pages, title: ch.title.replace(/<[^>]+>/g, ''), html: kitAn.chapterHtml(ch) }));
const UNITS = [{ id: 'acidos-nucleicos-i', label: 'Ácidos nucleicos I · Bases, nucleósidos y nucleótidos', ready: true }];
const tpl = fs.readFileSync(path.join(__dirname, 'acidos-extension-template.js'), 'utf8');
const anJs = tpl
  .replace("'/*AN:VERSION*/'", JSON.stringify(AN_VERSION))
  .replace("''/*AN:QBXCSS*/", () => JSON.stringify(cssMin))
  .replace("''/*AN:CSS*/", () => JSON.stringify(kitAn.CSS.replace(/\n/g, '')))
  .replace('[]/*AN:UNITS*/', () => JSON.stringify(UNITS))
  .replace('[]/*AN:DATA*/', () => JSON.stringify(anData));
if (/\/\*AN:/.test(anJs)) throw new Error('Quedó un marcador sin reemplazar en la plantilla de Ácidos nucleicos');
fs.writeFileSync(AN_OUT, anJs);
console.log('Ácidos nucleicos I: ' + acidos.length + ' capítulos escritos en qbi-acidos-nucleicos-extension.js');
