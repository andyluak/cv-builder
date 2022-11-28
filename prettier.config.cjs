/** @type {import("prettier").Config} */
module.exports = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  importOrder: [
    "^src/core/(.*)$",
    "^src/components/(.*)$",
    "^src/containers/(.*)$",
    "^src/hooks[./]",
    "^src/pages[./]",
    "^src/utils/(.*)$",
    "^src/public/(.*)$",
    "^[./|~/]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};
