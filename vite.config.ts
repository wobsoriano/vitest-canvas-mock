import { defineConfig } from 'vite-plus';

export default defineConfig({
  run: {
    tasks: {
      'lint:ci': {
        command: 'vp lint',
        input: [
          'src/**/*.js',
          '__tests__/**/*.js',
          '__tests__/setup.ts',
          'package.json',
          'tsconfig.json',
          'vite.config.ts',
        ],
      },
      'test:ci': {
        command: 'vp test run',
        input: [
          'src/**/*.js',
          '__tests__/**/*.js',
          '__tests__/setup.ts',
          'package.json',
          'vite.config.ts',
        ],
        untrackedEnv: ['CI', 'GITHUB_ACTIONS'],
      },
    },
  },
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    singleQuote: true,
    semi: true,
    experimentalSortPackageJson: true,
    sortImports: {
      groups: [
        ['type-import'],
        ['type-builtin', 'value-builtin'],
        ['type-external', 'value-external', 'type-internal', 'value-internal'],
        [
          'type-parent',
          'type-sibling',
          'type-index',
          'value-parent',
          'value-sibling',
          'value-index',
        ],
        ['unknown'],
      ],
      newlinesBetween: true,
      order: 'asc',
    },
  },
  pack: {
    entry: 'src/index.js',
    platform: 'neutral',
    exports: false,
    format: ['esm', 'cjs'],
    dts: false,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
    plugins: ['unicorn', 'typescript'],
  },
  test: {
    environment: 'jsdom',
    include: ['__tests__/**/*.js'],
    setupFiles: ['__tests__/setup.ts'],
  },
});
