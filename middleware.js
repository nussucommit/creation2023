import { NextResponse } from 'next/server';
import { CHALLENGE_LINKS } from './constants/navbarLinks';

function middleware(request) {
  const url = request.nextUrl.clone();
  if (url.pathname === '/challenges') {
    const firstChallengePath = CHALLENGE_LINKS[0].path;
    url.pathname = firstChallengePath;
    return NextResponse.redirect(url);
  }

  return NextResponse.rewrite(url);
}

export default middleware;
