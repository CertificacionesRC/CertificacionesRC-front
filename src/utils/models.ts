export interface IAuthorities {
  authority: string
}

export interface IUser {
  username: string
  enabled: boolean
  accountNonLocked: boolean
  accountNonExpired: boolean
  authorities: IAuthorities[]
  credentialsNonExpired: boolean
}

export interface ISession {
  mensaje: string
  token: string
  user: IUser
}

export interface IItem {
  id: string
  content: string
  guide: string
  name: string
  subItems: []
}

export interface ISubItem {
  id: string
  content: string
  guide: string
  name: string
  file: string
}

export interface IDeepItem {
  id: string
  content: string
  guide: string
  name: string
  file: string
}
