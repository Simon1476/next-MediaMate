import { cookies } from "next/headers";
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("session_id");
  if (!sessionId)
    return NextResponse.json(
      { message: "Session ID doesn't exists" },
      { status: 200 }
    );
  try {
    const accountResponse = await fetch(
      `https://api.themoviedb.org/3/account?api_key=${process.env.TMDB_API_KEY}&session_id=${sessionId?.value}`
    );

    if (!accountResponse.ok) {
      throw new Error(
        `Failed to fetch account data: ${accountResponse.statusText}`
      );
    }

    const accountData = await accountResponse.json();
    const res = NextResponse.json(accountData);
    console.log("accountData", accountData);
    res.cookies.set("account_id", accountData.id, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return res;
  } catch (error) {
    console.error("Error fetching account data:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
