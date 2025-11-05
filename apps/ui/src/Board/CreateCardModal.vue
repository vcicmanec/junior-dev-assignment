<script setup lang="ts">
import { useBoardStore } from '@/Board/board.store.ts'
import { type Card, CardStatus } from '@/Board/types.ts'
import { ref } from 'vue'

const boardStore = useBoardStore()
const card = ref({
  status: 'todo',
} as Card)

function form_submitHandler() {
  boardStore.createCard(card.value)

  card.value = {
    status: 'todo',
  }
}
</script>

<template v-if="true">
  <button data-bs-toggle="modal" data-bs-target="#createCardModal" class="btn btn-primary">
    + Create Card
  </button>
  <div class="modal fade" id="createCardModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="form_submitHandler">
          <div class="modal-header">Create Card</div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input name="title" type="text" class="form-control" v-model="card.title" />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea
                name="description"
                rows="6"
                class="form-control"
                v-model="card.description"
              />
            </div>
            <div class="mb-3 d-flex flex-row gap-2">
              <label for="status" class="form-label">Status</label>
              <select name="status" v-model="card.status">
                <option v-for="status in CardStatus" :key="status" :value="status">
                  {{ status }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
