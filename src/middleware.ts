import { getSession } from './utils/actions'
import { NextResponse } from 'next/server'
import { ROUTES } from './utils/routes'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname === ROUTES.SIGNIN) {
    const session = await getSession()

    if (session) {
      return NextResponse.redirect(new URL(ROUTES.DOCUMENT, request.url))
    }
  }

  if (pathname.startsWith(ROUTES.DOCUMENT)) {
    const session = await getSession()

    if (!session) {
      return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url))
    }
  }

  if (pathname.startsWith('/certificaciones')) {
    const session = await getSession()

    if (!session) {
      return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url))
    }
  }

  if (pathname === ROUTES.USERS) {
    const session = await getSession()

    if (!session) {
      return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url))
    }
  }

  return NextResponse.next()
}
