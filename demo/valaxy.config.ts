import type { ThemeConfig } from 'valaxy-theme-starter'
import { defineValaxyConfig } from 'valaxy'

/**
 * User Config
 * do not use export const config to avoid defu conflict
 */
export default defineValaxyConfig<ThemeConfig>({
  theme: 'starter',

  themeConfig: {
    // colors: {
    //   primary: 'red',
    // },

    nav: [
      { text: 'Documentation', link: 'https://starter.valaxy.site/docs/' },
      {
        text: 'GitHub',
        link: 'https://github.com/valaxyjs/valaxy-theme-starter',
      },
      {
        text: 'RSS',
        link: 'https://starter.valaxy.site/atom.xml',
      },
      {
        text: 'Discord',
        link: 'https://discord.gg/sGe4U4p4CK',
      },
      {
        text: 'Valaxy →',
        link: 'https://github.com/YunYouJun/valaxy',
      },
    ],

    footer: {
      since: 2016,
    },
  },
})
