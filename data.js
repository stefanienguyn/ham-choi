/*
 * This is the only content file you need to edit for the public map.
 *
 * To add a new place, copy one of the objects below and change:
 *   - name: the place shown in the panel and map tooltip
 *   - coords: [latitude, longitude]
 *   - photos: one or more photo objects
 *
 * Photo dates must use YYYY-MM-DD so the map can sort them correctly.
 * Keep each image inside the photos/ folder, then use a path like:
 *   { src: "photos/my-photo.jpg", date: "2025-04-12", caption: "A note about it" }
 */
const places = [
  {
    name: "Kyoto, Japan",
    coords: [35.0116, 135.7681],
    photos: [
      { src: "photos/kyoto-01.jpg", date: "2024-11-03", caption: "Fushimi Inari at 6am, empty" },
      { src: "photos/kyoto-02.jpg", date: "2024-11-02", caption: "Rainy arrival" }
    ]
  },
  {
    name: "Lisbon, Portugal",
    coords: [38.7223, -9.1393],
    photos: [
      { src: "photos/lisbon-01.jpg", date: "2023-06-18", caption: "Light on the tiled walls" },
      { src: "photos/lisbon-02.jpg", date: "2023-06-16", caption: "The long way down to the river" }
    ]
  },
  {
    name: "Valparaíso, Chile",
    coords: [-33.0472, -71.6127],
    photos: [
      { src: "photos/valparaiso-01.jpg", date: "2022-02-09", caption: "Blue hour above the port" }
    ]
  }
];