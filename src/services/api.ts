import { ICustomUser, IItem, IProgramType, IQualifiedRegistration, ISession, ISubItem } from '@/utils/models'
import { adapters, reverseAdaptCollaborator } from './adapters'
import { getSession } from '@/utils/actions'
import axios from 'axios'

const BASE_URL = 'http://localhost:8081/api/'

export const PATHS = {
  DISABLE_USER: BASE_URL + 'usuario/disableOrEnableUsuario',
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
  UPDATE_STATE_SUBITEM: BASE_URL + 'subItem/updateState',
  UPDATE_STATE_ITEM: BASE_URL + 'item/updateState',
  UPDATE_USER: BASE_URL + 'usuario/updateUsuario',
  SIGN_IN: BASE_URL + 'login',
  CREATE_REGISTRO_CALIFICADO: BASE_URL + 'registrocalificado',
  GET_ID_USER: BASE_URL + 'usuario/findUsuarioByEmail',
  GET_TIPOS_PROGRAMA: BASE_URL + 'programaAcademico/findAll',
  GET_AUTOR_REGISTRO_CALIFICADO: BASE_URL + 'registrocalificado/findRegistroCalificadoById',
  GET_REGISTROS_CALIFICADOS: BASE_URL + 'registrocalificado/findAll',
  GET_REGISTROS_CALIFICADOS_BY_STATE: BASE_URL + 'registrocalificado/findAllByEstado',
  GET_REGISTROS_CALIFICADOS_BY_DATE: BASE_URL + 'registrocalificado/findAllByDate',
  UPDATE_STATE_REGISTROS_CALIFICADOS: BASE_URL + 'registrocalificado/updateStateRegistroCalificado',
}

const TIME_OUT = 0

export const signIn = async ({ email, password }: { email: string; password: string }): Promise<ISession> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const signInResponse = await fetch(PATHS.SIGN_IN, {
          method: 'POST',
          body: JSON.stringify({
            contrasena: password,
            correo: email,
          }),
        })

        const signInData = await signInResponse.json()

        const userIdResponse = await fetch(PATHS.GET_ID_USER + `/${email}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${signInData.token}`,
          },
        })

        const userIdData = await userIdResponse.json()

        const adapt = adapters.adaptSession({
          id: userIdData.data.id,
          ...signInData,
        })

        resolve(adapt)
      } catch (error) {
        reject('Error al iniciar sesión')
      }
    }, 1000)
  })
}

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

const updateContentSubItem = async ({ subItem, content }: { subItem: ISubItem; content: string }) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const url = PATHS.UPDATE_SUBINDEX + `/${subItem.id}`
        const response = await axios.patch(url, {
          id: subItem.id,
          nombre: subItem.name,
          contenido: `${content}`,
          guia: subItem.guide,
          archivo: null,
        })

        resolve(response.data)
      } catch (error) {
        reject('Error al actualizar el contenido del subitem')
      }
    }, TIME_OUT)
  })
}

const updateContentItem = async ({ id, content }: { id: string; content: string }) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const url = PATHS.UPDATE_INDEX + `/${id}`
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
  status: boolean
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const session = await getSession()

        const body = {
          contrasena: password,
          correo: email,
          estado: status,
          id,
          nombre: name,
          rol: {
            lstUsuarios: null,
            rolId: roleId,
            rolNombre: roleName,
          },
        }

        await axios.patch(PATHS.UPDATE_USER + `/${id}`, body, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        })

        resolve('Usuario actualizado correctamente')
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
  status: boolean
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const session = await getSession()

        const mock = {
          contrasena: password,
          correo: email,
          estado: status,
          id,
          nombre: name,
          rol: {
            lstUsuarios: null,
            rolId: roleId,
            rolNombre: roleName,
          },
        }

        await axios.post(PATHS.SAVE_USER, mock, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        })

        resolve('Usuario creado correctamente')
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

const getExistsRC = async ({ id }: { id: number }): Promise<IQualifiedRegistration | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const session = await getSession()
        const url = PATHS.GET_AUTOR_REGISTRO_CALIFICADO + `/${id}`
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        })

        if (response.data.data === null) {
          resolve(null)
        } else {
          resolve(adapters.adaptRegistroCalificado(response.data.data))
        }
      } catch (error) {
        reject('Error al obtener los certificados')
      }
    }, TIME_OUT)
  })
}

const getALLRC = async ({
  endDate,
  startDate,
  state,
}: {
  endDate?: string
  startDate?: string
  state?: string
}): Promise<IQualifiedRegistration[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const session = await getSession()

        let url

        if (state) {
          url = PATHS.GET_REGISTROS_CALIFICADOS_BY_STATE + `?estado=${state}`
        } else if (startDate) {
          url =
            PATHS.GET_REGISTROS_CALIFICADOS_BY_DATE + `?fechaInicio=${startDate} 00:00:00&fechaFin=${endDate} 00:00:00`
        } else {
          url = PATHS.GET_REGISTROS_CALIFICADOS
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        })

        const data = await response.json()

        if (data.data === null) {
          resolve([])
        } else {
          resolve(data.data.map(adapters.adaptRegistroCalificado))
        }
      } catch (error) {
        reject('Error al obtener los certificados')
      }
    }, TIME_OUT)
  })
}

const updateStateSubItem = async ({ id }: { id: string }): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const session = await getSession()
        await axios.patch(PATHS.UPDATE_STATE_SUBITEM + `/${id}`, null, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        })

        resolve('SubItem actualizado correctamente')
      } catch (error) {
        reject('Error al actualizar el SubItem')
      }
    }, TIME_OUT)
  })
}

const updateStateItem = async ({id,}: {id: string}): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const session = await getSession()
        await axios.patch(PATHS.UPDATE_STATE_ITEM + `/${id}`, null, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        })

        resolve('Item actualizado correctamente')
      } catch (error) {
        reject('Error al actualizar el Item. Actulizar subitems primero')
      }
    }, TIME_OUT)
  })
}

const updateStatetRC = async ({ register, observation, state }: { register: IQualifiedRegistration | null; observation: string; state: string }): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const session = await getSession()
        const url = PATHS.UPDATE_STATE_REGISTROS_CALIFICADOS + `?estado=${state}`
        await axios.post(url, {
            contenido: observation,
            registroCalificado: { programaAcademico: {
              id: register?.academicProgram?.id,
              nombre: register?.academicProgram?.name,
              tipo: register?.academicProgram?.type,
              facultad: register?.academicProgram?.faculty,
              registroCalificado: register?.academicProgram?.qualifiedRegistration
            },
            autor: register?.author,
            colaboradores: reverseAdaptCollaborator(register?.collaborators),
            fecha_creacion: register?.createDate,
            id: register?.id,
            observacion: register?.observation,
            estado: register?.status,
            anexo: register?.exhibit
          }
        }, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        })

        resolve('Registro actualizado correctamente')
      } catch (error) {
        reject('Error al actualizar el contenido del subitem')
      }
    }, TIME_OUT)
  })
}

const disableOrEnableUser = async ({id,}: {id: string}): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const session = await getSession()
        await axios.patch(PATHS.DISABLE_USER + `/${id}`, null, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        })

        resolve('Usuario actualizado correctamente')
      } catch (error) {
        reject('Error al actualizar el usuario')
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
  updateStateSubItem,
  updateStateItem,
  updateContentSubItem,
  updateContentItem,
  updateCustomUser,
  createRegistroCalificado,
  getProgramTypes,
  getExistsRC,
  getALLRC,
  updateStatetRC,
  disableOrEnableUser,
  signIn,
}
