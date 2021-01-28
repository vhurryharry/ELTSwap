import autoPreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'
import livereload from 'rollup-plugin-livereload';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import replace from "rollup-plugin-replace";
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import typescript from "@rollup/plugin-commonjs";

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
};

function typeCheck() {
  return {
    writeBundle() {
      require('child_process').spawn('svelte-check', {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });
    }
  }
};

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
    }),
    svelte({
      // emitCss: true,
      preprocess: autoPreprocess({
        postcss: true,
        sourceMap: !production,
        scss: { includePaths: ['src', 'node_modules'] },
      }),
      compilerOptions: {
        dev: !production,
      },
    }),
    typescript({ sourceMap: !production }),
    postcss({
      config: {
        parser: 'sugarss',
      },
      extract: path.resolve('public/build/bundle.css'),
      minimize: production,
      sourceMap: !production,
    }),
    copy({
      targets: [
        {
          src: ['./src/static/font/Flama-Basic.otf'],
          dest: 'public/static/font'
        }
      ]
    }),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false
  }
};
