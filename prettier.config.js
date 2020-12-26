/** @type {import('prettier').Options} */
module.exports = {
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 120,
  plugins: ['./node_modules/prettier-plugin-svelte'],
  svelteStrictMode: false,
  svelteBracketNewLine: false,
};
