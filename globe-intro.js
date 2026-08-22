/*
 * Ham Chơi globe intro.
 *
 * A globe spins toward home, dives right down to it, then flattens into a
 * map underneath you (orthographic → equirectangular, adapted from a
 * React/d3 component) and fades into the real Leaflet map, which also
 * opens centred on home.
 *
 * The intro is pure decoration: clicking skips it, reduced-motion visitors
 * never see it, and if anything is missing (d3, the world data) the overlay
 * removes itself so the map is always reachable.
 */
(function () {
  const intro = document.querySelector(".globe-intro");
  if (!intro) return;

  // Declared before removeIntro, which the early guards below call.
  let rafId = 0;
  let finished = false;

  const removeIntro = () => {
    cancelAnimationFrame(rafId);
    intro.remove();
  };

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    typeof d3 === "undefined" ||
    typeof topojson === "undefined" ||
    typeof worldTopo === "undefined" ||
    typeof places === "undefined"
  ) {
    removeIntro();
    return;
  }

  // The drawing surface fills the screen: the viewBox height follows the
  // window's shape, so nothing is letterboxed and the flattened map covers
  // the whole viewport before the fade.
  const WIDTH = 800;
  const HEIGHT = Math.round(WIDTH * (window.innerHeight / Math.max(1, window.innerWidth)));
  // On phones the 800-unit viewBox maps to a narrow screen, halving the
  // rendered size of everything; dots and labels compensate (the label
  // font itself is bumped in style.css, so the overlap-check numbers here
  // must describe that larger text).
  const SMALL_SCREEN = window.innerWidth < 640;
  const DOT_RADIUS = SMALL_SCREEN ? 6.5 : 3.2;
  const LABEL_CHAR_W = SMALL_SCREEN ? 12 : 6.5;
  const LABEL_H = SMALL_SCREEN ? 28 : 16;

  const SPIN_MS = 5000; // globe drifts toward home
  const DIVE_MS = 2000; // still a globe: dive down toward home
  const UNROLL_MS = 900; // flattens under you — the zoom carries on through it
  const FADE_MS = 650; // keep in sync with the .globe-intro CSS transition
  const START_TILT = -14; // slight downward tilt while in globe form

  // Whole-globe radius, sized to the screen's shape: tall phone screens are
  // width-limited, wide desktop screens height-limited. Phones start closer
  // in, so the globe isn't a small disc adrift in a tall window.
  const START_SCALE = Math.round(
    Math.min((SMALL_SCREEN ? 0.345 : 0.3) * HEIGHT, (SMALL_SCREEN ? 0.475 : 0.42) * WIDTH)
  );

  // Where the zoom finishes: the scale at which this drawing frames the same
  // sweep of longitude the Leaflet map opens with, so the crossfade lands on
  // a matching view. MAP_ZOOM mirrors the setView() zoom in app.js. The cap
  // stops very narrow windows from diving so far that the world-110m
  // outlines — which are coarse — turn into visible straight lines.
  const MAP_ZOOM = 8;
  const MAX_SCALE = 7000;
  const MAP_SCALE =
    (WIDTH * 256 * Math.pow(2, MAP_ZOOM)) / (2 * Math.PI * Math.max(1, window.innerWidth));
  const END_SCALE = Math.round(Math.min(MAP_SCALE, MAX_SCALE));

  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  // Blends two raw projections; alpha(0) is the globe, alpha(1) the map.
  function interpolateProjection(raw0, raw1) {
    const mutate = d3.geoProjectionMutator((t) => (x, y) => {
      const [x0, y0] = raw0(x, y);
      const [x1, y1] = raw1(x, y);
      return [x0 + t * (x1 - x0), y0 + t * (y1 - y0)];
    });
    let t = 0;
    return Object.assign(mutate(t), {
      alpha(value) {
        return arguments.length ? mutate((t = +value)) : t;
      }
    });
  }

  // A broken or partly-loaded library must never leave the overlay stuck
  // over the map, so all library calls happen under a try.
  let countries;
  let graticule;
  let projection;
  try {
    countries = topojson.feature(worldTopo, worldTopo.objects.countries);
    graticule = d3.geoGraticule()();
    projection = interpolateProjection(d3.geoOrthographicRaw, d3.geoEquirectangularRaw);
  } catch (error) {
    removeIntro();
    return;
  }
  // My visited places ride along on the globe. GeoJSON wants [lng, lat],
  // the reverse of the [lat, lng] pairs in data.js.
  const validPlaces = places.filter(
    (place) =>
      Array.isArray(place.coords) &&
      Number.isFinite(Number(place.coords[0])) &&
      Number.isFinite(Number(place.coords[1]))
  );
  const lonlatOf = (place) => [Number(place.coords[1]), Number(place.coords[0])];
  // Places with an icon (Home's scooter) get that emoji instead of a dot,
  // matching the main map's markers.
  const dots = {
    type: "MultiPoint",
    coordinates: validPlaces.filter((place) => !place.icon).map(lonlatOf)
  };

  // Start the globe centred near Home (the place with an icon), like the map.
  const home = places.find((place) => place.icon) || places[0] || {};
  const homeLng =
    Array.isArray(home.coords) && Number.isFinite(Number(home.coords[1])) ? Number(home.coords[1]) : 0;
  const homeLat =
    Array.isArray(home.coords) && Number.isFinite(Number(home.coords[0])) ? Number(home.coords[0]) : 0;

  const graticulePath = intro.querySelector(".globe-graticule");
  const countriesPath = intro.querySelector(".globe-countries");
  const spherePath = intro.querySelector(".globe-sphere");
  const dotsPath = intro.querySelector(".globe-dots");

  const svg = intro.querySelector("svg");
  // Match the drawing to the window's shape (see WIDTH/HEIGHT above).
  svg.setAttribute("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);

  const SVG_NS = "http://www.w3.org/2000/svg";
  const ICON_SIZE = SMALL_SCREEN ? 26 : 14;

  // Emoji markers for icon places, centred on their spot.
  const icons = validPlaces
    .filter((place) => place.icon)
    .map((place) => {
      const el = document.createElementNS(SVG_NS, "text");
      el.setAttribute("class", "globe-icon");
      el.setAttribute("font-size", ICON_SIZE);
      el.setAttribute("text-anchor", "middle");
      el.setAttribute("dominant-baseline", "central");
      el.textContent = place.icon;
      svg.append(el);
      return { el, lonlat: lonlatOf(place) };
    });

  // One name tag per place, positioned every frame next to its marker.
  const labels = validPlaces
    .filter((place) => place.name)
    .map((place) => {
      const el = document.createElementNS(SVG_NS, "text");
      el.setAttribute("class", "globe-label");
      el.textContent = place.name;
      svg.append(el);
      return {
        el,
        lonlat: lonlatOf(place),
        // Rough text width for the overlap check below, and how far the
        // tag sits from its marker (an emoji is wider than a dot).
        width: String(place.name).length * LABEL_CHAR_W + 10,
        gap: place.icon ? ICON_SIZE * 0.6 + 4 : 8
      };
    });

  // Screen position of a place, or null when it is hidden: on the far side
  // of the view (with a margin, so nothing dangles right on the edge of the
  // disc) or outside the drawing.
  const visiblePoint = (lonlat, lambda, phi) => {
    if (d3.geoDistance(lonlat, [-lambda, -phi]) > 1.45) return null;
    const point = projection(lonlat);
    const inside =
      Boolean(point) &&
      Number.isFinite(point[0]) &&
      Number.isFinite(point[1]) &&
      point[0] > -40 &&
      point[0] < WIDTH + 40 &&
      point[1] > -40 &&
      point[1] < HEIGHT + 40;
    return inside ? point : null;
  };

  const updateLabels = (lambda, phi) => {
    icons.forEach((icon) => {
      const point = visiblePoint(icon.lonlat, lambda, phi);
      if (point) {
        icon.el.setAttribute("x", point[0]);
        icon.el.setAttribute("y", point[1]);
      }
      icon.el.style.display = point ? "" : "none";
    });

    const placed = [];
    labels.forEach((label) => {
      const point = visiblePoint(label.lonlat, lambda, phi);
      let visible = Boolean(point);
      if (visible) {
        // Tags that would run off the right edge flip to the left of their
        // marker; a tag that would overlap an already-placed one stays hidden.
        const flip = point[0] + label.gap + label.width > WIDTH - 8;
        const box = {
          x: flip ? point[0] - label.gap - label.width : point[0] + label.gap,
          y: point[1] - LABEL_H * 0.75,
          w: label.width,
          h: LABEL_H
        };
        const overlaps = placed.some(
          (b) => box.x < b.x + b.w && b.x < box.x + box.w && box.y < b.y + b.h && b.y < box.y + box.h
        );
        if (overlaps) {
          visible = false;
        } else {
          placed.push(box);
          label.el.setAttribute("x", flip ? point[0] - label.gap : point[0] + label.gap);
          label.el.setAttribute("y", point[1] + 4);
          label.el.setAttribute("text-anchor", flip ? "end" : "start");
        }
      }
      label.el.style.display = visible ? "" : "none";
    });
  };

  const setPath = (element, d) => {
    element.setAttribute("d", d && !d.includes("NaN") ? d : "");
  };

  const render = (alpha, lambda, phi, scale) => {
    projection
      .scale(scale)
      .translate([WIDTH / 2, HEIGHT / 2])
      .rotate([lambda, phi])
      // Only ever show the hemisphere around home (otherwise the far side
      // draws mirrored on top of it). The view stays zoomed right through
      // the flattening, so the 90° cap edge never comes on screen.
      .clipAngle(90)
      .precision(0.3);
    projection.alpha(alpha);
    const geoPath = d3.geoPath(projection).pointRadius(DOT_RADIUS);
    setPath(graticulePath, geoPath(graticule));
    setPath(countriesPath, geoPath(countries));
    setPath(spherePath, geoPath({ type: "Sphere" }));
    setPath(dotsPath, geoPath(dots));
    updateLabels(lambda, phi);
  };

  // Starts the fade but lets the animation keep running underneath it, so
  // the flattening and the crossfade to the real map overlap into one
  // continuous motion. removeIntro stops the frame loop at the end.
  const finish = () => {
    if (finished) return;
    finished = true;
    intro.classList.add("is-done");
    setTimeout(removeIntro, FADE_MS + 60);
  };

  const TOTAL_MS = SPIN_MS + DIVE_MS + UNROLL_MS;
  const start = performance.now();
  const frame = (now) => {
    try {
      const elapsed = now - start;
      if (elapsed < SPIN_MS) {
        // Slow drift eastward toward home. The 60° arc keeps the same
        // rotation speed the shorter spin had.
        const t = elapsed / SPIN_MS;
        render(0, -homeLng - 60 * (1 - t), START_TILT, START_SCALE);
      } else if (elapsed < TOTAL_MS) {
        // One unbroken push from the whole globe down to the map's own
        // zoom. The flattening happens over the tail of that push rather
        // than after it, so the zoom never stalls between the two.
        const z = easeInOut((elapsed - SPIN_MS) / (DIVE_MS + UNROLL_MS));
        const scale = START_SCALE * Math.pow(END_SCALE / START_SCALE, z);
        // Tilt finishes bringing home to the centre as the flattening starts.
        const tilt = START_TILT + (-homeLat - START_TILT) * easeInOut(Math.min(1, (elapsed - SPIN_MS) / DIVE_MS));
        // Curvature only eases away over the last stretch; the fade begins
        // partway through that, dissolving straight into the real map.
        const f = Math.max(0, elapsed - SPIN_MS - DIVE_MS) / UNROLL_MS;
        render(Math.sqrt(easeInOut(f)), -homeLng, tilt, scale);
        if (f >= 0.4) finish();
      } else {
        render(1, -homeLng, -homeLat, END_SCALE);
        finish();
        return;
      }
      rafId = requestAnimationFrame(frame);
    } catch (error) {
      removeIntro();
    }
  };

  try {
    render(0, -homeLng - 60, START_TILT, START_SCALE);
  } catch (error) {
    removeIntro();
    return;
  }

  intro.addEventListener("click", finish);
  rafId = requestAnimationFrame(frame);
})();
