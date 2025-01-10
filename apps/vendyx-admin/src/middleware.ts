import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { validateAccessToken } from './core/auth/actions/validate-access-token';
import { getActiveShop } from './shared/cookies/cookies';

const AUTH_PATHS = ['/login', '/signup'];
const ALLOWED_PATHS = [...AUTH_PATHS, '/', '/confirm-account'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAuth = await validateAccessToken();
  const isInAllowedPaths = ALLOWED_PATHS.includes(pathname);
  const isInAuthPaths = AUTH_PATHS.includes(pathname);

  if (isAuth && isInAuthPaths) {
    return NextResponse.redirect(new URL('/shops', request.url));
  }

  // Redirect to login if not authenticated and not in allowed paths
  if (!isAuth && !isInAllowedPaths) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const [, , shopSlug] = pathname.split('/');
  const activeShop = getActiveShop();

  // Redirect to shops if active shop is not the same as the shop in the URL
  // Petitions works depending on the active shop in cookies, so
  // we need to make sure that the active shop in cookies is the same as the shop in the URL
  if (shopSlug && shopSlug !== 'new' && activeShop?.slug !== shopSlug) {
    return NextResponse.redirect(new URL('/shops', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)']
};
