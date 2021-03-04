var spawn = require('child_process').spawn
var servor = require('servor')
var vectorIcons = require('./plugin')
var app = require('./app.json')
var prod = !(process.argv[2] === 'dev')

const port = 8081

function openBrowser(callback) {
  const command = { darwin: 'open', win32: 'cmd', linux: 'xdg-open' }
  const child = spawn(command[process.platform], ['/c', 'start', `http://localhost:${port}`])
  //Interagierende-Systeme/openurl2
  /*   var errorText = ''
  child.stderr.setEncoding('utf8')
  child.stderr.on('data', function (data) {
    errorText += data
  })
  child.stderr.on('end', function () {
    if (errorText.length > 0) {
      var error = new Error(errorText)
      if (callback) {
        callback(error)
      } else {
        throw error
      }
    } else if (callback) {
      callback(error)
    }
  }) */
}

function openServor() {
  if (!prod) {
    const instance = servor({
      root: './public',
      reload: true,
      port,
    })
      .then((result, error) => {
        if (error) console.log(result, error)
        else openBrowser()
      })
      .catch(() => process.exit(1))
  }
}

const icons = {
  MaterialCommunityIcons: [
    'camera',
    'menu',
    'account-outline',
    'tune',
    'bookmark-outline',
    'pause',
    'arrow-left',
    'archive',
    'email',
    'label',
    'delete',
    'reply',
    'magnify',
    'dots-vertical',
    'folder',
    'eye',
    'image-album',
    'inbox',
    'heart',
    'shopping-music',
    'camera',
    'chevron-down',
    'city',
    'checkbox-marked',
    'minus-box',
    'checkbox-blank-outline',
    'check',
    'close-circle',
    'arrow-up',
    'chevron-left',
    'chevron-right',
    'eye-off',
    'cancel',
    'format-letter-case',
    'plus',
    'star',
    'bell',
    'lock',
    'chevron-up',
    'calendar',
    'wallet-giftcard',
    'equal',
    'information',
    'star-outline',
    'file-pdf',
    'undo',
    'redo',
    'content-cut',
    'content-copy',
    'content-paste',
    'close',
    'menu',
    'android',
    'format-italic',
    'format-bold',
    'format-underline',
    'format-color-text',
    'heart-outline',
  ],
}

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
  .then((result, error) => {
    //result.stop();
    openServor()
    console.log('..', error)
  })
  .catch(() => process.exit(1))
