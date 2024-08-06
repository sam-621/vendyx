import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { validateAccessToken } from './lib/auth/actions';

const ALLOWED_PATHS = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAuth = await validateAccessToken();
  const isInAllowedPaths = ALLOWED_PATHS.includes(pathname);

  if (!isAuth && !isInAllowedPaths) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)']
};
