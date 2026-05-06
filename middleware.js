import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Authenticated users hitting /login → send them forward
    if (req.nextUrl.pathname === '/login' && req.nextauth.token) {
      return NextResponse.redirect(new URL('/onboarding', req.url));
    }
    return NextResponse.next();
  },
  {
    pages: { signIn: '/login' },
    callbacks: {
      authorized({ req, token }) {
        if (req.nextUrl.pathname === '/login') return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding', '/login'],
};
