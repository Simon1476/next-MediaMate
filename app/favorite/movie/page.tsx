import { getFavoriteMovies } from "@/lib/tmdb";
import FavoriteMediaList from "@/components/FavoriteMediaList";

const FavoriteMovie = async () => {
  return <FavoriteMediaList mediaType="movie" />;
};

export default FavoriteMovie;
