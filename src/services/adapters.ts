/* eslint-disable @typescript-eslint/no-explicit-any */

import { IDeepItem, IItem, ISession, ISubItem } from '@/utils/models'

export const adaptItems = (response: any): IItem => {
  return {
    id: response.id,
    content: response.contenido,
    guide: response.guia,
    name: response.nombre,
    subItems: response.subItems,
  }
}

export const adaptSubItems = (response: any): ISubItem => {
  return {
    id: response.id,
    content: response.contenido,
    guide: response.guia,
    name: response.nombre,
    file: response.archivo,
  }
}

export const adaptDeepItems = (response: any): IDeepItem => {
  return {
    id: response.id,
    content: response.contenido,
    guide: response.guia,
    name: response.nombre,
    file: response.archivo,
  }
}

export const adaptAuthorities = (response: any) => {
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
      authorities: response.user.authorities.map(adaptAuthorities),
      credentialsNonExpired: response.user.credentialsNonExpired,
    },
  }
}

export const adapters = {
  adaptItems,
  adaptSession,
  adaptSubItems,
  adaptDeepItems,
}
