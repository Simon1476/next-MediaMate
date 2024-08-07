export const navbarLinks = [
  {
    imgUrl: "/icons/home.svg",
    label: "영화",
    submenu: [
      { label: "인기", route: "/movie" },
      { label: "현재 상영중", route: "/movie/now_playing" },
      { label: "개봉 예정", route: "/movie/upcoming" },
      { label: "높은 평점", route: "/movie/top_rated" },
    ],
  },
  {
    imgUrl: "/icons/movie.svg",
    label: "TV 프로그램",
    submenu: [
      { label: "인기", route: "/tv" },
      { label: "오늘 반영", route: "/tv/airing_today" },
      { label: "TV 방영중", route: "/tv/on_the_air" },
      { label: "높은 평점", route: "/tv/top_rated" },
    ],
  },
  {
    imgUrl: "/icons/late.svg",
    label: "유명인",
    submenu: [{ label: "인기인물", route: "/movie" }],
  },
];

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  },
};
