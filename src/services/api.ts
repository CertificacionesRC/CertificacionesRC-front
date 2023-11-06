import { IDeepItem, IItem, ISession, ISubItem } from '@/utils/models'
import { adapters } from './adapters'

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
  return data.map(adapters.adaptItems)
}

const getSubItems = async ({ id }: { id: string }): Promise<ISubItem[]> => {
  const url = PATHS.GET_SUBINDEX_BY_INDEX + `/${id}`

  const response = await fetch(url, {
    method: 'GET',
  })

  const data = await response.json()
  return data.map(adapters.adaptSubItems)
}

const getDeepItems = async ({ id }: { id: string }): Promise<IDeepItem[]> => {
  const url = PATHS.GET_SUBINDEX_BY_INDEX + `/${id}`

  const response = await fetch(url, {
    method: 'GET',
  })

  const data = await response.json()
  return data.map(adapters.adaptDeepItems)
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

export const api = {
  signIn,
  getItems,
  getSubItems,
  getDeepItems,
}
