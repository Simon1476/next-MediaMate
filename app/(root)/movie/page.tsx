import MovieList from "@/components/movie/MovieList";
import { getMovies } from "@/lib/tmdb";

const MoviePage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const movieLists = await getMovies(
    `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&page=${currentPage}&region=KR&sort_by=popularity.desc`
  );
  return (
    <MovieList
      movieLists={movieLists.results}
      totalPage={movieLists.total_pages}
      currentPage={currentPage}
    />
  );
};

export default MoviePage;
