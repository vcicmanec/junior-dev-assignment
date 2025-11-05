<script lang="ts" setup>
import { useBoardStore } from '@/Board/board.store.ts'
import Card from '@/Board/Card.vue'

const boardStore = useBoardStore()
const props = defineProps(['label', 'status'])
</script>

<template>
  <div class="mw-20">
    <h4>{{ label }}</h4>
    <div class="d-flex flex-column gap-4" style="width: 18rem">
      <Card v-for="card in boardStore.cardsByStatus(props.status)" :key="card.id" :card="card" />
    </div>
  </div>
</template>
