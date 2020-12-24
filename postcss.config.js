const PRODUCTION = process.env.NODE_ENV == 'production';
const tailwindConfig = require('./tailwind.config.js');

// console.dir(tailwindConfig.purge);

module.exports = {
  plugins: [
    PRODUCTION && require('postcss-import'),
    PRODUCTION && require('@fullhuman/postcss-purgecss')(tailwindConfig.purge),
    require('tailwindcss'),
    PRODUCTION && require('autoprefixer'),
    PRODUCTION && require('cssnano')(),
  ],
};
