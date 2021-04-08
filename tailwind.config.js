const colors = {
  "105-105-105": "rgb(105,105,105)",
  "243-243-243": "rgb(243,243,243)",
  "105-105-105": "rgb(105,105,105)",
  "244-247-249": "rgb(244,247,249)",
  "243-243-243": "rgb(243,243,243)",
  "220-220-220": "rgb(220,220,220)",
  "250-250-250": "rgb(250, 250, 250)",
  "217-217-217": "rgb(217, 217, 217)",
};

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
  variants: {
    extend: {
      backgroundColor: ["active"],
      textColor: ["active"],
    },
  },
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      backgroundColor: {
        ...colors,
      },
      borderColor: {
        ...colors,
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
      minWidth: {
        10: "10rem",
      },
      gridTemplateColumns: {
        "1fr-3fr": "1fr 3fr",
      },
      gridColumnStart: {
        "span-2": "span 2",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-filters"),
    require("@tailwindcss/typography"),
  ],
};
