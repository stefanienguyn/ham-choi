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
    name: "Portland, ME",
    coords: [43.6573605, -70.2586618],
    photos: [
      { src: "photos/portland-me-2026-08-05-01.jpg", date: "2026-08-05", caption: "", spot: [43.6573605, -70.2586618] }
    ]
  },
  {
    name: "Los Angeles, CA",
    coords: [34.0536909, -118.242766],
    photos: [
      { src: "photos/los-angeles-ca-2026-07-28-01.jpg", date: "2026-07-28", caption: "Hollywood", spot: [34.0536909, -118.242766] },
      { src: "photos/los-angeles-ca-2026-07-20-01.jpg", date: "2026-07-20", caption: "Little Tokyo !", spot: [34.0536909, -118.242766] },
      { src: "photos/los-angeles-ca-2026-07-20-02.jpg", date: "2026-07-20", caption: "", spot: [34.0536909, -118.242766] },
      { src: "photos/los-angeles-ca-2026-07-20-03.jpg", date: "2026-07-20", caption: "", spot: [34.0536909, -118.242766] },
      { src: "photos/los-angeles-ca-2026-07-20-04.jpg", date: "2026-07-20", caption: "", spot: [34.0536909, -118.242766] },
      { src: "photos/los-angeles-ca-2026-07-20-05.jpg", date: "2026-07-20", caption: "", spot: [34.0536909, -118.242766] }
    ]
  },
  {
    name: "Home",
    icon: "🛵",
    coords: [10.7737261, 106.7166008],
    photos: [
      { src: "photos/home-2026-06-15-02.jpg", date: "2026-06-15", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-15-03.jpg", date: "2026-06-15", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-15-04.jpg", date: "2026-06-15", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-07-04.jpg", date: "2025-06-07", caption: "ashley in vietnam !", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-07-10-04.jpg", date: "2025-07-10", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-06-01-01.jpg", date: "2025-06-01", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-06-01-02.jpg", date: "2025-06-01", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-15-01.jpg", date: "2026-06-15", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-06-01.jpg", date: "2026-06-06", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-06-02.jpg", date: "2026-06-06", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-06-03.jpg", date: "2026-06-06", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-06-04.jpg", date: "2026-06-06", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-06-05.jpg", date: "2026-06-06", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-06-06.jpg", date: "2026-06-06", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-06-07.jpg", date: "2026-06-06", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-01-13-01.jpg", date: "2026-01-13", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-01-13-02.jpg", date: "2026-01-13", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-01-13-03.jpg", date: "2026-01-13", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-09-01.jpg", date: "2026-06-09", caption: "mãi mới hẹn đc celeb", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-09-02.jpg", date: "2026-06-09", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-09-03.jpg", date: "2026-06-09", caption: "L - nXL - X^nL", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-07-01.jpg", date: "2026-06-07", caption: "tình yêu tới rồi, bạch nguyệt quang về rồi", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-07-02.jpg", date: "2026-06-07", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-07-03.jpg", date: "2026-06-07", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-16-01.jpg", date: "2026-06-16", caption: "lên cầu Ba Son hóng gió", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-16-02.jpg", date: "2026-06-16", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-17-01.jpg", date: "2026-06-17", caption: "a di đà phật", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-17-05.jpg", date: "2026-06-17", caption: "đi tô tượng", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-17-02.jpg", date: "2026-06-17", caption: "bạch nguyệt quang xinh qá cháy mẹ hình", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-17-03.jpg", date: "2026-06-17", caption: "chú khỉ buồn ở lại mạnh giỏi", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-17-04.jpg", date: "2026-06-17", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-08-01.jpg", date: "2026-06-08", caption: "mãi mới đc 1 hôm ở nhà", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-08-02.jpg", date: "2026-06-08", caption: "Dì Út", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-08-03.jpg", date: "2026-06-08", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-01-12-01.jpg", date: "2026-01-12", caption: "anh bác suỹ chị nhà giéo", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-05-01.jpg", date: "2026-06-05", caption: "trẻ trâu", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-05-02.jpg", date: "2026-06-05", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-04-01.jpg", date: "2026-06-04", caption: "Vừa về vn là phóng xe ra đường ", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-04-02.jpg", date: "2026-06-04", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-06-04-03.jpg", date: "2026-06-04", caption: "tét camera cho mẹ iu", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-1899-11-30-01.jpg", date: "2025-07-05", caption: "cà phê gần bưu điện tp", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-1899-11-30-02.jpg", date: "2025-07-05", caption: "giống dưới âm phủ v", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-07-10-03.jpg", date: "2025-07-10", caption: "bánh mì chẻo Đặng Trân Côn", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-07-10-01.jpg", date: "2025-07-10", caption: "Dookki", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-07-10-02.jpg", date: "2025-07-10", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-12-15-01.jpg", date: "2025-12-15", caption: "Chô li bi", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-12-20-01.jpg", date: "2025-12-20", caption: "Ông địa + ông thần tài", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-12-20-02.jpg", date: "2025-12-20", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-12-20-03.jpg", date: "2025-12-20", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-07-20-03.jpg", date: "2025-07-20", caption: "Chè bưởi ngon vcl", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-07-20-04.jpg", date: "2025-07-20", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-06-03-01.jpg", date: "2025-06-03", caption: "cốt 10 năm", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2025-06-03-02.jpg", date: "2025-06-03", caption: "", spot: [10.7737261, 106.7166008] },
      { src: "photos/home-2026-01-17-01.jpg", date: "2026-01-17", caption: "Last night in VN for winter break 2025", spot: [10.7737261, 106.7166008] },
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
    name: "Vũng Tàu, Vietnam",
    coords: [10.348189, 107.0753349],
    photos: [
      { src: "photos/vung-tau-vietnam-2026-06-12-03.jpg", date: "2026-06-12", caption: "gia đình thương nhau", spot: [10.348189, 107.0753349] },
      { src: "photos/vung-tau-vietnam-2026-06-13-02.jpg", date: "2026-06-13", caption: "3 đứa con", spot: [10.348189, 107.0753349] },
      { src: "photos/vung-tau-vietnam-2026-06-13-03.jpg", date: "2026-06-13", caption: "ba mẹ", spot: [10.348189, 107.0753349] },
      { src: "photos/vung-tau-vietnam-2026-06-11-01.jpg", date: "2026-06-11", caption: "bụng k đáy", spot: [10.348189, 107.0753349] },
      { src: "photos/vung-tau-vietnam-2026-06-11-02.jpg", date: "2026-06-11", caption: "", spot: [10.348189, 107.0753349] },
      { src: "photos/vung-tau-vietnam-2026-06-11-03.jpg", date: "2026-06-11", caption: "đi mua sushi burrito", spot: [10.348189, 107.0753349] },
      { src: "photos/vung-tau-vietnam-2026-06-10-01.jpg", date: "2026-06-11", caption: "", spot: [10.348189, 107.0753349] },
      { src: "photos/vung-tau-vietnam-2026-06-10-02.jpg", date: "2026-06-11", caption: "", spot: [10.348189, 107.0753349] },
      { src: "photos/vung-tau-vietnam-2026-06-13-01.jpg", date: "2026-06-13", caption: "20 bday", spot: [10.348189, 107.0753349] },
      { src: "photos/vung-tau-vietnam-2026-06-12-01.jpg", date: "2026-06-12", caption: "ba mẹ iu", spot: [10.348189, 107.0753349] },
      { src: "photos/vung-tau-vietnam-2026-06-12-02.jpg", date: "2026-06-12", caption: "chồng gét vợ lây", spot: [10.348189, 107.0753349] }
    ]
  },
  {
    name: "Claremont, CA",
    coords: [34.0966764, -117.7197785],
    photos: [
      { src: "photos/claremont-ca-2026-08-10-01.jpg", date: "2026-08-10", caption: "In n Out", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-08-10-02.jpg", date: "2026-08-10", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-08-10-03.jpg", date: "2026-08-10", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-08-13-01.jpg", date: "2026-08-13", caption: "summer 2026 - sontag suite 260 !", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-08-13-02.jpg", date: "2026-08-13", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-08-13-03.jpg", date: "2026-08-13", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-08-13-04.jpg", date: "2026-08-13", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-08-13-05.jpg", date: "2026-08-13", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-08-13-06.jpg", date: "2026-08-13", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-08-13-07.jpg", date: "2026-08-13", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-08-13-08.jpg", date: "2026-08-13", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-08-13-09.jpg", date: "2026-08-13", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-08-13-10.jpg", date: "2026-08-13", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-08-13-11.jpg", date: "2026-08-13", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-07-26-01.jpg", date: "2026-07-26", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-07-26-02.jpg", date: "2026-07-26", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-07-26-03.jpg", date: "2026-07-26", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-07-26-04.jpg", date: "2026-07-26", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-07-26-05.jpg", date: "2026-07-26", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-07-26-06.jpg", date: "2026-07-26", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-07-26-07.jpg", date: "2026-07-26", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-05-29-01.jpg", date: "2026-05-29", caption: "see u soon c Châu :<", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-05-29-08.jpg", date: "2026-05-29", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-05-29-02.jpg", date: "2026-05-29", caption: "ReCoop", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-05-29-03.jpg", date: "2026-05-29", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-05-29-04.jpg", date: "2026-05-29", caption: "chirp chirp", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-05-29-05.jpg", date: "2026-05-29", caption: "Graduation", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-05-29-06.jpg", date: "2026-05-29", caption: "", spot: [34.0966764, -117.7197785] },
      { src: "photos/claremont-ca-2026-05-29-07.jpg", date: "2026-05-29", caption: "", spot: [34.0966764, -117.7197785] }
    ]
  },
  {
    name: "Newport Beach, CA",
    coords: [33.6170092, -117.9294401],
    photos: [
      { src: "photos/newport-beach-ca-2026-03-30-01.jpg", date: "2026-03-30", caption: "", spot: [33.6170092, -117.9294401] }
    ]
  },
  {
    name: "Huntington Beach, CA",
    coords: [33.6783336, -118.000016],
    photos: [
      { src: "photos/huntington-beach-ca-2026-05-10-01.jpg", date: "2026-05-10", caption: "Ski Beach day!", spot: [33.6783336, -118.000016] }
    ]
  },
  {
    name: "Rancho Cucamonga, CA",
    coords: [34.1033192, -117.575173],
    photos: [
      { src: "photos/rancho-cucamonga-ca-2026-07-13-01.jpg", date: "2026-07-13", caption: "Out of battery midway :(", spot: [34.1033192, -117.575173] },
      { src: "photos/rancho-cucamonga-ca-2026-07-13-02.jpg", date: "2026-07-13", caption: "", spot: [34.1033192, -117.575173] },
      { src: "photos/rancho-cucamonga-ca-2026-07-13-03.jpg", date: "2026-07-13", caption: "", spot: [34.1033192, -117.575173] }
    ]
  },
  {
    name: "Laguna Beach, CA",
    coords: [33.5426975, -117.785366],
    photos: [
      { src: "photos/laguna-beach-ca-2026-07-24-01.jpg", date: "2026-07-24", caption: "", spot: [33.5426975, -117.785366] },
      { src: "photos/laguna-beach-ca-2026-07-24-02.jpg", date: "2026-07-24", caption: "", spot: [33.5426975, -117.785366] }
    ]
  },
  {
    name: "Phan Thiết, Vietnam",
    coords: [10.9028645, 108.0632846],
    photos: [
      { src: "photos/phan-thiet-vietnam-2025-06-30-01.jpg", date: "2025-06-30", caption: "Phan thiết with Toán 2124", spot: [10.9028645, 108.0632846] }
    ]
  },
  {
    name: "Wilbraham, MA",
    coords: [42.1223378, -72.4313151],
    photos: [
      { src: "photos/wilbraham-ma-2026-05-20-01.jpg", date: "2026-05-20", caption: "", spot: [42.1223378, -72.4313151] },
      { src: "photos/wilbraham-ma-2026-05-20-02.jpg", date: "2026-05-20", caption: "", spot: [42.1223378, -72.4313151] },
      { src: "photos/wilbraham-ma-2026-05-20-03.jpg", date: "2026-05-20", caption: "", spot: [42.1223378, -72.4313151] },
      { src: "photos/wilbraham-ma-2026-05-20-05.jpg", date: "2026-05-20", caption: "", spot: [42.1223378, -72.4313151] },
      { src: "photos/wilbraham-ma-2026-05-20-06.jpg", date: "2026-05-20", caption: "", spot: [42.1223378, -72.4313151] },
      { src: "photos/wilbraham-ma-2026-05-20-07.jpg", date: "2026-05-20", caption: "", spot: [42.1223378, -72.4313151] },
      { src: "photos/wilbraham-ma-2025-06-13-01.jpg", date: "2025-05-21", caption: "College Day", spot: [42.1223378, -72.4313151] },
      { src: "photos/wilbraham-ma-02.jpg", date: "2025-05-20", caption: "Senior Trip", spot: [42.1223378, -72.4313151] },
      { src: "photos/wma1.jpg", date: "2025-05-20", caption: "", spot: [42.1223378, -72.4313151] },
      { src: "photos/wilbraham-ma-01.jpg", date: "2025-05-17", caption: "Rugby senior game", spot: [42.1223378, -72.4313151] }
    ]
  },
  {
    name: "New York City, NY",
    coords: [40.7127281, -74.0060152],
    photos: [
      { src: "photos/new-york-city-ny-2026-08-04-01.jpg", date: "2026-08-04", caption: "", spot: [40.7127281, -74.0060152] },
      { src: "photos/new-york-city-ny-2026-08-04-02.jpg", date: "2026-08-04", caption: "", spot: [40.7127281, -74.0060152] },
      { src: "photos/new-york-city-ny-2026-08-04-03.jpg", date: "2026-08-04", caption: "", spot: [40.7127281, -74.0060152] },
      { src: "photos/new-york-city-ny-2026-08-04-05.jpg", date: "2026-08-04", caption: "", spot: [40.7127281, -74.0060152] },
      { src: "photos/new-york-city-ny-2026-08-04-06.jpg", date: "2026-08-04", caption: "", spot: [40.7127281, -74.0060152] },
      { src: "photos/new-york-city-ny-2026-03-30-01.jpg", date: "2026-03-30", caption: "the trio", spot: [40.7127281, -74.0060152] },
      { src: "photos/new-york-city-ny-undated-01.jpg", date: "2026-03-30", caption: "", spot: [40.7127281, -74.0060152] },
      { src: "photos/new-york-city-ny-undated-02.jpg", date: "2026-03-30", caption: "minions", spot: [40.7127281, -74.0060152] },
      { src: "photos/new-york-city-ny-2026-03-30-02.jpg", date: "2026-03-30", caption: "", spot: [40.7127281, -74.0060152] }
    ]
  },
  {
    name: "Hà Nội, Vietnam",
    coords: [21.0283334, 105.854041],
    photos: [
      { src: "photos/ha-noi-vietnam-2026-01-03-01.jpg", date: "2026-01-03", caption: "Tạo cái dáng mẹ jztr", spot: [21.0283334, 105.854041] },
      { src: "photos/ha-noi-vietnam-2026-01-03-02.jpg", date: "2026-01-03", caption: "", spot: [21.0283334, 105.854041] }
    ]
  },
  {
    name: "Đà Nẵng, Vietnam",
    coords: [16.068501, 108.2240242],
    photos: [
      { src: "photos/a-nang-vietnam-2025-06-23-01.jpg", date: "2025-06-23", caption: "i miss ashley in vietnam :(", spot: [16.068501, 108.2240242] }
    ]
  },
  {
    name: "Hội An, Vietnam",
    coords: [15.8880397, 108.3367883],
    photos: [
      { src: "photos/hoi-an-vietnam-2025-06-23-01.jpg", date: "2025-06-23", caption: "i blacked out after this...", spot: [15.8880397, 108.3367883] },
      { src: "photos/hoi-an-vietnam-2025-06-23-02.jpg", date: "2025-06-23", caption: "", spot: [15.8880397, 108.3367883] }
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
      { src: "photos/san-francisco-ca-01.jpg", date: "2026-07-25", caption: "Huyền in the US !", spot: [37.7879363, -122.4075201] },
      { src: "photos/san-francisco-ca-02.jpg", date: "2026-07-25", caption: "", spot: [37.7879363, -122.4075201] },
      { src: "photos/san-francisco-ca-03.jpg", date: "2026-07-25", caption: "", spot: [37.7879363, -122.4075201] },
      { src: "photos/san-francisco-ca-04.jpg", date: "2026-07-25", caption: "", spot: [37.7879363, -122.4075201] },
      { src: "photos/san-francisco-ca-05.jpg", date: "2026-07-25", caption: "", spot: [37.7879363, -122.4075201] },
      { src: "photos/san-francisco-ca-06.jpg", date: "2026-07-25", caption: "Nhìn đi đâu v ?", spot: [37.7879363, -122.4075201] }
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
