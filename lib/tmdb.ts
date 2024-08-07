import { options } from "@/constants";
import { TMDBMovieResponse, TMDBTVShowResponse } from "@/types/tmdb";

export async function getMovies(
  endpoint: string,
  page: number = 1
): Promise<TMDBMovieResponse> {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${endpoint}?language=ko-KR&page=${page}`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch popular movies");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Error fetching movies");
  }
}

export async function getTvShows(
  endpoint: string,
  page: number = 1
): Promise<TMDBTVShowResponse> {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${endpoint}?language=ko-KR&page=${page}`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch popular TvShows");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching TvShows:", error);
    throw new Error("Error fetching TvShows");
  }
}
