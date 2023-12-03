import { ICustomUser, IRole } from './models'

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

export const IMAGE_PATHS = {
  BACKGROUNDS: {
    LANDING: '/background/landing.png',
    HOME: '/background/home.png',
  },
  LOGOS: {
    UNICAUCA: '/logos/unicauca.svg',
  },
}

export const STATUS_MOCKS: Record<string, { value: boolean; name: string; stringValue: string }> = {
  ACTIVE: {
    value: true,
    stringValue: 'true',
    name: 'Habilitado',
  },
  INACTIVE: {
    value: false,
    stringValue: 'false',
    name: 'Inhabilitado',
  },
}

export const STATUS_LIST = Object.values(STATUS_MOCKS)

export const ROLE_MOCKS: Record<string, IRole> = {
  ADMIN: {
    roleId: 1,
    roleName: 'ADMIN',
  },
  COORDINATOR: {
    roleId: 2,
    roleName: 'COORDINADOR',
  },
  SUPERUSER: {
    roleId: 3,
    roleName: 'SUPERUSUARIO',
  },
}

export const ROLE_ADAPT: Record<number, IRole> = {
  1: ROLE_MOCKS.ADMIN,
  2: ROLE_MOCKS.COORDINATOR,
  3: ROLE_MOCKS.SUPERUSER,
}

export const ROLES_LIST = Object.values(ROLE_MOCKS)

export const CUSTOM_USER_MOCK: ICustomUser = {
  email: '',
  id: '',
  name: '',
  password: '',
  status: STATUS_MOCKS.ACTIVE.value,
  role: ROLE_MOCKS.COORDINATOR,
}
