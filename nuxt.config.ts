// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  spaLoadingTemplate: false,
  devServer: {
    port: 9527,
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  ssr: false,
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxt/eslint',
    'nuxt-icon',
    '@vueuse/nuxt',
    'nuxt-lodash',
    'motion-v/nuxt',
  ],
  imports: {
    dirs: ['configs'],
  },
  css: [
    '~/assets/css/index.css',
    '@unocss/reset/tailwind.css',
    '@vueform/slider/themes/default.css',
  ],
  eslint: {
    config: {
      stylistic: true,
      standalone: false,
    },
  },
})
