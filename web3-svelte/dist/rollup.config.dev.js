"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sveltePreprocess = _interopRequireDefault(require("svelte-preprocess"));

var _pluginCommonjs = _interopRequireDefault(require("@rollup/plugin-commonjs"));

var _rollupPluginCopy = _interopRequireDefault(require("rollup-plugin-copy"));

var _rollupPluginLivereload = _interopRequireDefault(require("rollup-plugin-livereload"));

var _path = _interopRequireDefault(require("path"));

var _rollupPluginPostcss = _interopRequireDefault(require("rollup-plugin-postcss"));

var _rollupPluginReplace = _interopRequireDefault(require("rollup-plugin-replace"));

var _rollupPluginSvelte = _interopRequireDefault(require("rollup-plugin-svelte"));

var _rollupPluginTerser = require("rollup-plugin-terser");

var _pluginNodeResolve = _interopRequireDefault(require("@rollup/plugin-node-resolve"));

var _pluginBabel = _interopRequireDefault(require("@rollup/plugin-babel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var production = !process.env.ROLLUP_WATCH;

function serve() {
  var server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle: function writeBundle() {
      if (server) return;
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });
      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}

;

function typeCheck() {
  return {
    writeBundle: function writeBundle() {
      require('child_process').spawn('svelte-check', {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });
    }
  };
}

;
var _default = {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [(0, _rollupPluginReplace["default"])({
    'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
  }), (0, _rollupPluginSvelte["default"])({
    // emitCss: true,
    preprocess: (0, _sveltePreprocess["default"])({
      postcss: true,
      sourceMap: !production,
      scss: {
        includePaths: ['src', 'node_modules']
      }
    }),
    compilerOptions: {
      dev: !production
    }
  }), (0, _pluginCommonjs["default"])({
    sourceMap: !production
  }), (0, _rollupPluginPostcss["default"])({
    config: {
      parser: 'sugarss'
    },
    extract: _path["default"].resolve('public/build/bundle.css'),
    minimize: production,
    sourceMap: !production
  }), (0, _rollupPluginCopy["default"])({
    targets: [{
      src: ['./src/static/font/Flama-Basic.otf'],
      dest: 'public/static/font'
    }]
  }), // If you have external dependencies installed from
  // npm, you'll most likely need these plugins. In
  // some cases you'll need additional configuration -
  // consult the documentation for details:
  // https://github.com/rollup/plugins/tree/master/packages/commonjs
  (0, _pluginNodeResolve["default"])({
    browser: true,
    dedupe: ['svelte']
  }), (0, _pluginBabel["default"])({
    babelHelpers: 'bundled'
  }), (0, _pluginCommonjs["default"])(), // In dev mode, call `npm run start` once
  // the bundle has been generated
  !production && serve(), // Watch the `public` directory and refresh the
  // browser on changes when not in production
  !production && (0, _rollupPluginLivereload["default"])('public'), // If we're building for production (npm run build
  // instead of npm run dev), minify
  production && (0, _rollupPluginTerser.terser)()],
  watch: {
    clearScreen: false
  }
};
exports["default"] = _default;