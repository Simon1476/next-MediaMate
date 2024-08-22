import { getSearchAll } from "@/lib/tmdb";
import { MovieSearchResult, TVSearchResult } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const query = searchParams.query;

  const data = await getSearchAll(query);

  const movies: MovieSearchResult[] = data.results
    .filter((item: any) => item.media_type === "movie")
    .filter((item: any) => item.poster_path !== null);

  const tvShows: TVSearchResult[] = data.results.filter(
    (item: any) => item.media_type === "tv"
  );
  const people = data.results.filter(
    (item: any) => item.media_type === "person"
  );

  return (
    <div>
      <h1 className="text-white font-bold text-32 mb-8 max-[460px]:text-center">
        {`"${query}" 검색 결과`}{" "}
      </h1>
      <div className="flex flex-col gap-4">
        {movies.length > 0 && (
          <div>
            <h1 className="text-white font-bold text-32 mb-4 max-[460px]:text-center">
              영화
            </h1>
            <div className="grid grid-cols-responsive gap-4 max-[460px]:place-items-center">
              {movies.map((movie) => (
                <div key={movie.id}>
                  <Link href={`/movie/${movie.id}`}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      width={300}
                      height={150}
                      className="rounded-md"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {tvShows.length > 0 && (
          <div>
            <h1 className="text-white font-bold text-32 mb-4">TV</h1>
            <div className="grid grid-cols-responsive gap-4">
              {tvShows.map((tvShow) => (
                <div key={tvShow.id}>
                  <Link href={`/tv/${tvShow.id}`}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w220_and_h330_face${tvShow.poster_path}`}
                      alt={tvShow.name}
                      width={220}
                      height={150}
                      className="rounded-md"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
