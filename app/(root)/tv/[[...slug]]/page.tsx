import TvShowList from "@/components/tv/TvShowList";
import { getTvShows } from "@/lib/tmdb";

const TvPage = async ({
  params,
  searchParams,
}: {
  params: { slug?: string[] };
  searchParams?: { [key: string]: string };
}) => {
  const slug =
    params.slug && params.slug.length > 0 ? params.slug[0] : "popular";

  const currentPage = Number(searchParams?.page) || 1;

  const tvShowLists = await getTvShows(slug, currentPage);
  return (
    <TvShowList
      tvShowLists={tvShowLists.results}
      totalPage={tvShowLists.total_pages}
      currentPage={currentPage}
    />
  );
};

export default TvPage;
