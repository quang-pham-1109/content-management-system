export default defineNuxtRouteMiddleware(async (to, from) => {
  const tokenCookie = useCookie('token')

  // If no token, redirect to the login page
  if (!token) {
    return navigateTo('/')
  }

  const config = useRuntimeConfig()

  try {
    // Make a fetch request to validate the token
    const response = await $fetch(`${config.public.publicPath}/auth`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response) {
      return
    }
  } catch (error) {
    console.error('Authentication failed:', error)
    return navigateTo('/')
  }
})
