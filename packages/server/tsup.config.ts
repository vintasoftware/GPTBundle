import { defineConfig } from 'tsup'
import { name } from './package.json'

/**
 * Removes everything before the last
 * @octocat/library-repo -> library-repo
 * vite-component-library-template -> vite-component-library-template
 */
const formattedName = name.match(/[^/]+$/)?.[0] ?? name

export default defineConfig({
  entry: {
    [formattedName] : 'src/index.ts'
  },
  splitting: false,
  sourcemap: false,
  // dts: true,
  // Cannot use dts, see: https://github.com/egoist/tsup/issues/647
  onSuccess: 'tsc --p src/tsconfig.json',
  clean: true,
  format: ['esm', 'cjs'],
  target: 'node20',
  esbuildOptions(options) {
    options.banner = {
      js: '"use server"',
    }
  },
})
