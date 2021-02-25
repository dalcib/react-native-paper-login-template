var prod = !(process.argv[2] === 'dev')
var vectorIcons = require('./plugin')
var servor = require('servor')

if (!prod) {
  const instance = servor({
    root: './public',
    reload: true,
    port: 8081,
  })
    .then((result, error) => {
      if (error) console.log(result, error)
    })
    .catch(() => process.exit(1))
}

const icons = {
  MaterialCommunityIcons: ['camera', 'menu', 'account-outline', 'tune', 'bookmark-outline'],
}

require('esbuild')
  .build({
    entryPoints: ['./src/index.js'],
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
    sourcemap: true, //prod,
    watch: prod
      ? false
      : {
          onRebuild(error, result) {
            console.log(error ? error : '...')
          },
        },
    logLevel: 'error',
    plugins: [vectorIcons(icons)],
    incremental: !prod,
    publicPath: '/',
  })
  .then((result) => {
    //result.stop();
    console.log('...')
  })
  .catch(() => process.exit(1))

/*     const files = await fs.readdir(resolve('public'));
  const newfiles = files
    .filter((elem) => ['.png', '.ttf'].includes(parse(elem).ext))
    .forEach(async (file) => {
      await fs.rename(
        resolve('public', file),
        resolve('public/static', file)
      );
    }); */
