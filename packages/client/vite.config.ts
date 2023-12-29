import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, configDefaults } from 'vitest/config';
import dts from 'vite-plugin-dts';
import { type UserConfigExport } from 'vite';
import { name } from './package.json';

const app = async (): Promise<UserConfigExport> => {
  /**
   * Removes everything before the last
   * @octocat/library-repo -> library-repo
   * vite-component-library-template -> vite-component-library-template
   */
  const formattedName = name.match(/[^/]+$/)?.[0] ?? name;

  return defineConfig({
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        entryRoot: './src',
      }),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: formattedName,
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react/jsx-runtime': 'react/jsx-runtime',
            'react-dom': 'ReactDOM',
          },
          intro: '"use client"',
        },
        // Fix for https://github.com/vitejs/vite/issues/15012:
        onLog: (level, log, handler) => {
          if (log.cause && log.cause.message === "Can't resolve original location of error.") {
            return;
          }
          handler(level, log);
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '#root': path.resolve(__dirname, 'src/'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, '**/node_modules/**', 'docs/**'],
    },
  });
};
// https://vitejs.dev/config/
export default app;
