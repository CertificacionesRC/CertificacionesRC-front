export const ROUTES = {
  DOCUMENT_FACULTY: (faculty: string) => `/document/${faculty}`,
  DOCUMENT_SUBITEM: (id: string) => `/document/subitem/${id}`,
  DOCUMENT_ITEM: (id: string) => `/document/item/${id}`,
  DOCUMENT_PDF: (name: string) => `/document/view/${name}`,
  START_DOCUMENT: '/document/start',
  DOCUMENT: '/document',
  HISTORY: '/history',
  SIGNIN: '/signin',
  USERS: '/users',
  HOME: '/home',
}
