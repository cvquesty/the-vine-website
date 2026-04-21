#!/usr/bin/env bash
# ============================================================================
# THE VINE — Social Media PNG Generator
# Generates platform-specific PNG assets from SVG source files
# Requires: ImageMagick 7+ (magick command)
# ============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ICON_SVG="$SCRIPT_DIR/logo-icon.svg"
HORIZ_SVG="$SCRIPT_DIR/logo-horizontal.svg"
STACK_SVG="$SCRIPT_DIR/logo-stacked.svg"

BG="#f4ede0"
DENSITY=300

SOCIAL_DIR="$SCRIPT_DIR/social"
mkdir -p "$SOCIAL_DIR"/{facebook,instagram,youtube,x-twitter,linkedin,general}

# ============================================================================
# Helper functions
# ============================================================================

# Generate a square profile image from the icon SVG
# Usage: make_profile <output_path> <size>
make_profile() {
    local out="$1" size="$2"
    echo "  → $out (${size}×${size})"
    magick -background "$BG" -density "$DENSITY" "$ICON_SVG" \
        -resize "$((size * 70 / 100))x$((size * 70 / 100))" \
        -gravity center -extent "${size}x${size}" \
        -depth 8 \
        "$out"
}

# Generate a wide banner/cover/header from the horizontal SVG
# Usage: make_banner <output_path> <width> <height>
make_banner() {
    local out="$1" w="$2" h="$3"
    echo "  → $out (${w}×${h})"
    # Calculate the max width the logo can occupy (80% of banner width)
    local logo_w=$((w * 80 / 100))
    # The horizontal SVG is 600×120, so aspect ratio is 5:1
    local logo_h=$((logo_w * 120 / 600))
    # If logo height exceeds 70% of banner height, scale down by height
    local max_h=$((h * 70 / 100))
    if [ "$logo_h" -gt "$max_h" ]; then
        logo_h=$max_h
        logo_w=$((logo_h * 600 / 120))
    fi
    magick -background "$BG" -density "$DENSITY" "$HORIZ_SVG" \
        -resize "${logo_w}x${logo_h}" \
        -gravity center -extent "${w}x${h}" \
        -depth 8 \
        "$out"
}

# Generate a square or near-square post image from the stacked SVG
# Usage: make_post <output_path> <width> <height>
make_post() {
    local out="$1" w="$2" h="$3"
    echo "  → $out (${w}×${h})"
    # The stacked SVG is 400×520
    local logo_h=$((h * 75 / 100))
    local logo_w=$((logo_h * 400 / 520))
    # If logo width exceeds 80% of post width, scale down by width
    local max_w=$((w * 80 / 100))
    if [ "$logo_w" -gt "$max_w" ]; then
        logo_w=$max_w
        logo_h=$((logo_w * 520 / 400))
    fi
    magick -background "$BG" -density "$DENSITY" "$STACK_SVG" \
        -resize "${logo_w}x${logo_h}" \
        -gravity center -extent "${w}x${h}" \
        -depth 8 \
        "$out"
}

# Generate a tall story image from the stacked SVG
# Usage: make_story <output_path> <width> <height>
make_story() {
    local out="$1" w="$2" h="$3"
    echo "  → $out (${w}×${h})"
    local logo_w=$((w * 65 / 100))
    local logo_h=$((logo_w * 520 / 400))
    magick -background "$BG" -density "$DENSITY" "$STACK_SVG" \
        -resize "${logo_w}x${logo_h}" \
        -gravity center -extent "${w}x${h}" \
        -depth 8 \
        "$out"
}

# ============================================================================
# FACEBOOK
# ============================================================================
echo ""
echo "📘 Facebook"
make_profile "$SOCIAL_DIR/facebook/fb-profile-180x180.png" 180
make_banner  "$SOCIAL_DIR/facebook/fb-cover-820x312.png" 820 312
make_post    "$SOCIAL_DIR/facebook/fb-post-1200x630.png" 1200 630
make_post    "$SOCIAL_DIR/facebook/fb-post-square-1080x1080.png" 1080 1080

# ============================================================================
# INSTAGRAM
# ============================================================================
echo ""
echo "📸 Instagram"
make_profile "$SOCIAL_DIR/instagram/ig-profile-320x320.png" 320
make_post    "$SOCIAL_DIR/instagram/ig-post-1080x1080.png" 1080 1080
make_post    "$SOCIAL_DIR/instagram/ig-post-landscape-1080x566.png" 1080 566
make_post    "$SOCIAL_DIR/instagram/ig-post-portrait-1080x1350.png" 1080 1350
make_story   "$SOCIAL_DIR/instagram/ig-story-1080x1920.png" 1080 1920

# ============================================================================
# YOUTUBE
# ============================================================================
echo ""
echo "📺 YouTube"
make_profile "$SOCIAL_DIR/youtube/yt-profile-800x800.png" 800
make_banner  "$SOCIAL_DIR/youtube/yt-banner-2560x1440.png" 2560 1440
make_post    "$SOCIAL_DIR/youtube/yt-thumbnail-1280x720.png" 1280 720

# ============================================================================
# X (TWITTER)
# ============================================================================
echo ""
echo "🐦 X / Twitter"
make_profile "$SOCIAL_DIR/x-twitter/x-profile-400x400.png" 400
make_banner  "$SOCIAL_DIR/x-twitter/x-header-1500x500.png" 1500 500
make_post    "$SOCIAL_DIR/x-twitter/x-post-1600x900.png" 1600 900

# ============================================================================
# LINKEDIN
# ============================================================================
echo ""
echo "💼 LinkedIn"
make_profile "$SOCIAL_DIR/linkedin/li-profile-400x400.png" 400
make_banner  "$SOCIAL_DIR/linkedin/li-cover-1128x191.png" 1128 191
make_post    "$SOCIAL_DIR/linkedin/li-post-1200x627.png" 1200 627

# ============================================================================
# GENERAL PURPOSE
# ============================================================================
echo ""
echo "🌐 General Purpose"

# Favicons
echo "  → Favicons"
make_profile "$SOCIAL_DIR/general/favicon-16x16.png" 16
make_profile "$SOCIAL_DIR/general/favicon-32x32.png" 32
make_profile "$SOCIAL_DIR/general/favicon-48x48.png" 48

# Apple Touch Icon
make_profile "$SOCIAL_DIR/general/apple-touch-icon-180x180.png" 180

# Android / PWA icons
make_profile "$SOCIAL_DIR/general/icon-192x192.png" 192
make_profile "$SOCIAL_DIR/general/icon-512x512.png" 512

# Open Graph / link preview
make_post "$SOCIAL_DIR/general/og-image-1200x630.png" 1200 630

# High-res icon for general use
make_profile "$SOCIAL_DIR/general/icon-1024x1024.png" 1024

echo ""
echo "✅ All social media PNGs generated in: $SOCIAL_DIR"
echo ""
echo "📊 Summary:"
find "$SOCIAL_DIR" -name "*.png" | wc -l | xargs echo "   Total PNG files:"
du -sh "$SOCIAL_DIR" | awk '{print "   Total size:", $1}'
