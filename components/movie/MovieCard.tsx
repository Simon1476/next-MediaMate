import { TMDBMovie } from "@/types/tmdb";

import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie }: { movie: TMDBMovie }) => {
  const formattedVoteAverage =
    parseFloat(movie.vote_average.toFixed(1)) === Math.floor(movie.vote_average)
      ? Math.floor(movie.vote_average)
      : parseFloat(movie.vote_average.toFixed(1));

  const moviePoster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "/image/no-poster1.png";
  return (
    <div className="flex flex-col w-[230px] h-[500px] rounded-md overflow-hidden cursor-pointer">
      <div className="h-[345px]">
        <Link href={`/movie/${movie.id}`}>
          <Image
            src={moviePoster}
            alt={movie.title}
            width={300}
            height={150}
            className="w-full"
          />
        </Link>
      </div>

      <div className="space-y-4 border-gray-100 pt-6 pr-3 pb-3">
        <div className="flex items-center justify-between">
          <span className="font-extrabold text-red-500">
            {formattedVoteAverage === 0 ? "No" : formattedVoteAverage} Rate
          </span>
          <span className="ml-4 font-extrabold text-red-500">
            {movie.release_date}
          </span>
        </div>

        <h2 className="text-white text-lg font-bold truncate">{movie.title}</h2>
        <p className="text-sm text-gray-200 truncate">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
