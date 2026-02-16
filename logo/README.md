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
| **Tagline** | Caveat | 400 (Regular) | "where misfits find family", amber color |
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

## Quick Reference

```
Brand:     The Vine
Tagline:   Where Misfits Find Family
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