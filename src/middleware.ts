// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from './auth';

// export async function middleware(request: NextRequest) {
//   const session = await auth();
//   if (['/chat'].includes(request.nextUrl.pathname) && !session) {
//     return NextResponse.redirect('http://localhost:3000/login');
//   }
// }

// 이전 코드
import { NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware() {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect('http://localhost:3000/login');
  }
}

export const config = {
  matcher: ['/chat'],
};
