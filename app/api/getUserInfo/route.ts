import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("session_id")?.value;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/account/21416335?session_id=${sessionId}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch request token");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      // Error 인스턴스가 아닐 경우, 기본 메시지를 사용
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
