"use server";

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
import { cookies } from "next/headers";

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
      throw new Error("Failed to fetch movie detail");
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

    if (!res.ok) {
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

export async function getPersonDetail(id: number): Promise<PersonDetail> {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${id}?language=en-US`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Person Detail");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching  Person Detail", error);
    throw new Error("Error fetching  Person Detail");
  }
}

export async function getSearchAll(query: string, page: number = 1) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        query
      )}&include_adult=true&language=ko-KR&page=${page}`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch movies, TV shows and people");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching  movies, TV shows and people", error);
    throw new Error("Error fetching  movies, TV shows and people");
  }
}

export async function rateMovie(movieId: number, rate: number) {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("session_id")?.value;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-Type": "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ value: rate }),
  };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?session_id=${sessionId}`,
      options
    );
    if (!res.ok) {
      throw new Error("Failed to Rate Movie");
    }

    return await res.json();
  } catch (error) {
    console.error("Error Rate movie", error);
    throw new Error("Error Rate movie");
  }
}

export async function getFavoriteMovies(
  currentPage: number = 1
): Promise<TMDBMovieResponse> {
  const cookieStore = cookies();
  const accountId = cookieStore.get("accound_id")?.value;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?language=ko-KR&page=${currentPage}&sort_by=created_at.asc`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch favorite movies");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    throw new Error("Error fetching favorite movies");
  }
}
