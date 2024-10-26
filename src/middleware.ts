import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const adminRoutes = ["/admin"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const nextCookies = await cookies();
  const sessionCookie = nextCookies.get("session")?.value;
  const role = nextCookies.get("role")?.value;
  const isAdminRoute = adminRoutes.includes(path);

  // If the user is on the login page and has a valid session cookie
  if (path === "/login") {
    if (sessionCookie) {
      // Redirect based on user role if logged in
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", req.nextUrl));
      } else {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
    }
  }

  // Bypass the middleware for the login route
  if (path === "/login") {
    return NextResponse.next();
  }

  // Redirect to login if no session cookie is found
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect admin user from "/" to "/admin" only if they are currently on "/"
  if (path === "/" && role === "admin") {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  // Check if the user has admin access for admin routes
  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Allow access to admin route if the user is an admin
  if (isAdminRoute && role === "admin") {
    return NextResponse.next();
  }

  // Allow access to other routes for non-admin users
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
