'use strict';
/*
 * Química Biológica · capítulos "explicados" (Glúcidos I y Lípidos I–II).
 * Formato común: texto que se lee de corrido + recuadros de ¿Por qué?, Ejemplo y Ojo con esto,
 * razonamientos paso a paso, dibujos propios en SVG y preguntas de autoevaluación.
 *
 * Los capítulos se escriben como datos (glucidos.js, lipidos.js) y build.js los convierte en HTML.
 * Bloques disponibles (cada bloque es un array):
 *   ['p', html]                          párrafo
 *   ['h', texto]                         subtítulo
 *   ['why', html, título?]               recuadro "¿Por qué?"
 *   ['ex', html, título?]                recuadro "Ejemplo"
 *   ['trap', html, título?]              recuadro "Ojo con esto"
 *   ['steps', título, [html, ...]]       razonamiento numerado
 *   ['fig', svg, epígrafe]               dibujo
 *   ['table', [encabezados], [[celdas]]] tabla corta
 *   ['cols', [[título, html], ...]]      tarjetas lado a lado
 *   ['eq', html]                         fórmula o regla destacada
 *   ['check', [[pregunta, respuesta]]]   autoevaluación con respuesta desplegable
 *   ['key', [html, ...]]                 "Para llevarte"
 */

const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function block(b) {
  const [kind, a, c] = b;
  switch (kind) {
    case 'p': return `<p>${a}</p>`;
    case 'h': return `<h3>${a}</h3>`;
    case 'why': return `<aside class="qbx-box qbx-why"><b class="qbx-tag">¿Por qué?</b>${c ? `<h4>${c}</h4>` : ''}<p>${a}</p></aside>`;
    case 'ex': return `<aside class="qbx-box qbx-ex"><b class="qbx-tag">Ejemplo</b>${c ? `<h4>${c}</h4>` : ''}<p>${a}</p></aside>`;
    case 'trap': return `<aside class="qbx-box qbx-trap"><b class="qbx-tag">Ojo con esto</b>${c ? `<h4>${c}</h4>` : ''}<p>${a}</p></aside>`;
    case 'steps': return `<div class="qbx-steps"><b class="qbx-tag">Paso a paso</b>${a ? `<h4>${a}</h4>` : ''}<ol>${c.map(x => `<li>${x}</li>`).join('')}</ol></div>`;
    case 'fig': return `<figure class="qbx-fig">${a}${c ? `<figcaption>${c}</figcaption>` : ''}</figure>`;
    case 'table': return `<div class="qbx-table"><table><thead><tr>${a.map(x => `<th>${x}</th>`).join('')}</tr></thead><tbody>${c.map(r => `<tr>${r.map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    case 'cols': return `<div class="qbx-cols">${a.map(([t, h]) => `<section><h4>${t}</h4><p>${h}</p></section>`).join('')}</div>`;
    case 'eq': return `<div class="qbx-eq">${a}</div>`;
    case 'check': return `<div class="qbx-check"><b class="qbx-tag">Para chequear que entendiste</b>${a.map(([q, r]) => `<details><summary>${q}</summary><p>${r}</p></details>`).join('')}</div>`;
    case 'key': return `<div class="qbx-key"><b class="qbx-tag">Para llevarte</b><ul>${a.map(x => `<li>${x}</li>`).join('')}</ul></div>`;
    default: throw new Error('Bloque desconocido: ' + kind);
  }
}

function chapterHtml(ch, extra = {}) {
  const attrs = Object.entries(extra.attrs || {}).map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
  return `<section id="cap${ch.n}" class="qb-chapter qbx-chapter${extra.cls ? ' ' + extra.cls : ''}"${attrs}><div class="qb-chapter-number">${ch.n}</div><div class="qbx-kicker">${esc(ch.group)}</div><h2>${ch.title}</h2><p class="qbx-lead">${ch.lead}</p>${ch.blocks.map(block).join('')}</section>`;
}

/* ---------- Ayudas para dibujar ---------- */
const svg = (w, h, body, label) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label || 'Esquema')}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const T = (x, y, s, cls = '') => `<text x="${x}" y="${y}"${cls ? ` class="${cls}"` : ''}>${s}</text>`;
const L = (x1, y1, x2, y2, cls = 'ln') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
const P = (d, cls = 'ln') => `<path d="${d}" class="${cls}"/>`;
const C = (cx, cy, r, cls = 'fa') => `<circle cx="${cx}" cy="${cy}" r="${r}" class="${cls}"/>`;
const R = (x, y, w, h, cls = 'fa', rx = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${cls}"/>`;
const arrow = (x1, y1, x2, y2, cls = 'ln') => {
  const a = Math.atan2(y2 - y1, x2 - x1), s = 9;
  const p1 = [x2 - s * Math.cos(a - 0.45), y2 - s * Math.sin(a - 0.45)], p2 = [x2 - s * Math.cos(a + 0.45), y2 - s * Math.sin(a + 0.45)];
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/><path d="M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} L${x2} ${y2} L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}" class="${cls}"/>`;
};
/* Anillo de piranosa estilo Haworth (hexágono achatado). Devuelve los vértices para colgar sustituyentes. */
function ring(cx, cy, w = 90, h = 34, cls = 'fa', oLabel = true) {
  const v = [[cx - w / 2, cy], [cx - w / 4, cy - h / 2], [cx + w / 4, cy - h / 2], [cx + w / 2, cy], [cx + w / 4, cy + h / 2], [cx - w / 4, cy + h / 2]];
  const d = v.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ') + ' Z';
  return { svg: `<path d="${d}" class="${cls}"/>` + (oLabel ? T(v[2][0] + 2, v[2][1] - 4, 'O', 'sm b') : ''), v };
}
/* Anillo de furanosa (pentágono). */
function fring(cx, cy, w = 70, h = 40, cls = 'fb') {
  const v = [[cx - w / 2, cy + h * 0.15], [cx, cy - h / 2], [cx + w / 2, cy + h * 0.15], [cx + w * 0.3, cy + h / 2], [cx - w * 0.3, cy + h / 2]];
  const d = v.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ') + ' Z';
  return { svg: `<path d="${d}" class="${cls}"/>` + T(cx - 5, cy - h / 2 - 6, 'O', 'sm b'), v };
}

const CSS = `
.qbx-chapter{scroll-margin-top:18px}
.qbx-kicker{margin:2px 0 7px;color:var(--qb-accent-strong,#8d2452);font-size:.78rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
.qbx-chapter>p,.qbx-chapter .qbx-box p,.qbx-chapter li{line-height:1.72}
.qbx-chapter>p{max-width:78ch}
.qbx-lead{font-size:1.08rem;line-height:1.72;color:var(--qb-muted,#76687c);max-width:78ch}
.qbx-chapter>h3{margin:30px 0 8px}
.qbx-tag{display:block;margin-bottom:5px;font-size:.72rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
.qbx-box{max-width:820px;margin:16px 0;padding:13px 16px;border:1px solid var(--qb-border,#efd3e0);border-left-width:5px;border-radius:12px;background:var(--qb-panel,#fff)}
.qbx-box h4,.qbx-steps h4{margin:0 0 5px;font-size:1rem}
.qbx-box p{margin:0}
.qbx-why{border-left-color:var(--qb-accent,#e74888);background:var(--qb-accent-soft,#fff0f6)}.qbx-why .qbx-tag{color:var(--qb-accent-strong,#8d2452)}
.qbx-ex{border-left-color:#2e9a89}.qbx-ex .qbx-tag{color:#1f7d6f}
.qbx-trap{border-left-color:#d08a12}.qbx-trap .qbx-tag{color:#a8690a}
.qbx-steps{max-width:820px;margin:16px 0;padding:13px 16px;border:1px dashed color-mix(in srgb,var(--qb-accent,#e74888) 45%,transparent);border-radius:12px}
.qbx-steps .qbx-tag{color:var(--qb-accent-strong,#8d2452)}
.qbx-steps ol{margin:4px 0 0;padding-left:22px}.qbx-steps li{margin:6px 0}
.qbx-fig{max-width:760px;margin:20px 0;padding:12px;border:1px solid var(--qb-border,#efd3e0);border-radius:14px;background:var(--qb-panel,#fff);color:var(--qb-ink,#2b2030);overflow-x:auto}
.qbx-fig svg{display:block;width:100%;min-width:480px;height:auto}
.qbx-fig figcaption{margin-top:8px;font-size:.9rem;line-height:1.5;color:var(--qb-muted,#76687c)}
.qbx-fig text{fill:currentColor;font:15px Inter,"Segoe UI",Arial,sans-serif}
.qbx-fig text.sm{font-size:12.5px}.qbx-fig text.lg{font-size:18px}.qbx-fig text.b{font-weight:800}.qbx-fig text.mid{text-anchor:middle}
.qbx-fig text.acc{fill:var(--qb-accent-strong,#8d2452)}.qbx-fig text.alt{fill:#6a46c0}.qbx-fig text.ok{fill:#1f7d6f}.qbx-fig text.mut{fill:var(--qb-muted,#76687c)}
.qbx-fig .ln{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.qbx-fig .thin{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.6}
.qbx-fig .dsh{fill:none;stroke:currentColor;stroke-width:1.6;stroke-dasharray:5 5;opacity:.6}
.qbx-fig .ac{fill:none;stroke:var(--qb-accent,#e74888);stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round}
.qbx-fig .al{fill:none;stroke:#7957c8;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round}
.qbx-fig .ag{fill:none;stroke:#2e9a89;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round}
.qbx-fig .fa{fill:color-mix(in srgb,var(--qb-accent,#e74888) 16%,transparent);stroke:var(--qb-accent,#e74888);stroke-width:2}
.qbx-fig .fb{fill:color-mix(in srgb,#7957c8 16%,transparent);stroke:#7957c8;stroke-width:2}
.qbx-fig .fg{fill:color-mix(in srgb,#2e9a89 16%,transparent);stroke:#2e9a89;stroke-width:2}
.qbx-fig .fy{fill:color-mix(in srgb,#d8a21c 20%,transparent);stroke:#b98710;stroke-width:2}
.qbx-fig .fn{fill:color-mix(in srgb,currentColor 7%,transparent);stroke:currentColor;stroke-width:1.5}
.qbx-fig .da{fill:var(--qb-accent,#e74888)}.qbx-fig .db{fill:#7957c8}.qbx-fig .dg{fill:#2e9a89}.qbx-fig .dy{fill:#d8a21c}.qbx-fig .dk{fill:currentColor}
.qbx-table{max-width:860px;margin:16px 0;overflow-x:auto;border:1px solid var(--qb-border,#efd3e0);border-radius:12px;background:var(--qb-panel,#fff)}
.qbx-table table{width:100%;border-collapse:collapse}.qbx-table th,.qbx-table td{padding:9px 12px;border-bottom:1px solid var(--qb-border,#efd3e0);text-align:left;vertical-align:top;line-height:1.5}
.qbx-table th{background:var(--qb-accent-soft,#fff0f6);color:var(--qb-accent-strong,#8d2452);font-size:.9rem}
.qbx-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;max-width:860px;margin:16px 0}
.qbx-cols section{padding:13px 15px;border:1px solid var(--qb-border,#efd3e0);border-top:4px solid var(--qb-accent,#e74888);border-radius:12px;background:var(--qb-panel,#fff)}
.qbx-cols h4{margin:0 0 6px;color:var(--qb-accent-strong,#8d2452)}.qbx-cols p{margin:0;line-height:1.6}
.qbx-eq{max-width:760px;margin:14px 0;padding:11px 14px;border-radius:10px;background:var(--qb-accent-soft,#fff0f6);font-family:"Cambria Math","STIX Two Math",Cambria,serif;font-size:1.08rem;text-align:center;line-height:1.5}
.qbx-check{max-width:820px;margin:22px 0 10px;padding:13px 16px;border-radius:12px;background:var(--qb-accent-faint,#fffafd);border:1px solid var(--qb-border,#efd3e0)}
.qbx-check .qbx-tag{color:var(--qb-accent-strong,#8d2452)}
.qbx-check details{margin:7px 0;border-top:1px solid var(--qb-border,#efd3e0);padding-top:7px}
.qbx-check summary{cursor:pointer;font-weight:750;line-height:1.5}
.qbx-check details p{margin:6px 0 2px 18px;line-height:1.65}
.qbx-key{max-width:820px;margin:16px 0 6px;padding:12px 16px;border-radius:12px;border:2px solid var(--qb-accent,#e74888)}
.qbx-key .qbx-tag{color:var(--qb-accent-strong,#8d2452)}.qbx-key ul{margin:4px 0 0;padding-left:20px}.qbx-key li{margin:4px 0}
@media(max-width:640px){.qbx-box,.qbx-steps,.qbx-check,.qbx-key{padding:11px 12px}.qbx-fig{padding:8px}}
`;

module.exports = { esc, block, chapterHtml, svg, T, L, P, C, R, arrow, ring, fring, CSS };
