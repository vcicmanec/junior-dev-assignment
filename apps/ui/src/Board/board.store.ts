import type { Card, CardStatus } from '@/Board/types.ts'
import { getCardUrl } from '@/util/fetch.ts'
import { defineStore } from 'pinia'

export const useBoardStore = defineStore('cards', {
  state: () => ({
    cards: [] as Card[],
  }),
  getters: {
    cardsByStatus: (state) => (status: CardStatus) => {
      return state.cards.filter((card) => {
        return card.status === status
      })
    },
  },
  actions: {
    async createCard(card: Card) {
      const res = await fetch(getCardUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      })

      const newCard = await res.json()

      this.cards.push(newCard)
    },
    async fetchAllCards() {
      const res = await fetch(getCardUrl())
      this.cards = await res.json()
    },
    async deleteCard(id: string) {
      await fetch(getCardUrl(id), {
        method: 'DELETE',
      })

      this.cards = this.cards.filter((card: Card) => card.id !== id)
    },
    async updateCard(newCardState: Card) {
      await fetch(getCardUrl(newCardState.id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCardState),
      })

      const existingCard = this.cards.find((card) => card.id === newCardState.id)

      if (existingCard == null) {
        return
      }

      existingCard.title = newCardState.title
      existingCard.description = newCardState.description
      existingCard.status = newCardState.status
    },
  },
})
