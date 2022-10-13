module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
    ],
    
    "rules": {
        "no-unused-vars": ["warn"],
        "react/prop-types": ["off"],
        "quotes": ["warn", "double"],
        // we want to force semicolons
        "semi": ["warn", "always"],
        // we use 2 spaces to indent our code
        "indent": ["warn", 4],
        // we want to avoid extraneous spaces
        "no-multi-spaces": ["warn"],
        "react/react-in-jsx-scope": "off",
    }
};

