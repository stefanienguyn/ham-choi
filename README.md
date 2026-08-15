# Ham Chơi 🛵

A personal travel photo map — *a documentary of a "ham chơi" kid*.

**Live site:** https://stefanienguyn.github.io/ham-choi/

Every dot on the map is a place I've passed through. Clicking one opens a
panel of film photos from that place, grouped by day, some with longer
notes attached. The scooter is Home: Sài Gòn, Việt Nam 🇻🇳

## How it's built

On purpose, as simply as possible:

- Vanilla HTML, CSS, and JavaScript. No framework, no build step, no npm.
- [Leaflet](https://leafletjs.com/) for the map, loaded from a CDN.
- Basemap tiles by [CARTO](https://carto.com/), map data ©
  [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.
- All content lives in one hand-editable file, `data.js`.
- Hosted on GitHub Pages straight from this repo — push to deploy.

The goal is longevity: this site should still be editable in ten years
with nothing but a text editor.

## Origin story

The first version was generated with an AI app builder on Replit. It
worked, but it came wrapped in a monorepo — package managers, TypeScript
configs, a component library, an API scaffold — none of which a static
photo map needs. Before publishing, all of that was stripped away until
only the six files above remained, and the site has been maintained by
hand from the terminal ever since. The lesson: an AI can hand you a good
starting point, but owning something for the long run means understanding
every file in it — and there's a lot less to understand when there are
only six.

## Under the hood

A few technical details, mostly learned the hard way:

- **The content model is one flat array.** Each place has `name`,
  `coords`, `photos`, and optionally `icon` (an emoji drawn instead of
  the dot). Each photo has `src`, `date`, `caption`, and optionally
  `note` (long-form writing that opens on its own reading page) and
  `spot` (the exact capture coordinates — unused by the map today,
  saved for the future).
- **Photos group into one horizontal row per day**, newest day on top.
  Within a day, photos appear in the order they're listed in `data.js` —
  arranged by hand, never auto-sorted.
- **Dates are `YYYY-MM-DD` strings** so day sorting is a plain string
  sort. No Date objects, no timezone surprises.
- **Each marker is two layers**: an invisible fixed-size hit circle that
  handles the mouse, and a visible dot (or scooter) that ignores it.
  If the visible marker itself handled hover, its own hover animation
  would move it under the cursor and flicker forever.
- **The basemap uses CARTO's `_nolabels` tiles** — raster tile labels
  can't change language, and the labelled variants mix every language
  at once.
- **Longitude is deliberately unbounded** (`maxBounds` constrains
  latitude only) so the world repeats horizontally; `worldCopyJump`
  keeps the markers working on every copy.
- **Nothing is stored anywhere** — no backend, no database, no cookies,
  no localStorage. The dark-mode toggle lasts for the visit and that's
  it.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The map |
| `about.html` | About page |
| `style.css` | All styling |
| `app.js` | Map logic |
| `data.js` | Places, photos, captions, notes — the content |
| `photos/` | The photographs |

## Photos

The photographs are mine. Please don't reuse them without asking —
say hi on Instagram instead: [@hafuong](https://www.instagram.com/_.hafuong._/)
