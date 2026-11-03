"""Recorta y comprime las diapositivas elegidas de Glúcidos II (Análisis estructural de glicanos).
Uso: python3 scripts/qbi-explained/glucidos-ii-imagenes.py <carpeta con diapositiva_NN.jpg> content/subjects/quimica_biologica1/units/proteinas-i/assets/glucidos-ii
Las cajas están en coordenadas de la diapositiva completa (1044 x 783 px). None = diapositiva entera.
Solo se incluyen las diapositivas con figuras que aportan algo; las de puro texto quedan explicadas en el capítulo.
"""
import sys, os, json
from PIL import Image
SRC = sys.argv[1]
OUT = sys.argv[2]
os.makedirs(OUT, exist_ok=True)

PANEL = (0, 92, 1044, 688)      # infografías con fondo blanco centradas
TALL = (0, 58, 1044, 765)       # infografías que ocupan casi toda la diapositiva
M = {
 'd03-glicanos-en-la-celula': (3, (10, 250, 1044, 783)),
 'd09-n-glicosilacion': (9, TALL),
 'd10-tipos-n-glicanos': (10, (0, 40, 1044, 783)),
 'd11-pngasa-endoh': (11, (60, 40, 1000, 783)),
 'd12-o-glicosilacion': (12, TALL),
 'd13-mucinas-o-glicanos': (13, (0, 30, 1044, 783)),
 'd14-hidracinolisis': (14, (60, 40, 1000, 560)),
 'd15-2aa-2ab': (15, (0, 40, 1044, 783)),
 'd17-pgc-elucion': (17, (40, 40, 970, 620)),
 'd20-sec': (20, PANEL),
 'd24-intercambio-ionico': (24, PANEL),
 'd25-ionico-y-sec-polisacaridos': (25, (40, 40, 1000, 783)),
 'd26-isocratica-gradiente': (26, PANEL),
 'd28-lectina': (28, PANEL),
 'd29-afinidad-lectinas': (29, PANEL),
 'd31-estructuras-ejercicio': (31, PANEL),
 'd32-ejercicio-lectinas': (32, PANEL),
 'd33-hpsec': (33, PANEL),
 'd34-hpsec-calibracion': (34, (0, 40, 1044, 783)),
 'd35-tlc': (35, PANEL),
 'd37-tlc-oligosacaridos': (37, (40, 40, 1000, 783)),
 'd38-face': (38, (0, 92, 1044, 783)),
 'd39-face-gel': (39, (0, 40, 1044, 783)),
 'd42-hpaec': (42, PANEL),
 'd43-pad': (43, PANEL),
 'd44-composicion-hpaec-pad': (44, PANEL),
 'd45-fosforilados': (45, PANEL),
 'd48-cromatograma-monosacaridos': (48, (0, 120, 1044, 740)),
 'd49-acidos-sialicos': (49, (0, 40, 1044, 783)),
 'd52-galactosa-c3': (52, PANEL),
 'd53-reaccion-pmaa': (53, (20, 40, 1000, 720)),
 'd55-anomeros-anillos': (55, (0, 40, 1044, 720)),
 'd56-nabd4': (56, (0, 40, 1044, 783)),
 'd57-gc': (57, PANEL),
 'd63-espectro-ei': (63, (0, 280, 1044, 783)),
 'd64-iones-reporteros': (64, (100, 100, 950, 783)),
 'd65-pmaa-deuterados': (65, (0, 60, 1044, 783)),
 'd66-pmaa-cromatograma': (66, (150, 100, 890, 783)),
 'd68-exoglicosidasas': (68, (60, 40, 1000, 783)),
 'd69-digestion-secuencial': (69, (0, 40, 1044, 783)),
 'd72-ejemplo-industrial': (72, (0, 0, 1044, 783)),
}
meta = {}
for key, (n, box) in M.items():
    im = Image.open(os.path.join(SRC, 'diapositiva_%02d.jpg' % n)).convert('RGB')
    if box:
        im = im.crop(box)
    out = os.path.join(OUT, key + '.webp')
    im.save(out, 'WEBP', quality=84, method=6)
    meta[key] = [im.width, im.height]
json.dump(meta, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'glucidos-ii-img-sizes.json'), 'w'), indent=0)
print(len(meta), sum(os.path.getsize(os.path.join(OUT, k + '.webp')) for k in meta) // 1024, 'KB')
