import { getMovieCredits, getMovieDetail } from "@/lib/tmdb";
import { CastMember } from "@/types/tmdb";
import Image from "next/image";

const MovieDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return `${hours}시간 ${minutes}분`;
  };

  const movieDetail = await getMovieDetail(id);
  const genres = movieDetail.genres.map((genre) => genre);

  const movieCredits = await getMovieCredits(id);

  const movieActionPlayers: CastMember[] = movieCredits.cast.filter(
    (cast) => cast.known_for_department === "Acting"
  );

  return (
    <div
      className={`bg-cover bg-no-repeat bg-[url('https://image.tmdb.org/t/p/w1280${movieDetail.backdrop_path}')]'`}
    >
      <div className={`flex gap-16`}>
        <Image
          src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetail.poster_path}`}
          alt={movieDetail.title}
          width={300}
          height={450}
        />
        {/* 영화 상세 정보 */}
        <div className="flex flex-col gap-4">
          {/* 제목에 font-bold 추가 */}
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
              {movieDetail.vote_average}
            </span>
            <span className="text-20">({movieDetail.vote_count})</span>
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
        </div>
      </div>
      {/* 출연자 목록*/}
      <div>
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
      </div>
    </div>
  );
};

export default MovieDetail;
