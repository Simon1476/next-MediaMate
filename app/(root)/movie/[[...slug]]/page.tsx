import MovieList from "@/components/movie/MovieList";
import { getMovies } from "@/lib/movie";

const MoviePage = async ({ params }: { params: { slug?: string[] } }) => {
  const slug =
    params.slug && params.slug.length > 0 ? params.slug[0] : "popular";

  const movieLists = await getMovies(slug);

  return <MovieList movieLists={movieLists.results} />;
};

export default MoviePage;
