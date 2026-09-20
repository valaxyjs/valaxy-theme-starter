import { cp, mkdir, rm, stat } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const demo = resolve(root, 'demo/dist')
const docs = resolve(root, 'docs/dist')
const output = resolve(root, 'dist')
// Validate both builds before replacing an existing deployment artifact.
await Promise.all([stat(resolve(demo, 'index.html')), stat(resolve(docs, 'index.html'))])
if (await stat(resolve(demo, 'docs')).then(() => true, () => false))
  throw new Error('The demo must reserve /docs/ for documentation.')
await rm(output, { recursive: true, force: true })
await mkdir(output, { recursive: true })
await cp(demo, output, { recursive: true })
await cp(docs, resolve(output, 'docs'), { recursive: true })
console.log('Assembled demo and documentation in dist/.')
