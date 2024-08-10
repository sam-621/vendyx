import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { validateAccessToken } from './lib/auth/actions';
import { shopService } from './lib/shared/api';

const ALLOWED_PATHS = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAuth = await validateAccessToken();
  const isInAllowedPaths = ALLOWED_PATHS.includes(pathname);

  console.log({
    isAuth
  });

  // Redirect to login if not authenticated and not in allowed paths
  if (!isAuth && !isInAllowedPaths) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Do nothing if not authenticated and in allowed paths
  if (!isAuth && isInAllowedPaths) {
    return NextResponse.next();
  }

  const shops = await shopService.getAll();
  const shop = shops.items[0];

  if (isAuth && !pathname.startsWith(`/shops/${shop.slug}`)) {
    return NextResponse.redirect(new URL(`/shops/${shop.slug}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)']
};
