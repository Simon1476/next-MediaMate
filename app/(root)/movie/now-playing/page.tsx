import MovieList from "@/components/movie/MovieList";
import { getMovies } from "@/lib/tmdb";

const MovieNowPlaying = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const movieLists = await getMovies(
    `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${currentPage}`
  );
  return (
    <>
      <h2 className="mb-4 font-extrabold text-center text-white text-24 md:text-left">
        현재 상영중
      </h2>
      <MovieList
        movieLists={movieLists.results}
        totalPage={movieLists.total_pages}
        currentPage={currentPage}
      />
    </>
  );
};

export default MovieNowPlaying;
