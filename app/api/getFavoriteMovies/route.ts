import { type NextRequest } from "next/server";
import { TMDBMovie, TMDBMovieResponse } from "@/types/tmdb";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accountId = searchParams.get("accountId");

  let page = 1;
  let totalPages = 1;
  let allMovies: TMDBMovie[] = [];

  try {
    do {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${accountId}/favorite/movies`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching page ${page}: ${response.statusText}`);
      }

      const data: TMDBMovieResponse = await response.json();

      allMovies = allMovies.concat(data.results);
      totalPages = data.total_pages;
      page++;

      // Optional: Adding a delay to avoid hitting API rate limits
      await new Promise((resolve) => setTimeout(resolve, 500));
    } while (page <= totalPages);
    return NextResponse.json(allMovies);
  } catch (error) {
    console.error("Failed to fetch favorite movies:", error);
    throw new Error("Fetching favorite Movies Error occured!");
  }
}
