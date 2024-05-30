"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = cookies().get("token");
  const userID = cookies().get("userID");
  if (
    (!token || !userID) &&
    pathname !== "/login" &&
    pathname !== "/register"
  ) {
    //   return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token && userID && (pathname === "/login" || pathname === "/register")) {
    //   return NextResponse.next();
    return NextResponse.redirect(new URL("/", request.url));
  }

  //   if (!token || !userID) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }

  //   return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
