<script setup lang="ts">
import { useCookie, useState, useRuntimeConfig, navigateTo } from '#imports'
import { useAPI } from '~/composables/useAPIServer'

// PrimeVue's useToast for additional toast messages if needed
import { useToast } from 'primevue/usetoast'

// Reactive states for email and password
const email = useState<string>('email', () => '')
const password = useState<string>('password', () => '')
const loading = useState<boolean>('loading', () => false)

// Access runtime configuration
const config = useRuntimeConfig()

// Manage the authentication token via cookies
const tokenCookie = useCookie('token')

// Define the structure of the login response
interface LoginResponse {
  token: string
}

// Initialize the API request composable for POST requests
const { fetchData } = useAPI<LoginResponse>(loading, 'POST')

// Initialize PrimeVue's Toast
const toast = useToast()

// Login function utilizing the useApiRequest composable
const login = async () => {
  const response = await fetchData(`${config.public.publicPath}/auth/login`, {
    body: {
      email: email.value,
      password: password.value,
    },
  })

  // if (response?.token) {
  //   // Set the token in the 'token' cookie
  //   tokenCookie.value = response.token

  //   // Redirect to the dashboard after successful login
  //   navigateTo('/dashboard')
  // } else {
  //   // Handle cases where token is not present but no error was thrown
  //   // Display an error toast
  //   // toast.add({
  //   //   severity: 'error',
  //   //   summary: 'Login Failed',
  //   //   detail: 'Please check your credentials and try again.',
  //   //   life: 3000,
  //   // })
  // }
}
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <Card class="w-96 overflow-hidden">
      <template #title>
        <p class="text-center">Login</p>
      </template>
      <template #content>
        <div class="flex flex-col gap-2">
          <label for="email">Email</label>
          <InputText id="email" v-model="email" />
          <label for="password">Password</label>
          <InputText id="password" v-model="password" type="password" />
        </div>
      </template>
      <template #footer>
        <Button
          label="Login"
          class="w-full"
          @click="login"
          :loading="loading"
          :disabled="loading"
        />
      </template>
    </Card>
  </div>
</template>

<style>
@import url('~/assets/css/base.css');
</style>
