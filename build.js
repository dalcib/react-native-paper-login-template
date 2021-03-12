var spawn = require('child_process').spawn
//const { resolve } = require('path')
var servor = require('servor')
//var vectorIcons = require('./plugin')
var app = require('./app.json')

var prod = !(process.argv[2] === 'dev')

/* const alias = {
  'react-native': './node_modules/react-native-web/dist/index.js',
  'react-native-vector-icons/MaterialCommunityIcons/':
    './node_modules/@expo/vector-icons/MaterialCommunityIcons.js',
  'MaterialCommunityIcons.ttf': './src/assets/materialdesignicons-webfont.ttf',
  '@expo/.x/glyphmaps/MaterialCommunityIcons.json': './src/assets/materialdesignicons-webfont.json',
} 

const aliasPlugin = {
  name: 'vector-icons',
  setup(build) {
    Object.keys(alias).forEach((f) => {
      build.onResolve({ filter: new RegExp(`^${f}$`) }, () => ({ path: resolve(alias[f]) }))
    })
  },
}*/

require('esbuild')
  .build({
    entryPoints: ['./src/index.js'],
    outfile: './public/bundle.js',
    tsconfig: 'tsconfig.json',
    define: {
      'process.env.NODE_ENV': prod ? '"production"' : '"development"',
      'process.env.APP_MANIFEST': JSON.stringify(app),
      __DEV__: !prod,
      global: 'window',
    },
    loader: { '.png': 'file', '.jpg': 'file', '.ttf': 'file', '.js': 'jsx' },
    resolveExtensions: [".web.tsx", ".web.ts", ".web.jsx", ".web.js", ".tsx", ".ts", ".jsx", ".js"], //prettier-ignore
    format: 'esm',
    bundle: true,
    minify: prod,
    assetNames: 'assets/[name]-[hash]',
    sourcemap: true,
    plugins: [/* aliasPlugin */ require('esbuild-mdx')() /* vectorIcons(app.extra.icons) */],
    incremental: !prod,
    publicPath: '/',
    mainFields: ['module', 'main'],
    watch: prod
      ? false
      : {
          onRebuild(error, result) {
            console.log(error ? error : '...')
          },
        },
  })
  .then((result, error) => {
    const port = 8081
    if (!prod) {
      servor({ root: './public', reload: true, port })
        .then((result, error) => {
          if (error) console.log(result, error)
          else spawn('cmd', ['/c', 'start', `http://localhost:${port}`])
        }) //Interagierende-Systeme/openurl2
        .catch(() => process.exit(1))
    }
    console.log(error ? error : !prod ? `[servor] webserver started at localhost:${port}` : '')
  })
  .catch(() => process.exit(1))
