// const PRODUCTION = process.env.NODE_ENV === 'production'
const PurgeSvelte = require('./purgecss-from-svelte.js')

/** @type {import('tailwindcss').TailwindConfig} */
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  experimental: {
    uniformColorPalette: true,
    extendedFontSizeScale: true,
  },
  purge: {
    // enable: true,
    content: ['./src/**/*.svelte', './index.html', './node_modules/svelte-simple-datatables/src/**/*.svelte'],
    css: ['./src/styles/**/*.css'],
    extractors: [{ extractor: PurgeSvelte, extensions: ['svelte'] }],
    // safelist: [/svelte-/],
    // options: {
    //   safelist: [/svelte-/],
    // },
  },
  theme: {
    screens: {
      xs: '320px',
      // => @media (min-width: 320px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
}
