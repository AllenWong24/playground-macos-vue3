interface BearMdData {
  id: string
  title: string
  file: string
  icon: JSX.Element
  excerpt: string
  link?: string
}

interface BearData {
  id: string
  title: string
  icon: JSX.Element
  md: BearMdData[]
}
