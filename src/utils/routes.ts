export const ROUTES = {
  DOCUMENT_FACULTY: (faculty: string) => `/document/${faculty}`,
  DOCUMENT_SUBITEM: (id: string) => `/document/subitem/${id}`,
  DOCUMENT_ITEM: (id: string) => `/document/item/${id}`,
  START_DOCUMENT: '/document/start',
  DOCUMENT: '/document',
  HISTORY: '/certificaciones/history',
  SIGNIN: '/signin',
  USERS: '/users',
  HOME: '/',
}
