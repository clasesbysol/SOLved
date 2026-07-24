import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import crypto from "node:crypto";
import {load} from "cheerio";

const sha=value=>crypto.createHash("sha256").update(value).digest("hex");
function zipHtml(file){
 const data=fs.readFileSync(file);let end=-1;for(let i=data.length-22;i>=0&&i>data.length-65558;i--)if(data.readUInt32LE(i)===0x06054b50){end=i;break}if(end<0)throw Error("ZIP inválido");
 let cursor=data.readUInt32LE(end+16);const count=data.readUInt16LE(end+10);
 for(let i=0;i<count;i++){if(data.readUInt32LE(cursor)!==0x02014b50)throw Error("Directorio ZIP inválido");const method=data.readUInt16LE(cursor+10),size=data.readUInt32LE(cursor+20),nameLen=data.readUInt16LE(cursor+28),extraLen=data.readUInt16LE(cursor+30),commentLen=data.readUInt16LE(cursor+32),local=data.readUInt32LE(cursor+42),name=data.subarray(cursor+46,cursor+46+nameLen).toString("utf8");if(/\.html?$/i.test(name)){const localName=data.readUInt16LE(local+26),localExtra=data.readUInt16LE(local+28),start=local+30+localName+localExtra,body=data.subarray(start,start+size);return (method===8?zlib.inflateRawSync(body):body).toString("utf8")}cursor+=46+nameLen+extraLen+commentLen}
 throw Error("El ZIP no contiene HTML");
}
const clean=value=>String(value||"").replace(/\s+/g," ").trim();
export function convertHtml(html,outDir){
 const $=load(html,{decodeEntities:true});$("script,style,noscript,iframe,object,embed,form").remove();
 fs.mkdirSync(path.join(outDir,"assets"),{recursive:true});const assets=[],assetByHash=new Map();
 function image(node){const el=$(node),src=el.attr("src")||"",match=/^data:(image\/(?:png|jpeg|webp|gif));base64,(.+)$/i.exec(src);if(!match)return null;const bytes=Buffer.from(match[2],"base64"),digest=sha(bytes),ext={"image/jpeg":"jpg","image/png":"png","image/webp":"webp","image/gif":"gif"}[match[1].toLowerCase()];let asset=assetByHash.get(digest);if(!asset){const file=`${digest.slice(0,20)}.${ext}`;fs.writeFileSync(path.join(outDir,"assets",file),bytes);asset={id:`asset-${digest.slice(0,16)}`,path:`assets/${file}`,mimeType:match[1].toLowerCase(),sha256:digest,alt:clean(el.attr("alt"))};assets.push(asset);assetByHash.set(digest,asset)}return {type:"figure",assetId:asset.id,alt:clean(el.attr("alt")),caption:clean(el.closest("figure").find("figcaption").first().text())}}
 let serial=0;const id=(type,text)=>`${type}-${sha(`${type}|${text}|${serial++}`).slice(0,12)}`;
 function convert(node){const el=$(node),tag=node.tagName?.toLowerCase(),text=clean(el.text());if(!text&&tag!=="img")return null;if(/^h[1-6]$/.test(tag))return {type:"heading",level:Number(tag[1]),id:id("heading",text),text};if(tag==="p")return {type:"paragraph",id:id("paragraph",text),text};if(tag==="ul"||tag==="ol")return {type:"list",id:id("list",text),ordered:tag==="ol",items:el.children("li").map((_,li)=>clean($(li).text())).get().filter(Boolean)};if(tag==="img")return image(node);if(tag==="table"){const rows=[];el.find("tr").each((_,tr)=>rows.push($(tr).children("th,td").map((__,cell)=>clean($(cell).text())).get()));return {type:"table",id:id("table",text),rows}}if(tag==="details"){const summary=clean(el.children("summary").first().text())||"Ver detalle",children=[];el.find("h1,h2,h3,h4,h5,h6,p,ul,ol,table,img").each((_,inner)=>{const owner=$(inner).parents("details").first()[0];if(owner!==node||$(inner).parents("table,ul,ol").length)return;const nested=convert(inner);if(nested)children.push(nested)});return {type:"details",id:id("details",summary),summary,children}}const cls=(el.attr("class")||"").toLowerCase();if(/formula|equation|ecuacion/.test(cls))return {type:"formula",id:id("formula",text),visual:text,linear:text};if(/reaction|reaccion/.test(cls)||/[→⇌]/.test(text))return {type:"reaction",id:id("reaction",text),text};if(/callout|nota|warning|tip|alert/.test(cls))return {type:"callout",id:id("callout",text),text};return null}
 const root=$("main").first().length?$("main").first():$("body"),blocks=[];root.find("h1,h2,h3,h4,h5,h6,p,ul,ol,details,table,img").each((_,node)=>{const tag=node.tagName?.toLowerCase(),el=$(node);if(tag!=="details"&&el.parents("details,table,ul,ol").length)return;const item=convert(node);if(item)blocks.push(item)});
 const firstText=blocks.find(x=>x.text)?.text||"Resumen integral de Química Orgánica";const ref=[{sourceId:"organica-html"}];
 const json={
  "package.json":{packageSchemaVersion:1,factoryVersion:"0.6.0",contentStandard:"LBT-V1",subjectId:"quimica_organica",unitId:"resumen-integral",title:"Resumen integral de Química Orgánica",contentVersion:"0.6.0",status:"published",generatedAt:"2026-07-24T00:00:00.000Z",reviewedAt:"2026-07-24T00:00:00.000Z",files:{summary:"summary.json",glossary:"glossary.json",cards:"cards.json",exercises:"exercises.json",map:"map.json",sources:"sources.json"}},
  "summary.json":{blocks:[{id:"organica-import",title:"Resumen integral",text:firstText,kind:"theory",references:ref}]},"glossary.json":{entries:[]},"cards.json":{cards:[]},"exercises.json":{exercises:[]},"map.json":{nodes:[],edges:[]},"sources.json":{sources:[{id:"organica-html",title:"Resumen integral de Química Orgánica"}]},"rich.json":{schemaVersion:1,blocks},"assets.json":{schemaVersion:1,assets}
 };
 for(const [name,value] of Object.entries(json))fs.writeFileSync(path.join(outDir,name),`${JSON.stringify(value,null,2)}\n`);
 return {blocks:blocks.length,assets:assets.length,images:$("img").length,details:$("details").length,tables:$("table").length};
}
if(process.argv[1]===path.resolve(import.meta.filename)){
 const input=process.argv[2];if(!input)throw Error("Uso: node import-organica-html.mjs <archivo.zip|html> [salida]");const html=/\.zip$/i.test(input)?zipHtml(input):fs.readFileSync(input,"utf8"),out=path.resolve(process.argv[3]||"content/subjects/quimica_organica/units/resumen-integral");fs.mkdirSync(out,{recursive:true});console.log(JSON.stringify(convertHtml(html,out)));
}
