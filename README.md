# Valaxy Theme Starter

A runnable starting point for a [Valaxy](https://valaxy.site) theme, with a separate demo that consumes the theme as a workspace package. Supports Valaxy 1.0.0-rc.11, Vue 3 and Vite 8. Requires Node.js 22.12+ and pnpm 10.

## Create a theme

```bash
pnpm dlx degit valaxyjs/valaxy-theme-starter valaxy-theme-aurora
cd valaxy-theme-aurora
# Rename package references, configuration and component namespaces together.
pnpm theme:init aurora --owner your-github-name
pnpm install
pnpm dev
```

Use a lowercase kebab-case name without the `valaxy-theme-` prefix. `--owner` is optional. Initialization only runs on a fresh starter and refuses conflicting filenames. Review site metadata, package author and license attribution afterward. Retain existing copyright notices when reusing code.

## Build with an AI coding assistant

Install the theme authoring Skill in your assistant's workspace:

```bash
pnpm dlx skills add YunYouJun/valaxy --skill valaxy-theme
```

Describe your audience, visual direction and required blog features. Use the [editable theme prompt](https://valaxy.site/themes/write#generate-a-theme-with-ai) for a complete brief, including an AK UI preset. The Skill guides the assistant through framework APIs, accessible reading layouts, SSG and package verification. It runs in your coding assistant; this template does not call an AI service or require an API key.

Example request:

> Create an editorial Valaxy theme for a personal engineering blog. Use serif headings, a warm paper palette and an archive with title and tag filtering. Include light/dark modes, a long article with an outline and a mobile layout. Keep theme options typed. Run the checks and verify a packed theme in a clean consumer before finishing.

## Workspace

- `theme/`: the distributable package, with components, layouts, styles, typed configuration and setup.
- `demo/`: a real blog using `valaxy-theme-starter` through `workspace:*` (renamed by `theme:init`).
- `scripts/init-theme.mjs`: one-time package and component initialization.
- `AGENTS.md`: concise authoring guidance for coding assistants.

Valaxy discovers `styles/index.ts`, `setup/main.ts`, `components/` and `layouts/` automatically. `components/ValaxyMain.vue` receives the Markdown content slot. Render it through `ValaxyMd` so built-in Markdown enhancements continue to work. Keep `layouts/` thin and namespace ordinary theme components.

## Validate and package

```bash
pnpm check       # lint, initializer tests, SSG demo build, Vue type checking
pnpm pack:theme  # writes a source-distributed .tgz under artifacts/
```

Also inspect the homepage and a long article in desktop/mobile browsers, keyboard navigation and both color schemes. Check a non-root Vite `base` for subdirectory hosting. Before release, install the `.tgz` in a fresh Valaxy blog and build it: a workspace build alone does not prove package portability.

## Publish when ready

After reviewing package metadata and the packed archive, publish manually with `pnpm --dir theme publish --access public --no-git-checks` using your own npm credentials. The tag-triggered release workflow runs the checks and publishes the theme using your repository’s `NPM_TOKEN` secret. Configure it before creating a release tag. `pnpm release` runs the version helper; review its Git actions before accepting them.

CI checks Linux and Windows builds on Node 22. The Pages workflow builds on pushes to `main` or manual dispatch and deploys `demo/dist` after you configure GitHub Pages to use GitHub Actions. Set the demo Vite base and site URL for your hosting path, and remove or replace `demo/public/CNAME` if you use a custom domain.

## License

MIT. The starter's original layout draws inspiration from [vuejs/blog](https://github.com/vuejs/blog) and [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog).
