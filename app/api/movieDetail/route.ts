import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { TMDBMovieDetail } from "@/types/tmdb";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const movieId = searchParams.get("movieId");

  if (!movieId) {
    return NextResponse.json({ error: "movieId is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const movieDetail = await response.json();

    // 필요한 데이터만 선택
    const filteredMovieDetail: TMDBMovieDetail = {
      id: movieDetail.id,
      title: movieDetail.title,
      poster_path: movieDetail.poster_path,
      release_date: movieDetail.release_date,
      overview: movieDetail.overview,
      favorite: false,
    };

    return NextResponse.json(filteredMovieDetail);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
