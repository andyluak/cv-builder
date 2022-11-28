/* eslint-disable @typescript-eslint/no-var-requires */

// https://github.com/trivago/prettier-plugin-sort-imports/issues/117

/** @type {import("prettier").Config} */

const pluginSortImports = require("@trivago/prettier-plugin-sort-imports")
const pluginTailwindcss = require("prettier-plugin-tailwindcss")

/** @type {import("prettier").Parser}  */
const myParser = {
  ...pluginSortImports.parsers.typescript,
  parse: pluginTailwindcss.parsers.typescript.parse,
}

/** @type {import("prettier").Plugin}  */
const myPlugin = {
  parsers: {
    typescript: myParser,
  },
}

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
  plugins: [myPlugin],
};
