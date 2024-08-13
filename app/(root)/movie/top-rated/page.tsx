import MovieList from "@/components/movie/MovieList";
import { getMovies } from "@/lib/tmdb";

const MovieTopRated = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const movieLists = await getMovies(
    `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&page=${currentPage}&region=KR&sort_by=vote_count.desc&vote_average.gte=5&vote_count.gte=100`
  );
  return (
    <>
      <h2 className="text-white text-24 mb-4 font-extrabold">높은 평점</h2>
      <MovieList
        movieLists={movieLists.results}
        totalPage={movieLists.total_pages}
        currentPage={currentPage}
      />
    </>
  );
};

export default MovieTopRated;
