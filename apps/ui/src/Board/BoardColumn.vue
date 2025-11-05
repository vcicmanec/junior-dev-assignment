<script lang="ts" setup>
import Card from '@/Board/Card.vue'

const props = defineProps(['label', 'getter'])
</script>

<template>
  <div class="container flex flex-column justify-center align-items-center gap-4">
    <h4>{{ label }}</h4>
    <button class="btn btn-primary">+</button>
    <div class="container flex gap-4">
      <Card v-for="card in props.getter" :key="card.id" :card="card" />
    </div>
  </div>
</template>
