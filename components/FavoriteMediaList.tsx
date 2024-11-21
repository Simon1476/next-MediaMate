"use client";

import Image from "next/image";
import LikeButton from "@/components/buttons/LikeButton";
import RateButton from "@/components/buttons/RateButton";
import Link from "next/link";
import { useFavoriteStore } from "@/providers/favorite-store-provider";

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
  const { favoriteMovies, favoriteTVShows } = useFavoriteStore(
    (state) => state
  );
  const favoriteItems =
    mediaType === "movie" ? favoriteMovies : favoriteTVShows; // mediaType에 따라 선택
  let currentPage = 1;

  return (
    <div className="mx-auto space-y-6 text-white max-w-7xl">
      {favoriteItems.map((item: MediaItem) => {
        // favoriteMovies를 직접 사용
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
      {/* 페이지네이션 UI 추가 */}
      <div className="flex justify-center gap-2 mt-8">
        {currentPage > 1 && (
          <Link
            href={`/favorite/${mediaType}?page=${currentPage - 1}`}
            className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-600"
          >
            이전
          </Link>
        )}

        <span className="px-4 py-2 text-white">
          {currentPage} / {/* total_pages는 필요에 따라 조정 */}
        </span>

        {currentPage < 1 && ( // total_pages를 Zustand에서 가져오도록 수정
          <Link
            href={`/favorite/${mediaType}?page=${currentPage + 1}`}
            className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-600"
          >
            다음
          </Link>
        )}
      </div>
    </div>
  );
};

export default FavoriteMediaList;
