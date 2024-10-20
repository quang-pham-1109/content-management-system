<template>
  <div class="flex-grow ml-64 p-6 bg-gray-800">
    <div class="flex flex-start justify-between">
      <h2 class="text-3xl font-bold text-gray-300">Content Overview</h2>
    </div>
    <p class="mt-4 text-gray-400">
      Here is a summary of your most recent content and activity.
    </p>
    <div class="container p-4 mt-6 flex flex-row flex-wrap gap-6">
      <DashboardContentCard />
      <DashboardContentCard />
      <DashboardContentCard />
      <DashboardContentCard />
      <DashboardContentCard />
    </div>
  </div>
</template>
