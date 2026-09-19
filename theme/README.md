# Valaxy Theme Starter

A minimal theme for Valaxy 1.0.0-rc.11 and Vue 3. Source files are shipped so Valaxy can discover and extend the theme.

To develop your own theme, start with the [workspace template](https://github.com/valaxyjs/valaxy-theme-starter), run `pnpm theme:init <name>`, and follow its README. To use the published starter in an existing blog, install `valaxy-theme-starter` and configure `theme: 'starter'` in `valaxy.config.ts`.

Layouts: `home`, `post`, `default` and `404`. Theme options, including navigation, colors and footer settings, are declared in `types/index.d.ts`. Site identity and article content belong in the consuming blog.

MIT. See LICENSE.
