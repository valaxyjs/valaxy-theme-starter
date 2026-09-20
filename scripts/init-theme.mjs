import { access, readdir, readFile, rename, writeFile } from 'node:fs/promises'
import { basename, join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

/** Rename a fresh starter workspace without touching dependencies or Git history. */
export async function initializeTheme(root, input, owner) {
  const name = input.replace(/^valaxy-theme-/, '')
  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name) || name.length > 60 || name === 'starter')
    throw new Error('Choose a lowercase theme name such as aurora or field-notes.')
  if (owner && !/^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?$/i.test(owner))
    throw new Error('Use a valid GitHub owner name.')
  const themePackage = JSON.parse(await readFile(join(root, 'theme/package.json'), 'utf8'))
  if (themePackage.name !== 'valaxy-theme-starter')
    throw new Error('This command only initializes an unchanged starter package name.')
  const packageName = `valaxy-theme-${name}`
  const namespace = name.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('')
  const edits = []
  for (const directory of ['theme', 'demo', 'docs']) {
    if (!await access(join(root, directory)).then(() => true, () => false))
      continue
    async function visit(folder) {
      for (const entry of await readdir(folder, { withFileTypes: true })) {
        if (entry.isSymbolicLink() || ['node_modules', 'dist', '.valaxy'].includes(entry.name))
          continue
        const file = join(folder, entry.name)
        if (entry.isDirectory()) {
          await visit(file)
        }
        else if (/\.(?:ts|vue|scss|css|json|md|yml)$/.test(entry.name)) {
          const source = await readFile(file, 'utf8')
          const content = source.replaceAll('valaxy-theme-starter', packageName).replaceAll('Starter', namespace).replace(/theme: 'starter'/g, `theme: '${name}'`).replaceAll(`valaxyjs/${packageName}`, `${owner || 'your-github-name'}/${packageName}`).replaceAll('https://starter.valaxy.site', 'https://example.com')
          edits.push({ file, content, destination: join(folder, basename(file).replace(/^Starter/, namespace)) })
        }
      }
    }
    await visit(join(root, directory))
  }
  // Preflight every rename before modifying the workspace.
  for (const edit of edits) {
    if (edit.destination === edit.file)
      continue
    const exists = await access(edit.destination).then(() => true, () => false)
    if (exists)
      throw new Error(`Cannot rename: ${edit.destination} already exists.`)
  }
  for (const edit of edits) {
    await writeFile(edit.file, edit.content)
    if (edit.destination !== edit.file)
      await rename(edit.file, edit.destination)
  }
  const rootPackage = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
  delete rootPackage.devDependencies['valaxy-theme-starter']
  rootPackage.devDependencies[packageName] = 'workspace:*'
  rootPackage.name = `${packageName}-workspace`
  await writeFile(join(root, 'package.json'), `${JSON.stringify(rootPackage, null, 2)}\n`)
  const updated = JSON.parse(await readFile(join(root, 'theme/package.json'), 'utf8'))
  updated.version = '0.1.0'
  updated.description = `${namespace} theme for Valaxy`
  delete updated.homepage
  delete updated.repository
  if (owner)
    updated.repository = { type: 'git', url: `git+https://github.com/${owner}/${packageName}.git`, directory: 'theme' }
  await writeFile(join(root, 'theme/package.json'), `${JSON.stringify(updated, null, 2)}\n`)
  return { name, packageName, namespace }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [input, flag, owner] = process.argv.slice(2)
  if (!input || (flag && (flag !== '--owner' || !owner))) {
    console.error('Usage: pnpm theme:init <name> [--owner github-owner]')
    process.exitCode = 1
  }
  else {
    try {
      const result = await initializeTheme(process.cwd(), input, owner)
      console.log(`Initialized ${result.packageName}. Run pnpm install to refresh the lockfile, then pnpm check. Review README, site metadata and package author before publishing.`)
    }
    catch (error) {
      console.error(error.message)
      process.exitCode = 1
    }
  }
}
