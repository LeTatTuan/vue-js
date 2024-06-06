module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['vue'],
  rules: {
    'prettier/prettier': 'off',
    semi: ['error', 'always'],
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off',
  },
};
