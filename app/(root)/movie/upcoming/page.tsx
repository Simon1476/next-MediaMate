import MovieList from "@/components/movie/MovieList";
import { getMovies } from "@/lib/tmdb";
import { getTomorrowDate } from "@/lib/utils";

const MovieUpcoming = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  console.log(getTomorrowDate()); // 예: '2024-08-14'

  const currentPage = Number(searchParams?.page) || 1;

  const movieLists = await getMovies(
    `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&page=1&region=KR&release_date.gte=2024-08-14&sort_by=popularity.desc`
  );
  return (
    <>
      <h2 className="text-white text-24 mb-4 font-extrabold">개봉 예정</h2>
      <MovieList
        movieLists={movieLists.results}
        totalPage={movieLists.total_pages}
        currentPage={currentPage}
      />
    </>
  );
};

export default MovieUpcoming;
