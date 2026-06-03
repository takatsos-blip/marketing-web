// middleware.ts (At your project root)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Only run this security logic if the user is hitting a dashboard route
  if (pathname.startsWith("/dashboard")) {
    
    // 2. Read the secure role cookie we set during the login phase
    const userRole = request.cookies.get("user-role")?.value;

    // 3. Gatekeeper: If they aren't logged in at all, kick them back to login page
    if (!userRole) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // 4. PROXY / REWRITE LOGIC:
    // If they are a Guest trying to access the main admin dashboard path,
    // the proxy intercepts them and silently serves the assistant dashboard layout instead!
    if (userRole === "guest" && pathname === "/dashboard") {
      return NextResponse.rewrite(new URL("/dashboard/assistant", request.url));
    }
  }

  return NextResponse.next();
}

// Keep performance lightning-fast by only checking dashboard pages
export const config = {
  matcher: ["/dashboard/:path*"],
};