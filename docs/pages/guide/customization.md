---
title: Customization
pageTitle: false
---

# Customization

## Blog-level changes

Keep personal content and overrides in your blog. Valaxy supports same-name component overrides and additional site styles; use the [theme authoring guide](https://valaxy.site/themes/write) for the framework's resolution rules.

## Theme development

- `theme/` contains the package distributed to theme users.
- `demo/` is a real blog that consumes the workspace theme.
- `docs/` is this Press site, containing only theme-specific instructions.

Use namespaced components and preserve the `ValaxyMain` → `ValaxyMd` rendering contract. Keep browser-only APIs out of server rendering.

```sh
pnpm check
pnpm pack:theme
```

Before publishing, install the packed archive in a clean Valaxy blog. Check keyboard navigation, light/dark appearance, a long article and a subdirectory deployment.

## Hosting

The supplied workflow publishes the combined `dist/` artifact. The demo occupies `/` and the documentation occupies `/docs/`.

For a project hosted under `/my-theme/`, configure the demo's Vite base as `/my-theme/`, the docs base as `/my-theme/docs/`, and each site's absolute URL accordingly. Remove or replace the demo's `public/CNAME` when changing domains. Keep `docs` reserved as the documentation mount path.

Automatic TypeScript reference pages can be added later when the theme exposes enough public APIs to justify them. Handwritten examples and upgrade instructions remain part of this guide.
