import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname
    
    // Admin routes protection
    if (path.startsWith("/admin")) {
      // If trying to access admin login page while already logged in as admin
      if (path === "/admin/login" && 
          (token?.role === "ADMIN" || token?.role === "SUPER_ADMIN" || token?.role === "EMPLOYEE")) {
        return NextResponse.redirect(new URL("/admin", req.url))
      }
      
      // If not authenticated, redirect to admin login
      if (!token) {
        // Allow access to login page
        if (path === "/admin/login") {
          return null
        }
        return NextResponse.redirect(new URL("/admin/login", req.url))
      }

      // If authenticated but not admin
      if (token.role !== "ADMIN" && 
          token.role !== "SUPER_ADMIN" &&
          token.role !== "EMPLOYEE") {
        // If they are on the login page, let them sign in (maybe they want to switch accounts)
        // or redirect to home? 
        // Better: redirect to home or show error
        return NextResponse.redirect(new URL("/", req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // For admin routes, we handle logic in the middleware function above
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return true // We'll handle redirects manually
        }
        // For other protected routes
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/(store)/orden/:path*"],
}
