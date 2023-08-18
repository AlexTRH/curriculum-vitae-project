module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "project": "./tsconfig.json"
    },
    plugins: ["@typescript-eslint", "prettier"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
    ],
    rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "arrow-parens": "warn",
        "import/order": [
            "warn",
            {
                groups: [
                    "external",
                    "builtin",
                    "internal",
                    ["parent", "sibling", "index"],
                ],
            },
        ],
        "no-console": "warn",
    },
    settings: {
        "import/resolver": {
            // "node": {
            //     "paths": ["src"],
            //     // "extensions": ['.js', '.jsx', '.ts', '.tsx'],
            //     // "moduleDirectory": ['node_modules', 'src/'],
            // },
            typescript: {},
        },
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    globals: {
        window: true,
    },
};

