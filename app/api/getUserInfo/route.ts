import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("session_id")?.value;
  const accountId = cookieStore.get("account_id")?.value;

  if (!sessionId || !accountId) {
    return NextResponse.json(
      { message: "Session ID or Account ID doesn't exists" },
      { status: 200 }
    );
  }
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/account/${accountId}?session_id=${sessionId}`,
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

    const res = NextResponse.json(data);
    res.cookies.set("account_id", data.id, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return res;
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
