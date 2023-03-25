const path = require("path")

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.stories\.js?$/,
    loaders: [require.resolve("@storybook/source-loader")],
    include: [path.resolve(__dirname, "../storybook")],
    enforce: "pre"
  })

  return config
}
