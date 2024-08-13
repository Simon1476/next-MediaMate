import TvShowList from "@/components/tv/TvShowList";
import { getTvShows } from "@/lib/tmdb";

const TvPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const tvShowLists = await getTvShows(
    ` https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&language=ko-KR&page=${currentPage}&sort_by=popularity.desc&vote_count.gte=100&watch_region=KR`
  );
  return (
    <TvShowList
      tvShowLists={tvShowLists.results}
      totalPage={tvShowLists.total_pages}
      currentPage={currentPage}
    />
  );
};

export default TvPage;
