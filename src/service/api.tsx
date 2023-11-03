const base_url = 'http://localhost:8081/api/'

export const GET_ALL_INDEX = base_url + 'item/getAllItem'

export const GET_ALL_SUBINDEX = base_url + 'subItem/getAllSubItem'
export const GET_SUBINDEX_BY_ID = base_url + 'subItem/getSubItemById'
export const UPDATE_SUBINDEX = base_url + 'subItem/updateSubitem'

export const GET_INDEX_BY_ID = base_url + 'item/getItemById'
export const UPDATE_INDEX = base_url + 'item/update'

export const GET_SUBINDEX_BY_INDEX = base_url + 'subItem/getAllSubItemsByItem'
export const GET_SUBINDEX_BY_PARENTID = base_url + 'subItem/getSubitemsbyParentId'

export const GET_ALL_USERS = base_url + 'usuario/findAllUsuarios'
export const UPDATE_USER = base_url + 'usuario/updateUsuario'

