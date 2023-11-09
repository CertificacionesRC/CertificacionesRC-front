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

const TIME_OUT = 1000

const getItems = async (): Promise<IItem[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch(PATHS.GET_ALL_INDEX, {
          method: 'GET',
        })

        const data = await response.json()
        resolve(data.map(adapters.adaptItem))
      } catch (error) {
        reject('Error al obtener los items')
      }
    }, TIME_OUT)
  })
}

const getSubItems = async ({ id }: { id: string }): Promise<ISubItem[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const url = PATHS.GET_SUBINDEX_BY_INDEX + `/${id}`
        const response = await fetch(url, {
          method: 'GET',
        })

        const data = await response.json()
        resolve(data.map(adapters.adaptSubItem))
      } catch (error) {
        reject('Error al obtener los subitems')
      }
    }, TIME_OUT)
  })
}

const getDeepItems = async ({ id }: { id: string }): Promise<IDeepItem[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const url = PATHS.GET_SUBINDEX_BY_INDEX + `/${id}`
        const response = await fetch(url, {
          method: 'GET',
        })

        const data = await response.json()
        resolve(data.map(adapters.adaptDeepItem))
      } catch (error) {
        reject('Error al obtener los subitems')
      }
    }, TIME_OUT)
  })
}

const signIn = async ({ username, password }: { username: string; password: string }): Promise<ISession> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch(PATHS.SIGN_IN, {
          method: 'POST',
          body: JSON.stringify({
            correo: username,
            contrasena: password,
          }),
        })

        const data = await response.json()
        resolve(adapters.adaptSession(data))
      } catch (error) {
        reject('Error al iniciar sesión')
      }
    }, TIME_OUT)
  })
}

const getSubItem = async ({ id }: { id: string }): Promise<ISubItem> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const url = PATHS.GET_SUBINDEX_BY_ID + `?idSubItem=${id}`
        const response = await fetch(url, {
          method: 'GET',
        })

        const data = await response.json()
        resolve(adapters.adaptSubItem(data.data))
      } catch (error) {
        reject('Error al obtener el subitem')
      }
    }, TIME_OUT)
  })
}

const getItem = async ({ id }: { id: string }): Promise<IItem> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const url = PATHS.GET_INDEX_BY_ID + `?idItem=${id}`
        const response = await fetch(url, {
          method: 'GET',
        })

        const data = await response.json()
        resolve(adapters.adaptItem(data.data))
      } catch (error) {
        reject('Error al obtener el item')
      }
    }, TIME_OUT)
  })
}

const updateContentSubItem = async ({ id, content }: { id: string; content: string }) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const url = PATHS.UPDATE_SUBINDEX + `/${id}`
        const response = await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify(content),
        })

        const data = await response.json()
        resolve(data)
      } catch (error) {
        reject('Error al actualizar el contenido del subitem')
      }
    }, TIME_OUT)
  })
}

const getAllCustomUsers = async (): Promise<ICustomUser[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const session = await getSession()
        const response = await fetch(PATHS.GET_ALL_USERS, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        })

        const data = await response.json()
        resolve(data.data.map(adapters.adaptCustomUser))
      } catch (error) {
        reject('Error al obtener los usuarios')
      }
    }, TIME_OUT)
  })
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
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
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
            id,
            rol: {
              rolId: roleId,
              rolNombre: roleName,
            },
          }),
        })

        const data = await response.json()
        resolve(data)
      } catch (error) {
        reject('Error al actualizar el usuario')
      }
    }, TIME_OUT)
  })
}

const createCustomUser = async ({
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
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const session = await getSession()
        const response = await fetch(PATHS.SAVE_USER, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
          body: JSON.stringify({
            contrasena: password,
            correo: email,
            estado: status,
            nombre: name,
            id,
            rol: {
              rolId: roleId,
              rolNombre: roleName,
            },
          }),
        })

        const data = await response.json()
        resolve(data)
      } catch (error) {
        reject('Error al crear el usuario')
      }
    }, TIME_OUT)
  })
}

export const api = {
  createCustomUser,
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