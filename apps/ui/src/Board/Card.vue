<script setup lang="ts">
import { useBoardStore } from '@/Board/board.store.ts'
import { CardStatus } from '@/Board/types.ts'
import { ref } from 'vue'

const cardStore = useBoardStore()
const props = defineProps(['card'])

const title = ref(props.card.title)
const description = ref(props.card.description)
const status = ref(props.card.status)

const editingMode = ref(false)

function editButton_clickHandler() {
  editingMode.value = true
}

function saveButton_clickHandler() {
  editingMode.value = false

  void cardStore.updateCard({
    ...props.card,
    title: title.value,
    description: description.value,
    status: status.value,
  })
}

async function deleteButton_clickHandler() {
  await cardStore.deleteCard(props.card.id)
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <span v-if="!editingMode"> {{ card.title }}</span>
      <input class="w-50%" v-model="title" type="text" v-if="editingMode" />
      <button class="small btn" @click="editButton_clickHandler">edit</button>
    </div>
    <div class="card-body">
      <div v-if="!editingMode">{{ props.card?.description }}</div>
      <textarea v-model="description" class="w-100" v-if="editingMode"></textarea>
    </div>
    <div class="card-footer w-100">
      <select v-model="status" class="form-select" @change="saveButton_clickHandler">
        <option v-for="status in CardStatus" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
      <div class="container flex flex-row justify-content-between">
        <button v-if="!editingMode" @click="editButton_clickHandler" class="btn btn-primary">
          Edit
        </button>
        <button v-if="editingMode" @click="deleteButton_clickHandler" class="btn btn-danger">
          Delete
        </button>
        <button v-if="editingMode" @click="saveButton_clickHandler" class="btn btn-primary">
          Save
        </button>
      </div>
    </div>
  </div>
</template>
