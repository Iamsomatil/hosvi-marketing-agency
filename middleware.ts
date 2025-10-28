import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Allow static assets & special files to bypass auth
  const isStaticAsset =
    /\.(?:png|jpg|jpeg|webp|svg|gif|ico|txt|json|xml|csv|woff2?|ttf|eot|mp4|webm)$/i.test(
      pathname
    );
  const isSpecial =
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/favicon.ico";
  if (isStaticAsset || isSpecial) {
    return NextResponse.next();
  }
  const token = await getToken({ req: request });

  console.log("Middleware - Path:", pathname);
  console.log("Middleware - Token:", {
    hasToken: !!token,
    userId: token?.sub,
    userRole: token?.role,
    orgId: token?.orgId,
  });

  // Public routes that don't require authentication
  // Note: handle root '/' explicitly; do NOT include '/' in startsWith array
  const publicPaths = [
    "/login",
    "/register",
    "/api/auth",
    "/api/stripe",
    "/api/trial",
    "/about",
    "/trial",
    "/legal",
    "/success",
    "/cancel",
    "/terms",
    "/privacy",
    "/admin/login",
  ];
  const isPublicPath =
    pathname === "/" || publicPaths.some((path) => pathname.startsWith(path));

  if (isPublicPath) {
    return NextResponse.next();
  }

  // If no token and not a public path, redirect to login
  if (!token) {
    console.log("No token found, redirecting to login");
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Handle admin routes
  const isAdminPath = pathname.startsWith("/admin");
  const isAdmin = token.role === "ADMIN";

  if (isAdminPath && !isAdmin) {
    console.log(
      "Non-admin user trying to access admin area, redirecting to dashboard"
    );
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Handle dashboard routes
  const isDashboardPath = pathname.startsWith("/dashboard");
  const isClient = token.role === "CLIENT" || !token.role; // Default to client if no role

  if (isDashboardPath && !isClient) {
    console.log("Non-client user trying to access dashboard, checking role...");
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude Next internals and any path containing a dot (treat as asset)
    "/((?!_next/static|_next/image|favicon.ico|.*..*).*)",
  ],
};
