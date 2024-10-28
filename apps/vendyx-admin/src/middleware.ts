import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { validateAccessToken } from './lib/auth/actions/validate-access-token';

const ALLOWED_PATHS = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAuth = await validateAccessToken();
  const isInAllowedPaths = ALLOWED_PATHS.includes(pathname);

  // Redirect to login if not authenticated and not in allowed paths
  if (!isAuth && !isInAllowedPaths) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Do nothing if not authenticated and in allowed paths
  if (!isAuth && isInAllowedPaths) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)']
};
