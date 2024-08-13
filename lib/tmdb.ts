import { options } from "@/constants";
import {
  MovieCredits,
  MovieDetail,
  PersonDetail,
  PopularPeople,
  TMDBMovieResponse,
  TMDBTVShowResponse,
  TVShowDetail,
} from "@/types/tmdb";

export async function getMovies(url: string): Promise<TMDBMovieResponse> {
  try {
    const res = await fetch(url, options);

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

export async function getTvShows(url: string): Promise<TMDBTVShowResponse> {
  try {
    const res = await fetch(url, options);
    https: if (!res.ok) {
      throw new Error("Failed to fetch popular TvShows");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching TvShows:", error);
    throw new Error("Error fetching TvShows");
  }
}

export async function getTvshowDetail(id: number): Promise<TVShowDetail> {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=ko-KR`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Tvshow Detail");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching Tvshow detail:", error);
    throw new Error("Error fetching Tvshow detail");
  }
}

export async function getPopularPeople(page: number): Promise<PopularPeople> {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/popular?language=ko-KR&page=${page}`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Popular people");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching Popular people", error);
    throw new Error("Error fetching Popular people");
  }
}
