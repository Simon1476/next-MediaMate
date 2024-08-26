"use client";

import Star from "/icons/star.svg";
import { rateMovie } from "@/lib/tmdb";

const RateButton = ({ movieId }: { movieId: number }) => {
  const handleRate = async () => {
    await rateMovie(movieId, 9.0);
  };

  return (
    <>
      <button onClick={handleRate}>
        <Star className="w-[30px] h-[30px]" />
      </button>
    </>
  );
};

export default RateButton;
