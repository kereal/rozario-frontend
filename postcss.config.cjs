//const purgecss = require("@fullhuman/postcss-purgecss")

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {})
    //...(process.env.NODE_ENV === "production" ? { purgecss: {} } : {})
  }
}
