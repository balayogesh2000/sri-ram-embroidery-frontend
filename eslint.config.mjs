import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "no-undef": "error", // Ensures no undefined variables
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Warns about unused vars, but ignores unused function arguments starting with _
      "react/jsx-no-undef": "error", // Ensures all JSX variables are defined
    },
  },
];

export default eslintConfig;
