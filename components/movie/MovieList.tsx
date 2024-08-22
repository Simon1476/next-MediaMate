import { TMDBMovie } from "@/types/tmdb";
import MovieCard from "./MovieCard";
import Pagination from "../pagination/Pagination";

const MovieList = ({
  movieLists,
  totalPage,
  currentPage,
}: {
  movieLists: TMDBMovie[];
  totalPage: number;
  currentPage: number;
}) => {
  return (
    <>
      <div className="flex flex-wrap gap-8 justify-evenly xl:justify-between">
        {movieLists.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination totalPage={totalPage} currentPage={currentPage} />
    </>
  );
};

export default MovieList;
