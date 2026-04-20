# 🌿 THE VINE — Logo Assets

## Files

| File | Type | Use Case |
|---|---|---|
| **`logo-icon.svg`** | Icon mark only | Favicons, app icons, stickers, QR code centers, small spaces, watermarks |
| **`logo-horizontal.svg`** | Horizontal lockup | Nav bars, email signatures, letterhead, social media headers, business cards |
| **`logo-stacked.svg`** | Stacked lockup | Flyers, banners, yard signs, merch, splash screens, social media profiles |

---

## Color Palette

| Role | Hex | Name | Usage |
|---|---|---|---|
| **Background** | `#0a0a0f` | Near Black | Primary background. Logo is designed for dark backgrounds. |
| **Surface** | `#12121a` | Dark Surface | Card/panel backgrounds |
| **Primary** | `#5cb85c` | Vine Green | Main brand color. Leaf, stem, branches, accents |
| **Primary Light** | `#8cd98c` | Light Green | Gradient highlights |
| **Primary Dark** | `#3a8a3a` | Deep Green | Gradient shadows, hover states |
| **Accent** | `#d4a843` | Warm Amber | Tagline, accent node ("the fruit"), emphasis |
| **Text** | `#e0e0e8` | Light Gray | Primary body text |
| **Text Secondary** | `#a0a0b0` | Mid Gray | "the" prefix, secondary text |
| **Text Muted** | `#666680` | Dim Gray | Location text, metadata |
| **Border** | `#2a2a3a` | Dark Border | Card borders, dividers |

---

## Typography

| Element | Font | Weight | Style |
|---|---|---|---|
| **"the"** prefix | JetBrains Mono | 300 (Light) | Lowercase, wide letter-spacing (0.35em) |
| **"vine"** title | Space Grotesk | 700 (Bold) | Lowercase, tight letter-spacing (-0.04em), gradient fill |
| **Tagline** | Caveat | 400 (Regular) | "where you already belong", amber color |
| **Location/URL** | JetBrains Mono | 400 (Regular) | Lowercase, muted color |

### Font Loading (for web/digital use)

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&family=Caveat:wght@400;600;700&display=swap" rel="stylesheet">
```

> **Note:** SVG text elements rely on these fonts being installed or loaded. For print or contexts where fonts can't be guaranteed, convert text to outlines/paths.

---

## Design Anatomy

The logo mark is a **leaf/teardrop silhouette** containing:

1. **Leaf outline** — Gradient stroke from light green to dark green. Represents growth, life, the vine.
2. **Central stem** — Vertical line running through the center. The vine trunk. The backbone.
3. **Three branches** — Organic curves alternating left-right-left off the stem. Represent community groups, connection, the "branches" of John 15:5.
4. **Circuit traces** — Subtle right-angle lines extending from branch tips with tiny square terminal nodes. Represent the tech/code aesthetic of The Vine's audience.
5. **Junction nodes** — Small green circles where branches meet the stem. Circuit board junction points.
6. **Amber accent node** — Single warm amber dot near the base of the stem. The "fruit" of the vine. A focal point of warmth in the cool green palette.

### The Story It Tells

> Nature meets technology. Organic growth meets structured code. A vine growing through a circuit board. That's The Vine — faith rooted in ancient truth, expressed through modern culture.

---

## Usage Rules

### ✅ DO

- Use on dark backgrounds (`#0a0a0f` or darker)
- Maintain the aspect ratio — never stretch or distort
- Keep clear space around the logo (minimum: 1× the icon height on all sides)
- Use the icon-only version at small sizes (below 80px wide)
- Use the stacked version for large-format print (banners, posters)
- Use the horizontal version for inline/header contexts

### ❌ DON'T

- Place on light, pastel, or white backgrounds (the glow effects disappear and the aesthetic breaks)
- Add drop shadows, outlines, or effects beyond what's built into the SVG
- Change the colors (unless creating an approved monochrome/white version for specific media)
- Rotate, skew, or warp the logo
- Use the stacked version at tiny sizes (the text becomes illegible)
- Add clip art, crosses, doves, or other religious iconography to the logo
- Use the logo with non-brand fonts

### Monochrome / Single-Color Versions

For contexts requiring single-color output (screen printing, laser engraving, etc.):

- **White on dark:** Replace all green strokes/fills with `#ffffff`. Remove gradients and glow filters. Keep amber node as white or remove it.
- **Green on dark:** Use `#5cb85c` flat for all elements. Remove gradients and glow filters.
- **Black on light (emergency only):** Replace all strokes/fills with `#1a1a1a`. This should be avoided but is acceptable for newspaper print or fax.

---

## Print Specifications

| Format | Recommended File |
|---|---|
| **Business cards** | `logo-horizontal.svg` (front) or `logo-icon.svg` (back) |
| **Flyers (8.5×11)** | `logo-stacked.svg` (header) |
| **Yard signs** | `logo-stacked.svg` (simplified — remove circuit traces at distance) |
| **Banners (3×6 ft)** | `logo-stacked.svg` |
| **T-shirts** | `logo-icon.svg` (chest) + `logo-stacked.svg` (back) |
| **Stickers** | `logo-icon.svg` (die-cut circle/leaf shape) |
| **Car magnets** | `logo-horizontal.svg` |
| **Social media avatar** | `logo-icon.svg` |
| **Social media header** | `logo-horizontal.svg` |
| **Email signature** | `logo-horizontal.svg` (scaled to ~300px wide) |

> For print, export SVGs at 300 DPI minimum. For large format (banners, signs), 150 DPI is acceptable.

---

## Social Media PNG Assets

Pre-rendered PNG files are available in the `social/` directory, sized to each platform's exact specifications. All images use the near-black background (`#0a0a0f`) with the logo centered.

### 📘 Facebook

| File | Dimensions | Use |
|---|---|---|
| `social/facebook/fb-profile-180x180.png` | 180×180 | Profile picture |
| `social/facebook/fb-cover-820x312.png` | 820×312 | Page cover photo |
| `social/facebook/fb-post-1200x630.png` | 1200×630 | Link share / post image |
| `social/facebook/fb-post-square-1080x1080.png` | 1080×1080 | Square post image |

### 📸 Instagram

| File | Dimensions | Use |
|---|---|---|
| `social/instagram/ig-profile-320x320.png` | 320×320 | Profile picture |
| `social/instagram/ig-post-1080x1080.png` | 1080×1080 | Square feed post |
| `social/instagram/ig-post-landscape-1080x566.png` | 1080×566 | Landscape feed post |
| `social/instagram/ig-post-portrait-1080x1350.png` | 1080×1350 | Portrait feed post |
| `social/instagram/ig-story-1080x1920.png` | 1080×1920 | Story / Reel cover |

### 📺 YouTube

| File | Dimensions | Use |
|---|---|---|
| `social/youtube/yt-profile-800x800.png` | 800×800 | Channel profile picture |
| `social/youtube/yt-banner-2560x1440.png` | 2560×1440 | Channel banner / art |
| `social/youtube/yt-thumbnail-1280x720.png` | 1280×720 | Video thumbnail |

### 🐦 X / Twitter

| File | Dimensions | Use |
|---|---|---|
| `social/x-twitter/x-profile-400x400.png` | 400×400 | Profile picture |
| `social/x-twitter/x-header-1500x500.png` | 1500×500 | Profile header / banner |
| `social/x-twitter/x-post-1600x900.png` | 1600×900 | Post image |

### 💼 LinkedIn

| File | Dimensions | Use |
|---|---|---|
| `social/linkedin/li-profile-400x400.png` | 400×400 | Profile / company picture |
| `social/linkedin/li-cover-1128x191.png` | 1128×191 | Company page cover |
| `social/linkedin/li-post-1200x627.png` | 1200×627 | Post / article image |

### 🌐 General Purpose

| File | Dimensions | Use |
|---|---|---|
| `social/general/favicon-16x16.png` | 16×16 | Browser favicon (tab) |
| `social/general/favicon-32x32.png` | 32×32 | Browser favicon (bookmark) |
| `social/general/favicon-48x48.png` | 48×48 | Browser favicon (desktop shortcut) |
| `social/general/apple-touch-icon-180x180.png` | 180×180 | Apple touch icon (iOS home screen) |
| `social/general/icon-192x192.png` | 192×192 | Android / PWA icon |
| `social/general/icon-512x512.png` | 512×512 | Android / PWA splash icon |
| `social/general/icon-1024x1024.png` | 1024×1024 | High-res general use |
| `social/general/og-image-1200x630.png` | 1200×630 | Open Graph / link preview |

### Regenerating PNGs

If the source SVGs are updated, regenerate all PNGs by running:

```bash
bash logo/generate-social-pngs.sh
```

Requires ImageMagick 7+ (`magick` command).

---

## Quick Reference

```
Brand:     The Vine
Tagline:   Where You Already Belong
Location:  Athens, Tennessee
Website:   thevineathens.church
Scripture: John 15:5

Primary:   #5cb85c (vine green)
Accent:    #d4a843 (warm amber)
Background:#0a0a0f (near black)

Fonts:     Space Grotesk, JetBrains Mono, Caveat
```

---

*Designed for The Vine Church — Athens, TN*
*hello@thevineathens.church*