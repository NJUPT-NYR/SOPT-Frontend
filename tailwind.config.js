module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.tsx", "./src/**/*.css", "./src/**/*.mdx"],
  theme: {
    extend: {
      gridTemplateRows: {
        scaffold: "auto 35px",
      },
      width: {
        300: "300px",
      },
      maxWidth: {
        "9/10-screen": "90vw",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
