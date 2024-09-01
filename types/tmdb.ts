// types/tmdb.ts

export type TMDBMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TMDBMovieResponse = {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
};

export type MovieDetail = {
  id: number;
  adult: boolean;
  original_title: string;
  title: string;
  release_date: string;
  overview: string;
  genres: {
    id: number;
    name: string;
  }[];
  runtime: number;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
};

export type CastMember = {
  id: string;
  adult: boolean;
  gender: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type MovieCredits = {
  id: string;
  cast: CastMember[];
};

// Tv Show
export type TMDBTVShow = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
};

export type TMDBTVShowResponse = {
  page: number;
  results: TMDBTVShow[];
  total_pages: number;
  total_results: number;
};

export type Creator = {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
};

export type TVShowDetail = {
  id: string;
  adult: boolean;
  backdrop_path: string;
  created_by: Creator[] | [];
  episode_run_time: [number];
  first_air_date: string;
  genres: { id: number; name: string }[];
  original_name: string;
  name?: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type KnownForMedia = {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

// 배우 타입
export type PopularPerson = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: KnownForMedia[];
};

export type PopularPeople = {
  page: number;
  results: PopularPerson[];
  total_pages: number;
  total_results: number;
};

export type PersonDetail = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
};

export type MovieSearchResult = TMDBMovie & {
  media_type: string;
};

export type TVSearchResult = TMDBTVShow & {
  media_type: string;
};

export type PersonSearchResult = PopularPerson & {
  media_type: string;
};
