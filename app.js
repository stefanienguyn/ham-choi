/*
 * Field Notes map logic.
 *
 * The two tile URLs are intentionally kept here, near the top, so they are
 * easy to change later. They do not require an API key.
 */
const LIGHT_TILES = "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png";
const DARK_TILES = "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png";
const TILE_OPTIONS = {
  attribution: "&copy; OpenStreetMap contributors, &copy; CARTO",
  maxZoom: 19,
  minZoom: 2,
  subdomains: "abcd"
};

const map = L.map("map", {
  // Latitude-only bounds preserve the horizontal repetition of the world.
  maxBounds: [[-85, -Infinity], [85, Infinity]],
  maxBoundsViscosity: 1.0,
  minZoom: 2,
  worldCopyJump: true,
  zoomControl: false
}).setView([10.7737, 106.7166], 8);

L.control.zoom({ position: "bottomright" }).addTo(map);

let activeTileLayer = null;
let themeOverride = null;
let activePlaceIndex = -1;
let activePlace = null;
let activePhotos = [];
let activePhotoIndex = 0;

const markerLayers = [];
const placePanel = document.querySelector(".place-panel");
const placeTitle = document.querySelector("#place-title");
const placeMeta = document.querySelector("#place-meta");
const placeSummary = document.querySelector("#place-summary");
const photoDays = document.querySelector("#photo-days");
const viewAllButton = document.querySelector(".view-all");
const noteView = document.querySelector(".note-view");
const noteImage = document.querySelector("#note-image");
const noteDate = document.querySelector("#note-date");
const noteTitle = document.querySelector("#note-title");
const noteBody = document.querySelector("#note-body");
const gallery = document.querySelector(".gallery");
const galleryGrid = document.querySelector("#gallery-grid");
const galleryTitle = document.querySelector("#gallery-title");
const galleryMeta = document.querySelector("#gallery-meta");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxMissing = document.querySelector(".lightbox-missing");
const lightboxDate = document.querySelector("#lightbox-date");
const lightboxCaption = document.querySelector("#lightbox-caption");
const themeToggle = document.querySelector(".theme-toggle");

function activeThemeIsDark() {
  return themeOverride === "dark";
}

function swapTileLayer() {
  if (activeTileLayer) {
    map.removeLayer(activeTileLayer);
  }

  activeTileLayer = L.tileLayer(activeThemeIsDark() ? DARK_TILES : LIGHT_TILES, TILE_OPTIONS);
  activeTileLayer.addTo(map);
}

function formatDate(dateString) {
  if (!dateString) return "Date unknown";

  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function getPhotoDays(place) {
  // One row per date: days stack newest-first, while photos within a day
  // keep the hand-arranged order they have in data.js.
  const days = [];
  const byDate = new Map();
  (Array.isArray(place.photos) ? place.photos : []).forEach((photo) => {
    const key = photo.date || "";
    if (!byDate.has(key)) {
      const day = { date: key, photos: [] };
      byDate.set(key, day);
      days.push(day);
    }
    byDate.get(key).photos.push(photo);
  });
  days.sort((a, b) => b.date.localeCompare(a.date));
  return days;
}

function getDateRange(photos) {
  const dates = photos.map((photo) => photo.date).filter(Boolean).sort();
  if (!dates.length) return "No dates yet";
  if (dates.length === 1) return formatDate(dates[0]);

  return `${formatDate(dates[dates.length - 1])} — ${formatDate(dates[0])}`;
}

function closePanel() {
  placePanel.classList.remove("is-open");
  placePanel.setAttribute("aria-hidden", "true");
  if (activePlaceIndex >= 0 && markerLayers[activePlaceIndex]) {
    markerLayers[activePlaceIndex].dot.getElement()?.classList.remove("is-active");
  }
  activePlaceIndex = -1;
  activePlace = null;
}

function panToMarker(marker) {
  const panelOffset = window.innerWidth <= 767 ? [0, -window.innerHeight * 0.18] : [-210, 0];
  const target = marker.getLatLng();
  map.panTo([target.lat, target.lng], { animate: true, duration: 0.55, offset: panelOffset });
}

function renderPhoto(photo, index, showDate = true) {
  const entry = document.createElement("article");
  entry.className = "photo-entry";
  // Cap the stagger so late photos in a big gallery don't wait seconds to appear.
  entry.style.setProperty("--photo-index", Math.min(index, 8));

  const imageWrap = document.createElement("div");
  imageWrap.className = "photo-image-wrap";

  const image = document.createElement("img");
  image.alt = photo.caption || `Travel photograph ${index + 1}`;
  image.loading = "lazy";
  image.src = photo.src || "";
  image.addEventListener("error", () => image.classList.add("is-missing"));
  image.addEventListener("click", () => openLightbox(index));
  image.tabIndex = 0;
  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(index);
    }
  });
  imageWrap.append(image);

  const details = document.createElement("div");
  details.className = "photo-details";
  details.innerHTML = `
    ${showDate ? `<p class="photo-date">${formatDate(photo.date)}</p>` : ""}
    ${photo.caption ? `<p class="photo-caption">${escapeHtml(photo.caption)}</p>` : ""}
  `;

  // A photo with a note gets a link that opens the full-window reading page.
  if (photo.note) {
    const noteLink = document.createElement("button");
    noteLink.type = "button";
    noteLink.className = "note-link";
    noteLink.textContent = "— read the note";
    noteLink.addEventListener("click", () => openNote(photo));
    details.append(noteLink);
  }

  entry.append(imageWrap, details);
  return entry;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function openPanel(place, index, marker) {
  if (activePlaceIndex >= 0 && markerLayers[activePlaceIndex]) {
    markerLayers[activePlaceIndex].dot.getElement()?.classList.remove("is-active");
  }

  activePlace = place;
  activePlaceIndex = index;
  const days = getPhotoDays(place);
  activePhotos = days.flatMap((day) => day.photos);
  marker.getElement()?.classList.add("is-active");

  placeTitle.textContent = place.name || "Unnamed place";
  placeMeta.textContent = `${activePhotos.length} ${activePhotos.length === 1 ? "photograph" : "photographs"}`;
  placeSummary.textContent = getDateRange(activePhotos);
  photoDays.replaceChildren();

  if (!activePhotos.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "No photographs have been added here yet.";
    photoDays.append(emptyState);
  } else {
    let startIndex = 0;
    days.forEach((day) => {
      photoDays.append(renderDaySection(day, startIndex));
      startIndex += day.photos.length;
    });
  }

  viewAllButton.hidden = activePhotos.length < 2;
  placePanel.classList.add("is-open");
  placePanel.setAttribute("aria-hidden", "false");
  panToMarker(marker);
}

function renderDaySection(day, startIndex) {
  const section = document.createElement("section");
  section.className = "photo-day";

  const header = document.createElement("div");
  header.className = "photo-day-header";
  const label = document.createElement("p");
  label.className = "photo-date";
  label.textContent = formatDate(day.date);
  header.append(label);

  const strip = document.createElement("div");
  strip.className = "photo-strip";
  day.photos.forEach((photo, offset) => strip.append(renderPhoto(photo, startIndex + offset, false)));

  if (day.photos.length > 1) {
    const nav = document.createElement("div");
    nav.className = "day-nav";
    const counter = document.createElement("span");
    counter.className = "strip-counter";
    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "strip-arrow";
    prev.textContent = "←";
    prev.setAttribute("aria-label", "Previous photo of this day");
    const next = document.createElement("button");
    next.type = "button";
    next.className = "strip-arrow";
    next.textContent = "→";
    next.setAttribute("aria-label", "Next photo of this day");

    // One slide's travel distance: a card plus the flex gap between cards.
    const step = () => {
      const card = strip.querySelector(".photo-entry");
      const gap = parseFloat(getComputedStyle(strip).columnGap) || 0;
      return card ? card.offsetWidth + gap : strip.clientWidth;
    };
    const update = () => {
      // step() is 0 while the strip is still detached from the page.
      const size = step();
      const position = size > 0 ? Math.min(day.photos.length - 1, Math.max(0, Math.round(strip.scrollLeft / size))) : 0;
      counter.textContent = `${position + 1} / ${day.photos.length}`;
      prev.disabled = position <= 0;
      next.disabled = position >= day.photos.length - 1;
    };
    prev.addEventListener("click", () => strip.scrollBy({ left: -step(), behavior: "smooth" }));
    next.addEventListener("click", () => strip.scrollBy({ left: step(), behavior: "smooth" }));
    strip.addEventListener("scroll", update, { passive: true });
    update();
    nav.append(counter, prev, next);
    header.append(nav);
  }

  section.append(header, strip);
  return section;
}

function openGallery() {
  if (!activePhotos.length) return;

  galleryTitle.textContent = activePlace?.name || "Unnamed place";
  galleryMeta.textContent = `${activePhotos.length} ${activePhotos.length === 1 ? "photograph" : "photographs"} · ${getDateRange(activePhotos)}`;
  galleryGrid.replaceChildren();
  activePhotos.forEach((photo, photoIndex) => galleryGrid.append(renderPhoto(photo, photoIndex)));
  gallery.classList.add("is-open");
  gallery.setAttribute("aria-hidden", "false");
}

function closeGallery() {
  gallery.classList.remove("is-open");
  gallery.setAttribute("aria-hidden", "true");
}

function openNote(photo) {
  noteImage.src = photo.src || "";
  noteImage.alt = photo.caption || "Travel photograph";
  noteDate.textContent = [formatDate(photo.date), activePlace?.name].filter(Boolean).join(" · ");
  noteTitle.textContent = photo.caption || "Untitled";
  noteBody.replaceChildren();
  // Blank lines in the note become paragraph breaks.
  String(photo.note || "")
    .trim()
    .split(/\n\s*\n/)
    .forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      noteBody.append(p);
    });
  noteView.scrollTo({ top: 0 });
  noteView.classList.add("is-open");
  noteView.setAttribute("aria-hidden", "false");
}

function closeNote() {
  noteView.classList.remove("is-open");
  noteView.setAttribute("aria-hidden", "true");
}

function openLightbox(index) {
  if (!activePhotos.length) return;

  activePhotoIndex = index;
  const photo = activePhotos[activePhotoIndex];
  lightboxImage.classList.remove("is-missing");
  lightboxMissing.hidden = true;
  lightboxImage.src = photo.src || "";
  lightboxImage.alt = photo.caption || `Travel photograph ${activePhotoIndex + 1}`;
  lightboxDate.textContent = formatDate(photo.date);
  lightboxCaption.textContent = photo.caption || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  updateLightboxButtons();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  lightboxImage.removeAttribute("src");
}

function updateLightboxButtons() {
  document.querySelector(".lightbox-prev").disabled = activePhotoIndex <= 0;
  document.querySelector(".lightbox-next").disabled = activePhotoIndex >= activePhotos.length - 1;
}

function moveLightbox(direction) {
  const nextIndex = activePhotoIndex + direction;
  if (nextIndex >= 0 && nextIndex < activePhotos.length) openLightbox(nextIndex);
}

function addMarkers() {
  places.forEach((place, index) => {
    if (
      !Array.isArray(place.coords) ||
      place.coords.length < 2 ||
      !Number.isFinite(Number(place.coords[0])) ||
      !Number.isFinite(Number(place.coords[1]))
    ) {
      return;
    }

    // Keep the interaction target a fixed size. The visible dot is a separate,
    // non-interactive layer so its hover animation cannot steal the pointer.
    const hoverTarget = L.circleMarker(place.coords, {
      className: "travel-marker-target",
      color: "transparent",
      fillColor: "transparent",
      fillOpacity: 0,
      opacity: 0,
      radius: 18,
      weight: 0
    }).addTo(map);

    // An optional place.icon (an emoji in data.js) replaces the dot for
    // special places. The hover scale must target the inner span: Leaflet
    // positions the outer element with its own transform, and scaling that
    // would send the icon flying, like the old SVG-dot bug.
    const dot = place.icon
      ? L.marker(place.coords, {
          icon: L.divIcon({
            className: "travel-marker-icon",
            html: `<span>${escapeHtml(place.icon)}</span>`,
            iconAnchor: [17, 17],
            iconSize: [34, 34]
          }),
          interactive: false,
          keyboard: false
        }).addTo(map)
      : L.circleMarker(place.coords, {
          className: "travel-marker",
          color: "#ffffff",
          fillColor: "#ef694f",
          fillOpacity: 1,
          interactive: false,
          radius: 8,
          weight: 3
        }).addTo(map);

    hoverTarget.bindTooltip(place.name || "Unnamed place", { direction: "right", offset: [10, -14] });
    hoverTarget.on("mouseover", () => dot.getElement()?.classList.add("is-hovered"));
    hoverTarget.on("mouseout", () => dot.getElement()?.classList.remove("is-hovered"));
    hoverTarget.on("click", (event) => {
      L.DomEvent.stopPropagation(event);
      openPanel(place, index, hoverTarget);
    });
    markerLayers[index] = { target: hoverTarget, dot };
  });
}

themeToggle.addEventListener("click", () => {
  themeOverride = activeThemeIsDark() ? "light" : "dark";
  document.documentElement.dataset.theme = themeOverride;
  themeToggle.setAttribute("aria-label", `Use ${themeOverride === "dark" ? "light" : "dark"} colour theme`);
  swapTileLayer();
});

viewAllButton.addEventListener("click", openGallery);
document.querySelector(".gallery-close").addEventListener("click", closeGallery);
document.querySelector(".note-close").addEventListener("click", closeNote);

document.querySelector(".close-panel").addEventListener("click", closePanel);
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox-prev").addEventListener("click", () => moveLightbox(-1));
document.querySelector(".lightbox-next").addEventListener("click", () => moveLightbox(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

lightboxImage.addEventListener("error", () => {
  lightboxImage.classList.add("is-missing");
  lightboxMissing.hidden = false;
});

map.on("click", closePanel);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (lightbox.classList.contains("is-open")) closeLightbox();
    else if (noteView.classList.contains("is-open")) closeNote();
    else if (gallery.classList.contains("is-open")) closeGallery();
    else closePanel();
  }
  if (lightbox.classList.contains("is-open")) {
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "ArrowRight") moveLightbox(1);
  }
});

swapTileLayer();
addMarkers();