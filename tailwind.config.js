module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.tsx", "./src/**/*.css"],
  theme: {
    extend: {
      gridTemplateRows: {
        scaffold: "auto 35px",
      },
    },
  },
  variants: {},
  plugins: [],
};
