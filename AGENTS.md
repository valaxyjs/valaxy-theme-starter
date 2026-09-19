# Theme workspace

This repository contains a source-distributed Valaxy theme in `theme/` and its real consumer in `demo/`. Use pnpm and Vue 3 `<script setup lang="ts">`.

- Start a new theme with `pnpm theme:init <name> --owner <github-owner>`, then `pnpm install`. This updates package references, config and the Starter component namespace. It does not create repositories or publish packages.
- Confirm APIs against the installed Valaxy exports/types. Put theme defaults in `theme/valaxy.config.ts`, runtime composables in `theme/client`, types in `theme/types`, and browser setup in `theme/setup`.
- Preserve the `ValaxyMain` → `ValaxyMd` rendering contract and the RouterView/slot layout flow. Keep SSR free of unguarded browser globals.
- The homepage comes from `theme/pages/index.vue`. Use `usePostList()` to read actual content. Keep Markdown and package dependencies portable; never use absolute paths or links to a developer checkout.
- Run `pnpm check`; inspect home, post and default pages in desktop/mobile browsers, including keyboard focus and light/dark appearance. `pnpm pack:theme` produces a distributable source package.
- Update README and demo configuration when changing theme options. Keep package publication and GitHub deployment separate from local generation.
- Use Conventional Commits for commits and PR titles.

The shared AI authoring skill is `valaxy-theme` in https://github.com/YunYouJun/valaxy/tree/main/skills/valaxy-theme. A UI library or visual reference is optional and must not replace the requested style.
