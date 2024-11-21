import { TMDBMovie, TMDBTVShow } from "@/types/tmdb";
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
  fetchFavoriteMovies: (accountId: string) => Promise<void>;
  fetchFavoriteTVShows: (accountId: string) => Promise<void>;
  toggleFavoriteMovie: (movieId: number, accountId: string) => Promise<void>;
  toggleFavoriteTVShow: (tvShowId: number, accountId: string) => Promise<void>;
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

    fetchFavoriteMovies: async (accountId: string) => {
      if (!accountId) return;
      const res = await fetch(`/api/getFavoriteMovies?accountId=${accountId}`);
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
    fetchFavoriteTVShows: async (accountId: string) => {
      if (!accountId) return;
      const res = await fetch(`/api/getFavoriteTVShows?accountId=${accountId}`);
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

    toggleFavoriteMovie: async (movieId: number, accountId: string) => {
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
            accountId,
            favorite: isFavorite,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to toggle favorite");
        }

        set((state) => {
          const updatedFavoriteMovies = isFavorite
            ? [
                ...state.favoriteMovies,
                {
                  id: movieId,
                  title: "",
                  poster_path: "",
                  release_date: "",
                  favorite: true,
                  overview: "",
                },
              ]
            : state.favoriteMovies.filter((movie) => movie.id !== movieId);

          return { ...state, favoriteMovies: updatedFavoriteMovies };
        });
      } catch (error) {
        console.error("Failed to toggle favorite:", error);
      }
    },

    toggleFavoriteTVShow: async (tvShowId: number, accountId: string) => {
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
            accountId,
            favorite: isFavorite,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to toggle favorite");
        }

        set((state) => {
          const updatedFavoriteTVShows = isFavorite
            ? [
                ...state.favoriteTVShows,
                {
                  id: tvShowId,
                  name: "",
                  poster_path: "",
                  first_air_date: "",
                  overview: "",
                  favorite: true,
                },
              ]
            : state.favoriteTVShows.filter((tvShow) => tvShow.id !== tvShowId);

          return { ...state, favoriteTVShows: updatedFavoriteTVShows };
        });
      } catch (error) {
        console.error("Failed to toggle favorite:", error);
      }
    },
  }));
};
