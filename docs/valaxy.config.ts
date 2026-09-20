import type { PressTheme } from 'valaxy-theme-press'
import { defineValaxyConfig } from 'valaxy'

export default defineValaxyConfig<PressTheme.Config>({
  theme: 'press',
  vite: { base: '/docs/' },
  modules: { rss: { enable: false } },
  siteConfig: {
    title: 'Starter Documentation',
    description: 'Install, configure and customize valaxy-theme-starter.',
    url: 'https://starter.valaxy.site/docs/',
    lang: 'en',
    // Demo and docs share the saved UI language on this origin.
    languages: ['en', 'zh-CN'],
    search: { enable: true, provider: 'local' },
  },
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Demo', link: 'https://starter.valaxy.site/' },
      { text: 'Valaxy', link: 'https://valaxy.site' },
    ],
    sidebar: [
      { text: 'Introduction', link: '/' },
      { text: 'Getting started', link: '/guide/getting-started' },
      { text: 'Configuration', link: '/guide/configuration' },
      { text: 'Customization', link: '/guide/customization' },
    ],
    editLink: {
      pattern: 'https://github.com/valaxyjs/valaxy-theme-starter/edit/main/docs/:path',
    },
  },
})
