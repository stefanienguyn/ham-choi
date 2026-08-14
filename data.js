/*
 * This is the only content file you need to edit for the public map.
 *
 * Each place has a name, coords [latitude, longitude], and photos.
 * Photo dates must use YYYY-MM-DD so the map can sort them correctly.
 *
 * A place can also have an optional icon, an emoji shown instead of
 * the usual dot:  icon: "🛵"
 *
 * A photo can also have an optional note — longer writing that opens
 * on its own full-window reading page. Wrap it in backticks (`)
 * instead of quotes; a blank line starts a new paragraph.
 *
 * A photo can also have an optional spot — the exact [latitude, longitude]
 * where it was taken. The map doesn't use it yet; it's kept so photos can
 * be placed precisely later.
 */
const places = [
  {
    name: "Home",
    coords: [10.7769, 106.7009],
    icon: "🛵",
    photos: []
  },
  {
    name: "Dinh Độc Lập, Sài Gòn",
    coords: [10.7737261, 106.7166008],
    photos: [
      { src: "photos/dinh1.jpg", date: "2023-10-01", caption: "Dinh with mẹ iu Kim Uyên", spot: [10.7775844066757, 106.69534501099479] }
    ]
  }
];
