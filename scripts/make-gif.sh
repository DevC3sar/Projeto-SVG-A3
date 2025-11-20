#!/usr/bin/env bash
# Script to convert SVG frames in public/demo-frames/ to a demo GIF using ImageMagick
# Requires: imagemagick (convert or magick) and rsvg-convert (for SVG -> PNG) or cairosvg

set -e
FRAMES_DIR="public/demo-frames"
OUT_DIR="public"
OUT_GIF="$OUT_DIR/demo.gif"

echo "Converting SVG frames to PNG..."
mkdir -p "$OUT_DIR/tmp_frames"
i=0
for f in "$FRAMES_DIR"/*.svg; do
  i=$((i+1))
  if command -v rsvg-convert >/dev/null 2>&1; then
    rsvg-convert -w 480 -h 240 "$f" -o "$OUT_DIR/tmp_frames/frame-$i.png"
  elif command -v cairosvg >/dev/null 2>&1; then
    cairosvg "$f" -o "$OUT_DIR/tmp_frames/frame-$i.png"
  else
    echo "No SVG renderer found (rsvg-convert or cairosvg). Install one or convert manually." >&2
    exit 1
  fi
done

echo "Building animated GIF..."
if command -v magick >/dev/null 2>&1; then
  magick convert -delay 40 -loop 0 $OUT_DIR/tmp_frames/frame-*.png -coalesce "$OUT_GIF"
elif command -v convert >/dev/null 2>&1; then
  convert -delay 40 -loop 0 $OUT_DIR/tmp_frames/frame-*.png -coalesce "$OUT_GIF"
else
  echo "ImageMagick not found (convert/magick). Install it to create the GIF." >&2
  exit 1
fi

echo "GIF criado em: $OUT_GIF"
