import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        ...globals.node, // Adicione variáveis globais do Node.js
      },
    },
  },
  pluginJs.configs.recommended,
];
