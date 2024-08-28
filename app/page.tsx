import Carousel from "@/components/Carousel/Carousel";
import { getMovies } from "@/lib/tmdb";

const Home = async ({ params }: { params: { id: string } }) => {
  const movieList = await getMovies(
    `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&page=1&region=KR&sort_by=popularity.desc`
  );

  const horrorMovieList = await getMovies(
    `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&page=1&sort_by=popularity.desc&with_genres=27`
  );

  const crimeAndThrillerMovieList = await getMovies(
    `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&page=1&sort_by=popularity.desc&with_genres=53,80`
  );

  const genres = crimeAndThrillerMovieList.results.map(
    (genre) => genre.genre_ids
  );

  // console.log(genres);
  return (
    <main className="mt-[74px] bg-[#0f1114] min-h-[calc(100vh-74px)]">
      <section className="pt-20 pb-10">
        <div className="container mx-auto">
          <h2 className="pb-3 text-2xl font-bold text-white">인기 영화</h2>
          <Carousel mediaList={movieList.results} />
        </div>
      </section>
      <section className="pt-20 pb-10">
        <div className="container mx-auto">
          <h2 className="pb-3 text-2xl font-bold text-white">공포 영화</h2>
          <Carousel mediaList={horrorMovieList.results} />
        </div>
      </section>
      <section className="pt-20 pb-10">
        <div className="container mx-auto">
          <h2 className="pb-3 text-2xl font-bold text-white">범죄 및 스릴러</h2>
          <Carousel mediaList={horrorMovieList.results} />
        </div>
      </section>
    </main>
  );
};

export default Home;
