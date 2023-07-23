module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends:[  "standard-with-typescript", "prettier"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: "@typescript-eslint/parser",
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    rules: {
        indent: ["warn", 2],
        "@typescript-eslint/strict-boolean-expressions": "warn",
    },
};
