import { CityType } from "./types";

const cities: CityType[] = [
  { id: 1, name: "تهران" },
  { id: 2, name: "اصفهان" },
  { id: 3, name: "شیراز" },
  { id: 4, name: "مشهد" },
  { id: 5, name: "تبریز" },
  { id: 6, name: "رشت" },
  { id: 7, name: "اهواز" },
  { id: 8, name: "کرمان" },
  { id: 9, name: "یزد" },
  { id: 10, name: "قم" },
  { id: 11, name: "کرمانشاه" }
];

const persianFilms = [
  {
    id: 1,
    name: "جدایی نادر از سیمین",
    releasedCities: [1, 2, 3, 4],
    image: "https://cdn.zoomg.ir/2018/11/8effe66e-d3c9-4294-9172-71231be990b6.jpg",
    director: { first_name: "اصغر", last_name: "فرهادی" },
    description: "داستان زوجی که در آستانه جدایی هستند و با چالش‌های اخلاقی و قانونی روبرو می‌شوند."
  },
  {
    id: 2,
    name: "درباره الی",
    releasedCities: [1, 5, 6, 7],
    image: "https://ensafnews.com/wp-content/uploads/2019/10/Webp.net-resizeimage-2019-10-22T220146.946.jpg",
    director: { first_name: "اصغر", last_name: "فرهادی" },
    description: "گروهی از دوستان برای تعطیلات به شمال می‌روند، اما ناپدید شدن یکی از آنها همه چیز را تغییر می‌دهد."
  },
  {
    id: 3,
    name: "بچه‌های آسمان",
    releasedCities: [1, 4, 2, 3],
    image: "https://borna.news/files/fa/news/1399/6/16/1764549_606.jpg",
    director: { first_name: "مجید", last_name: "مجیدی" },
    description: "داستان برادر و خواهری که مجبور می‌شوند یک جفت کفش را به اشتراک بگذارند."
  },
  {
    id: 4,
    name: "رنگ خدا",
    releasedCities: [1, 8, 9, 10],
    image: "https://cinemacinema.ir/wp-content/uploads/2018/05/cinemacinema_ir-196-300x180.jpg",
    director: { first_name: "مجید", last_name: "مجیدی" },
    description: "داستان پسر نابینایی که با پدرش به روستای مادربزرگش می‌رود و با طبیعت ارتباط برقرار می‌کند."
  },
  {
    id: 5,
    name: "فروشنده",
    releasedCities: [1, 2, 3, 5],
    image: "https://cdn.zoomg.ir/2016/9/f12a58b6-7959-4e4b-ba74-977ebe2e3684.jpg",
    director: { first_name: "اصغر", last_name: "فرهادی" },
    description: "زوجی که در حال اجرای نمایش «مرگ فروشنده» هستند، با حادثه‌ای روبرو می‌شوند که زندگی‌شان را تغییر می‌دهد."
  },
  {
    id: 6,
    name: "ماهی‌ها عاشق می‌شوند",
    releasedCities: [1, 4, 6, 11],
    image: "https://www.filimo.com/shot/wp-content/uploads/2023/07/Mahihaa_02.jpg",
    director: { first_name: "علی", last_name: "رفیعی" },
    description: "داستان عشق و آشپزی در شمال ایران، جایی که یک رستوران خانوادگی میزبان اتفاقات غیرمنتظره می‌شود."
  }
];

export { cities, persianFilms };