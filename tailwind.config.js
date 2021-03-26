/**
 * @type {import("tailwindcss/defaultConfig")}
 */
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
      backgroundColor: {
        "244-247-249": "rgb(244,247,249)",
      },
      gridTemplateColumns: {
        "1fr-3fr": "1fr 3fr",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-filters")],
};
