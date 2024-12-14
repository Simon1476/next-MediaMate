import LikeButton from "@/components/buttons/LikeButton";
import RateButton from "@/components/buttons/RateButton";
import GenresList from "@/components/genre/GenresList";
import { getSessionId } from "@/lib/cookies";
import { getMovieCredits, getMovieDetail } from "@/lib/tmdb";
import { formatRuntime } from "@/lib/utils";
import { CastMember } from "@/types/tmdb";
import Image from "next/image";

const MovieDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  const movieDetail = await getMovieDetail(id);
  const movieCredits = await getMovieCredits(id);

  const movieActionPlayers: CastMember[] = movieCredits.cast.filter(
    (cast) => cast.known_for_department === "Acting"
  );

  const sessionId = await getSessionId();

  return (
    <div className="">
      <div className="flex flex-col gap-16 md:flex-row">
        <div className="self-center flex-grow md:flex-none">
          <Image
            src={`https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`}
            alt={`Poster of ${movieDetail.title}`}
            width={300}
            height={428}
            className="rounded-lg"
          />
        </div>

        {/* 영화 상세 정보 */}
        <div className="flex flex-col items-center gap-4 md:items-stretch">
          {/* 제목 */}
          <h2 className="font-bold text-white text-32">{movieDetail.title}</h2>
          <p className="flex items-center gap-2 text-white">
            <Image
              src="/icons/gold-star.svg"
              alt="Star icon"
              width={20}
              height={20}
            />
            {/* 평점 */}
            <span className="font-semibold text-20">
              {movieDetail.vote_average === 0
                ? "No vote"
                : movieDetail.vote_average}
            </span>
            {movieDetail.vote_count > 0 && (
              <span className="text-20">({movieDetail.vote_count})</span>
            )}
            <span>•</span>
            <span>{formatRuntime(movieDetail.runtime)}</span>
          </p>

          <p className="text-white">{movieDetail.overview}</p>

          <div className="flex flex-wrap justify-center gap-2 md:flex-nowrap md:justify-normal">
            {/* 장르 */}
            <span className="font-medium text-center text-white min-w-24 md:text-left">
              장르
            </span>
            <GenresList genres={movieDetail.genres} mediaType="movie" />
          </div>
          {/* 좋아요, 시청 목록, 평가 버튼 */}
          {sessionId && (
            <div className="space-x-2">
              <LikeButton mediaType="movie" mediaId={movieDetail.id} />
              <RateButton movieId={movieDetail.id} />
            </div>
          )}
        </div>
      </div>
      {/* 출연자 목록*/}
      <div>
        <h3 className="my-4 text-white text-20">액션 배우</h3>
        <ol className="flex gap-3 overflow-x-scroll">
          {movieActionPlayers.map((player) => {
            const profilePath = player.profile_path
              ? `https://image.tmdb.org/t/p/w138_and_h175_face${player.profile_path}`
              : "/image/noAvatar.png";

            return (
              <li
                className="pb-2 overflow-hidden bg-transparent rounded-md min-w-36"
                key={player.id}
              >
                <div className="h-[175px]">
                  <Image
                    src={profilePath}
                    alt={`Profile of ${player.name}`}
                    width={138}
                    height={175}
                  />
                </div>
                <div className="p-3">
                  <p className="text-white">{player.name}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default MovieDetailPage;
