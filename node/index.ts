import type { Plugin } from 'vite'
import type { ThemeConfig } from '../types'
import { defaultThemeConfig } from '../config'

export * from '../config'
export * from '../types'

export interface UserOptions {
  colors: {
    primary: string
  }
}

// write a vite plugin
// https://vitejs.dev/guide/api-plugin.html
export function themePlugin(userOptions: Partial<ThemeConfig> = defaultThemeConfig): Plugin {
  return {
    name: 'valaxy-theme-starter',

    config() {
      return {
        css: {
          preprocessorOptions: {
            scss: {
              additionalData: `$c-primary: ${userOptions.colors?.primary || '#0078E7'} !default;`,
            },
          },
        },
      }
    },
  }
}

export default themePlugin
