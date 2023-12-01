import { getSession } from './utils/actions'
import { NextResponse } from 'next/server'
import { ROUTES } from './utils/routes'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/auth')) {
    const session = await getSession()

    if (session) {
      return NextResponse.redirect(new URL(ROUTES.HOME, request.url))
    }
  }

  if (pathname.startsWith('/certifications')) {
    const session = await getSession()

    if (!session) {
      return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url))
    }
  }

  return NextResponse.next()
}
