"""Split the audited Organic Chemistry import into native SOLved units.

Run after scripts/audit-organica.py with the same canonical source.
"""
from copy import deepcopy
from pathlib import Path
import json
import re


ROOT = Path("content/subjects/quimica_organica/units")
LEGACY = ROOT / "resumen-integral"
AUDIT = Path("docs/organica-auditoria.json")
ASSET_ROOT = "content/subjects/quimica_organica/units/resumen-integral/"
CARD_CHAPTERS = {"alcanos": "organica-06", "haluros-de-alquilo": "organica-08", "alquenos": "organica-10", "alquinos": "organica-11", "aromaticos": "organica-13", "alcoholes": "organica-14", "eteres": "organica-14", "aldehidos": "organica-15", "acidos-carboxilicos": "organica-16", "compuestos-nitrogenados": "organica-17", "hidratos-de-carbono": "organica-18", "integradoras": "organica-01"}


def write(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def collect_figures(blocks):
    for block in blocks:
        if block["type"] == "figure":
            yield block["assetId"]
        yield from collect_figures(block.get("children", []))


def collect_headings(blocks):
    for block in blocks:
        if block["type"] == "heading":
            yield block
        yield from collect_headings(block.get("children", []))


def title_of(block):
    title = block["summary"]
    title = re.split(r"\s+(?:WADE|UNIDAD|RESUMEN TRANSVERSAL|MAPA DE ESTUDIO)\b", title, maxsplit=1)[0]
    return title.capitalize() if title.isupper() else title


def main():
    audit = json.loads(AUDIT.read_text(encoding="utf-8"))
    rich = deepcopy(json.loads((LEGACY / "rich.json").read_text(encoding="utf-8")))
    assets = json.loads((LEGACY / "assets.json").read_text(encoding="utf-8"))["assets"]
    sources = json.loads((LEGACY / "sources.json").read_text(encoding="utf-8"))
    card_bank = json.loads((LEGACY / "organic-cards-v2.json").read_text(encoding="utf-8"))["cards"]
    sources["sources"].append({"id": "organica-cards-v2", "title": "Banco de tarjetas de Química Orgánica de SOLved"})
    legacy_manifest = json.loads((LEGACY / "package.json").read_text(encoding="utf-8"))
    legacy_manifest["status"] = "reviewed"  # retained as an internal migration reference
    write(LEGACY / "package.json", legacy_manifest)
    blocks = rich["blocks"]
    headings = list(collect_headings(blocks))
    assert len(headings) == len(audit["sourceHeadings"]) == 520

    starts = [index for index, block in enumerate(blocks) if any(child["type"] == "heading" and child.get("level") == 1 for child in block.get("children", []))]
    assert len(starts) == 19 and starts[0] == 1
    boundaries = starts + [len(blocks)]
    # The source's first block only documents controls from the retired HTML UI.
    units = []
    anchor_units = {}
    for number, (start, end) in enumerate(zip(boundaries, boundaries[1:]), 1):
        unit_blocks = blocks[start:end]
        chapter = unit_blocks[0]
        title = title_of(chapter)
        unit_id = f"organica-{number:02d}"
        unit_dir = ROOT / unit_id
        used = set(collect_figures(unit_blocks))
        unit_assets = [asset for asset in assets if asset["id"] in used]
        for section_index, block in enumerate(unit_blocks):
            for anchor in audit.get("detailAnchorIds", {}).get(str(start + section_index + 1), []):
                anchor_units[anchor] = {"unitId": unit_id, "sectionIndex": section_index}
        first_text = next((child.get("text", "") for block in unit_blocks for child in block.get("children", []) if child["type"] == "paragraph" and child.get("text", "").strip()), title)
        write(unit_dir / "package.json", {
            "packageSchemaVersion": 1, "factoryVersion": "1.0.0", "contentStandard": "LBT-V1", "subjectId": "quimica_organica", "unitId": unit_id,
            "title": title, "contentVersion": "1.0.2", "status": "published", "generatedAt": "2026-09-20T00:00:00.000Z", "reviewedAt": "2026-09-20T00:00:00.000Z",
            "files": {name: f"{name}.json" for name in ("summary", "glossary", "cards", "exercises", "map", "sources", "rich", "assets")}
        })
        write(unit_dir / "summary.json", {"blocks": [{"id": f"{unit_id}-resumen", "title": title, "text": first_text, "kind": "theory", "references": [{"sourceId": "organica-html"}]}]})
        write(unit_dir / "rich.json", {"schemaVersion": 1, "blocks": unit_blocks})
        write(unit_dir / "assets.json", {"schemaVersion": 1, "assets": unit_assets})
        write(unit_dir / "sources.json", sources)
        glossary = []
        for section_index, block in enumerate(unit_blocks):
            first_paragraph = next((child.get("text", "") for child in block.get("children", []) if child["type"] == "paragraph" and child.get("text", "").strip()), "")
            if first_paragraph and len(block["summary"]) < 120:
                glossary.append({"id": f"{unit_id}-glosario-{section_index+1}", "term": block["summary"], "definition": first_paragraph, "explanation": "", "example": "", "unit": unit_id, "references": [{"sourceId": "organica-html"}], "related": []})
        write(unit_dir / "glossary.json", {"entries": glossary})
        for name, value in {"cards": {"cards": []}, "exercises": {"exercises": []}, "map": {"nodes": [], "edges": []}}.items():
            write(unit_dir / f"{name}.json", value)
        units.append({"subjectId": "quimica_organica", "unitId": unit_id, "title": title, "contentVersion": "1.0.2", "status": "published", "path": f"content/subjects/quimica_organica/units/{unit_id}/"})

    catalog_path = Path("content/catalog.json")
    catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    catalog["packages"] = [unit for unit in catalog["packages"] if unit["subjectId"] != "quimica_organica"] + units
    write(catalog_path, catalog)
    # Keep this lookup explicit so cards and the map resolve the original links.
    write(Path("content/subjects/quimica_organica/anchor-index.json"), anchor_units)
    exercise_groups = {unit["unitId"]: [] for unit in units}
    for card in card_bank:
        if card.get("mode") != "synthesis":
            continue
        destination = anchor_units.get(card.get("summaryTarget"))
        if not destination:
            continue
        exercise_unit = CARD_CHAPTERS.get(card.get("unit"), destination["unitId"])
        exercise_groups[exercise_unit].append({
            "id": "ejercicio-" + card["id"], "origin": "source", "prompt": card["front"], "basedOn": [], "breakdown": [], "data": [], "unknowns": [], "theory": [], "formulas": [], "strategy": "", "hints": [], "solution": [card["back"]], "result": card["back"], "check": "", "commonErrors": [], "related": [], "references": [{"sourceId": "organica-cards-v2"}]
        })
    for unit_id, exercises in exercise_groups.items():
        write(ROOT / unit_id / "exercises.json", {"exercises": exercises})
    Path("js/organic-anchor-index.js").write_text("window.LBT_ORGANIC_ANCHORS=" + json.dumps(anchor_units, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    Path("js/organic-unit-index.js").write_text("window.LBT_ORGANIC_UNITS=" + json.dumps([{"unitId": unit["unitId"], "title": unit["title"]} for unit in units], ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print(f"Created {len(units)} native units, {len(anchor_units)} native anchors")


if __name__ == "__main__":
    main()
