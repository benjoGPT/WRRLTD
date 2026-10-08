"""
Builds the website's logo files from brand/logo-original.jpg.

Run from the project folder:  python3 brand/make-logos.py
Needs Pillow (pip install pillow).

What it does:
1. Removes the off-white background, keeping soft edges and the shaded fold
   in the W (each pixel's "whiteness" becomes transparency).
2. Saves the stacked logo, a horizontal version for the header, a white
   version for the share image, and the favicons cropped from the WP mark.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "brand" / "logo-original.jpg"
BG = 254  # background brightness in the original

# Rows (y ranges) of each part in the original artwork
MARK_ROWS = (187, 490)
WORDMARK_ROWS = (532, 651)
STRAPLINE_ROWS = (691, 734)  # "— RECRUITMENT LTD —"


def remove_background(img: Image.Image) -> Image.Image:
    """Turns the white background transparent ("un-multiplies" white)."""
    rgb = img.convert("RGB")
    out = Image.new("RGBA", rgb.size)
    src, dst = rgb.load(), out.load()
    for y in range(rgb.height):
        for x in range(rgb.width):
            r, g, b = src[x, y]
            a = max(0.0, min(1.0, (BG - min(r, g, b)) / BG))
            if a < 0.03:  # JPEG noise in the background
                dst[x, y] = (0, 0, 0, 0)
                continue
            # Recover the colour the pixel would have at full opacity
            un = lambda c: int(max(0, min(255, (c - (1 - a) * 255) / a)))
            dst[x, y] = (un(r), un(g), un(b), int(a * 255))
    return out


def trim(img: Image.Image, pad: int = 0) -> Image.Image:
    box = img.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    cropped = img.crop(box)
    if not pad:
        return cropped
    canvas = Image.new("RGBA", (cropped.width + pad * 2, cropped.height + pad * 2))
    canvas.paste(cropped, (pad, pad))
    return canvas


def rows(img: Image.Image, top_bottom: tuple[int, int]) -> Image.Image:
    top, bottom = top_bottom
    return trim(img.crop((0, top - 2, img.width, bottom + 3)))


def to_white(img: Image.Image) -> Image.Image:
    """Same shape, all white (for navy backgrounds), keeping transparency."""
    white = Image.new("RGBA", img.size, (255, 255, 255, 0))
    white.putalpha(img.getchannel("A"))
    return Image.alpha_composite(Image.new("RGBA", img.size, (255, 255, 255, 0)), white)


def main() -> None:
    clean = remove_background(Image.open(SRC))

    # 1. Stacked logo, as designed
    stacked = trim(clean, pad=8)
    stacked.save(ROOT / "public" / "logo.png", optimize=True)

    # 2. Horizontal logo: mark on the left, name on the right
    mark = rows(clean, MARK_ROWS)
    wordmark = rows(clean, WORDMARK_ROWS)
    strap = rows(clean, STRAPLINE_ROWS)
    gap = 40  # same spacing as between the lines in the original
    text_w = max(wordmark.width, strap.width)
    text_h = wordmark.height + gap + strap.height
    scale = text_h / mark.height
    mark_small = mark.resize((round(mark.width * scale), text_h), Image.LANCZOS)
    space = round(text_h * 0.32)
    pad = 8
    horiz = Image.new("RGBA", (pad * 2 + mark_small.width + space + text_w, pad * 2 + text_h))
    horiz.alpha_composite(mark_small, (pad, pad))
    x = pad + mark_small.width + space
    horiz.alpha_composite(wordmark, (x + (text_w - wordmark.width) // 2, pad))
    horiz.alpha_composite(strap, (x + (text_w - strap.width) // 2, pad + wordmark.height + gap))
    horiz.save(ROOT / "public" / "logo-horizontal.png", optimize=True)

    # 3. White horizontal logo for the generated share image
    to_white(horiz).save(ROOT / "src" / "assets" / "logo-horizontal-white.png", optimize=True)

    # 4. Favicons: the WP mark centred on a white square
    for size, name in [(96, "icon.png"), (180, "apple-icon.png")]:
        canvas = Image.new("RGBA", (size, size), (255, 255, 255, 255))
        inner = round(size * 0.94)
        m = mark.copy()
        m.thumbnail((inner, inner), Image.LANCZOS)
        canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
        canvas.convert("RGB").save(ROOT / "src" / "app" / name, optimize=True)

    # 5. Social media: profile pictures (safe for circular crops) and a cover
    social = ROOT / "brand" / "social"
    social.mkdir(exist_ok=True)
    navy = (7, 40, 75, 255)
    for name, bg, art in [
        ("profile-navy.png", navy, to_white(mark)),
        ("profile-white.png", (255, 255, 255, 255), mark),
    ]:
        size = 1080
        canvas = Image.new("RGBA", (size, size), bg)
        m = art.copy()
        m.thumbnail((round(size * 0.62), round(size * 0.62)), Image.LANCZOS)  # inside the circle
        canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
        canvas.convert("RGB").save(social / name, optimize=True)
    # LinkedIn-style cover: white logo on navy, kept away from the edges
    cover = Image.new("RGBA", (1584, 396), navy)
    logo_w = to_white(horiz)
    logo_w.thumbnail((900, 120), Image.LANCZOS)
    cover.alpha_composite(logo_w, ((1584 - logo_w.width) // 2, (396 - logo_w.height) // 2))
    cover.convert("RGB").save(social / "cover-1584x396.png", optimize=True)

    print("stacked", stacked.size, "horizontal", horiz.size)

    # Re-bundle the share-image logo (see scripts/make-og-assets.py)
    import runpy
    runpy.run_path(str(ROOT / "scripts" / "make-og-assets.py"))


if __name__ == "__main__":
    main()
