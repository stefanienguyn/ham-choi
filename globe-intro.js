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
  const SPIN_MS = 5000; // globe drifts toward home
  const GLOBE_ZOOM_MS = 2000; // still a globe: dive right down to home
  const UNROLL_MS = 900; // flattens under you, holding position over home
  const FADE_MS = 650; // keep in sync with the .globe-intro CSS transition
  const START_TILT = -14; // slight downward tilt while in globe form
  // Whole-globe radius, sized to the screen's shape: tall phone screens are
  // width-limited, wide desktop screens height-limited.
  const START_SCALE = Math.round(Math.min(0.3 * HEIGHT, 0.42 * WIDTH));
  const ZOOM_SCALE = 1800; // how close the dive gets before flattening
  // On phones the 800-unit viewBox maps to a narrow screen, halving the
  // rendered size of everything; dots and labels compensate (the label
  // font itself is bumped in style.css, so the overlap-check numbers here
  // must describe that larger text).
  const SMALL_SCREEN = window.innerWidth < 640;
  const DOT_RADIUS = SMALL_SCREEN ? 6.5 : 3.2;
  const LABEL_CHAR_W = SMALL_SCREEN ? 12 : 6.5;
  const LABEL_H = SMALL_SCREEN ? 28 : 16;

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
  const dots = {
    type: "MultiPoint",
    coordinates: validPlaces.map((place) => [Number(place.coords[1]), Number(place.coords[0])])
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

  // One name tag per place, positioned every frame next to its dot.
  const labels = validPlaces
    .filter((place) => place.name)
    .map((place) => {
      const el = document.createElementNS("http://www.w3.org/2000/svg", "text");
      el.setAttribute("class", "globe-label");
      el.textContent = place.name;
      svg.append(el);
      return {
        el,
        lonlat: [Number(place.coords[1]), Number(place.coords[0])],
        // Rough text width for the overlap check below.
        width: String(place.name).length * LABEL_CHAR_W + 10
      };
    });

  const updateLabels = (lambda, phi) => {
    const placed = [];
    labels.forEach((label) => {
      // Hide tags on the far side of the view (with a margin, so none
      // dangle right on the edge of the disc).
      const onBack = d3.geoDistance(label.lonlat, [-lambda, -phi]) > 1.45;
      const point = onBack ? null : projection(label.lonlat);
      let visible =
        Boolean(point) &&
        Number.isFinite(point[0]) &&
        Number.isFinite(point[1]) &&
        point[0] > -40 &&
        point[0] < WIDTH + 40 &&
        point[1] > 0 &&
        point[1] < HEIGHT;
      if (visible) {
        // Tags that would run off the right edge flip to the left of their
        // dot; a tag that would overlap an already-placed one stays hidden.
        const flip = point[0] + 8 + label.width > WIDTH - 8;
        const box = {
          x: flip ? point[0] - 8 - label.width : point[0] + 8,
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
          label.el.setAttribute("x", flip ? point[0] - 8 : point[0] + 8);
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

  const start = performance.now();
  const frame = (now) => {
    try {
      const elapsed = now - start;
      if (elapsed < SPIN_MS) {
        // Slow drift eastward toward home. The 60° arc keeps the same
        // rotation speed the shorter spin had.
        const t = elapsed / SPIN_MS;
        render(0, -homeLng - 60 * (1 - t), START_TILT, START_SCALE);
      } else if (elapsed < SPIN_MS + GLOBE_ZOOM_MS) {
        // Still a globe: dive right down to home, tilting so home sits
        // centred. Exponential scale keeps the deep zoom feeling steady.
        const t = (elapsed - SPIN_MS) / GLOBE_ZOOM_MS;
        const eased = easeInOut(t);
        render(
          0,
          -homeLng,
          START_TILT + (-homeLat - START_TILT) * eased,
          START_SCALE * Math.pow(ZOOM_SCALE / START_SCALE, eased)
        );
      } else if (elapsed < SPIN_MS + GLOBE_ZOOM_MS + UNROLL_MS) {
        // The globe flattens into the map underneath you: same zoom, same
        // spot over home, only the curvature eases away. The fade begins
        // partway through, so the flattening dissolves straight into the
        // real map with no pause.
        const t = (elapsed - SPIN_MS - GLOBE_ZOOM_MS) / UNROLL_MS;
        render(Math.sqrt(easeInOut(t)), -homeLng, -homeLat, ZOOM_SCALE);
        if (t >= 0.4) finish();
      } else {
        render(1, -homeLng, -homeLat, ZOOM_SCALE);
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
