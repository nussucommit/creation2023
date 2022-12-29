import { NextResponse } from 'next/server';
import { CHALLENGE_LINKS } from './constants/navbarLinks';

function middleware(request) {
  const currentEnv = process.env.ENV;

  if (
    currentEnv === 'PROD'
    && request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301,
    );
  }

  const url = request.nextUrl.clone();
  if (url.pathname === '/challenges') {
    const firstChallengePath = CHALLENGE_LINKS[0].path;
    url.pathname = firstChallengePath;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export default middleware;
