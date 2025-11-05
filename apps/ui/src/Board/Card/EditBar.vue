<script setup lang="ts">
defineProps(['editMode'])
</script>

<template>
  <button v-if="!editMode" class="btn btn-danger p-1" @click="$emit('deleteCard')">delete</button>
  <button v-if="!editMode" class="btn btn-outline-secondary p-1" @click="$emit('toggleEditMode')">
    edit
  </button>
  <button v-if="editMode" class="btn btn-primary p-1" @click="$emit('save')">save</button>
</template>
