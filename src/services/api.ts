import { ICustomUser, IItem, IProgramType, ISession, ISubItem } from '@/utils/models'
import { adapters } from './adapters'
import { getSession } from '@/utils/actions'
import axios from 'axios'

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
  CREATE_REGISTRO_CALIFICADO: BASE_URL + 'registrocalificado',
  GET_ID_USER: BASE_URL + 'usuario/findUsuarioByEmail',
  GET_TIPOS_PROGRAMA: BASE_URL + 'programaAcademico/findAll',
}

const TIME_OUT = 1000

const getProgramTypes = async (): Promise<IProgramType[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch(PATHS.GET_TIPOS_PROGRAMA, {
          method: 'GET',
        })

        const data = await response.json()
        resolve(data.map(adapters.adaptTipoPrograma))
      } catch (error) {
        reject('Error al obtener los tipos de programa')
      }
    }, TIME_OUT)
  })
}

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
        const responseUser = await fetch(PATHS.GET_ID_USER + `/${username}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data?.token}`,
          },
        })

        const userData = await responseUser.json()
        resolve(adapters.adaptSession({ ...data, id: userData.data.id }))
        // resolve({
        //   mensaje: '',
        //   token: '',
        //   user: {
        //     username: '',
        //     enabled: true,
        //     accountNonLocked: false,
        //     accountNonExpired: false,
        //     authorities:[{authority:'CORDINADOR'}],
        //     credentialsNonExpired: false,
        //   },
        // })
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
          cache: 'no-cache',
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
        const response = await axios.patch(url, {
          id: '',
          nombre: '',
          contenido: `${content}`,
          guia: '',
          archivo: null,
        })

        // const data = await response.json()
        resolve(response.data)
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

        const response = await axios.patch(
          PATHS.UPDATE_USER + `/${id}`,
          {
            contrasena: password,
            correo: email,
            estado: status,
            nombre: name,
            id,
            rol: {
              rolId: roleId,
              rolNombre: roleName,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${session?.token}`,
            },
          }
        )

        // const data = await response.json()
        resolve(response.data)
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

        const mock = {
          contrasena: password,
          correo: email,
          estado: null,
          nombre: name,
          id,
          rol: {
            rolId: roleId,
            rolNombre: roleName,
          },
        }

        console.log(mock)

        const response = await axios.post(PATHS.SAVE_USER, mock, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        })

        // const response = await fetch(PATHS.SAVE_USER, {
        //   method: 'PATCH',
        //   // headers: {
        //   //   Authorization: `Bearer ${session?.token}`,
        //   //   contentType: 'application/json',
        //   // },
        //   body: JSON.stringify(mock),
        // })

        // const data = await response.json()

        console.log(response)
        resolve(response.data)
      } catch (error) {
        reject('Error al crear el usuario')
      }
    }, TIME_OUT)
  })
}
const createRegistroCalificado = async ({
  fechaCreacion,
  colaboradores,
  autor,
  programaAcademico,
}: {
  fechaCreacion: string
  colaboradores: string
  autor: number
  programaAcademico: IProgramType | null | undefined
}) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const session = await getSession()
        const url = PATHS.CREATE_REGISTRO_CALIFICADO
        const response = await axios.post(
          url,
          {
            fecha_creacion: `${fechaCreacion} 00:00:00`,
            colaboradores: colaboradores,
            autor: autor,
            estado: 'PorAprobar',
            anexo: null,
            observacion: null,
            programaAcademico: {
              id: programaAcademico?.id,
              nombre: programaAcademico?.name,
              tipo: programaAcademico?.type,
              facultad: programaAcademico?.faculty,
              registroCalificado: null,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${session?.token}`,
            },
          }
        )
        resolve(response.data)
      } catch (error) {
        reject('Error al crear registro calificado')
      }
    }, TIME_OUT)
  })
}

export const api = {
  createCustomUser,
  getAllCustomUsers,
  getItem,
  getItems,
  getSubItem,
  getSubItems,
  signIn,
  updateContentSubItem,
  updateCustomUser,
  createRegistroCalificado,
  getProgramTypes,
}
