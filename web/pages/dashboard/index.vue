<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="flex h-screen">
    <DashboardNavbar />
    <DashboardMainContent />
  </div>
</template>

<style>
@import url('~/assets/css/base.css');
</style>
