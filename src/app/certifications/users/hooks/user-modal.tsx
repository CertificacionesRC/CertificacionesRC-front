'use client'

import { ICustomUser } from '@/utils/models'
import { PropsWithChildren, createContext, useContext, useReducer } from 'react'

interface IUserModalContext {
  handleCreate: () => void
  handleEdit: (user: ICustomUser) => void
  handleClose: () => void
  isOpenCreate: boolean
  isOpenEdit: boolean
  user?: ICustomUser
}

const UserModalContext = createContext<IUserModalContext>({
  handleCreate: () => {},
  handleEdit: () => {},
  handleClose: () => {},
  isOpenCreate: false,
  isOpenEdit: false,
  user: undefined,
})

enum UserModalKind {
  CLOSE = 'CLOSE',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
}

interface IUserModalActions {
  payload: IUserModalState
  type: UserModalKind
}

interface IUserModalState {
  isOpenCreate: boolean
  isOpenEdit: boolean
  user?: ICustomUser
}

const initialState: IUserModalState = {
  isOpenCreate: false,
  isOpenEdit: false,
  user: undefined,
}

const userModalReducer = (state: IUserModalState, action: IUserModalActions): IUserModalState => {
  const { type, payload } = action

  switch (type) {
    case UserModalKind.CREATE:
      return payload

    case UserModalKind.EDIT:
      return payload

    case UserModalKind.CLOSE:
      return payload

    default:
      return state
  }
}

export function UserModalProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(userModalReducer, initialState)

  const handleEdit = (user: ICustomUser) => {
    dispatch({
      type: UserModalKind.EDIT,
      payload: {
        isOpenCreate: false,
        isOpenEdit: true,
        user,
      },
    })
  }

  const handleCreate = () => {
    dispatch({
      type: UserModalKind.CREATE,
      payload: {
        isOpenCreate: true,
        isOpenEdit: false,
      },
    })
  }

  const handleClose = () => {
    dispatch({
      type: UserModalKind.CLOSE,
      payload: {
        isOpenCreate: false,
        isOpenEdit: false,
      },
    })
  }

  return (
    <UserModalContext.Provider
      value={{
        ...state,
        handleClose,
        handleCreate,
        handleEdit,
      }}
    >
      {children}
    </UserModalContext.Provider>
  )
}

export const useUserModal = () => {
  return useContext(UserModalContext)
}
