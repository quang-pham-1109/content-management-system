<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  Dashboard
  <div class="flex justify-center items-center h-screen">
    <Button label="click me" />
  </div>
</template>
