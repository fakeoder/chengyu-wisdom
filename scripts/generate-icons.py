#!/usr/bin/env python3
"""
Generate the seal-style favicon set (public/*.png, public/*.ico, apple-touch-icon).

Requires Pillow and a system CJK font. Dev tool only — not part of the build.
Usage:  python scripts/generate-icons.py
"""
import os
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

PUBLIC = Path(__file__).resolve().parent.parent / "public"

SEAL = (166, 60, 47)      # --color-seal #a63c2f
PAPER = (250, 246, 238)   # --color-paper #faf6ee
FONT_CANDIDATES = [
    "C:/Windows/Fonts/msyhbd.ttc",        # Microsoft YaHei Bold (Win)
    "C:/Windows/Fonts/msyh.ttc",          # Microsoft YaHei (Win)
    "C:/Windows/Fonts/simhei.ttf",        # SimHei (Win)
    "C:/Windows/Fonts/simsun.ttc",        # SimSun (Win)
    "/System/Library/Fonts/PingFang.ttc",  # macOS
    "/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc",  # Linux
]


def find_font() -> str:
    for path in FONT_CANDIDATES:
        if os.path.exists(path):
            return path
    raise FileNotFoundError("no CJK font found — install one or pass a path")


def draw_icon(size: int, font_path: str, inner_border: bool = True) -> Image.Image:
    """Seal-style square: seal-red rounded rect + paper-white 慧 centered."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    radius = int(size * 0.11)
    draw.rounded_rectangle(
        [(0, 0), (size - 1, size - 1)],
        radius=radius,
        fill=SEAL,
    )

    if inner_border and size >= 96:
        m = max(2, int(size * 0.04))
        draw.rounded_rectangle(
            [(m, m), (size - 1 - m, size - 1 - m)],
            radius=max(1, radius - m),
            outline=(*PAPER, 70),
            width=max(2, int(size * 0.02)),
        )

    # Baseline math: CJK glyphs sit slightly above the optical center.
    font = ImageFont.truetype(font_path, int(size * 0.66))
    y = size * 0.53
    draw.text((size / 2, y), "慧", font=font, fill=PAPER, anchor="mm")
    return img


def main() -> None:
    font_path = find_font()
    print(f"font: {font_path}")

    # ICO with common sizes (favicon.ico)
    ico_sizes = [16, 32, 48]
    ico_images = [draw_icon(s, font_path, inner_border=False) for s in ico_sizes]

    img = ico_images[0]
    first = img.convert("RGBA")
    first.save(PUBLIC / "favicon.ico", format="ICO", append_images=[i.convert("RGBA") for i in ico_images[1:]])
    print(f"wrote favicon.ico ({ico_sizes})")

    # PNG set
    for size in (32, 180, 192, 512):
        path = PUBLIC / f"favicon-{size}x{size}.png"
        if size == 180:
            path = PUBLIC / "apple-touch-icon.png"
        draw_icon(size, font_path).save(path)
        print(f"wrote {path.name} ({size}x{size})")


if __name__ == "__main__":
    sys.exit(main())
