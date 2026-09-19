// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    test: false,
    formatters: true,
  },
  {
    ignores: [
      '**/*/.valaxy',
      '**/public/feed.{json,xml}',
      '**/public/atom.xml',
      '**/public/valaxy-fuse-list.json',
    ],
  },
)
