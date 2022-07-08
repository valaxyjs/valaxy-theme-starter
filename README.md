<p align="center">
Valaxy-Theme-Starter<sup><em>(vue)</em></sup>
</p>

> This is a template for creating a [valaxy](https://github.com/YunYouJun/valaxy) theme.

## Usage

### Clone to local

> Use [pnpm](https://pnpm.io/), because we need its workspace.

```bash
npx degit YunYouJun/valaxy-theme-starter valaxy-theme-name
cd valaxy-theme-name
# If you don't have pnpm installed, run: npm install -g pnpm
pnpm i
```

### Development

```bash
# dev node
pnpm dev
# dev client
pnpm demo
```

### Build

```bash
pnpm build
```

### Release

> Publish to [npm](https://www.npmjs.com/).

#### Manual

```bash
pnpm publish
```

#### GitHub Actions

> You can release it by github actions.

Click `Settings` -> `Secrets` -> `Actions` in your GitHub repo.

Add `New repository secret`:

- `NPM_TOKEN`: `your npm token` (Generate from your npm `Access Tokens` - `Automation`)

```bash
npm run release
# choose your version to automatic release
```

## Checklist

- [ ] Change the author name in `LICENSE` & `package.json` & `.github`
- [ ] Write `ThemeConfig` & Other init content
- [ ] Rename `valaxy-theme-starter` to `valaxy-theme-{name}` (custom it)
- [ ] Each of your Vue components should have a namespace
  - For example: `YunTest.vue` for `valaxy-theme-yun`

Let's write the theme & docs!

## Thanks

Starter theme ref [vuejs/blog](https://github.com/vuejs/blog).

### [Sponsors](https://sponsors.yunyoujun.cn)

<p align="center">
  <a href="https://sponsors.yunyoujun.cn">
    <img src='https://fastly.jsdelivr.net/gh/YunYouJun/sponsors/public/sponsors.svg'/>
  </a>
</p>