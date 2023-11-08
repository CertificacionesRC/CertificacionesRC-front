/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICustomUser, IDeepItem, IItem, IRole, ISession, ISubItem } from '@/utils/models'

export const adaptItem = (response: any): IItem => {
  return {
    id: response.id,
    content: response.contenido,
    guide: response.guia,
    name: response.nombre,
    subItems: response.subItems,
  }
}

export const adaptSubItem = (response: any): ISubItem => {
  return {
    id: response.id,
    content: response.contenido,
    guide: response.guia,
    name: response.nombre,
    file: response.archivo,
  }
}

export const adaptDeepItem = (response: any): IDeepItem => {
  return {
    id: response.id,
    content: response.contenido,
    guide: response.guia,
    name: response.nombre,
    file: response.archivo,
  }
}

export const adaptAuthoritie = (response: any) => {
  return {
    authority: response.authority,
  }
}

export const adaptSession = (response: any): ISession => {
  return {
    mensaje: response.mensaje,
    token: response.token,
    user: {
      username: response.user.username,
      enabled: response.user.enabled,
      accountNonLocked: response.user.accountNonLocked,
      accountNonExpired: response.user.accountNonExpired,
      authorities: response.user.authorities.map(adaptAuthoritie),
      credentialsNonExpired: response.user.credentialsNonExpired,
    },
  }
}

export const adaptRol = (response: any): IRole => {
  return {
    roleId: response.rolId,
    roleName: response.rolNombre,
  }
}

export const adaptCustomUser = (response: any): ICustomUser => {
  return {
    email: response.correo,
    id: response.id,
    name: response.nombre,
    role: adaptRol(response.rol),
    password: response.contrasena,
    status: response.estado,
  }
}

export const adapters = {
  adaptRol,
  adaptCustomUser,
  adaptItem,
  adaptSession,
  adaptSubItem,
  adaptDeepItem,
}
