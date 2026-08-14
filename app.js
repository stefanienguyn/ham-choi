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
}).setView([20, 0], 2);

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
const photoList = document.querySelector("#photo-list");
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

function getSortedPhotos(place) {
  return Array.isArray(place.photos)
    ? place.photos
        .map((photo, originalIndex) => ({ ...photo, originalIndex }))
        .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    : [];
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

function renderPhoto(photo, index) {
  const entry = document.createElement("article");
  entry.className = "photo-entry";
  entry.style.setProperty("--photo-index", index);

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
    <p class="photo-date">${formatDate(photo.date)}</p>
    <p class="photo-caption">${escapeHtml(photo.caption || "No caption yet")}</p>
  `;

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
  activePhotos = getSortedPhotos(place);
  marker.getElement()?.classList.add("is-active");

  placeTitle.textContent = place.name || "Unnamed place";
  placeMeta.textContent = `${activePhotos.length} ${activePhotos.length === 1 ? "photograph" : "photographs"}`;
  placeSummary.textContent = getDateRange(activePhotos);
  photoList.replaceChildren();

  if (!activePhotos.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "No photographs have been added here yet.";
    photoList.append(emptyState);
  } else {
    activePhotos.forEach((photo, photoIndex) => photoList.append(renderPhoto(photo, photoIndex)));
  }

  placePanel.classList.add("is-open");
  placePanel.setAttribute("aria-hidden", "false");
  panToMarker(marker);
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
  lightboxCaption.textContent = photo.caption || "No caption yet";
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

    const dot = L.circleMarker(place.coords, {
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
    else closePanel();
  }
  if (lightbox.classList.contains("is-open")) {
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "ArrowRight") moveLightbox(1);
  }
});

swapTileLayer();
addMarkers();