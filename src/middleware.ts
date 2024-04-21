import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let token = request.cookies.get("token")?.value || "";

  const authPath =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";

  const protectedPath =
    request.nextUrl.pathname === "/admin-dashboard" ||
    request.nextUrl.pathname === "/user-dashboard";
  let decodedToken: any = jsonwebtoken.decode(token);

  if (token) {
    if (decodedToken?.isAdmin) {
      if (authPath || request.nextUrl.pathname === "/user-dashboard") {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
      }
    } else {
      if (authPath || request.nextUrl.pathname === "/admin-dashboard") {
        return NextResponse.redirect(new URL("/user-dashboard", request.url));
      }
    }
  } else {
    if (protectedPath) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/login", "/register", "/admin-dashboard", "/user-dashboard"],
};
