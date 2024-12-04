import { type NextRequest } from "next/server";
import { TMDBTVShow, TMDBTVShowResponse } from "@/types/tmdb";
import { NextResponse } from "next/server";
import { cookies } from "next/dist/client/components/headers";

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const accountId = cookieStore.get("accound_Id")?.value;

  let page = 1;
  let totalPages = 1;
  let allTVShows: TMDBTVShow[] = [];

  try {
    do {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${accountId}/favorite/tv?language=ko-KR&page=${page}&sort_by=created_at.asc`,
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

      const data: TMDBTVShowResponse = await response.json();

      allTVShows = allTVShows.concat(data.results);
      totalPages = data.total_pages;
      page++;

      // Optional: Adding a delay to avoid hitting API rate limits
      await new Promise((resolve) => setTimeout(resolve, 500));
    } while (page <= totalPages);
    return NextResponse.json(allTVShows);
  } catch (error) {
    console.error("Failed to fetch favorite movies:", error);
    throw new Error("Fetching favorite Movies Error occured!");
  }
}
