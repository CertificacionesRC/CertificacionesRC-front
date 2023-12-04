/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  IAcademicProgram,
  ICustomUser,
  IItem,
  IProgramType,
  IQualifiedRegistration,
  IRole,
  ISession,
  ISubItem,
} from '@/utils/models'

export const adaptItem = (response: any): IItem => {
  return {
    id: response.id,
    content: response.contenido,
    guide: response.guia,
    state: response.estado,
    name: response.nombre,
    subItems: response.subItems.map(adaptSubItem),
  }
}

export const adaptSubItem = (response: any): ISubItem => {
  return {
    id: response.id,
    content: response.contenido,
    guide: response.guia,
    state: response.estado,
    name: response.nombre,
    subItems: response.subItems?.map(adaptSubItem) ?? [],
  }
}

export const adaptAcademicProram = (response: any): IAcademicProgram => {
  return {
    faculty: response.facultad,
    id: response.id,
    name: response.nombre,
    type: response.tipo,
    qualifiedRegistration: response.registroCalificado
      ? adaptRegistroCalificado(response.registroCalificado)
      : undefined,
  }
}

export const adaptCollaborator = (response: any) => {
  let collaborators: string[] = []

  if (response !== null) {
    collaborators = response.split(',')
    collaborators = collaborators.map((collaborator: string) => collaborator.trim())
  }

  return collaborators
}

export const adaptRegistroCalificado = (response: any): IQualifiedRegistration => {
  return {
    academicProgram: response.programaAcademico ? adaptAcademicProram(response.programaAcademico) : undefined,
    author: response.autor,
    collaborators: adaptCollaborator(response.colaboradores),
    createDate: response.fecha_creacion,
    exhibit: response.anexo,
    id: response.id,
    observation: response.observacion,
    status: response.estado,
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
    id: response.id,
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
  adaptRegistroCalificado,
}
