import Tooltip from 'primevue/tooltip'

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Tooltip directive loaded')
  nuxtApp.vueApp.directive('tooltip', Tooltip)
})
