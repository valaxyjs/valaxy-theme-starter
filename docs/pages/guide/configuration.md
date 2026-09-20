---
title: Configuration
pageTitle: false
---

# Configuration

Configure the theme in your blog’s `valaxy.config.ts`. Site metadata such as the author and description belongs in `site.config.ts`.

Set `timezone` in `site.config.ts` to format publication dates in your preferred time zone, for example `Asia/Shanghai`. The theme uses UTC when it is unset so dates stay consistent between static rendering and the browser.

```ts
import type { ThemeConfig } from 'valaxy-theme-starter'
import { defineValaxyConfig } from 'valaxy'

export default defineValaxyConfig<ThemeConfig>({
  theme: 'starter',
  themeConfig: {
    colors: { primary: '#0078E7' },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
    ],
    footer: { since: 2026 },
  },
})
```

| Option           | Purpose                                                       |
| ---------------- | ------------------------------------------------------------- |
| `colors.primary` | Primary accent color; defaults to `#0078E7`                   |
| `nav`            | Navigation entries with `text`, `link` and an optional `icon` |
| `footer.since`   | First year shown in the footer                                |
| `footer.powered` | Display the framework/theme attribution                       |
| `footer.beian`   | Optional registration information                             |

When adding or changing an option, update its type, default, example and this page together. Test it in the demo, including narrow viewports and both color schemes.
