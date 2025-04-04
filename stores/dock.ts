export const useDockStore = defineStore('dock', () => {
  const size = ref(50)
  const mag = ref(2)

  return {
    size,
    mag,
  }
})
