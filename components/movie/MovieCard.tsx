import { TMDBMovie } from "@/types/tmdb";

import Image from "next/image";

const MovieCard = ({ movie }: { movie: TMDBMovie }) => {
  const formattedVoteAverage =
    parseFloat(movie.vote_average.toFixed(1)) === Math.floor(movie.vote_average)
      ? Math.floor(movie.vote_average)
      : parseFloat(movie.vote_average.toFixed(1));

  return (
    <div className="flex flex-col w-[230px] h-[500px] rounded-md overflow-hidden">
      <Image
        src={`https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`}
        alt={movie.title}
        width={220}
        height={330}
        className="w-full"
      />
      <div className="space-y-4 border-gray-100 pt-6 pr-3 pb-3">
        <span className="font-extrabold text-red-500">
          {formattedVoteAverage} Rate
        </span>
        <h2 className="text-white text-lg font-bold truncate">{movie.title}</h2>
        <p className="text-sm text-gray-200 truncate">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
