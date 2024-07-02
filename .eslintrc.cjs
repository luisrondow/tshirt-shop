module.exports = {
  root: true,
  plugins: ['vitest'],
  extends: ["@nuxt/eslint-config", "plugin:prettier/recommended"],
  rules: {
    'prettier/prettier': [
       'error',
       {
         trailingComma: 'all',
         tabWidth: 2,
         semi: false,
         singleQuote: true,
         bracketSpacing: true,
         eslintIntegration: true,
         printWidth: 120,
       },
     ],
   }
};
