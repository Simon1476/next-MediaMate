"use client";

import { useAuth } from "@/context/AuthContext";
import { useFavoriteStore } from "@/providers/favorite-store-provider";
import Image from "next/image";
import { useEffect, useState } from "react";

type props = {
  mediaId: number;
  mediaType: string;
};
const LikeButton = ({ mediaId, mediaType }: props) => {
  const { accountId } = useAuth();
  const { favoriteMovies, toggleFavorite } = useFavoriteStore((state) => state);

  const [favorite, setFavorite] = useState(() =>
    favoriteMovies.some((movie) => movie.id === mediaId)
  );

  useEffect(() => {
    setFavorite(favoriteMovies.some((movie) => movie.id === mediaId));
  }, [favoriteMovies, mediaId]);

  const handleFavorite = async () => {
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mediaId,
          mediaType,
          accountId,
          favorite: !favorite,
        }),
      });

      toggleFavorite(mediaId);
      if (!response.ok) {
        console.error("Failed to update favorite:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while updating favorite:", error);
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
