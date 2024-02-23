import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = [
  '/login',
  '/signup'
]
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath = publicRoutes.includes(pathname);
  const token = request.cookies.get('token')?.value || '';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/profile/:id*',
    '/login',
    '/signup'
  ]
}