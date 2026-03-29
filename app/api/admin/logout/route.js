import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCookieName } from "@/lib/auth";

export async function POST() {
  cookies().set(getCookieName(), "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}
