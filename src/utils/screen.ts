interface FsDocumentElement extends HTMLElement {
  msRequestFullscreen?: () => void
  mozRequestFullScreen?: () => void
  webkitRequestFullscreen?: () => void
}

interface FsDocument extends Document {
  webkitIsFullScreen?: boolean
  mozFullScreen?: boolean
  msFullscreenElement?: Element
}

export function enterFullScreen(): void {
  if (!isFullScreen()) {
    const element = document.documentElement as FsDocumentElement
    if (element.requestFullscreen)
      element.requestFullscreen()
    else if (element.msRequestFullscreen)
      element.msRequestFullscreen()
    else if (element.mozRequestFullScreen)
      element.mozRequestFullScreen()
    else if (element.webkitRequestFullscreen)
      element.webkitRequestFullscreen()
  }
}

export function exitFullScreen(): void {
  if (isFullScreen())
    document.exitFullscreen()
}

export function isFullScreen(): boolean {
  const fsDoc = document as FsDocument
  return !!(
    fsDoc.fullscreenElement
    || fsDoc.webkitIsFullScreen
    || fsDoc.mozFullScreen
    || fsDoc.msFullscreenElement
  )
}
