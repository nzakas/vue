const { importPlugin, importEnvGlobals, importESLintRC } = require("eslint/lib/simpleconfig/eslintconfig");

module.exports = [
  "eslint:recommended",
  importPlugin("flowtype", __dirname),
  importESLintRC("plugin:flowtype/recommended", __dirname),
  {
    parserOptions: {
      parser: require.resolve('babel-eslint'),
      ecmaVersion: 2018,
      sourceType: 'module'
    },
    globals: {
      ...importEnvGlobals("es6"),
      ...importEnvGlobals("node"),
      ...importEnvGlobals("browser"),
      "__WEEX__": true,
      "WXEnvironment": true
    },
    rules: {
      'no-console': process.env.NODE_ENV !== 'production' ? 0 : 2,
      'no-useless-escape': 0,
      'no-empty': 0
    }
    
  },
  
  // tests use this plugin
  importPlugin("jasmine", __dirname),

  // from test/helpers/.eslintrc.json
  {
    globals: {
      ...importEnvGlobals("jasmine"),
      "waitForUpdate": true
    }
  },

  // from test/ssr/.eslintrc.json
  {
    globals: {
      ...importEnvGlobals("jasmine")
    },
    "rules": {
      "jasmine/no-focused-tests": 2
    }
  },

  // from test/weex/.eslintrc.js
  {
    files: ["test/weex/**/*.js"],
    globals: {
      ...importEnvGlobals("jasmine")
    },
    "rules": {
      "jasmine/no-focused-tests": 2
    }
  },

  // from test/unit/.eslintrc.json
  {
    files: ["test/unit/**/*.js"],
    "globals": {
      ...importEnvGlobals("jasmine"),
      "waitForUpdate": true,
      "triggerEvent": true,
      "createTextVNode": true
    },
    "rules": {
      "jasmine/no-focused-tests": 2,
      "no-unused-vars": 0
    }
  }


];