import { getSession } from './utils/actions'
import { NextResponse } from 'next/server'
import { ROUTES } from './utils/routes'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/auth')) {
    try {
      await getSession()
      return NextResponse.redirect(new URL(ROUTES.HOME, request.url))
    } catch (error) {
      console.error('error')
    }
  }

  if (pathname.startsWith('/certifications')) {
    try {
      await getSession()
    } catch (error) {
      return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url))
    }
  }

  return NextResponse.next()
}
