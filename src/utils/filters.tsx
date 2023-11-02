/* eslint-disable @typescript-eslint/no-explicit-any */
type ApiResponse = Record<string, any>

export function filterObjectsById(arr: ApiResponse[], idToMatch: number) {
  // Usamos el método filter para filtrar los objetos que coinciden con el idToMatch
  const filteredObjects = arr.filter((item) => item.item && item.item.id === idToMatch)
  return filteredObjects
}
