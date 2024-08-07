import { TMDBTVShow } from "@/types/tmdb";
import Pagination from "../pagination/Pagination";
import TvShowCard from "./TvShowCard";

const TvShowList = ({
  tvShowLists,
  totalPage,
  currentPage,
}: {
  tvShowLists: TMDBTVShow[];
  totalPage: number;
  currentPage: number;
}) => {
  return (
    <>
      <div className="flex flex-wrap gap-8 justify-center lg:justify-between">
        {tvShowLists.map((tvShow) => (
          <TvShowCard key={tvShow.id} tvShow={tvShow} />
        ))}
      </div>
      <Pagination totalPage={totalPage} currentPage={currentPage} />
    </>
  );
};

export default TvShowList;
