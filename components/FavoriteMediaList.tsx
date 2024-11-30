"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LikeButton from "@/components/buttons/LikeButton";
import RateButton from "@/components/buttons/RateButton";
import { useFavoriteStore } from "@/providers/favorite-store-provider";
import Pagination2 from "./pagination/Pagination2";
import FavoriteMediaListSkeleton from "./MediaListSkeleton";

type MediaItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  overview: string;
};

type FavoriteMediaListProps = {
  mediaType: "movie" | "tv";
};

const FavoriteMediaList = ({ mediaType }: FavoriteMediaListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { favoriteMovies, favoriteTVShows } = useFavoriteStore(
    (state) => state
  );
  const favoriteItems =
    mediaType === "movie" ? favoriteMovies : favoriteTVShows;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(favoriteItems.length / itemsPerPage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <FavoriteMediaListSkeleton count={itemsPerPage} />;
  }

  return (
    <div className="mx-auto space-y-6 text-white max-w-7xl">
      {favoriteItems
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item: MediaItem) => {
          const title = mediaType === "movie" ? item.title : item.name;
          const releaseDate =
            mediaType === "movie" ? item.release_date : item.first_air_date;

          return (
            <div key={item.id} className="flex flex-col md:flex-row">
              <div className="self-center">
                <Image
                  src={`https://media.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
                  width={220}
                  height={330}
                  alt={`Poster of ${title}`}
                />
              </div>
              <div className="flex flex-col justify-between flex-1 px-8 py-8">
                <div>
                  <div className="space-x-4 text-center md:text-left">
                    <span className="font-bold">{title}</span>
                    <span>{releaseDate}</span>
                  </div>
                  <p className="pt-10 leading-6 text-center line-clamp-2 lg:line-clamp-none md:text-left">
                    {item.overview}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-4 mt-4 md:justify-normal md:mt-0">
                  <div className="flex items-center gap-2">
                    <RateButton movieId={item.id} />
                    <span>평가</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LikeButton mediaId={item.id} mediaType={mediaType} />
                    <span>좋아요</span>
                  </div>
                  <div>
                    <button>삭제</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <Pagination2
        totalPages={totalPages}
        mediaType={mediaType}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default FavoriteMediaList;
