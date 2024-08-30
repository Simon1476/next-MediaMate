import { rateMovie } from "@/lib/tmdb";
import Star from "/icons/empty-star.svg";
import { useState } from "react";

const TOTAL_STARS = 5;

const StarRating = ({
  movieId,
  onClose,
}: {
  movieId: number;
  onClose: () => void;
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRate = async () => {
    if (rating === 0) return; // rating이 0이면 함수 실행 안됨
    setIsLoading(true);
    try {
      await rateMovie(movieId, rating);
    } catch (error) {
      console.error("Error rating the movie:", error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div className="w-64 space-y-4">
      <p className="font-bold text-center text-white" onClick={() => onClose()}>
        이 콘테츠를 평가해주세요!
      </p>
      <div className="flex justify-center gap-2 mt-4">
        {[...Array(TOTAL_STARS)].map((_, index) => {
          const currentRating = index + 1;

          return (
            <label key={index}>
              <input
                className="hidden"
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => setRating(currentRating)}
              />
              <Star
                width={24}
                height={24}
                className={`cursor-pointer ${
                  currentRating <= (hover || rating) ? "text-yellow-300" : ""
                }`}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <p className="font-bold text-center text-white">
        평가 점수는 {rating}점 입니다.
      </p>
      <div className="text-center">
        <button
          type="button"
          className="px-4 py-2 text-white bg-black cursor-pointer"
          onClick={handleRate}
          disabled={rating === 0 || isLoading} // rating이 0이면 버튼 비활성화
        >
          {isLoading ? "평가 중..." : "평가하기"}
        </button>
      </div>
    </div>
  );
};

export default StarRating;
