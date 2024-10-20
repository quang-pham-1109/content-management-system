<template>
  <nav class="w-64 bg-gray-900 text-white flex flex-col fixed h-full">
    <div class="p-6 flex flex-col items-start">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <InputGroup class="mt-4 flex">
        <Button class="pi pi-search text-white bg-teal-500 hover:bg-teal-600" />
        <InputText placeholder="Search" />
      </InputGroup>
      <div class="mt-6 w-full">
        <Button
          label="New Note"
          class="w-full flex justify-start items-start text-left"
        />
      </div>
    </div>

    <!-- User Info at the Bottom -->
    <div class="p-3 absolute bottom-0 w-full flex flex-col space-x-4">
      <Divider />
      <div class="flex items-center justify-start">
        <img
          src="https://avatars.githubusercontent.com/u/99491963"
          alt="Avatar"
          class="w-8 h-8 rounded-full mr-4"
        />
        <span class="text-white font-small">John Doe</span>
      </div>
    </div>
  </nav>
</template>
