import { TMDBTVShow } from "@/types/tmdb";

import Image from "next/image";
import Link from "next/link";

const TvShowCard = ({ tvShow }: { tvShow: TMDBTVShow }) => {
  const formattedVoteAverage =
    parseFloat(tvShow.vote_average.toFixed(1)) ===
    Math.floor(tvShow.vote_average)
      ? Math.floor(tvShow.vote_average)
      : parseFloat(tvShow.vote_average.toFixed(1));

  const tvShowPoster = tvShow.poster_path
    ? `https://image.tmdb.org/t/p/w300${tvShow.poster_path}`
    : "/image/no-poster1.png";

  return (
    <div className="flex flex-col overflow-hidden rounded-md">
      <div>
        <Link href={`/tv/${tvShow.id}`}>
          <Image
            src={tvShowPoster}
            alt={tvShow.name}
            width={220}
            height={330}
            className="w-full"
          />
        </Link>
      </div>

      <div className="pt-6 pb-3 pr-3 space-y-4 border-gray-100">
        <div className="flex items-center justify-between">
          <span className="font-extrabold text-red-500">
            {formattedVoteAverage === 0 ? "No" : formattedVoteAverage} Rate
          </span>
          <span className="ml-4 font-extrabold text-red-500">
            {tvShow.first_air_date}
          </span>
        </div>
        <h2 className="text-lg font-bold text-white truncate">{tvShow.name}</h2>
        <p className="text-sm text-gray-200 truncate">{tvShow.overview}</p>
      </div>
    </div>
  );
};

export default TvShowCard;
