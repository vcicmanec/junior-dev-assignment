<script setup lang="ts">
import BoardColumn from '@/Board/BoardColumn.vue'
import { useBoardStore } from '@/Board/board.store.ts'
import CreateCardModal from '@/Board/CreateCardModal.vue'
import { onMounted, ref } from 'vue'

const boardStore = useBoardStore()

onMounted(async () => {
  void boardStore.fetchAllCards()
})
</script>

<template>
  <div class="d-flex flex-column gap-4 m-4">
    <div class="container">
      <CreateCardModal />
    </div>
    <div class="container d-flex flex-row gap-4">
      <BoardColumn status="todo" label="Todo" />
      <BoardColumn status="in-progress" label="In Progress" />
      <BoardColumn status="done" label="Done" />
    </div>
  </div>
</template>
