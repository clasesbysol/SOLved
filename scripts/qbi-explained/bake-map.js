'use strict';
/*
 * Vuelve a escribir el mapa mental integral dentro de qbi-static.html a partir de js/qbi-mind-map-data.js,
 * usando las mismas funciones de dibujo que qbi-integrated-subject.js (así el mapa estático y el dinámico coinciden).
 * Uso: node scripts/qbi-explained/bake-map.js
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '../..');
const UNIT = path.join(ROOT, 'content/subjects/quimica_biologica1/units/proteinas-i');
const STATIC = path.join(UNIT, 'qbi-static.html');

global.window = {};
require(path.join(ROOT, 'js/qbi-mind-map-data.js'));
const src = fs.readFileSync(path.join(UNIT, 'qbi-integrated-subject.js'), 'utf8');
const pick = (a, b) => { const i = src.indexOf(a), j = src.indexOf(b); if (i < 0 || j < i) throw new Error('No se encontró ' + a); return src.slice(i, j); };
const head = src.split('\n').slice(3, 5).join('\n');
const code = head + '\n' + pick('  function visualHtml', '  function filterMap') + '\nmodule.exports={mapInnerHtml};';
const m = { exports: {} };
new Function('module', 'window', code)(m, global.window);
const html = '<section id="qbi-mapa-integral">' + m.exports.mapInnerHtml(global.window.QBI_MIND_MAP_DATA) + '</section>';

let s = fs.readFileSync(STATIC, 'utf8');
const a = s.indexOf('<section id="qbi-mapa-integral">');
const b = s.indexOf('<header class="qb-hero">', a);
if (a < 0 || b < 0 || s.indexOf('<section id="qbi-mapa-integral">', a + 1) >= 0) throw new Error('No se encontró un único mapa integral en qbi-static.html');
s = s.slice(0, a) + html + s.slice(b);
fs.writeFileSync(STATIC, s);
const sections = (html.match(/class="qbi-integrated-section"/g) || []).length;
const chapters = (html.match(/class="qbi-integrated-chapter"/g) || []).length;
console.log('Mapa integral: ' + sections + ' secciones, ' + chapters + ' capítulos escritos en qbi-static.html');
