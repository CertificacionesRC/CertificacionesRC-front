'use client'

import { CUSTOM_USER_MOCK } from '@/utils/constants'
import { ICustomUser } from '@/utils/models'
import { PropsWithChildren, createContext, useContext, useReducer } from 'react'

interface IUserModalState {
  isOpenCreate: boolean
  isOpenEdit: boolean
  user: ICustomUser
}

interface IUserModalContextProps extends IUserModalState {
  handleClose: () => void
  handleCreate: () => void
  handleEdit: (user: ICustomUser) => void
}

enum UserModalKind {
  CLOSE = 'CLOSE',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
}

type UserModalActions =
  | { type: UserModalKind.CLOSE }
  | { type: UserModalKind.CREATE }
  | { type: UserModalKind.EDIT; payload: { user: ICustomUser } }

const initialState: IUserModalState = {
  isOpenCreate: false,
  isOpenEdit: false,
  user: CUSTOM_USER_MOCK,
}

const UserModalContext = createContext<IUserModalContextProps>({
  handleClose: () => {},
  handleCreate: () => {},
  handleEdit: () => {},
  ...initialState,
})

const userModalReducer = (state: IUserModalState, action: UserModalActions): IUserModalState => {
  const { type } = action

  switch (type) {
    case UserModalKind.CREATE:
      return {
        ...state,
        isOpenCreate: true,
        isOpenEdit: false,
      }

    case UserModalKind.EDIT:
      return {
        ...state,
        isOpenCreate: false,
        isOpenEdit: true,
        user: action.payload.user,
      }

    case UserModalKind.CLOSE:
      return {
        ...state,
        isOpenCreate: false,
        isOpenEdit: false,
      }

    default:
      return state
  }
}

export function UserModalProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(userModalReducer, initialState)

  const handleEdit = (user: ICustomUser) => {
    dispatch({ type: UserModalKind.EDIT, payload: { user } })
  }

  const handleCreate = () => {
    dispatch({ type: UserModalKind.CREATE })
  }

  const handleClose = () => {
    dispatch({ type: UserModalKind.CLOSE })
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
