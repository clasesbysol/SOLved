import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";

const path = "content/subjects/quimica_organica/units/resumen-integral/original.html";
const html = fs.readFileSync(path);
const text = html.toString("utf8");

assert.equal(
  crypto.createHash("sha256").update(html).digest("hex"),
  "360ea8e8aaa0a2d4976ef796f4b3c5e69eca37f85a48dc8d6e2e0e2386fc9feb",
  "El HTML publicado debe ser idéntico al original canónico",
);
assert.ok(html.length > 15_000_000, "El archivo debe conservar las imágenes embebidas");
assert.match(text, /id="studySearchInput"/);
assert.match(text, /id="indice-maestro-reacciones"/);
assert.match(text, /tex-svg\.js/);
assert.match(text, /fixCenteredLayout/);

console.log("HTML original de Orgánica verificado byte por byte.");
