const tailwindcss = require("tailwindcss");
const autoprefixer = require('autoprefixer')

const cssnano = require('cssnano')

// only needed if you want to purge
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.svelte", "./src/**/*.html"],
  whitelistPatterns: [/svelte-/],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!-)/g) || []
});


module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),
    autoprefixer(),

    // only needed if you want to purge
    ...(process.env.NODE_ENV === "production" ? [purgecss, cssnano] : [])
  ]
};
