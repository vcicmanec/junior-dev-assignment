<script setup lang="ts">
import { useBoardStore } from '@/Board/board.store.ts'
import EditBar from '@/Board/Card/EditBar.vue'
import { CardStatus } from '@/Board/types.ts'
import { ref } from 'vue'

const boardStore = useBoardStore()
const props = defineProps(['card'])

const editMode = ref(false)

const title = ref(props.card.title)
const description = ref(props.card.description)
const status = ref(props.card.status)

function deleteCard() {
  boardStore.deleteCard(props.card.id)
}

function updateCard() {
  void boardStore.updateCard({
    ...props.card,
    title: title.value,
    description: description.value,
    status: status.value,
  })

  editMode.value = false
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex flex-row justify-content-between">
        <span v-if="!editMode"> {{ props.card.title }}</span>
        <input v-model="title" type="text" v-if="editMode" />
        <div class="d-flex flex-row gap-2">
          <EditBar
            :editMode="editMode"
            @toggleEditMode="editMode = !editMode"
            @save="updateCard"
            @deleteCard="deleteCard"
          />
        </div>
      </div>
    </div>
    <div class="card-body">
      <div v-if="!editMode">{{ props.card?.description }}</div>
      <textarea v-model="description" class="w-100" v-if="editMode"></textarea>
    </div>
    <div class="card-footer w-100">
      <select v-model="status" class="form-select" @change="updateCard">
        <option v-for="status in CardStatus" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
    </div>
  </div>
</template>
