import { options } from "@/constants";
import { TMDBMovieResponse } from "@/types/tmdb";

export async function getMovies(
  endpoint: string,
  page: number = 1
): Promise<TMDBMovieResponse> {
  console.log(endpoint, page);
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
