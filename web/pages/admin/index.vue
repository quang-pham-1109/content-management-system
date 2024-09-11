<script setup lang="ts">
import { useCookie } from 'nuxt/app'

const email = useState<string>('email', () => '')
const password = useState<string>('password', () => '')
const loading = useState<boolean>('loading', () => false)
const errorMessage = useState<string>('errorMessage', () => '')

const config = useRuntimeConfig()

const tokenCookie = useCookie('token')

interface LoginResponse {
  token: string
}

const login = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await $fetch<LoginResponse>(
      `${config.public.publicPath}/auth/login`,
      {
        method: 'POST',
        body: {
          email: email.value,
          password: password.value,
        },
      }
    )

    if (response.token) {
      // Set the token in the 'token' cookie
      tokenCookie.value = response.token

      // Redirect to the dashboard after successful login
      navigateTo('/dashboard')
    } else {
      errorMessage.value = 'Login failed. Please check your credentials.'
    }
  } catch (error) {
    errorMessage.value = 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
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
          <p
            v-if="errorMessage"
            class="text-red-500 text-center mt-2 font-semibold"
          >
            {{ errorMessage }}
          </p>
        </div>
      </template>
      <template #footer>
        <Button
          label="Login"
          class="w-full"
          @click="login"
          :loading="loading"
        />
      </template>
    </Card>
  </div>
</template>

<style>
@import url('~/assets/css/base.css');
</style>
