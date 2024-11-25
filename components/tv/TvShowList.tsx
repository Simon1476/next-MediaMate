"use client";

import { TMDBTVShow } from "@/types/tmdb";
import Pagination from "../pagination/Pagination";
import TvShowCard from "./TvShowCard";
import TvSkeleton from "../TvSkeleton";
import { useState, useEffect } from "react";
import Pagination2 from "../pagination/Pagination2";

const TvShowList = ({
  tvShowLists,
  totalPage,
  currentPage,
}: {
  tvShowLists: TMDBTVShow[];
  totalPage: number;
  currentPage: number;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [tvShowLists, currentPage]);

  return (
    <>
      {isLoading ? (
        <TvSkeleton />
      ) : (
        <div className="grid gap-4 grid-movie-responsive">
          {tvShowLists.map((tvShow) => (
            <TvShowCard key={tvShow.id} tvShow={tvShow} />
          ))}
        </div>
      )}
      <Pagination2 totalPages={totalPage} mediaType="tv" />
    </>
  );
};

export default TvShowList;
