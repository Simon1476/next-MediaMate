import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token } = await request.json();

  const cookieStore = cookies();
  const existingSessionId = cookieStore.get("session_id");

  if (existingSessionId) {
    return NextResponse.json(
      { message: "Session ID already exists" },
      { status: 200 }
    );
  }
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/authentication/session/new",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          request_token: token,
        }),
      }
    );
    if (!response.ok) throw new Error("Failed to create session ID");
    const data = await response.json();

    // response 객체 생성 session ID 쿠키 설정

    const res = NextResponse.json(data);
    res.cookies.set("session_id", data.session_id, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return res;
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
