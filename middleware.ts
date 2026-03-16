import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Pass through - auth handled client-side
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
