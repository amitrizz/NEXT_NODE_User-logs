import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname.toLowerCase();
    const isPublicPath = ['/login', '/signup'].includes(path);

    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    // If the user is logged in, add a custom header for the client to detect
    const response = NextResponse.next();
    if (token) {
        response.headers.set('x-user-logged-in', 'true');
    }
    return response;
}

// Apply to specific routes
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
    ],
};
