import { cookies } from "next/headers";

export function middleware(request) {
  const token = cookies().get("token");
  const userID = cookies().get("userID");

  if ((!token || !userID) && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (token && userID && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
