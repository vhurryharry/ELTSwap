import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import copy from 'rollup-plugin-copy'
import sveltePreprocess from 'svelte-preprocess';
import purgecss from '@fullhuman/postcss-purgecss';
import postcss from 'rollup-plugin-postcss';

import path from 'path';

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
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte({
      emitCss: false,
      preprocess: sveltePreprocess({
        postcss: true,
        sourceMap: !production,
      }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,

      },
    }),
    postcss({
      plugins: [
        purgecss({
          content: [
            './node_modules/svelte/*.js',
            './node_modules/svelte/*.css',
            './node_modules/svelte/*.scss',
            './src/**/*.css',
            './src/**/*.scss',
            './src/**/*.svelte',
          ],
        }),
        autoprefixer()
      ],
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
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
