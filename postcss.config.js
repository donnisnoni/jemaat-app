const PRODUCTION = process.env.NODE_ENV == 'production'
const tailwindConfig = require('./tailwind.config.js')

module.exports = {
  plugins: [
    PRODUCTION && require('@fullhuman/postcss-purgecss')(tailwindConfig.purge),
    PRODUCTION && require('postcss-import'),
    require('tailwindcss'),
    PRODUCTION && require('autoprefixer'),
    PRODUCTION && require('cssnano')(),
  ],
}
