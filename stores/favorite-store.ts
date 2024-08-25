import { TMDBMovie, TMDBTVShow } from "@/types/tmdb";
import { createStore } from "zustand/vanilla";

export type FavoriteState = {
  favoriteMovies: { id: number; favorite: boolean }[];
  favoriteTVShows: { id: number; favorite: boolean }[];
};

export type FavoriteActions = {
  fetchFavoriteMovies: (accountId: string) => Promise<void>;
  fetchFavoriteTVShows: (accountId: string) => Promise<void>;
  toggleFavoriteMovie: (movieId: number) => void;
  toggleFavoriteTVShow: (tvShowId: number) => void;
};

export type FavoriteStore = FavoriteState & FavoriteActions;

export const defaultInitState: FavoriteState = {
  favoriteMovies: [],
  favoriteTVShows: [],
};

export const createFavoriteStore = (
  initState: FavoriteState = defaultInitState
) => {
  return createStore<FavoriteStore>()((set) => ({
    ...initState,

    // favoriteMovies 배열을 직접 받아서 상태를 업데이트
    fetchFavoriteMovies: async (accountId: string) => {
      if (!accountId) return;
      const res = await fetch(`/api/getFavoriteMovies?accountId=${accountId}`);
      const data: TMDBMovie[] = await res.json();

      const favoriteMovies = data.map((movie) => ({
        id: movie.id,
        favorite: true, // API로 가져온 영화는 이미 좋아요된 상태로 간주
      }));

      set((state) => ({ ...state, favoriteMovies }));
    },
    fetchFavoriteTVShows: async (accountId: string) => {
      if (!accountId) return;
      const res = await fetch(`/api/getFavoriteTVShows?accountId=${accountId}`);
      const data: TMDBTVShow[] = await res.json();

      const favoriteTVShows = data.map((tvShow) => ({
        id: tvShow.id,
        favorite: true,
      }));

      set((state) => ({ ...state, favoriteTVShows }));
    },

    // 특정 영화의 좋아요 상태를 토글
    toggleFavoriteMovie: (movieId: number) =>
      set((state) => {
        const existingMovieIndex = state.favoriteMovies.findIndex(
          (movie) => movie.id === movieId
        );

        let updatedFavoriteMovies;

        if (existingMovieIndex !== -1) {
          // 영화가 favoriteMovies에 있으면 삭제
          updatedFavoriteMovies = state.favoriteMovies.filter(
            (movie) => movie.id !== movieId
          );
        } else {
          // 영화가 favoriteMovies에 없으면 추가
          updatedFavoriteMovies = [
            ...state.favoriteMovies,
            { id: movieId, favorite: true },
          ];
        }

        return { ...state, favoriteMovies: updatedFavoriteMovies };
      }),

    toggleFavoriteTVShow: (tvShowId: number) =>
      set((state) => {
        const existingTVShowIndex = state.favoriteTVShows.findIndex(
          (tvShow) => tvShow.id === tvShowId
        );

        let updatedFavoriteTVShows;

        if (existingTVShowIndex !== -1) {
          // 영화가 favoriteTVShows 있으면 삭제
          updatedFavoriteTVShows = state.favoriteTVShows.filter(
            (tvShow) => tvShow.id !== tvShowId
          );
        } else {
          // 영화가 favoriteTVShows 없으면 추가
          updatedFavoriteTVShows = [
            ...state.favoriteTVShows,
            { id: tvShowId, favorite: true },
          ];
        }

        return { ...state, favoriteTVShows: updatedFavoriteTVShows };
      }),
  }));
};
