module.exports = {
    extends: [
        'eslint:recommended',
        'airbnb',
        'prettier',
        'prettier/react',
        'prettier/standard',
        'prettier/@typescript-eslint',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            impliedStrict: true,
        },
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                sourceType: 'module',
                project: './tsconfig.json',
            },
            plugins: ['prettier', 'react', 'jsx-a11y', 'import', '@typescript-eslint'],
            rules: {
                'import/extensions': [0, 'never', { jsx: 'never', js: 'never' }],
                'react/jsx-filename-extension': [2, { extensions: ['.tsx', '.ts'] }],
                'react/jsx-wrap-multilines': [
                    2,
                    {
                        declaration: true,
                        assignment: true,
                        return: true,
                    },
                ],
                'import/order': [
                    'error',
                    {
                        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                        'newlines-between': 'always-and-inside-groups',
                    },
                ],
                quotes: ['error', 'single', 'avoid-escape'],
                'prettier/prettier': [2],
                'import/no-cycle': [0],
                'no-param-reassign': [0],
                'react/prefer-stateless-function': [0],
                'react/forbid-prop-types': [0],
                'no-confusing-arrow': [0],
                'no-mixed-operators': [0],
                'consistent-return': [0],
                'jsx-a11y/anchor-has-content': [0],
                'class-methods-use-this': [0],
                'no-console': [0],
                'no-bitwise': [0],
                'jsx-a11y/no-static-element-interactions': [0],
                'jsx-a11y/no-autofocus': [0],
                'linebreak-style': [0],
                'jsx-a11y/img-has-alt': [0],
                'jsx-a11y/anchor-is-valid': [0],
                'jsx-a11y/no-noninteractive-element-interactions': [0],
                'eol-last': [0],
                'react/prop-types': [0],
                'jsx-a11y/label-has-for': [0],
                'jsx-a11y/click-events-have-key-events': [0],
                'react/default-props-match-prop-types': [0],
                'react/require-default-props': [0],
                'react/no-unused-prop-types': [0],
                'no-unused-vars': [0],
                'no-undef': [0],
                'import/no-extraneous-dependencies': [0],
                'jsx-a11y/no-noninteractive-tabindex': [0],
                'react/button-has-type': [0],
                'getter-return': 'off',
                'no-dupe-args': 'off',
                'no-dupe-keys': 'off',
                'no-unreachable': 'off',
                'valid-typeof': 'off',
                'no-const-assign': 'off',
                'no-new-symbol': 'off',
                'no-this-before-super': 'off',
                'no-dupe-class-members': 'off',
                'no-redeclare': 'off',
                'import/prefer-default-export': 'off',
                '@typescript-eslint/adjacent-overload-signatures': 'error',
                '@typescript-eslint/array-type': 'error',
                '@typescript-eslint/ban-types': 'error',
                '@typescript-eslint/camelcase': 'off',
                '@typescript-eslint/class-name-casing': 'off',
                '@typescript-eslint/explicit-member-accessibility': 'error',
                '@typescript-eslint/interface-name-prefix': 'off',
                '@typescript-eslint/member-delimiter-style': 'error',
                '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
                '@typescript-eslint/no-array-constructor': 'error',
                '@typescript-eslint/no-empty-interface': 'error',
                '@typescript-eslint/no-inferrable-types': 'error',
                '@typescript-eslint/no-parameter-properties': 'error',
                '@typescript-eslint/no-triple-slash-reference': 'off',
                '@typescript-eslint/no-unused-vars': 'warn',
                '@typescript-eslint/no-use-before-define': 'error',
                '@typescript-eslint/no-var-requires': 'error',
                'react/jsx-props-no-spreading': 'off',
            },
            settings: {
                'import/resolver': {
                    node: {
                        extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    },
                    alias: {
                        map: [
                          ['common-components', './src/components'],
                          ['pages', './pages'],
                          ['services', './src/services'],
                          ['main-scene', './src/scenes/Main'],
                          ['stores', './src/stores'],
                          ['global-styles', './src/styles'],
                          ['global-types', './src/types'],
                          ['utils', './src/utils'],
                        ],
                        extensions: ['.ts', '.js', '.tsx', '.json']
                      }
                },
            },
        },
    ],
};