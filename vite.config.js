import { svelte } from 'vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import { getAliases } from 'vite-aliases';

const aliases = getAliases();

const preprocess = sveltePreprocess();

/** @type {import('vite').UserConfig} */
export default {
  plugins: [svelte()],
  rollupDedupe: ['svelte'],
  alias: aliases,
  optimizeDeps: {
    exclude: ['fastify', 'mariadb', 'sequelize', 'ajv-errors'],
  },
  proxy: {
    '/api': { target: 'http://localhost:8080', changeOrigin: true },
  },
};
