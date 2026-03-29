import { NextResponse } from "next/server";
import { getCookieName, isValidSession } from "@/lib/auth";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get(getCookieName())?.value;
  if (!cookieValue || !isValidSession(cookieValue)) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
