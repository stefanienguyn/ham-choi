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
    name: "New York City, NY",
    coords: [40.7127281, -74.0060152],
    photos: [
      { src: "photos/new-york-city-ny-2026-03-30-01.jpg", date: "2026-03-30", caption: "the trio", spot: [40.7127281, -74.0060152] },
      { src: "photos/new-york-city-ny-undated-01.jpg", date: "2026-03-30", caption: "", spot: [40.7127281, -74.0060152] },
      { src: "photos/new-york-city-ny-undated-02.jpg", date: "2026-03-30", caption: "minions", spot: [40.7127281, -74.0060152] },
      { src: "photos/new-york-city-ny-2026-03-30-02.jpg", date: "2026-03-30", caption: "", spot: [40.7127281, -74.0060152] }
    ]
  },
  {
    name: "Home",
    icon: "🛵",
    coords: [10.7737261, 106.7166008],
    photos: [
      { src: "photos/home-2026-01-07-01.jpg", date: "2026-01-07", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-01-07-02.jpg", date: "2026-01-07", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-07-25-01.jpg", date: "2025-07-25", caption: "Đi coi tarot cho thầy Trí :v", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-07-25-02.jpg", date: "2025-07-25", caption: "Đợi thầy tới", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-07-20-01.jpg", date: "2025-07-20", caption: "đi ăn với thầy Trí", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-07-20-02.jpg", date: "2025-07-20", caption: "đi ăn với thầy Trí", spot: [10.7737261, 106.7166008] },
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
    name: "Claremont, CA",
    coords: [34.0966764, -117.7197785],
    photos: [
      { src: "photos/claremont-ca-2026-05-29-01.jpg", date: "2026-05-29", caption: "see u soon c Châu :<", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-05-29-02.jpg", date: "2026-05-29", caption: "ReCoop", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-05-29-03.jpg", date: "2026-05-29", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-05-29-04.jpg", date: "2026-05-29", caption: "chirp chirp", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-05-29-05.jpg", date: "2026-05-29", caption: "Graduation", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-05-29-06.jpg", date: "2026-05-29", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-05-29-07.jpg", date: "2026-05-29", caption: "", spot: [34.0966764, -117.7197785] }
    ]
  },
  {
    name: "Củ Chi, Vietnam",
    coords: [10.9744159, 106.4948968],
    photos: [
      { src: "photos/cu-chi-vietnam-2025-07-27-01.jpg", date: "2025-07-27", caption: "Đi Hong Kong về xoq đi chơi tiếp, cô Hoa đth hong nghe máy :))", spot: [10.9744159, 106.4948968] }
    ]
  },
  {
    name: "Kyoto, Japan",
    coords: [35.0115754, 135.7681441],
    photos: [
      { src: "photos/kyoto-japan-2025-11-25-01.jpg", date: "2025-11-25", caption: "was on a matcha hunt", spot: [35.0115754, 35.0115754] },
      { src: "photos/kyoto-japan-2025-11-25-02.jpg", date: "2025-11-25", caption: "", spot: [35.0115754, 35.0115754] }
    ]
  },
  {
    name: "Tokyo, Japan",
    coords: [35.6768601, 139.7638947],
    photos: [
      { src: "photos/tokyo-japan-2025-11-23-01.jpg", date: "2025-11-23", caption: "", spot: [35.6768601, 139.7638947] },
      { src: "photos/tokyo-japan-2025-11-23-02.jpg", date: "2025-11-23", caption: "", spot: [35.6768601, 139.7638947] }
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
