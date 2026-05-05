import { H3Event, getCookie, setCookie, deleteCookie } from 'h3'

const SESSION_COOKIE = 'auth_session'

export function setUserSession(event: H3Event, userId: string) {
  // In a real app, you would encrypt this or use a proper session store/JWT.
  // For MVP, we simply store the user ID in an HttpOnly cookie.
  setCookie(event, SESSION_COOKIE, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/'
  })
}

export function getUserSession(event: H3Event): string | null {
  return getCookie(event, SESSION_COOKIE) || null
}

export function clearUserSession(event: H3Event) {
  deleteCookie(event, SESSION_COOKIE, { path: '/' })
}
