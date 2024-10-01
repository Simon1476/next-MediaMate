import Carousel from "@/components/Carousel/Carousel";
import { getMovies } from "@/lib/tmdb";

const Home = async ({ params }: { params: { id: string } }) => {
  const movieList = await getMovies(
    `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&page=1&region=KR&sort_by=popularity.desc`
  );

  const horrorMovieList = await getMovies(
    `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&page=1&sort_by=popularity.desc&with_genres=27`
  );

  const rocoMovieList = await getMovies(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_genres=35%2C%2010749`
  );

  return (
    <main className=" bg-[#0f1114] min-h-[calc(100vh-74px)]">
      <section className="pt-32">
        <div className="px-4 mx-auto max-w-screen-2xl">
          <h2 className="pb-3 text-2xl font-bold text-white">인기 영화</h2>
          <Carousel mediaList={movieList.results} />
        </div>
      </section>
      <section className="py-10 sm:py-22">
        <div className="px-4 mx-auto max-w-screen-2xl">
          <h2 className="pb-3 text-2xl font-bold text-white">공포 영화</h2>
          <Carousel mediaList={horrorMovieList.results} />
        </div>
      </section>
      <section className="py-10 sm:py-22">
        <div className="px-4 mx-auto max-w-screen-2xl">
          <h2 className="pb-3 text-2xl font-bold text-white">로맨스 코미디</h2>
          <Carousel mediaList={rocoMovieList.results} />
        </div>
      </section>
    </main>
  );
};

export default Home;
