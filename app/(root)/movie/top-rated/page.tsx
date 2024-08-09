import MovieList from "@/components/movie/MovieList";
import { getMovies } from "@/lib/tmdb";

const MovieTopRated = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const movieLists = await getMovies("top_rated", currentPage);
  return (
    <MovieList
      movieLists={movieLists.results}
      totalPage={movieLists.total_pages}
      currentPage={currentPage}
    />
  );
};

export default MovieTopRated;
