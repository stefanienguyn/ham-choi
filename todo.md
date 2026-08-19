# Globe-to-map intro animation

Goal: when the map page opens, a wireframe globe (in the site's palette, with
my visited places as dots) spins briefly, unrolls into a flat world map, then
fades away to reveal the real Leaflet map. Adapted from the React/d3 component
in `globe-to-map-transform/`, rebuilt as vanilla JS. The Leaflet map and every
existing feature stay untouched.

## Plan

- [ ] Save the world outline data locally as `world-110m.js` (a `const` like
      `data.js`) so nothing is fetched at runtime and file:// keeps working.
      → verify: file loads via script tag, no fetch.
- [ ] `index.html` — add the overlay markup, plus CDN script tags for
      `d3-geo` and `topojson-client` (pinned versions, explicit https://,
      integrity hashes like the Leaflet tag), and a new `globe-intro.js`.
      → verify: page still works with scripts blocked/missing (intro just
      skips itself).
- [ ] `globe-intro.js` — the animation: short spin centred near home →
      unroll (orthographic → equirectangular, as in the component) → fade
      out and remove. Click skips. `prefers-reduced-motion: reduce` skips
      entirely. Travel dots from `data.js` ride along on the globe.
      → verify: headless-Chrome screenshots at globe / mid-unroll / after
      fade; click-skip test; no console errors.
- [ ] `style.css` — overlay styles using the existing CSS variables so both
      themes work.
- [ ] `.gitignore` — ignore the `globe-to-map-transform/` reference folder so
      the React project never gets pushed to the public repo.
- [ ] `CLAUDE.md` — add the two new files to the Files list.

## Review

All steps done and verified with headless-Chrome screenshots (globe, mid-
unroll, after fade, click-skip) — no console errors, overlay always removes
itself.

- New files: `globe-intro.js` (animation, ~150 lines), `world-110m.js`
  (generated country outlines, don't edit). New CDN tags in `index.html`:
  d3-array, d3-geo, topojson-client — pinned versions with integrity hashes,
  used only by the intro.
- The intro is decoration only: clicking skips it; reduced-motion visitors,
  missing libraries, or any runtime error skip it too (belt-and-braces: every
  library call is inside try/catch because a stuck overlay would block the
  map).
- Visited places from `data.js` are drawn as accent dots on the globe
  (GeoJSON needs [lng, lat] — reversed from data.js's [lat, lng]).
- Two bugs found during verification, both fixed: standalone d3-geo needs
  d3-array loaded first, and the globe drew its far side mirrored on top
  until a `clipAngle` was set (released once the unroll starts, since an
  interpolated clip angle strokes its own rim across the map).
- `globe-to-map-transform/` (the React reference) is now gitignored so it
  never reaches the public repo. Leaflet map, panel, gallery: untouched.

Follow-up round (same session): serif-italic name tags next to each dot,
with a paper halo, far-side hiding, and greedy overlap culling so the
Sài Gòn cluster shows one tag instead of five; a gentle push-in during
the spin; and a final dive phase — after unrolling, the flat map zooms
toward Home and hands off to Leaflet, which also opens centred on Home.

Colour round: the globe is filled like the Leaflet basemap instead of a
wireframe — warm-grey water (the sphere path, now painted first), cream
land, faint borders, dots in the markers' accent-and-white. Dark-theme
fills included for completeness, though the intro always runs in light
mode since themes reset each visit.

Final shape: spin (5s) → dive to home while still a globe (2s, exponential
scale 205→1800) → flatten in place at that zoom (0.9s, rotation pinned on
home), with the fade to Leaflet starting 40% into the flatten so the
motion and the crossfade overlap into one continuous action. The old
pull-back unroll and separate dive are gone, which let the code simplify:
no centring translate, and the 90° hemisphere clip is now permanent
because the whole world is never shown flat (this also removes the
far-side mirror flash risk entirely). finish() no longer stops the frame
loop — removeIntro does — so the animation keeps playing under the fade.
