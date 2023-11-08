import { ICustomUser, IDeepItem, IItem, ISession, ISubItem } from '@/utils/models'
import { adapters } from './adapters'
import { getSession } from '@/utils/actions'

const BASE_URL = 'http://localhost:8081/api/'

export const PATHS = {
  DISABLE_USER: BASE_URL + 'usuario/disableUsuario',
  GET_ALL_INDEX: BASE_URL + 'item/getAllItem',
  GET_ALL_SUBINDEX: BASE_URL + 'subItem/getAllSubItem',
  GET_ALL_USERS: BASE_URL + 'usuario/findAllUsuarios',
  GET_BY_ID: BASE_URL + 'usuario/findUsuarioById',
  GET_INDEX_BY_ID: BASE_URL + 'item/getItemById',
  GET_SUBINDEX_BY_ID: BASE_URL + 'subItem/getSubItemById',
  GET_SUBINDEX_BY_INDEX: BASE_URL + 'subItem/getAllSubItemsByItem',
  GET_SUBINDEX_BY_PARENTID: BASE_URL + 'subItem/getSubitemsbyParentId',
  SAVE_USER: BASE_URL + 'usuario/saveUsuario',
  UPDATE_INDEX: BASE_URL + 'item/update',
  UPDATE_SUBINDEX: BASE_URL + 'subItem/updateSubitem',
  UPDATE_USER: BASE_URL + 'usuario/updateUsuario',
  SIGN_IN: BASE_URL + 'login',
}

const getItems = async (): Promise<IItem[]> => {
  const response = await fetch(PATHS.GET_ALL_INDEX, {
    method: 'GET',
  })

  const data = await response.json()
  return data.map(adapters.adaptItem)
}

const getSubItems = async ({ id }: { id: string }): Promise<ISubItem[]> => {
  const url = PATHS.GET_SUBINDEX_BY_INDEX + `/${id}`
  const response = await fetch(url, {
    method: 'GET',
  })

  const data = await response.json()
  return data.map(adapters.adaptSubItem)
}

const getDeepItems = async ({ id }: { id: string }): Promise<IDeepItem[]> => {
  const url = PATHS.GET_SUBINDEX_BY_INDEX + `/${id}`
  const response = await fetch(url, {
    method: 'GET',
  })

  const data = await response.json()
  return data.map(adapters.adaptDeepItem)
}

const signIn = async ({ username, password }: { username: string; password: string }): Promise<ISession> => {
  const response = await fetch(PATHS.SIGN_IN, {
    method: 'POST',
    body: JSON.stringify({
      correo: username,
      contrasena: password,
    }),
  })

  const data = await response.json()
  return adapters.adaptSession(data)
}

const getSubItem = async ({ id }: { id: string }) => {
  const url = PATHS.GET_SUBINDEX_BY_ID + `?idSubItem=${id}`
  const response = await fetch(url, {
    method: 'GET',
  })

  const data = await response.json()
  return adapters.adaptSubItem(data.data)
}

const getItem = async ({ id }: { id: string }) => {
  const url = PATHS.GET_INDEX_BY_ID + `?idItem=${id}`
  const response = await fetch(url, {
    method: 'GET',
  })

  const data = await response.json()
  return adapters.adaptItem(data.data)
}

const updateContentSubItem = async ({ id, content }: { id: string; content: string }) => {
  const url = PATHS.UPDATE_SUBINDEX + `/${id}`
  const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(content),
  })

  const data = await response.json()
  return data
}

const getAllCustomUsers = async (): Promise<ICustomUser[]> => {
  const session = await getSession()
  const response = await fetch(PATHS.GET_ALL_USERS, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  })

  const data = await response.json()
  return data.data.map(adapters.adaptCustomUser)
}

const updateCustomUser = async ({
  email,
  id,
  name,
  password,
  roleId,
  roleName,
  status,
}: {
  email: string
  id: string
  name: string
  password: string
  roleId: number
  roleName: string
  status: string
}) => {
  const session = await getSession()
  const response = await fetch(PATHS.UPDATE_USER + `/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify({
      contrasena: password,
      correo: email,
      estado: status,
      nombre: name,
      rol: {
        rolId: roleId,
        rolNombre: roleName,
      },
    }),
  })

  const data = await response.json()
  return data
}

export const api = {
  getAllCustomUsers,
  getDeepItems,
  getItem,
  getItems,
  getSubItem,
  getSubItems,
  signIn,
  updateContentSubItem,
  updateCustomUser,
}
