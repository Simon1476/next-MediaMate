import LikeButton from "@/components/buttons/LikeButton";
import RateButton from "@/components/buttons/RateButton";
import { getMovieCredits, getMovieDetail } from "@/lib/tmdb";
import { formatRuntime } from "@/lib/utils";
import { CastMember } from "@/types/tmdb";
import Image from "next/image";

const MovieDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  const movieDetail = await getMovieDetail(id);
  const genres = movieDetail.genres.map((genre) => genre);

  const movieCredits = await getMovieCredits(id);

  const movieActionPlayers: CastMember[] = movieCredits.cast.filter(
    (cast) => cast.known_for_department === "Acting"
  );

  return (
    <div className="">
      <div className="flex gap-16">
        <Image
          src={`https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`}
          alt={movieDetail.title}
          width={300}
          height={428}
          className="rounded-lg"
        />
        {/* 영화 상세 정보 */}
        <div className="flex flex-col gap-4">
          {/* 제목 */}
          <h2 className="text-32 text-white font-bold">{movieDetail.title}</h2>
          <p className="flex items-center text-white gap-2">
            <Image
              src="/icons/gold-star.svg"
              alt="Star icon"
              width={20}
              height={20}
            />
            {/* 평점 */}
            <span className="text-20 font-semibold">
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

          <div className="flex gap-2">
            {/* 장르 */}
            <span className="text-white font-medium min-w-24">장르</span>
            {genres.map((genre) => (
              <span className="text-white" key={genre.id}>
                {genre.name}
              </span>
            ))}
          </div>
          {/* 좋아요, 시청 목록, 평가 버튼 */}
          <div className="flex">
            <LikeButton mediaType="movie" mediaId={movieDetail.id} />
            <RateButton movieId={movieDetail.id} />
          </div>
        </div>
      </div>
      {/* 출연자 목록*/}
      <div>
        <h3 className="text-20 text-white my-4">액션 배우</h3>
        <ol className="overflow-x-scroll flex gap-3">
          {movieActionPlayers.map((player) => {
            const profilePath = player.profile_path
              ? `https://image.tmdb.org/t/p/w138_and_h175_face${player.profile_path}`
              : "/image/noAvatar.png";

            return (
              <li
                className="pb-2 min-w-36 bg-transparent rounded-md overflow-hidden"
                key={player.id}
              >
                <div className="h-[175px]">
                  <Image
                    src={profilePath}
                    alt={player.name}
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
