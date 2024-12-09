"use client";

import { useAuth } from "@/context/AuthContext";
import { useFavoriteStore } from "@/providers/favorite-store-provider";
import Image from "next/image";
import { useEffect, useState } from "react";

type props = {
  mediaId: number;
  mediaType: "movie" | "tv";
};
const LikeButton = ({ mediaId, mediaType }: props) => {
  const { accountId } = useAuth();
  const {
    favoriteMovies,
    favoriteTVShows,
    toggleFavoriteMovie,
    toggleFavoriteTVShow,
  } = useFavoriteStore((state) => state);

  const [favorite, setFavorite] = useState(() =>
    mediaType === "movie"
      ? favoriteMovies.some((movie) => movie.id === mediaId)
      : favoriteTVShows.some((TVShow) => TVShow.id === mediaId)
  );

  useEffect(() => {
    if (mediaType === "movie") {
      setFavorite(favoriteMovies.some((movie) => movie.id === mediaId));
    } else if (mediaType === "tv") {
      setFavorite(favoriteTVShows.some((show) => show.id === mediaId));
    }
  }, [favoriteMovies, mediaId, mediaType, favoriteTVShows]);

  const handleFavorite = async () => {
    try {
      if (!accountId) return;
      if (mediaType === "movie") {
        await toggleFavoriteMovie(mediaId);
      } else if (mediaType === "tv") {
        await toggleFavoriteTVShow(mediaId);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return (
    <button onClick={handleFavorite}>
      <Image
        src={favorite ? "/icons/favorite-like.svg" : "/icons/favorite.svg"}
        alt="Favorite button"
        width={30}
        height={30}
      />
    </button>
  );
};

export default LikeButton;
