<script setup lang="ts">
import { useCookie, useState, useRuntimeConfig, navigateTo } from '#imports'
import { useAPIClient } from '#imports'

const email = useState<string>('email', () => '')
const password = useState<string>('password', () => '')
const loading = useState<boolean>('loading', () => false)

const config = useRuntimeConfig()
const tokenCookie = useCookie('token')

interface LoginResponse {
  token: string
}

const { fetchData, displayMessage } = useAPIClient(loading, 'POST')

const login = async () => {
  const response = await fetchData<LoginResponse>(
    `${config.public.publicPath}/auth/login`,
    {
      body: {
        email: email.value,
        password: password.value,
      },
    }
  )

  // Handle the error case
  if (isErrorResponse(response)) {
    if (response.code === 401) {
      displayMessage({
        title: 'Error',
        detail: 'Invalid email or password',
        severity: 'error',
      })
    }

    if (response.code === 400) {
      displayMessage({
        title: 'Error',
        detail: 'Bad Request',
        severity: 'error',
      })
    }

    if (response.code === 500) {
      displayMessage({
        title: 'Error',
        detail: 'Internal Server Error',
        severity: 'error',
      })
    }
  } else {
    // add token into cookie & navigate to dashboard
    tokenCookie.value = response.token
    navigateTo('/dashboard')
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
