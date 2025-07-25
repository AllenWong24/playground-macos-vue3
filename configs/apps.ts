export interface AppsData {
  id: string
  title: string
  desktop: boolean
  img: string
  show?: boolean
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  content?: Component
  link?: string
}

export const GLOBAL_CONFIG_APPS: AppsData[] = [
  {
    id: 'launchpad',
    title: 'Launchpad',
    desktop: false,
    img: 'img/icons/launchpad.png',
  },
  // {
  //   id: 'bear',
  //   title: 'Bear',
  //   desktop: true,
  //   show: true,
  //   width: 860,
  //   height: 500,
  //   img: 'img/icons/bear.png',
  //   content: Bear,
  // },
  // {
  //   id: 'safari',
  //   title: 'Safari',
  //   desktop: true,
  //   show: false,
  //   width: 1024,
  //   minWidth: 375,
  //   minHeight: 200,
  //   img: 'img/icons/safari.png',
  //   content: Safari,
  // },
  // {
  //   id: 'vscode',
  //   title: 'VSCode',
  //   desktop: true,
  //   show: false,
  //   img: 'img/icons/vscode.png',
  //   content: VSCode,
  // },
  // {
  //   id: 'facetime',
  //   title: 'FaceTime',
  //   desktop: true,
  //   show: false,
  //   img: 'img/icons/facetime.png',
  //   height: 530,
  //   content: FaceTime,
  // },
  // {
  //   id: 'terminal',
  //   title: 'Terminal',
  //   desktop: true,
  //   show: false,
  //   img: 'img/icons/terminal.png',
  //   content: Terminal,
  // },
  {
    id: 'email',
    title: 'Mail',
    desktop: false,
    img: 'img/icons/mail.png',
    link: 'mailto:',
  },
  {
    id: 'github',
    title: 'Github',
    desktop: false,
    img: 'img/icons/github.png',
    link: 'https://github.com/AllenWong24/playground-macos-vue3',
  },
]
