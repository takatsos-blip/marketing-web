// proxy.ts (At your project root)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
 
  // Read the secure role cookie we set during the login phase
  const userRole = request.cookies.get("user-role")?.value;

  // 1. GUEST ACCESS CHECK: Run security logic if user is hitting a dashboard route
  if (pathname.startsWith("/dashboard")) {
   
    // Gatekeeper: If they aren't logged in at all, kick them back to the login page
    if (!userRole) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // PROXY / REWRITE LOGIC:
    // If they are a Guest trying to access the main admin dashboard path,
    // the proxy intercepts them and silently serves the assistant dashboard layout instead!
    if (userRole === "guest" && pathname === "/dashboard") {
      return NextResponse.rewrite(new URL("/dashboard/assistant", request.url));
    }
  }

  // 2. REVERSE GATEKEEPER (Remember Logged In Users):
  // If they already have a valid user-role cookie but try to access the login page manually,
  // skip the login screen entirely and fast-track them straight into the dashboard!
  if (pathname.startsWith("/auth/login") && userRole) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Optimized matching to run on both dashboard paths AND the login path
export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};