import {
  TMDBMovie,
  TMDBMovieDetail,
  TMDBTVShow,
  TMDBTVShowDetail,
} from "@/types/tmdb";
import { createStore } from "zustand/vanilla";

export type FavoriteState = {
  favoriteMovies: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    favorite: boolean;
    overview: string;
  }[];
  favoriteTVShows: {
    id: number;
    name: string;
    poster_path: string | null;
    first_air_date: string;
    overview: string;
    favorite: boolean;
  }[];
};

export type FavoriteActions = {
  fetchFavoriteMovies: () => Promise<void>;
  fetchFavoriteTVShows: () => Promise<void>;
  toggleFavoriteMovie: (movieId: number) => Promise<void>;
  toggleFavoriteTVShow: (tvShowId: number) => Promise<void>;
};

export type FavoriteStore = FavoriteState & FavoriteActions;

export const defaultInitState: FavoriteState = {
  favoriteMovies: [],
  favoriteTVShows: [],
};

export const createFavoriteStore = (
  initState: FavoriteState = defaultInitState
) => {
  return createStore<FavoriteStore>()((set, get) => ({
    ...initState,

    fetchFavoriteMovies: async () => {
      const res = await fetch(`/api/getFavoriteMovies`);
      const data: TMDBMovie[] = await res.json();
      const favoriteMovies = data.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        favorite: true,
        overview: movie.overview,
      }));
      set((state) => ({ ...state, favoriteMovies }));
    },
    fetchFavoriteTVShows: async () => {
      const res = await fetch(`/api/getFavoriteTVShows`);
      const data: TMDBTVShow[] = await res.json();

      const favoriteTVShows = data.map((tvShow) => ({
        id: tvShow.id,
        name: tvShow.name,
        poster_path: tvShow.poster_path,
        first_air_date: tvShow.first_air_date,
        overview: tvShow.overview,
        favorite: true,
      }));
      set((state) => ({ ...state, favoriteTVShows }));
    },

    toggleFavoriteMovie: async (movieId: number) => {
      const state = get();
      const existingMovieIndex = state.favoriteMovies.findIndex(
        (movie) => movie.id === movieId
      );
      const isFavorite = existingMovieIndex === -1;

      try {
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mediaId: movieId,
            mediaType: "movie",
            favorite: isFavorite,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to toggle favorite");
        }

        let movieData: TMDBMovieDetail;
        if (isFavorite) {
          const movieDetailResponse = await fetch(
            `/api/movieDetail?movieId=${movieId}`
          );
          if (!movieDetailResponse.ok) {
            throw new Error("Failed to fetch movie details");
          }
          movieData = await movieDetailResponse.json();
          movieData.favorite = true;
        }

        set((state) => {
          const updatedFavoriteMovies = isFavorite
            ? [...state.favoriteMovies, movieData]
            : state.favoriteMovies.filter((movie) => movie.id !== movieId);

          return { ...state, favoriteMovies: updatedFavoriteMovies };
        });
      } catch (error) {
        console.error("Failed to toggle favorite:", error);
      }
    },

    toggleFavoriteTVShow: async (tvShowId: number) => {
      const state = get();
      const existingTVShowIndex = state.favoriteTVShows.findIndex(
        (tvShow) => tvShow.id === tvShowId
      );
      const isFavorite = existingTVShowIndex === -1;

      try {
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mediaId: tvShowId,
            mediaType: "tv",
            favorite: isFavorite,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to toggle favorite");
        }
        let tvShowData: TMDBTVShowDetail;
        if (isFavorite) {
          const tvShowDetailResponse = await fetch(
            `/api/tvShowDetail?tvShowId=${tvShowId}`
          );
          if (!tvShowDetailResponse.ok) {
            throw new Error("Failed to fetch TV show details");
          }
          tvShowData = await tvShowDetailResponse.json();
          tvShowData.favorite = true;
        }
        set((state) => {
          const updatedFavoriteTVShows = isFavorite
            ? [...state.favoriteTVShows, tvShowData] // 즐겨찾기 추가
            : state.favoriteTVShows.filter((tvShow) => tvShow.id !== tvShowId); // 즐겨찾기 제거

          return { ...state, favoriteTVShows: updatedFavoriteTVShows };
        });
      } catch (error) {
        console.error("Failed to toggle favorite:", error);
      }
    },
  }));
};
