import { API_URL } from '@/config.ts'

export const getFullUrl = (path: string) => `${API_URL}${path}`

export const getCardUrl = (id?: string) => {
  if (id == null) {
    return getFullUrl('/cards')
  }

  return getFullUrl(`/cards/${id}`)
}
