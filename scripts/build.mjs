import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const entries = [
  "index.html", "bienvenida.html", "quimica-general.html", "styles.css", "styles-enhancements.css", "styles-personal.css", "organic-cards.css", "organic-mind-map.css", "organic-native.css", "manifest.webmanifest", "sw.js", "privacy.html", "terms.html", "version.json",
  "js", "icons", "assets", "docs", "content"
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const entry of entries) {
  const source = path.join(root, entry);
  if (!existsSync(source)) throw new Error(`Falta el recurso requerido: ${entry}`);
  await cp(source, path.join(dist, entry), { recursive: true });
}
await writeFile(path.join(dist, ".nojekyll"), "");
await cp(path.join(root, "index.html"), path.join(dist, "404.html"));
console.log(`Sitio preparado en ${dist}`);
