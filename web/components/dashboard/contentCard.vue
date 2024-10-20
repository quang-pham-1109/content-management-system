<template>
  <div
    class="relative rounded-2xl shadow-lg bg-white w-64 h-32 hover:bg-surface-200 duration-300 cursor-pointer"
  >
    <div class="p-4 gap-2 flex flex-col items-start justify-center">
      <span class="text-xl font-semibold text-gray-900 mb-1"
        >Content Title</span
      >
      <div class="flex items-center gap-1">
        <i class="pi pi-stopwatch" style="color: rgb(75 85 99)"></i>
        <p class="text-sm text-gray-600 italic">changed</p>
      </div>

      <div class="absolute bottom-2 right-2 flex gap-2">
        <Button
          icon="pi pi-bookmark"
          severity="secondary"
          text
          rounded
          aria-label="Bookmark"
        />
      </div>
    </div>
  </div>
</template>
