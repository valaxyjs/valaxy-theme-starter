import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { it } from 'node:test'
import { initializeTheme } from '../scripts/init-theme.mjs'

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'valaxy-theme-init-'))
  await mkdir(join(root, 'theme/components'), { recursive: true })
  await mkdir(join(root, 'demo'))
  await mkdir(join(root, 'docs'))
  await writeFile(join(root, 'docs/valaxy.config.ts'), `export default { theme: 'press', title: 'Starter', edit: 'https://github.com/valaxyjs/valaxy-theme-starter/edit/main/docs/:path', url: 'https://starter.valaxy.site/docs/' }`)
  await writeFile(join(root, 'docs/package.json'), JSON.stringify({ name: 'valaxy-theme-starter-docs', private: true }))
  await writeFile(join(root, 'package.json'), JSON.stringify({ devDependencies: { 'valaxy-theme-starter': 'workspace:*' } }))
  await writeFile(join(root, 'theme/package.json'), JSON.stringify({ name: 'valaxy-theme-starter' }))
  await writeFile(join(root, 'theme/components/StarterNav.vue'), '<nav>Starter</nav>')
  await writeFile(join(root, 'demo/valaxy.config.ts'), 'export default { theme: \'starter\' }')
  return root
}

it('initializes package references, config and component namespaces together', async () => {
  const root = await fixture()
  try {
    const result = await initializeTheme(root, 'valaxy-theme-field-notes', 'valaxyjs')
    assert.equal(result.namespace, 'FieldNotes')
    const pkg = JSON.parse(await readFile(join(root, 'theme/package.json'), 'utf8'))
    assert.equal(pkg.name, 'valaxy-theme-field-notes')
    assert.equal(pkg.repository.url, 'git+https://github.com/valaxyjs/valaxy-theme-field-notes.git')
    const rootPkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
    assert.equal(rootPkg.devDependencies['valaxy-theme-field-notes'], 'workspace:*')
    assert.match(await readFile(join(root, 'demo/valaxy.config.ts'), 'utf8'), /theme: 'field-notes'/)
    assert.equal(await readFile(join(root, 'theme/components/FieldNotesNav.vue'), 'utf8'), '<nav>FieldNotes</nav>')
    const docs = await readFile(join(root, 'docs/valaxy.config.ts'), 'utf8')
    assert.match(docs, /theme: 'press'/)
    assert.match(docs, /FieldNotes/)
    assert.match(docs, /valaxyjs\/valaxy-theme-field-notes/)
    assert.match(docs, /https:\/\/example.com\/docs\//)
    assert.equal(JSON.parse(await readFile(join(root, 'docs/package.json'), 'utf8')).name, 'valaxy-theme-field-notes-docs')
    await assert.rejects(initializeTheme(root, 'another-theme'), /unchanged starter/)
  }
  finally {
    await rm(root, { recursive: true, force: true })
  }
})

it('rejects invalid names before reading or writing the project', async () => {
  for (const name of ['../escape', 'Bad Name', '', 'starter', 'a;whoami'])
    await assert.rejects(initializeTheme('/does-not-exist', name), /lowercase theme name/)
})

it('does not overwrite an existing component when renaming', async () => {
  const root = await fixture()
  try {
    await writeFile(join(root, 'theme/components/FieldNotesNav.vue'), 'existing content')
    await assert.rejects(initializeTheme(root, 'field-notes'), /already exists/)
    assert.equal(await readFile(join(root, 'theme/components/FieldNotesNav.vue'), 'utf8'), 'existing content')
    assert.equal(JSON.parse(await readFile(join(root, 'theme/package.json'), 'utf8')).name, 'valaxy-theme-starter')
  }
  finally {
    await rm(root, { recursive: true, force: true })
  }
})
