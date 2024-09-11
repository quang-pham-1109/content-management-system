<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <Button label="click me" />
  </div>
</template>
