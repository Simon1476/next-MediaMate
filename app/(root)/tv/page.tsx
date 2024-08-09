import TvShowList from "@/components/tv/TvShowList";
import { getTvShows } from "@/lib/tmdb";

const TvPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const tvShowLists = await getTvShows("popular", currentPage);
  return (
    <TvShowList
      tvShowLists={tvShowLists.results}
      totalPage={tvShowLists.total_pages}
      currentPage={currentPage}
    />
  );
};

export default TvPage;
