import { addComponent, defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule({
  setup() {
    addComponent({
      name: 'Slider',
      export: 'default',
      filePath: '@vueform/slider',
    })
  },
})
