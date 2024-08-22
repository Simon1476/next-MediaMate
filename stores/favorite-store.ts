import { createStore } from "zustand/vanilla";

export type FavoriteState = {
  favoriteMovies: { id: number; favorite: boolean }[];
};

export type FavoriteActions = {
  fetchFavoriteMovies: (accountId: string) => Promise<void>;
  toggleFavorite: (movieId: number) => void;
};

export type FavoriteStore = FavoriteState & FavoriteActions;

export const defaultInitState: FavoriteState = {
  favoriteMovies: [],
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
      const data = await res.json();

      const favoriteMovies = data.map((movie: any) => ({
        id: movie.id,
        favorite: true, // API로 가져온 영화는 이미 좋아요된 상태로 간주
      }));

      set(() => ({ favoriteMovies }));
    },

    // 특정 영화의 좋아요 상태를 토글
    toggleFavorite: (movieId: number) =>
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

        return { favoriteMovies: updatedFavoriteMovies };
      }),
  }));
};
