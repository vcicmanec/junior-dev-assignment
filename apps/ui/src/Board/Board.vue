<script setup lang="ts">
import BoardColumn from '@/Board/BoardColumn.vue'
import { useBoardStore } from '@/Board/board.store.ts'
import CreateCardModal from '@/Board/CreateCardModal.vue'
import { onMounted, ref } from 'vue'

const cardStore = useBoardStore()

onMounted(async () => {
  void cardStore.fetchAllCards()
})
</script>

<template>
  <div class="container">
    <CreateCardModal />
  </div>
  <div class="container d-flex flex-row">
    <BoardColumn status="todo" label="Todo" />
    <BoardColumn status="in-progress" label="In Progress" />
    <BoardColumn status="done" label="Done" />
  </div>
</template>
