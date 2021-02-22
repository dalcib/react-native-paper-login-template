var prod = !(process.argv[2] === 'dev');
var vectorIcons = require('./plugin');
var fs = require('fs').promises;
const { parse, resolve } = require('path');

require('esbuild')
  .build({
    entryPoints: ['./node_modules/expo/AppEntry.js'],
    outfile: './public/bundle.js',
    tsconfig: 'tsconfig.json',
    define: {
      'process.env.NODE_ENV': prod ? '"production"' : '"development"',
      __DEV__: !prod,
      global: 'window',
    },
    loader: { '.png': 'file', '.ttf': 'file', '.js': 'jsx' },
    resolveExtensions: [".web.tsx", ".web.ts", ".web.jsx", ".web.js", ".tsx", ".ts", ".jsx", ".js"], //prettier-ignore
    format: 'esm',
    bundle: true,
    minify: prod,
    sourcemap: prod,
    watch: prod
      ? false
      : {
          onRebuild(error, result) {
            console.log(error ? error : '...');
          },
        },
    logLevel: 'error',
    plugins: [
      vectorIcons({
        MaterialCommunityIcons: ['camera'],
      }),
    ],
    incremental: !prod,
    publicPath: 'static',
  })
  .then(async (result) => {
    //result.stop();
    console.log('...');
    const files = await fs.readdir(resolve('public'));
    const newfiles = files
      .filter((elem) => ['.png', '.ttf'].includes(parse(elem).ext))
      .forEach(async (file) => {
        await fs.rename(
          resolve('public', file),
          resolve('public/static', file)
        );
      });
  })
  .catch(() => process.exit(1));
