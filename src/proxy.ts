import { NextRequest } from 'next/server';
import { localizationProxy } from './components/internationalization/proxy';

// Matcher ignoring `/_next/`, `/api/`, and static files
export const config = {
  matcher: ['/((?!api|_next|_static|favicon.ico|riyal.svg|shoes|static|.*\\.[a-zA-Z0-9]+$).*)'],
};

export function proxy(request: NextRequest) {
  return localizationProxy(request);
}
