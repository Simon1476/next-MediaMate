// app/api/getSessionId/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("session_id");
  return NextResponse.json({ sessionId: sessionId ? sessionId.value : null });
}
