import MovieList from "@/components/movie/MovieList";
import { getMovies } from "@/lib/tmdb";

const MoviePage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const movieLists = await getMovies("popular", currentPage);
  return (
    <MovieList
      movieLists={movieLists.results}
      totalPage={movieLists.total_pages}
      currentPage={currentPage}
    />
  );
};

export default MoviePage;
