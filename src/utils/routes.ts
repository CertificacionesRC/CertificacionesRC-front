export const ROUTES = {
  DOCUMENT_FACULTY: (faculty: string) => `/home/${faculty}`,
  DOCUMENT_SUBITEM: (id: string) => `/home/subitem/${id}`,
  DOCUMENT_ITEM: (id: string) => `/home/item/${id}`,
  DOCUMENT_PDF: (name: string) => `/home/view/${name}`,
  START_DOCUMENT: '/home/start',
  DOCUMENT: '/document',
  HISTORY: '/history',
  SIGNIN: '/signin',
  USERS: '/users',
  HOME: '/home',
}
