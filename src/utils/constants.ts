import { ICustomUser } from './models'

export const IMAGE_PATHS = {
  BACKGROUNDS: {
    LANDING: '/background/landing.png',
    HOME: '/background/home.png',
  },
  LOGOS: {
    UNICAUCA: '/logos/unicauca.svg',
  },
}

export const STATUS_MOCKS = {
  ACTIVE: {
    value: true,
    name: 'Habilitado',
  },
  INACTIVE: {
    value: false,
    name: 'Inhabilitado',
  },
}

export const ROLE_MOCKS = {
  ADMIN: {
    value: 1,
    name: 'Administrador',
  },
  COORDINATOR: {
    value: 2,
    name: 'Coordinador',
  },
  SUPERUSER: {
    value: 3,
    name: 'Superusuario',
  },
}

export const roleList = () => {
  return Object.values(ROLE_MOCKS).map((role) => role)
}

export const CUSTOM_USER_MOCK: ICustomUser = {
  email: '',
  id: '',
  name: '',
  password: '',
  status: false,
  role: {
    roleId: ROLE_MOCKS['COORDINATOR'].value,
    roleName: ROLE_MOCKS['COORDINATOR'].name,
  },
}

export const ROUTES = {
  DOCUMENT_FACULTY: (faculty: string) => `/certifications/document/${faculty}`,
  DOCUMENT_ITEM: (id: string) => `/certifications/document/item/${id}`,
  DOCUMENT_PDF: (name: string) => `/certifications/document/view/${name}`,
  DOCUMENT_SUBITEM: (id: string) => `/certifications/document/subitem/${id}`,
  DOCUMENT: '/certifications/document',
  HISTORY: '/certifications/history',
  HOME: '/certifications/home',
  LANDING: '/',
  SIGNIN: '/auth/signin',
  START_DOCUMENT: '/certifications/document/start',
  USERS: '/certifications/users',
}
