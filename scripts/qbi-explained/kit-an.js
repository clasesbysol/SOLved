'use strict';
/*
 * Ácidos nucleicos · bloques extra sobre el formato común de kit.js.
 * Bloques nuevos (además de los de kit.js):
 *   ['img', clave, epígrafe, página]                 figura original de la clase (se amplía al tocarla)
 *   ['gallery', [[clave, epígrafe], ...], página]     varias figuras chicas en grilla
 *   ['math', tex, html de respaldo]                   fórmula en bloque (MathJax del proyecto; si no carga, se ve el respaldo)
 *   ['note', html, título?]                           «Aclaración»: precisión que NO está escrita en la diapositiva
 *   ['quote', html, página]                           texto tal como lo dice la diapositiva
 *   ['deep', resumen, html]                           explicación desplegable
 *   ['quiz', {...}]                                   pregunta original de la clase con opciones y resolución
 *   ['defs', [[término, definición], ...]]            glosario
 *   ['links', [[título, url, detalle], ...]]          recursos externos
 * Fórmulas en línea: M(tex, html de respaldo).
 */
const { block: baseBlock, esc } = require('./kit');
const SIZES = require('./acidos-img-sizes.json');

const ASSET = '{{AN_ASSETS}}';
const strip = h => String(h).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const M = (tex, fb) => `<span class="anx-m" data-tex="${esc(tex)}">${fb}</span>`;
const pg = p => p ? `<span class="anx-pg">${/[–,y]/.test(String(p)) ? 'Diaps.' : 'Diap.'} ${p}</span>` : '';

function img(key, cap, page, cls = '') {
  if (!SIZES[key]) throw new Error('Falta la imagen ' + key);
  const [w, h] = SIZES[key];
  return `<figure class="anx-fig${cls}" data-page="${esc(page)}"><button class="anx-zoom" type="button" aria-label="Ampliar imagen"><img src="${ASSET}${key}.webp" width="${w}" height="${h}" style="width:${w}px" loading="lazy" decoding="async" alt="${esc(strip(cap))}"></button><figcaption>${pg(page)} ${cap}</figcaption></figure>`;
}

function quiz(q) {
  const letters = 'abcdefgh';
  const opts = q.opts.map((o, i) => `<li data-ok="${q.correct.includes(i) ? 1 : 0}"><button type="button" class="anx-opt"><b>${q.kind === 'vf' ? o : letters[i] + ')'}</b> ${q.kind === 'vf' ? '' : o}</button></li>`).join('');
  return `<div class="anx-quiz" data-kind="${q.kind}"><div class="anx-quiz-head"><b class="qbx-tag">${q.tag || 'Pregunta de la clase'}</b>${pg(q.page)}</div><p class="anx-q">${q.q}</p>${q.sub ? `<p class="anx-sub">${q.sub}</p>` : ''}<ol class="anx-opts${q.kind === 'vf' ? ' anx-vf' : ''}">${opts}</ol><details class="anx-sol"><summary>Ver respuesta y explicación</summary><div><p class="anx-ans"><b>Respuesta${q.marked ? ' marcada en clase' : ''}:</b> ${q.answer}</p>${q.steps ? `<ol>${q.steps.map(x => `<li>${x}</li>`).join('')}</ol>` : ''}${q.after || ''}</div></details></div>`;
}

function block(b) {
  const [kind, a, c, d] = b;
  switch (kind) {
    case 'img': return img(a, c, d);
    case 'gallery': return `<div class="anx-gallery">${a.map(([k, cap]) => img(k, cap, c, ' anx-mini')).join('')}</div>`;
    case 'math': return `<div class="anx-math">${M(a, c)}</div>`.replace('class="anx-m"', 'class="anx-m" data-display="1"');
    case 'note': return `<aside class="qbx-box anx-note"><b class="qbx-tag">Aclaración${c ? ' · ' + c : ''}</b><p>${a}</p></aside>`;
    case 'quote': return `<blockquote class="anx-quote"><b class="qbx-tag">Así lo dice la diapositiva ${pg(c)}</b><p>${a}</p></blockquote>`;
    case 'deep': return `<details class="anx-deep"><summary>${a}</summary><div>${c}</div></details>`;
    case 'quiz': return quiz(a);
    case 'defs': return `<dl class="anx-defs">${a.map(([t, x]) => `<div><dt>${t}</dt><dd>${x}</dd></div>`).join('')}</dl>`;
    case 'links': return `<ul class="anx-links">${a.map(([t, u, x]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${t}</a>${x ? ` <span>${x}</span>` : ''}</li>`).join('')}</ul>`;
    default: return baseBlock(b);
  }
}

function chapterHtml(ch) {
  return `<section id="cap${ch.n}" class="qb-chapter qbx-chapter anx-chapter" data-qbi-acidos="${esc(ch.group)}" data-pages="${esc(ch.pages)}"><div class="qb-chapter-number">${ch.n}</div><div class="qbx-kicker">${esc(ch.group)} <span class="anx-kpg">· diapositivas ${esc(ch.pages)}</span></div><h2>${ch.title}</h2><p class="qbx-lead">${ch.lead}</p>${ch.blocks.map(block).join('')}</section>`;
}

const CSS = `
.anx-kpg{font-weight:700;letter-spacing:.02em;text-transform:none;color:var(--qb-muted,#76687c)}
.anx-pg{display:inline-block;margin-right:4px;padding:1px 7px;border-radius:999px;background:var(--qb-accent-soft,#fff0f6);color:var(--qb-accent-strong,#8d2452);font-size:.72rem;font-weight:850;white-space:nowrap;vertical-align:1px}
.anx-fig{max-width:860px;margin:20px 0;padding:10px;border:1px solid var(--qb-border,#efd3e0);border-radius:14px;background:var(--qb-panel,#fff)}
.anx-zoom{display:block;width:100%;padding:8px;border:0;border-radius:10px;background:#fff;cursor:zoom-in}
.anx-zoom img{display:block;max-width:100%;height:auto;max-height:78vh;object-fit:contain;margin:0 auto}
.anx-fig figcaption{margin-top:8px;font-size:.9rem;line-height:1.5;color:var(--qb-muted,#76687c)}
.anx-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;max-width:860px;margin:16px 0}
.anx-gallery .anx-fig{margin:0;padding:7px}.anx-gallery .anx-zoom{padding:4px}.anx-gallery .anx-zoom img{height:170px!important;object-fit:contain}.anx-gallery figcaption{font-size:.8rem}
.anx-math{max-width:760px;margin:14px 0;padding:12px 14px;border-radius:10px;background:var(--qb-accent-soft,#fff0f6);text-align:center;overflow-x:auto;font-size:1.06rem;line-height:1.6}
.anx-m mjx-container{margin:0!important}.anx-m-pending{visibility:hidden}.anx-math .anx-m{display:inline-block}
.anx-note{border-left-color:#5b7fa6;background:color-mix(in srgb,#5b7fa6 9%,var(--qb-panel,#fff))}.anx-note .qbx-tag{color:#3f6690}
.anx-quote{max-width:820px;margin:16px 0;padding:12px 16px;border-left:5px solid var(--qb-muted,#76687c);border-radius:12px;background:color-mix(in srgb,var(--qb-muted,#76687c) 8%,var(--qb-panel,#fff))}
.anx-quote .qbx-tag{color:var(--qb-muted,#76687c)}.anx-quote p{margin:4px 0 0;line-height:1.65;font-style:italic}
.anx-deep{max-width:820px;margin:14px 0;border:1px solid var(--qb-border,#efd3e0);border-radius:12px;background:var(--qb-panel,#fff);overflow:hidden}
.anx-deep>summary{padding:11px 14px;cursor:pointer;font-weight:850;color:var(--qb-accent-strong,#8d2452)}.anx-deep>div{padding:0 16px 12px}.anx-deep p,.anx-deep li{line-height:1.65}
.anx-quiz{max-width:820px;margin:18px 0;padding:14px 16px;border:2px solid var(--qb-border,#efd3e0);border-radius:14px;background:var(--qb-panel,#fff)}
.anx-quiz-head{display:flex;gap:8px;align-items:center;justify-content:space-between}.anx-quiz-head .qbx-tag{margin:0;color:var(--qb-accent-strong,#8d2452)}
.anx-q{margin:8px 0 4px;font-weight:800;line-height:1.5}.anx-sub{margin:0 0 6px;font-size:.88rem;color:var(--qb-muted,#76687c);font-style:italic}
.anx-opts{list-style:none;margin:8px 0;padding:0;display:grid;gap:6px}.anx-opts.anx-vf{grid-template-columns:repeat(2,minmax(0,140px))}
.anx-opt{width:100%;text-align:left;padding:9px 12px;border:1px solid var(--qb-border,#efd3e0);border-radius:10px;background:var(--qb-accent-faint,#fffafd);color:inherit;font:inherit;line-height:1.45;cursor:pointer}
.anx-opt:hover{border-color:var(--qb-accent,#e74888)}
.anx-opts li.is-ok .anx-opt{border-color:#2e9a89;background:color-mix(in srgb,#2e9a89 14%,var(--qb-panel,#fff))}.anx-opts li.is-ok .anx-opt::after{content:" ✓ correcta";font-weight:850;color:#1f7d6f}
.anx-opts li.is-bad .anx-opt{border-color:#d04b4b;background:color-mix(in srgb,#d04b4b 10%,var(--qb-panel,#fff))}.anx-opts li.is-bad .anx-opt::after{content:" ✗";font-weight:850;color:#b33a3a}
.anx-sol{margin-top:6px;border-top:1px solid var(--qb-border,#efd3e0);padding-top:6px}.anx-sol>summary{cursor:pointer;font-weight:800;color:var(--qb-accent-strong,#8d2452)}
.anx-sol>div{padding:6px 0 0}.anx-sol li,.anx-sol p{line-height:1.65}.anx-ans{margin:4px 0}
.anx-defs{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:8px;max-width:880px;margin:14px 0}
.anx-defs div{padding:10px 12px;border:1px solid var(--qb-border,#efd3e0);border-radius:10px;background:var(--qb-panel,#fff)}.anx-defs dt{font-weight:850;color:var(--qb-accent-strong,#8d2452)}.anx-defs dd{margin:3px 0 0;line-height:1.5}
.anx-links{max-width:820px;padding-left:20px}.anx-links li{margin:7px 0;line-height:1.5}.anx-links span{color:var(--qb-muted,#76687c)}
.anx-chapter .qbx-table td,.anx-chapter .qbx-table th{font-size:.95rem}
.anx-group-head{margin:46px 0 8px;padding:22px 20px;border:2px solid var(--qb-accent,#e74888);border-radius:18px;background:var(--qb-accent-soft,#fff0f6)}
.anx-group-head .qbx-kicker{margin:0}.anx-group-head h2{margin:4px 0 6px;font-size:clamp(1.6rem,4vw,2.4rem)}.anx-group-head p{margin:4px 0;line-height:1.6}
.anx-units{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.anx-units a,.anx-units span{padding:7px 12px;border-radius:999px;border:1px solid var(--qb-border,#efd3e0);background:var(--qb-panel,#fff);font-weight:800;text-decoration:none;color:var(--qb-accent-strong,#8d2452)}.anx-units span{opacity:.6;font-weight:600}
.anx-lightbox{position:fixed;inset:0;z-index:100000;display:flex;flex-direction:column;background:#120c10}
.anx-lightbox[hidden]{display:none}
.anx-lb-bar{display:flex;gap:8px;align-items:center;justify-content:space-between;padding:10px 12px;color:#fff}
.anx-lb-bar p{margin:0;font-size:.88rem;line-height:1.35;opacity:.9}.anx-lb-bar div{display:flex;gap:6px;flex:0 0 auto}
.anx-lb-bar button{min-width:42px;min-height:40px;border:1px solid #ffffff55;border-radius:10px;background:#ffffff1a;color:#fff;font-size:1rem;font-weight:800;cursor:pointer}
.anx-lb-stage{flex:1;overflow:auto;-webkit-overflow-scrolling:touch;touch-action:pan-x pan-y pinch-zoom}
.anx-lb-stage img{display:block;margin:auto;background:#fff;max-width:none}
@media(max-width:640px){.anx-fig{padding:6px}.anx-zoom{padding:4px}.anx-quiz{padding:12px}.anx-opts.anx-vf{grid-template-columns:1fr 1fr}.anx-group-head{padding:16px 14px}}
`;

module.exports = { block, chapterHtml, M, img, CSS, ASSET };
