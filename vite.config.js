const { defineConfig } = require('vite')
import svelte from '@svitejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import { getAliases } from 'vite-aliases'

const aliases = getAliases({ prefix: '/@' })
const preprocess = sveltePreprocess({ postcss: true })

module.exports = defineConfig(({ /* command, */ mode }) => {
  const isProduction = mode === 'production'
  return {
    plugins: [
      svelte({
        hot: !isProduction,
        emitCss: true,
        preprocess,
      }),
    ],
    build: {
      minify: isProduction,
    },
    optimizeDeps: {
      exclude: [
        'ajv-errors',
        'bcrypt',
        'dotenv',
        'ejs',
        'fastify-jwt',
        'fastify',
        'mariadb',
        'pdf-lib',
        'puppeteer',
        'sequelize',
      ],
    },
    resolve: {
      alias: aliases,
    },
    server: {
      proxy: {
        '/api': { target: 'http://localhost:8080', changeOrigin: true },
      },
    },
  }
})
