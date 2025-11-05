<script setup lang="ts">
import BoardColumn from '@/Board/BoardColumn.vue'
import { useBoardStore } from '@/Board/board.store.ts'
import { onMounted } from 'vue'

const cardStore = useBoardStore()

onMounted(async () => {
  void cardStore.fetchAllCards()
})
</script>

<template>
  <div class="container d-flex flex-row">
    <BoardColumn label="Todo" :getter="cardStore.todoCards" />
    <BoardColumn label="In Progress" :getter="cardStore.inProgressCards" />
    <BoardColumn label="Done" :getter="cardStore.doneCards" />
  </div>
</template>
