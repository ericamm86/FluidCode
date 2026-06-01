import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["dist"]
  },
  js.configs.recommended,
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: {
        Buffer: "readonly",
        console: "readonly",
        fetch: "readonly",
        process: "readonly",
        URL: "readonly"
      },
      sourceType: "module"
    }
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2023,
      globals: {
        atob: "readonly",
        Blob: "readonly",
        document: "readonly",
        fetch: "readonly",
        FormData: "readonly",
        import: "readonly",
        localStorage: "readonly",
        console: "readonly",
        Uint8Array: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly"
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      sourceType: "module"
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-refresh/only-export-components": "off"
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
