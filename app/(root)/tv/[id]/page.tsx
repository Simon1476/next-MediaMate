import LikeButton from "@/components/buttons/LikeButton";
import GenresList from "@/components/genre/GenresList";
import { getSessionId } from "@/lib/cookies";
import { getTvshowDetail } from "@/lib/tmdb";
import { formatRuntime } from "@/lib/utils";
import Image from "next/image";

const TvShowDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  const tvShowDetail = await getTvshowDetail(id);
  const genres = tvShowDetail.genres.map((genre) => genre);

  const sessionId = await getSessionId();
  return (
    <div className="flex flex-col gap-16 md:flex-row">
      <div className="self-center flex-grow md:flex-none">
        <Image
          src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${tvShowDetail.poster_path}`}
          alt={`${
            tvShowDetail.name ? tvShowDetail.name : tvShowDetail.original_name
          }`}
          width={300}
          height={450}
        />
      </div>
      {/* 상세 정보 */}
      <div className="flex flex-col items-center gap-4 md:items-stretch">
        {/* 제목*/}
        <h2 className="font-bold text-white text-32">{tvShowDetail.name}</h2>

        <p className="flex items-center gap-2 text-white">
          <Image
            src="/icons/gold-star.svg"
            alt="Star icon"
            width={20}
            height={20}
          />
          {/* 평점 */}
          <span className="font-semibold text-20">
            {tvShowDetail.vote_average}
          </span>
          <span className="text-20">({tvShowDetail.vote_count})</span>

          {tvShowDetail.episode_run_time.length > 0 && (
            <>
              <span>•</span>
              <span>{formatRuntime(tvShowDetail.episode_run_time[0])}</span>
            </>
          )}
        </p>

        <p className="text-white">{tvShowDetail.overview}</p>

        <div className="flex flex-wrap justify-center gap-2 md:flex-nowrap md:justify-normal">
          {/* 장르 */}
          <span className="font-medium text-center text-white min-w-24 md:text-left">
            장르
          </span>
          <GenresList genres={genres} mediaType="tv" />
        </div>
        {/* 좋아요, 시청 목록, 평가 버튼 */}
        {sessionId && (
          <div className="flex">
            <LikeButton mediaType="tv" mediaId={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TvShowDetail;
