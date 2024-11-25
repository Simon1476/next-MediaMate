"use client";

import { TMDBMovie } from "@/types/tmdb";
import MovieCard from "./MovieCard";
import Pagination from "../pagination/Pagination";
import { useState, useEffect } from "react";
import MovieSkeleton from "../MovieSkeleton";

const MovieList = ({
  movieLists,
  totalPage,
  currentPage,
}: {
  movieLists: TMDBMovie[];
  totalPage: number;
  currentPage: number;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [movieLists, currentPage]);

  return (
    <>
      {isLoading ? (
        <MovieSkeleton />
      ) : (
        <div className="grid gap-4 grid-movie-responsive">
          {movieLists.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} priority={index === 0} />
          ))}
        </div>
      )}
      <Pagination totalPage={totalPage} currentPage={currentPage} />
    </>
  );
};

export default MovieList;
