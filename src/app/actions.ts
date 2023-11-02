'use server'

import { cookies } from 'next/headers'

export async function create() {
  cookies().set({
    name: 'token',
    value: 'lee',
    httpOnly: true,
  })
}

export async function destroy() {
  cookies().delete('token')
}
