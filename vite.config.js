import { svelte } from 'vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import { getAliases } from 'vite-aliases'

const aliases = getAliases()
const preprocess = sveltePreprocess({ postcss: true })

/** @type {import('vite').UserConfig} */
export default {
  plugins: [svelte({ preprocess })],
  rollupDedupe: ['svelte'],
  alias: aliases,
  optimizeDeps: {
    exclude: ['ajv-errors', 'bcrypt', 'dotenv', 'fastify-jwt', 'fastify', 'mariadb', 'sequelize'],
  },
  proxy: {
    '/api': { target: 'http://localhost:8080', changeOrigin: true },
  },
}
