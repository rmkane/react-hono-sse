import js from '@eslint/js'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  {
    extends: [js.configs.recommended, tseslint.configs.recommended],
    files: ['**/*.{ts,js}'],
    ignores: ['**/*.config.{ts,js}', '**/dist/**'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
    },
    plugins: {
      'sort-keys-fix': sortKeysFix,
    },
    rules: {
      // Enforce object property sorting with auto-fix
      'sort-keys-fix/sort-keys-fix': 'error',
    },
  },
])
