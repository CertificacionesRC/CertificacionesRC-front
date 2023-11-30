/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICustomUser, IItem, IProgramType, IRegistroCalificado, IRole, ISession, ISubItem } from '@/utils/models'

export const adaptItem = (response: any): IItem => {
  return {
    id: response.id,
    content: response.contenido,
    guide: response.guia,
    name: response.nombre,
    subItems: response.subItems.map(adaptSubItem),
  }
}

export const adaptSubItem = (response: any): ISubItem => {
  return {
    id: response.id,
    content: response.contenido,
    guide: response.guia,
    name: response.nombre,
    files: response.archivo,
    subItems: response.subItems?.map(adaptSubItem) ?? [],
  }
}

export const adaptRegistroCalificado = (response: any): IRegistroCalificado => {
  return {
    id: response.id,
    fecha_creacion: response.fecha_creacion,
    colaboradores: response.colaboradores,
    autor: response.autor,
    estado: response.estado,
    programaAcademico: response.programaAcademico,
    anexo: response.anexo,
    observacion: response.observacion
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
    id: response.id,
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

export const adaptTipoPrograma = (response: any): IProgramType => {
  return {
    id: response.id,
    name: response.nombre,
    type: response.tipo,
    faculty: response.facultad,
    registroCalificado: response.registroCalificado,
  }
}

export const adapters = {
  adaptRol,
  adaptCustomUser,
  adaptItem,
  adaptSession,
  adaptSubItem,
  adaptTipoPrograma,
  adaptRegistroCalificado
}
