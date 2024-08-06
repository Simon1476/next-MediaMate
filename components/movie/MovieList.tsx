import { TMDBMovie } from "@/types/tmdb";
import MovieCard from "./MovieCard";

const MovieList = ({ movieLists }: { movieLists: TMDBMovie[] }) => {
  return (
    <div className="flex flex-wrap gap-8 justify-center lg:justify-between">
      {movieLists.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
