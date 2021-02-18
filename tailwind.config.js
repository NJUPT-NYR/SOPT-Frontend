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
      width: {
        300: "300px",
        "table-col-name": "630px",
      },
      maxWidth: {
        "9/10-screen": "90vw",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
