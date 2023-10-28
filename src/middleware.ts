import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { login } from '@/api';

export async function middleware(request: NextRequest) {
  const authJwt = request.cookies.get('authToken');

  if (!authJwt) {
    const response = NextResponse.next();
    response.cookies.set({
      name: 'authToken',
      value: await login(),
      path: '/',
    });
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
