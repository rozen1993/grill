from pathlib import Path
from PIL import Image

base = Path(__file__).resolve().parents[1]
images = ('hero', 'parrilla', 'cilindro', 'utensilios')
originals = base / 'assets' / 'concepts'
output = base / 'public' / 'images'
missing = [str(originals / f'{name}.png') for name in images if not (originals / f'{name}.png').is_file()]
if missing:
    raise SystemExit('Faltan originales locales para regenerar WebP:\n' + '\n'.join(missing)
                     + '\nEste paso es opcional: el repositorio ya incluye los WebP listos en public/images/.')
output.mkdir(parents=True, exist_ok=True)
for name in images:
    local = originals / f'{name}.png'
    with Image.open(local) as img:
        for width in (480, 960, 1440):
            resized = img.resize((width, round(img.height * width / img.width)), Image.Resampling.LANCZOS)
            destination = output / f'{name}-{width}.webp'
            resized.save(destination, 'WEBP', quality=82, method=6)
            print(destination.relative_to(base), destination.stat().st_size)
