"""
Downloads the site's photos from Unsplash into public/images, resized to a
sensible size for the web.

Run from the project folder:  python3 scripts/fetch-photos.py
Needs Pillow (pip install pillow) and internet access to unsplash.com.

The list of photos is read from src/lib/photos.ts, so that's the only place to
change them.
"""
import io
import re
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
source = (ROOT / "src/lib/photos.ts").read_text()
entries = re.findall(r'file: "(/images/[^"]+)",.*?unsplashId: "([^"]+)"', source, re.S)

MAX_WIDTH = 1600

for file, unsplash_id in entries:
    out = ROOT / "public" / file.lstrip("/")
    if out.exists():
        print("already have", out.name)
        continue
    url = f"https://unsplash.com/photos/{unsplash_id}/download?force=true"
    print("downloading", unsplash_id, "->", out.name)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as res:
        img = Image.open(io.BytesIO(res.read())).convert("RGB")
    if img.width > MAX_WIDTH:
        img = img.resize((MAX_WIDTH, round(img.height * MAX_WIDTH / img.width)), Image.LANCZOS)
    img.save(out, "JPEG", quality=80, optimize=True, progressive=True)
    print("  saved", img.size)
