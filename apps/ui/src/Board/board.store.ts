import type { Card, CardStatus } from '@/Board/types.ts'
import { getCardUrl } from '@/util/fetch.ts'
import { defineStore } from 'pinia'

export const useBoardStore = defineStore('cards', {
  state: () => ({
    cards: [] as Card[],
  }),
  getters: {
    todoCards: (state) => state.cards.filter((card) => card.status === 'todo'),
    inProgressCards: (state) => state.cards.filter((card) => card.status === 'in-progress'),
    doneCards: (state) => state.cards.filter((card) => card.status === 'done'),
  },
  actions: {
    createCard: async (card: Card) => {
      await fetch(getCardUrl(), {
        method: 'POST',
        body: JSON.stringify(card),
      })
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
    async updateCard(card: Card) {
      await fetch(getCardUrl(card.id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      })

      const cardIndex = this.cards.findIndex((card) => card.id === card.id)
      this.cards[cardIndex] = card
    },
  },
})
