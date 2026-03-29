import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createSessionValue, getCookieName, isValidPassword } from "@/lib/auth";

export async function POST(request) {
  const { password } = await request.json();
  if (!isValidPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  cookies().set(getCookieName(), createSessionValue(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 12
  });

  return NextResponse.json({ ok: true });
}
