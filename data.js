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
 *
 * A place can also have an optional icon, an emoji shown instead of the
 * usual dot:  icon: "🛵"
 *
 * A photo can also have an optional note — longer writing that opens on
 * its own full-window reading page. Wrap it in backticks (`) instead of
 * quotes so it can run over many lines; a blank line starts a new
 * paragraph.
 */
const places = [
  {
    name: "Home",
    coords: [10.7769, 106.7009],
    icon: "🛵",
    photos: []
  },
  {
    name: "Kyoto, Japan",
    coords: [35.0116, 135.7681],
    photos: [
      { src: "photos/kyoto-01.jpg", date: "2024-11-03", caption: "Fushimi Inari at 6am, empty" },
      {
        src: "photos/kyoto-02.jpg",
        date: "2024-11-02",
        caption: "Rainy arrival",
        note: `This is a sample note so you can see how longer writing looks. It can run as long as you want.

A blank line like the one above starts a new paragraph. Delete this whole place when you add your real photos.`
      }
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