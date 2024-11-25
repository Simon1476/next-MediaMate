import { TMDBMovie } from "@/types/tmdb";

import Image from "next/image";
import Link from "next/link";

const MovieCard = ({
  movie,
  priority,
}: {
  movie: TMDBMovie;
  priority: boolean;
}) => {
  const formattedVoteAverage =
    parseFloat(movie.vote_average.toFixed(1)) === Math.floor(movie.vote_average)
      ? Math.floor(movie.vote_average)
      : parseFloat(movie.vote_average.toFixed(1));

  const moviePoster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "/image/no-poster1.png";
  return (
    <div className="flex flex-col overflow-hidden rounded-md cursor-pointer">
      <div>
        <Link href={`/movie/${movie.id}`}>
          <Image
            src={moviePoster}
            alt={movie.title}
            width={300}
            height={150}
            priority={priority}
          />
        </Link>
      </div>

      <div className="pt-6 pb-3 pr-3 space-y-4 border-gray-100">
        <div className="flex items-center justify-between">
          <span className="font-extrabold text-red-500">
            {formattedVoteAverage === 0 ? "No" : formattedVoteAverage} Rate
          </span>
          <span className="ml-4 font-extrabold text-red-500">
            {movie.release_date}
          </span>
        </div>

        <h2 className="text-lg font-bold text-white truncate">{movie.title}</h2>
        <p className="text-sm text-gray-200 truncate">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
