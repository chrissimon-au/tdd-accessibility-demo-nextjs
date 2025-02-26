import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = tseslint.config(
  tseslint.configs.recommended,
  stylistic.configs.customize({
    flat: true, // required for flat config
    // the following options are the default values
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
  }),
  ...compat.extends("next/core-web-vitals", "next/typescript"),
);

export default eslintConfig;
