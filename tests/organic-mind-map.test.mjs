import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {load} from "cheerio";

const base="content/subjects/quimica_organica/units/resumen-integral",map=JSON.parse(await readFile(`${base}/organic-mind-map.json`,"utf8")),$=load(await readFile(`${base}/original.html`,"utf8")),anchors=new Set();$("[id]").each((_,node)=>anchors.add($(node).attr("id")));
assert.equal(map.groups.length,5);assert.equal(map.counts.chapters,20);assert.ok(map.counts.topics>=145);assert.ok(map.counts.subtopics>=145);assert.ok(map.counts.concepts>=160);
const ids=new Set(),targets=[];for(const group of map.groups){assert.ok(group.label&&group.description&&group.chapters.length);for(const chapter of group.chapters){assert.ok(chapter.label&&chapter.target&&chapter.topics.length);assert.ok(!ids.has(chapter.id));ids.add(chapter.id);targets.push(chapter.target);for(const topic of chapter.topics){assert.ok(topic.label&&topic.target);assert.ok(!ids.has(topic.id));ids.add(topic.id);targets.push(topic.target);for(const child of topic.children){assert.ok(child.label&&child.target);targets.push(child.target);for(const item of child.children||[]){assert.ok(item.label&&item.target);targets.push(item.target)}}}}}
assert.ok(targets.every(target=>anchors.has(target)),"Todas las rutas del mapa deben apuntar a anclas reales");console.log(`Mapa Orgánica: OK · ${map.counts.chapters} bloques · ${map.counts.topics} temas · ${map.counts.subtopics+map.counts.concepts} conexiones`);
