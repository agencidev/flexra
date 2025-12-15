const baseConfig = require("eslint-config-next/core-web-vitals");

module.exports = [
  {
    ignores: [".next/**"],
  },
  ...baseConfig.map((entry) => {
    if (!entry || typeof entry !== "object") return entry;

    return {
      ...entry,
      linterOptions: {
        ...(entry.linterOptions ?? {}),
        reportUnusedDisableDirectives: "off",
      },
    };
  }),
];
