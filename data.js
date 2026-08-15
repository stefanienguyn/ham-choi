/*
 * This is the only content file you need to edit for the public map.
 *
 * Each place has a name, coords [latitude, longitude], and photos.
 * Photos are shown one row per date, newest date on top. Within the same
 * date, photos keep the order they are listed here — rearrange these lines
 * to rearrange them. Dates use YYYY-MM-DD.
 *
 * A place can also have an optional icon, an emoji shown instead of
 * the usual dot:  icon: "🛵"
 *
 * A photo can also have an optional note — longer writing that opens
 * on its own full-window reading page. Wrap it in backticks (`)
 * instead of quotes; a blank line starts a new paragraph.
 */
const places = [
  {
    name: "Tokyo, Japan",
    coords: [35.6768601, 139.7638947],
    photos: [
      { src: "photos/tokyo-japan-2025-11-23-01.jpg", date: "2025-11-23", caption: "", spot: [35.6768601, 139.7638947] },
      { src: "photos/tokyo-japan-2025-11-23-02.jpg", date: "2025-11-23", caption: "", spot: [35.6768601, 139.7638947] }
    ]
  },
  {
    name: "Home",
    icon: "🛵",
    coords: [10.7737261, 106.7166008],
    photos: [
      { src: "photos/home-2026-01-09-01.jpg", date: "2026-01-09", caption: "đi nhậu xoq để quên xe :)", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2022-11-20-01.jpg", date: "2022-11-20", caption: "hong nhớ hồi nào nữa để đại :v", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2022-11-20-02.jpg", date: "2022-11-20", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2022-11-20-03.jpg", date: "2022-11-20", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2022-11-20-04.jpg", date: "2022-11-20", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-01-10-01.jpg", date: "2026-01-10", caption: "sân thượng nhà em", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-01-10-02.jpg", date: "2026-01-10", caption: "sân thượng nhà em", spot: [10.7737261, 106.7166008] },
      { src: "photos/dinh1.jpg", date: "2023-10-01", caption: "Dinh with mẹ iu Kim Uyên", spot: [10.7775844066757, 106.69534501099479] },
      { src: "photos/dinh2.jpg", date: "2023-10-01", caption: "Hai đứa trẻ", spot: [10.7737261, 106.7166008] },
      { src: "photos/dinh3.jpg", date: "2023-10-01", caption: "Dinh em iu", spot: [10.7737261, 106.7166008] },
      { src: "photos/dinh4.jpg", date: "2023-10-01", caption: "", spot: [10.7737261, 106.7166008] }
    ]
  },
  {
    name: "Nha Trang, Vietnam",
    coords: [12.2084991, 109.2871204],
    photos: [
      { src: "photos/nha-trang-vietnam-2026-01-01-01.jpg", date: "2026-01-01", caption: "Mấy con ma men", spot: [12.2084991, 109.2871204] },
      { src: "photos/nha-trang-vietnam-1899-11-30-01.jpg", date: "2026-01-01", caption: "", spot: [12.2084991, 109.2871204] },
      { src: "photos/nha-trang-vietnam-1899-11-30-02.jpg", date: "2026-01-01", caption: "", spot: [12.2084991, 109.2871204] }
    ]
  },
  {
    name: "Đà Lạt, Vietnam",
    coords: [11.9082632, 108.4572089],
    photos: [
      { src: "photos/a-lat-vietnam-2025-07-20-01.jpg", date: "2025-07-20", caption: "Cà phê Linh", spot: [11.9082632, 108.4572089] },
      { src: "photos/a-lat-vietnam-2025-07-20-02.jpg", date: "2025-07-20", caption: "bà già quìn", spot: [11.9082632, 108.4572089] }
    ]
  },
  {
    name: "Wilbraham, MA",
    coords: [42.1223378, -72.4313151],
    photos: [
      { src: "photos/wilbraham-ma-2025-06-13-01.jpg", date: "2025-05-21", caption: "College Day", spot: [42.1223378, -72.4313151] },
      { src: "photos/wilbraham-ma-02.jpg", date: "2025-05-20", caption: "Senior Trip", spot: [42.1223378, -72.4313151] },
      { src: "photos/wma1.jpg", date: "2025-05-20", caption: "", spot: [42.1223378, -72.4313151] },
      { src: "photos/wilbraham-ma-01.jpg", date: "2025-05-17", caption: "Rugby senior game", spot: [42.1223378, -72.4313151] }
    ]
  },
  {
    name: "Kasukabe, Japan",
    coords: [35.9757957, 139.752019],
    photos: [
      { src: "photos/kasukabe-japan-01.jpg", date: "2025-11-24", caption: "Shin-chan's hometown !", spot: [35.9757957, 139.752019] }
    ]
  },
  {
    name: "Rosemead, CA",
    coords: [34.0808629, -118.073219],
    photos: [
      { src: "photos/rosemead-ca-01.jpg", date: "2026-07-13", caption: "Cô Hoa", spot: [34.0808629, -118.073219] },
      { src: "photos/rosemead-ca-02.jpg", date: "2026-07-13", caption: "", spot: [34.0808629, -118.073219] }
    ]
  },
  {
    name: "San Francisco, CA",
    coords: [37.7879363, -122.4075201],
    photos: [
      { src: "photos/san-francisco-ca-01.jpg", date: "2026-08-13", caption: "Huyền in the US !", spot: [37.7879363, -122.4075201] },
      { src: "photos/san-francisco-ca-02.jpg", date: "2026-08-13", caption: "", spot: [37.7879363, -122.4075201] },
      { src: "photos/san-francisco-ca-03.jpg", date: "2026-08-13", caption: "", spot: [37.7879363, -122.4075201] },
      { src: "photos/san-francisco-ca-04.jpg", date: "2026-08-13", caption: "", spot: [37.7879363, -122.4075201] },
      { src: "photos/san-francisco-ca-05.jpg", date: "2026-08-13", caption: "", spot: [37.7879363, -122.4075201] },
      { src: "photos/san-francisco-ca-06.jpg", date: "2026-08-13", caption: "Nhìn đi đâu v ?", spot: [37.7879363, -122.4075201] }
    ]
  },
  {
    name: "Joshua Tree, CA",
    coords: [34.123375, -116.3128656],
    photos: [
      { src: "photos/joshua-tree-ca-01.jpg", date: "2026-06-24", caption: "", spot: [34.123375, -116.3128656] }
    ]
  },
  {
    name: "Boise, ID",
    coords: [43.9873519, -115.7390188],
    photos: [
      { src: "photos/boise-id-01.jpg", date: "2026-08-03", caption: "", spot: [43.9873519, -115.7390188] },
      { src: "photos/boise-id-02.jpg", date: "2026-08-03", caption: "", spot: [43.9873519, -115.7390188] },
      { src: "photos/boise-id-03.jpg", date: "2026-08-03", caption: "", spot: [43.9873519, -115.7390188] },
      { src: "photos/boise-id-04.jpg", date: "2026-08-03", caption: "" }
    ]
  }
];
