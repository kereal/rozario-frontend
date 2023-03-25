const path = require("path")
const sveltePreprocess = require("svelte-preprocess")

module.exports = {
  addons: [
    "@storybook/addon-a11y/register",
    "@storybook/addon-actions/register",
    "@storybook/addon-notes/register",
    "@storybook/addon-storysource/register",
    "@storybook/addon-viewport/register",
    "@storybook/addon-knobs/register",
    "@storybook/addon-postcss"
  ],
  webpackFinal: (config) => {
    let j
    const svelteLoader = config.module.rules.find((r, i) => {
      if (r.loader && r.loader.includes("svelte-loader")) {
        j = i
        return true
      }
    })
    svelteLoader.options = {
      ...svelteLoader.options,
      preprocess: {
        postcss: true
      }
    }
    config.module.rules[j] = {
      ...svelteLoader,
      options: {
        ...svelteLoader.options,
        preprocess: sveltePreprocess({ postcss: true })
      }
    }
    config.module.rules.push(
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         sourceMap: true,
      //         config: {
      //           path: "./.storybook/"
      //         }
      //       }
      //     }
      //   ],
      //   include: path.resolve(__dirname, "../src/stories/")
      // },
      {
        test: /\.stories\.js?$/,
        loaders: [require.resolve("@storybook/source-loader")],
        include: [path.resolve(__dirname, "../src/stories")],
        enforce: "pre"
      }
    )
    return config
  }
}
