const postcss = require('rollup-plugin-postcss');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');

module.exports = {
  input: 'src/index.tsx',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      fallback: {
        util: require.resolve('util/'),
        assert: require.resolve('assert/'),
        tty: require.resolve('tty-browserify'),
        os: require.resolve('os-browserify/browser'),
      },
      preferBuiltins: false,
    }),
    typescript(),
    commonjs(),
    json(),
    postcss({
      modules: true,
    }),
  ],
  external: ['zlib', 'https', 'stream', 'events', 'http', 'url', 'fs', 'path', 'tty', 'os'],
};
