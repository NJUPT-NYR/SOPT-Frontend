const withMDX = require("@next/mdx");

module.exports = withMDX({
  extension: /\.mdx?$/,
})({
  /* config options here */
  pageExtensions: ["mdx", "jsx", "js", "ts", "tsx"],
});
