import MovieList from "@/components/movie/MovieList";
import { getMovies } from "@/lib/tmdb";

const MoviePage = async ({
  params,
  searchParams,
}: {
  params: { slug?: string[] };
  searchParams?: { [key: string]: string };
}) => {
  const slug =
    params.slug && params.slug.length > 0 ? params.slug[0] : "popular";

  const currentPage = Number(searchParams?.page) || 1;

  const movieLists = await getMovies(slug, currentPage);
  return (
    <MovieList
      movieLists={movieLists.results}
      totalPage={movieLists.total_pages}
      currentPage={currentPage}
    />
  );
};

export default MoviePage;
