import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { TMDBTVShowDetail } from "@/types/tmdb";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tvShowId = searchParams.get("tvShowId");

  if (!tvShowId) {
    return NextResponse.json(
      { error: "tvShowId is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${tvShowId}?language=ko-KR`,
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

    const tvShowDetail = await response.json();

    // 필요한 데이터만 선택
    const filteredTvshowDetail: TMDBTVShowDetail = {
      id: tvShowDetail.id,
      name: tvShowDetail.name,
      poster_path: tvShowDetail.poster_path,
      first_air_date: tvShowDetail.first_air_date,
      overview: tvShowDetail.overview,
      favorite: false,
    };

    return NextResponse.json(filteredTvshowDetail);
  } catch (error) {
    console.error("Error fetching tvShow details:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
