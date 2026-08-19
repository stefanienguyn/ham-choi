# Travel photo map — project context

A personal travel photo map. A world map with a dot per place I've visited;
clicking a dot opens a side panel of photos for that place, newest first, each
with a date and caption. Plus an About page.

Built originally with an AI builder, now maintained by hand from the terminal.
I am not a developer. Explain changes in plain language and prefer small,
reviewable edits over refactors.

## Hard constraints — do not violate

- Vanilla HTML, CSS, and JavaScript only. No React, no Vue, no framework.
- No npm, no bundler, no build step, no package.json. Ever.
- Every file must run by being opened directly in a browser.
- Leaflet 1.9.4 and exifr load from CDN via script tags, as do d3-geo and
  topojson-client (globe intro only — the map must keep working if they
  fail to load).
- No backend, no database, no login, no localStorage.
- All CDN URLs use an explicit `https://` — never protocol-relative `//`.
  I open these files from the local filesystem, where `//` resolves to
  `file://` and fails silently.

The point of these constraints is longevity. I want to still be able to edit
this in ten years by opening a text editor. Do not suggest a framework, a
build tool, or a dependency manager, even if it would be cleaner.

## Files

- `index.html` — the map
- `about.html` — about page
- `style.css` — shared styling
- `data.js` — all my content (I edit this by hand)
- `app.js` — map logic
- `globe-intro.js` — opening globe-unroll animation; removes itself, never
  required for the map to work
- `world-110m.js` — country outline data for the globe intro (generated,
  don't edit)
- `photos/` — my images
- `admin.html` — private local tool, gitignored, NEVER deployed
- `globe-to-map-transform/` — reference-only React component the globe intro
  was adapted from, gitignored, never deployed

## The data contract

`data.js` holds a flat `places` array. Do not restructure it, normalise it,
split it into multiple files, or convert it to JSON. Keeping it boring is what
makes it hand-editable.

```js
const places = [
  {
    name: "Kyoto, Japan",
    coords: [35.0116, 135.7681],
    photos: [
      { src: "photos/kyoto-01.jpg", date: "2024-11-03", caption: "..." }
    ]
  }
];
```

Dates are `YYYY-MM-DD` strings so day rows sort newest-first with a plain
string sort. The panel shows one horizontal photo row per date; within a
date, photos keep their hand-arranged `data.js` order and must not be
auto-sorted. Do not introduce Date objects for sorting.

## Bugs already fixed — do not regress these

These cost real time to diagnose. If you touch the relevant code, preserve
the fix.

1. **Leaflet stylesheet must load, and load before `style.css`.**
   Without it, tiles render as unpositioned inline images and the map looks
   like a scrambled collage. Symptom to watch for: no zoom controls and no
   attribution.

2. **No `noWrap` on the tile layer.**
   It leaves blank columns either side on wide screens. Tiles repeat
   horizontally; `worldCopyJump: true` keeps markers correct on each copy.
   `maxBounds` constrains latitude ONLY — constraining longitude breaks the
   horizontal repeat.

3. **Tooltips have `pointer-events: none`.**
   Otherwise the tooltip appears under the cursor, steals hover from the
   marker, and flickers on/off in a loop.

4. **Marker hit target is a fixed-size transparent circle; the visible dot
   sits on top with `pointer-events: none`.**
   The hover target must never change size, or hover state oscillates.

5. **Any transform on the visible SVG dot needs `transform-box: fill-box`
   and `transform-origin: center`.**
   Without these, `scale()` scales around the SVG canvas origin, not the
   dot's own centre, and the dot leaps thousands of miles away on hover.

6. **Basemaps are the `_nolabels` CARTO variants.**
   The labelled versions show raw multilingual OpenStreetMap names like
   "AMÉRICA DO SUL;AMÉRICA DEL SUR". Raster tiles cannot have their label
   language changed. Do not switch back to `light_all` / `dark_all`.

7. **Light mode is the default.** Do not read `prefers-color-scheme`. The
   manual toggle switches to dark for the current visit only, unpersisted.

## Deployment

Static hosting on GitHub Pages, served from `main`, root folder. Push to
deploy; there is no build step.

- **Filenames are case-sensitive when live but not on my Mac.** A mismatch
  between `data.js` and the actual filename works locally and 404s in
  production. Keep all photo filenames lowercase.
- `admin.html` is in `.gitignore` and must stay there.
- The repo is public, so nothing private goes in this folder.

## Conventions

- Photos are resized to max 1600px on the long edge before being added.
- Photo filenames are `place-YYYY-MM-DD-01.jpg`, lowercase and hyphenated.
  The admin tool numbers within each place+date and never reuses a name
  already present in data.js. (Older files may use the short `place-01.jpg`
  form; leave them as they are.)
- Every photo `img` needs `loading="lazy"` and alt text from its caption.
- `image-orientation: from-image` on photo CSS, so phone photos aren't
  rotated.
- Handle a place with zero photos without throwing.
