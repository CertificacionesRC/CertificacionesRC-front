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
  state?: string
  guide?: string
  name: string
  subItems: ISubItem[]
}

export interface ISubItem {
  id: string
  content?: string
  state?: string
  guide?: string
  name: string
  subItems: ISubItem[]
}

export interface IAnexo {
  contenido: string
  id: string
  registroCalificado: IQualifiedRegistration
}

export interface IObservacion {
  contenido: string
  id: string
  registroCalificado: IQualifiedRegistration
}

export interface IRole {
  roleId: number
  roleName: string
}

export interface ICustomUser {
  email: string
  id: string
  name: string
  password: string
  role: IRole
  status: boolean
}

export interface IProgramType {
  faculty: string
  id: number
  name: string
  registroCalificado: IQualifiedRegistration
  type: string
}

export interface IAcademicProgram {
  faculty: string
  id: number
  name: string
  qualifiedRegistration?: IQualifiedRegistration
  type: string
}

export interface IQualifiedRegistration {
  academicProgram?: IAcademicProgram
  author?: string
  collaborators?: string[]
  createDate?: string
  status?: string
  exhibit?: string
  id: number
  observation?: IObservacion
}
