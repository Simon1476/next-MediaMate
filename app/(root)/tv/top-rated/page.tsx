import TvShowList from "@/components/tv/TvShowList";
import { getTvShows } from "@/lib/tmdb";

const MovieNowPlaying = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const tvShowLists = await getTvShows("top_rated", currentPage);
  return (
    <TvShowList
      tvShowLists={tvShowLists.results}
      totalPage={tvShowLists.total_pages}
      currentPage={currentPage}
    />
  );
};

export default MovieNowPlaying;
