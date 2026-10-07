"""Recorta y comprime las figuras originales de Ácidos nucleicos I.
Uso: python3 scripts/qbi-explained/acidos-imagenes.py <carpeta del paquete descomprimido> content/subjects/quimica_biologica1/units/proteinas-i/assets/acidos-nucleicos-i
Las cajas están en coordenadas de la diapositiva completa (1800 x 1350 px).
"""
import sys, os, json
from PIL import Image
SRC = sys.argv[1]   # unzipped package dir
OUT = sys.argv[2]   # repo assets dir
os.makedirs(OUT, exist_ok=True)

# id: (source, box or None)   source = 'fig:pNNN_figNN' or 'slide:NNN'
M = {
 'p002-watson-crick': ('fig:p002_fig01', None),
 'p004-polinucleotido': ('fig:p004_fig01', None),
 'p006-miescher': ('fig:p006_fig01', None),
 'p006-kossel': ('fig:p006_fig02', None),
 'p006-levene': ('fig:p006_fig03', None),
 'p006-tetranucleotido': ('fig:p006_fig04', None),
 'p007-purinas-pirimidinas': ('slide:007', (0, 280, 1800, 1350)),
 'p008-bases-adn-arn': ('slide:008', (150, 220, 1640, 940)),
 'p009-ribosa-desoxirribosa': ('slide:009', (240, 400, 1790, 1150)),
 'p010-nucleosidos': ('slide:010', (190, 270, 1800, 1100)),
 'p011-fosfato': ('slide:011', (130, 150, 1780, 1340)),
 'p012-atp-damp': ('fig:p012_fig02', None),
 'p013-nucleotido-adn-arn': ('fig:p013_fig02', None),
 'p014-tabla-nomenclatura': ('fig:p014_fig01', None),
 'p015-desoxirribonucleotidos': ('fig:p015_fig01', None),
 'p016-ribonucleotidos': ('fig:p016_fig01', None),
 'p018-griffith': ('slide:018', (0, 40, 1800, 1340)),
 'p019-avery': ('slide:019', (0, 30, 1800, 1350)),
 'p021-pauling': ('fig:p021_fig08', None),
 'p021-watson': ('fig:p021_fig04', None),
 'p021-crick': ('fig:p021_fig02', None),
 'p021-wilkins': ('fig:p021_fig01', None),
 'p021-franklin': ('fig:p021_fig14', None),
 'p021-cronologia': ('slide:021', (0, 0, 1800, 1350)),
 'p022-foto51': ('fig:p022_fig01', None),
 'p023-bragg': ('fig:p023_fig01', None),
 'p023-paneles': ('fig:p023_fig03', None),
 'p023-helice-anotada': ('fig:p023_fig02', None),
 'p025-modelo': ('fig:p025_fig01', None),
 'p026-fosfodiester': ('slide:026', (0, 90, 1800, 1350)),
 'p027-cadena': ('fig:p027_fig01', None),
 'p028-puentes-h': ('fig:p028_fig01', None),
 'p029-vista-lateral': ('fig:p029_fig01', None),
 'p029-vista-superior': ('fig:p029_fig02', None),
 'p030-antiparalelas': ('fig:p030_fig01', None),
 'p031-abz': ('slide:031', (40, 260, 1790, 1340)),
 'p032-cronologia': ('fig:p032_fig01', None),
 'p033-nature-1': ('fig:p033_fig01', None),
 'p033-nature-2': ('fig:p033_fig02', None),
 'p034-paper-mountain': ('fig:p034_fig01', None),
 'p035-eagle-cartel': ('fig:p035_fig01', None),
 'p035-eagle-placa': ('fig:p035_fig03', None),
 'p035-modelo-original': ('fig:p035_fig05', None),
 'p035-eagle-pizarra': ('fig:p035_fig04', None),
 'p035-modelo-placas': ('fig:p035_fig02', None),
 'p036-desnaturalizacion': ('slide:036', (300, 120, 1530, 640)),
 'p037-hipercromico': ('fig:p037_fig01', None),
 'p037-tm': ('fig:p037_fig02', None),
 'p038-cadena-arn': ('fig:p038_fig01', None),
 'p038-horquilla': ('fig:p038_fig02', None),
 'p039-adn-vs-arn': ('fig:p039_fig01', None),
 'p039-cadena-arn': ('fig:p039_fig02', None),
 'p040-messi': ('fig:p040_fig01', None),
 'p042-tipos-arn': ('slide:042', (40, 140, 1800, 1310)),
 'p043-diferencias': ('slide:043', (100, 260, 1720, 1060)),
 'p044-dogma': ('slide:044', (0, 120, 1800, 1300)),
 'p045-horquilla': ('fig:p045_fig01', None),
 'p045-semiconservativa': ('slide:045', (1484, 730, 1752, 1332)),
 'p046-transcripcion': ('fig:p046_fig01', None),
 'p046-arnm': ('fig:p046_fig02', None),
 'p047-codigo': ('fig:p047_fig01', None),
 'p047-traduccion': ('fig:p047_fig04', None),
 'p047-arnt': ('fig:p047_fig02', None),
 'p047-arnt-estructura': ('fig:p047_fig03', None),
 'p048-metabolismo': ('slide:048', (0, 130, 1800, 1350)),
 'p050-atomos-purina': ('fig:p050_fig01', None),
 'p050-atomos-pirimidina': ('fig:p050_fig02', None),
 'p050-prpp': ('fig:p050_fig03', None),
 'p051-estrategias': ('slide:051', (110, 140, 1800, 1350)),
 'p051-cafeina': ('fig:p051_fig03', None),
 'p052-regulacion': ('slide:052', (200, 220, 1790, 600)),
 'p052-amp-gmp': ('slide:052', (60, 800, 1800, 1350)),
 'p053-imp': ('slide:053', (0, 0, 1800, 1350)),
 'p054-pirimidinas': ('slide:054', (100, 290, 1780, 740)),
 'p055-reductasa': ('slide:055', (100, 230, 1800, 1350)),
 'p056-timidilato': ('slide:056', (440, 190, 1460, 1000)),
 'p057-carlos-v': ('fig:p057_fig01', None),
 'p058-urato': ('slide:058', (0, 0, 1800, 1350)),
 'p059-coenzimas': ('slide:059', (770, 20, 1790, 740)),
 'p059-sam': ('slide:059', (30, 720, 1790, 1350)),
 'p060-pasta': ('fig:p060_fig01', None),
 'p061-preguntas': ('fig:p061_fig01', None),
 'p062-vf': ('slide:062', (0, 380, 1800, 1200)),
 'p063-mc': ('slide:063', (240, 100, 1450, 1300)),
 'p064-memes': ('slide:064', (240, 0, 1800, 1350)),
}
meta = {}
for key, (src, box) in M.items():
    kind, name = src.split(':')
    path = os.path.join(SRC, 'imagenes', 'figuras', name + '.webp') if kind == 'fig' else os.path.join(SRC, 'imagenes', 'diapositivas', 'pagina_%s.webp' % name)
    im = Image.open(path).convert('RGB')
    if box:
        im = im.crop(box)
    if im.width > 1600:
        im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
    out = os.path.join(OUT, key + '.webp')
    im.save(out, 'WEBP', quality=80, method=6)
    meta[key] = [im.width, im.height]
json.dump(meta, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'acidos-img-sizes.json'), 'w'), indent=0)
print(len(meta), sum(os.path.getsize(os.path.join(OUT, k + '.webp')) for k in meta) // 1024, 'KB')
