export type TAuthorities = 'ADMIN' | 'COORDINADOR' | 'SUPERUSUARIO'
export interface IAuthority {
  authority: TAuthorities
}

export interface IUser {
  username: string
  enabled: boolean
  accountNonLocked: boolean
  accountNonExpired: boolean
  authorities: IAuthority[]
  credentialsNonExpired: boolean
}

export interface ISession {
  mensaje: string
  token: string
  user: IUser
  id: number
}

export interface IItem {
  id: string
  content?: string
  guide?: string
  name: string
  subItems: ISubItem[]
}

export interface ISubItem {
  id: string
  content?: string
  guide?: string
  name: string
  files?: []
  subItems: ISubItem[]
}

export interface IRole {
  roleId: number
  roleName: string
}
export interface ICustomUser {
  email: string
  id: string
  name: string
  role: IRole
  status: string
  password: string
}

export interface IProgramType {
  id: number
  name: string
  type: string
  faculty: string
  registroCalificado?: IRegistroCalificado
}

export interface IRegistroCalificado {}
