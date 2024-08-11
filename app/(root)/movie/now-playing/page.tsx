import MovieList from "@/components/movie/MovieList";
import { getMovies } from "@/lib/tmdb";

const MovieNowPlaying = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const movieLists = await getMovies("now_playing", currentPage);
  return (
    <MovieList
      movieLists={movieLists.results}
      totalPage={movieLists.total_pages}
      currentPage={currentPage}
    />
  );
};

export default MovieNowPlaying;
