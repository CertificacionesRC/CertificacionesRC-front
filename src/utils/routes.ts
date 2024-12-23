export const ROUTES = {
  DOCUMENT_FACULTY: (faculty: string) => `/certifications/document/${faculty}`,
  DOCUMENT_SUBITEM: (id: string) => `/certifications/document/subitem/${id}`,
  DOCUMENT_ITEM: (id: string) => `/certifications/document/item/${id}`,
  DOCUMENT_PDF: (name: number) => `/certifications/document/view/${name}`,
  START_DOCUMENT: '/certifications/document/start',
  DOCUMENT: '/certifications/document',
  DOCUMENTS: '/certifications/documents',
  HISTORY: '/certifications/history',
  USERS: '/certifications/users',
  HOME: '/certifications/home',
  SIGNIN: '/auth/signin',
  LANDING: '/',
}
