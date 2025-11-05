export const CardStatus = ['todo', 'in-progress', 'done'] as const
export type CardStatus = (typeof CardStatus)[number]

export type Card = Partial<{
  id: string
  title: string
  description: string
  status: CardStatus
}>
