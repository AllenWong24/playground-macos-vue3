// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxt/eslint',
    'nuxt-icon',
    '@vueuse/nuxt',
    'nuxt-lodash',
  ],
  imports: {
    dirs: ['configs'],
  },
  css: ['~/assets/css/index.css'],
  eslint: {
    config: {
      stylistic: true,
      standalone: false,
    },
  },
})
