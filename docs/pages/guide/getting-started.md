---
title: Getting started
pageTitle: false
---

# Getting started

## Preview from source

Clone this theme repository, install dependencies with pnpm, and run the demo:

```sh
pnpm install
pnpm dev
```

Use `pnpm docs:dev` to edit this documentation separately. Run `pnpm build` to verify both sites, or `pnpm build:site` to assemble the demo at `/` and the documentation at `/docs/` into `dist/`.

## Install in a blog

Once the theme is published, install it in an existing Valaxy project:

```sh
pnpm add valaxy-theme-starter
```

```ts
import { defineValaxyConfig } from 'valaxy'

export default defineValaxyConfig({
  theme: 'starter',
})
```

Match the theme's Valaxy peer dependency before upgrading. For a theme that has not been published, use `pnpm pack:theme` and install the resulting archive in a clean blog to check package portability.

Continue with [configuration](./configuration.md). For framework setup, see the [Valaxy getting started guide](https://valaxy.site/guide/getting-started).
