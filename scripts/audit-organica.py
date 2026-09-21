"""Inventory the canonical Organic Chemistry HTML against SOLved's structured import."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import argparse
import json
import re


class Inventory(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.counts = Counter()
        self.headings = []
        self.details = []
        self.links = []
        self.images = []
        self.detail_anchor_ids = {}
        self._detail_stack = []
        self._heading = None
        self._summary = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.counts[tag] += 1
        if re.fullmatch(r"h[1-6]", tag):
            self._heading = {"level": int(tag[1]), "id": attrs.get("id"), "text": ""}
        elif tag == "details":
            self.details.append({"ordinal": len(self.details) + 1, "id": attrs.get("id"), "summary": ""})
            self._detail_stack.append(len(self.details))
        if attrs.get("id"):
            ordinal = self._detail_stack[-1] if self._detail_stack else len(self.details) + 1
            self.detail_anchor_ids.setdefault(str(ordinal), []).append(attrs["id"])
        elif tag == "summary":
            self._summary = self.details[-1] if self.details else None
        elif tag == "a":
            self.links.append(attrs.get("href", ""))
        elif tag == "img":
            self.images.append({"src": attrs.get("src", ""), "alt": attrs.get("alt", "")})

    def handle_data(self, data):
        if self._heading is not None:
            self._heading["text"] += data
        if self._summary is not None:
            self._summary["summary"] += data

    def handle_endtag(self, tag):
        if self._heading is not None and tag == f"h{self._heading['level']}":
            self._heading["text"] = " ".join(self._heading["text"].split())
            self.headings.append(self._heading)
            self._heading = None
        if tag == "summary" and self._summary is not None:
            self._summary["summary"] = " ".join(self._summary["summary"].split())
            self._summary = None
        if tag == "details" and self._detail_stack:
            self._detail_stack.pop()


def walk(blocks, tally, headings, details, figures):
    for block in blocks:
        tally[block["type"]] += 1
        if block["type"] == "heading":
            headings.append(block)
        if block["type"] == "details":
            details.append(block)
        if block["type"] == "figure":
            figures.append(block)
        walk(block.get("children", []), tally, headings, details, figures)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("--output", type=Path, default=Path("docs/organica-auditoria.json"))
    args = parser.parse_args()
    source = Inventory()
    source.feed(args.source.read_text(encoding="utf-8"))
    unit = Path("content/subjects/quimica_organica/units/resumen-integral")
    rich = json.loads((unit / "rich.json").read_text(encoding="utf-8"))
    assets = json.loads((unit / "assets.json").read_text(encoding="utf-8"))["assets"]
    tally, headings, details, figures = Counter(), [], [], []
    walk(rich["blocks"], tally, headings, details, figures)
    report = {
        "source": "clasesbysol/organicabysoll/index.html",
        "sourceCounts": dict(source.counts),
        "structuredCounts": dict(tally),
        "sourceHeadings": source.headings,
        "structuredHeadings": [{"id": b.get("id"), "level": b.get("level"), "text": b.get("text")} for b in headings],
        "sourceDetails": source.details,
        "structuredDetails": [{"id": b.get("id"), "summary": b.get("summary")} for b in details],
        "sourceImages": source.images,
        "assets": [{"id": a["id"], "path": a["path"], "alt": a["alt"], "exists": (unit / a["path"]).is_file()} for a in assets],
        "figureAssetIds": [b.get("assetId") for b in figures],
        "sourceLinks": source.links,
        "detailAnchorIds": source.detail_anchor_ids,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"source": {key: source.counts[key] for key in ["details", "h1", "h2", "h3", "h4", "img", "table", "button", "a"]}, "structured": tally, "assets": len(assets), "missingAssets": sum(not a["exists"] for a in report["assets"])}, ensure_ascii=False))


if __name__ == "__main__":
    main()
