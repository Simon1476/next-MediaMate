import { options } from "@/constants";
import {
  MovieCredits,
  MovieDetail,
  TMDBMovieResponse,
  TMDBTVShowResponse,
} from "@/types/tmdb";

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

export async function getMovieDetail(id: number): Promise<MovieDetail> {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch popular movies");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching movie detail:", error);
    throw new Error("Error fetching movie detail");
  }
}

export async function getMovieCredits(id: number): Promise<MovieCredits> {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch credits");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw new Error("Error fetching movie credits");
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
