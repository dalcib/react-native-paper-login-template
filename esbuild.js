var app = require('./app.json')
var esbuild = require('esbuild')
const http = require('http')
var spawn = require('child_process').spawn
const { readdir } = require('fs').promises
const { join, parse, resolve } = require('path')

var isDev = !(process.argv[2] === 'build')
process.env.NODE_ENV = isDev ? 'development' : 'production'

const clients = []
const liveHead = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
}

const materialIconsPlugin = {
  name: 'material-icons',
  setup(build) {
    build.onResolve({ filter: /MaterialCommunityIcons\.(ttf|json)/ }, (args) => ({
      path: resolve(`./src/assets/materialdesignicons-webfont${parse(args.path).ext}`),
    }))
  },
}

esbuild
  .build({
    entryPoints: ['./src/index.tsx'],
    outfile: './public/bundle.js',
    tsconfig: 'tsconfig.json',
    define: {
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      'process.env.APP_MANIFEST': JSON.stringify(app),
      __DEV__: isDev,
      global: 'window',
    },
    loader: { '.png': 'file', '.jpg': 'file', '.ttf': 'file', '.js': 'jsx' },
    resolveExtensions: [".web.tsx", ".web.ts", ".web.jsx", ".web.js", ".tsx", ".ts", ".jsx", ".js"], //prettier-ignore
    format: 'esm',
    bundle: true,
    minify: !isDev,
    assetNames: 'assets/[name]-[hash]',
    sourcemap: true,
    plugins: [materialIconsPlugin, require('esbuild-mdx')()],
    incremental: isDev,
    publicPath: '/',
    mainFields: ['module', 'main'],
    banner: isDev
      ? { js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();' }
      : {},
    watch: isDev && {
      onRebuild(error, result) {
        clients.forEach((res) => res.write('data: update\n\n'))
        clients.length = 0
        console.log(error ? error : '...')
      },
    },
  })
  .then((result, error) => {})
  .catch(() => process.exit(1))

isDev &&
  esbuild.serve({ servedir: './public' }, {}).then(() => {
    http
      .createServer((req, res) => {
        const { url, method, headers } = req
        if (req.url === '/esbuild') return clients.push(res.writeHead(200, liveHead))
        const path = ~url.split('/').pop().indexOf('.') ? url : '/index.html'
        req.pipe(
          http.request({ hostname: '0.0.0.0', port: 8000, path, method, headers }, (prxRes) => {
            res.writeHead(prxRes.statusCode, prxRes.headers)
            prxRes.pipe(res, { end: true })
          }),
          { end: true }
        )
      })
      .listen(3000)
    setTimeout(() => {
      if (clients.length === 0) spawn('cmd', ['/c', 'start', `http://localhost:3000`])
    }, 1000)
  })

/* const filePaths = []
const ext = ['.js', '.jsx', '.ts', '.tsx'  '.json' ]
async function recur(dir) {
  const pendingDirs = []
  const items = await readdir(dir, { withFileTypes: true })
  items.forEach((item) => {
    const url = join(dir, item.name)
    if (item.isDirectory()) pendingDirs.push(recur(url))
    else if (item.isFile() && ext.includes(parse(url).ext)) filePaths.push(url)
  })
  return Promise.all(pendingDirs)
}
recur('./src') */
