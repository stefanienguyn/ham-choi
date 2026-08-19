/*
 * Ham Chơi globe intro.
 *
 * A wireframe globe spins briefly, unrolls into a flat world map
 * (orthographic → equirectangular, adapted from a React/d3 component),
 * then fades away to reveal the real Leaflet map underneath.
 *
 * The intro is pure decoration: clicking skips it, reduced-motion visitors
 * never see it, and if anything is missing (d3, the world data) the overlay
 * removes itself so the map is always reachable.
 */
(function () {
  const intro = document.querySelector(".globe-intro");
  if (!intro) return;

  const removeIntro = () => intro.remove();

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

  const WIDTH = 800;
  const HEIGHT = 500;
  const SPIN_MS = 3000; // globe drifts toward home, pushing in slightly
  const UNROLL_MS = 1900; // globe → flat map
  const ZOOM_MS = 1500; // flat map → diving down toward home
  const FADE_MS = 650; // keep in sync with the .globe-intro CSS transition
  const START_TILT = -14; // slight downward tilt while in globe form
  const ZOOM_FACTOR = 10; // how far the final dive magnifies the flat map

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

  // One name tag per place, positioned every frame next to its dot.
  const svg = intro.querySelector("svg");
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
        width: String(place.name).length * 6.5 + 10
      };
    });

  const updateLabels = (alpha, lambda, phi) => {
    const placed = [];
    labels.forEach((label) => {
      // While still a globe, hide tags on the far side (with a margin, so
      // none dangle right on the edge of the disc).
      const onBack = alpha < 0.15 && d3.geoDistance(label.lonlat, [-lambda, -phi]) > 1.45;
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
        // Tags near the right edge flip to the left of their dot; a tag
        // that would overlap an already-placed one stays hidden.
        const flip = point[0] > WIDTH - 110;
        const box = {
          x: flip ? point[0] - 8 - label.width : point[0] + 8,
          y: point[1] - 12,
          w: label.width,
          h: 16
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

  const render = (alpha, lambda, phi, scale, centerU) => {
    projection
      .scale(scale)
      .translate([WIDTH / 2, HEIGHT / 2])
      .rotate([lambda, phi])
      // Show only the front hemisphere while it is still a globe (otherwise
      // the far side draws mirrored on top). Once the unroll is properly
      // underway the whole world has to be visible; an interpolated clip
      // angle strokes its own rim across the map, so switch, not blend.
      .clipAngle(alpha < 0.15 ? 90 : null)
      .precision(0.3);
    projection.alpha(alpha);
    // During the final dive, pull the map across so home ends dead centre.
    if (centerU > 0) {
      const homePoint = projection([homeLng, homeLat]);
      if (homePoint && Number.isFinite(homePoint[0]) && Number.isFinite(homePoint[1])) {
        projection.translate([
          WIDTH / 2 + (WIDTH / 2 - homePoint[0]) * centerU,
          HEIGHT / 2 + (HEIGHT / 2 - homePoint[1]) * centerU
        ]);
      }
    }
    const geoPath = d3.geoPath(projection).pointRadius(3.2);
    setPath(graticulePath, geoPath(graticule));
    setPath(countriesPath, geoPath(countries));
    setPath(spherePath, geoPath({ type: "Sphere" }));
    setPath(dotsPath, geoPath(dots));
    updateLabels(alpha, lambda, phi);
  };

  let rafId = 0;
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(rafId);
    intro.classList.add("is-done");
    setTimeout(removeIntro, FADE_MS + 60);
  };

  const start = performance.now();
  const frame = (now) => {
    try {
      const elapsed = now - start;
      if (elapsed < SPIN_MS) {
        // Slow drift eastward toward home, pushing in a little. The 36°
        // arc keeps the same rotation speed the shorter spin had.
        const t = elapsed / SPIN_MS;
        render(0, -homeLng - 36 * (1 - t), START_TILT, 205 + 30 * easeInOut(t), 0);
      } else if (elapsed < SPIN_MS + UNROLL_MS) {
        const t = (elapsed - SPIN_MS) / UNROLL_MS;
        const eased = easeInOut(t);
        // sqrt makes the unroll start briskly and settle gently, as in the
        // original component; rotation eases back to a north-up world map.
        const alpha = Math.sqrt(eased);
        render(alpha, -homeLng * (1 - eased), START_TILT * (1 - eased), 235 - 115 * alpha, 0);
      } else if (elapsed < SPIN_MS + UNROLL_MS + ZOOM_MS) {
        // Dive from the whole world down toward home, then hand the same
        // view over to the real map (which also starts centred on home).
        const t = (elapsed - SPIN_MS - UNROLL_MS) / ZOOM_MS;
        const eased = easeInOut(t);
        render(1, 0, 0, 120 * Math.pow(ZOOM_FACTOR, eased), eased);
      } else {
        render(1, 0, 0, 120 * ZOOM_FACTOR, 1);
        finish();
        return;
      }
      rafId = requestAnimationFrame(frame);
    } catch (error) {
      removeIntro();
    }
  };

  try {
    render(0, -homeLng - 36, START_TILT, 205, 0);
  } catch (error) {
    removeIntro();
    return;
  }

  intro.addEventListener("click", finish);
  rafId = requestAnimationFrame(frame);
})();
