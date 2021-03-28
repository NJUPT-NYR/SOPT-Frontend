/**
 * @type {import("tailwindcss/defaultConfig")}
 */
module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.tsx", "./src/**/*.css", "./src/**/*.mdx"],
  corePlugins: {
    outline: false,
  },
  theme: {
    extend: {
      colors: {
        "105-105-105": "rgb(105,105,105)",
        "243-243-243": "rgb(243,243,243)",
      },
      backgroundColor: {
        "105-105-105": "rgb(105,105,105)",
        "244-247-249": "rgb(244,247,249)",
        "243-243-243": "rgb(243,243,243)",
      },
      borderColor: {
        "220-220-220": "rgb(220,220,220)",
      },
      gridTemplateRows: {
        scaffold: "auto 35px",
      },
      width: {
        300: "300px",
      },
      maxWidth: {
        "9/10-screen": "90vw",
      },
      gridTemplateColumns: {
        "1fr-3fr": "1fr 3fr",
      },
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-filters"),
    require("@tailwindcss/typography"),
  ],
};
