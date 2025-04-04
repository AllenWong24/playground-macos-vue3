import type { MotionValue } from 'motion-v'

export function useDockHoverAnimation(mouseX: MotionValue<number>, ref: Ref<HTMLImageElement | null>, dockSize: number, dockMag: number) {
  const distanceLimit = dockSize * 6
  const distanceInput = [
    -distanceLimit,
    -distanceLimit / (dockMag * 0.65),
    -distanceLimit / (dockMag * 0.85),
    0,
    distanceLimit / (dockMag * 0.85),
    distanceLimit / (dockMag * 0.65),
    distanceLimit,
  ]
  const widthOutput = [
    dockSize,
    dockSize * (dockMag * 0.55),
    dockSize * (dockMag * 0.75),
    dockSize * dockMag,
    dockSize * (dockMag * 0.75),
    dockSize * (dockMag * 0.55),
    dockSize,
  ]
  const beyondTheDistanceLimit = distanceLimit + 1

  const distance = useMotionValue(beyondTheDistanceLimit)
  const widthPX = useSpring(
    useTransform(distance, distanceInput, widthOutput),
    {
      stiffness: 1700,
      damping: 90,
    },
  )

  const width = useTransform(widthPX, width => `${width / 16}rem`)

  useRafFn(() => {
    const el = ref.value
    const mouseXVal = mouseX.get()
    if (el && mouseXVal !== null) {
      const rect = el.getBoundingClientRect()
      const imgCenterX = rect.left + rect.width / 2
      // difference between the x coordinate value of the mouse pointer
      // and the img center x coordinate value
      const distanceDelta = mouseXVal - imgCenterX
      distance.set(distanceDelta)
      return
    }

    distance.set(beyondTheDistanceLimit)
  }, {
    immediate: true,
  })

  return { width, widthPX }
}
