import LikeButton from "@/components/buttons/LikeButton";
import { getTvshowDetail } from "@/lib/tmdb";
import { formatRuntime } from "@/lib/utils";
import Image from "next/image";

const TvShowDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  const tvShowDetail = await getTvshowDetail(id);
  const genres = tvShowDetail.genres.map((genre) => genre);

  return (
    <div
      className={`bg-cover bg-no-repeat bg-[url('https://image.tmdb.org/t/p/w1280${tvShowDetail.backdrop_path}')]'`}
    >
      <div className={`flex gap-16`}>
        <Image
          src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${tvShowDetail.poster_path}`}
          alt={`${
            tvShowDetail.name ? tvShowDetail.name : tvShowDetail.original_name
          }`}
          width={300}
          height={450}
        />
        {/* 상세 정보 */}
        <div className="flex flex-col gap-4">
          {/* 제목*/}
          <h2 className="text-32 text-white font-bold">{tvShowDetail.name}</h2>

          <p className="flex items-center text-white gap-2">
            <Image
              src="/icons/gold-star.svg"
              alt="Star icon"
              width={20}
              height={20}
            />
            {/* 평점 */}
            <span className="text-20 font-semibold">
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
            <LikeButton mediaType="tv" mediaId={id} />
          </div>
        </div>
      </div>
      {/* 출연자 목록*/}
      {/* <div>
        <h3 className="text-20 text-white ">액션 배우</h3>
        <ol className="overflow-x-scroll flex gap-3">
          {movieActionPlayers.map((player) => (
            <li
              className="pb-2 min-w-36 bg-transparent rounded-md overflow-hidden"
              key={player.id}
            >
              <div>
                <Image
                  src={`https://media.themoviedb.org/t/p/w138_and_h175_face${player.profile_path}`}
                  alt={player.name}
                  width={141}
                  height={175}
                  className="w-full"
                />
              </div>
              <div className="p-3">
                <p className="text-white">{player.name}</p>
                <p className="text-white">{player.original_name}</p>
              </div>
            </li>
          ))}
        </ol>
      </div> */}
    </div>
  );
};

export default TvShowDetail;
