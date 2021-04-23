const esbuild = require('esbuild')
const { createServer, request } = require('http')
const spawn = require('child_process').spawn
const { parse, resolve } = require('path')
let app
try {
  app = require('./app.json')
} catch {
  app = {}
}

var isDev = !(process.argv[2] === 'build')
process.env.NODE_ENV = isDev ? 'development' : 'production'
const clients = []

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
    plugins: [
      {
        name: 'material-icons',
        setup(build) {
          build.onResolve({ filter: /MaterialCommunityIcons\.(ttf|json)/ }, (args) => ({
            path: resolve(`./src/assets/materialdesignicons-webfont${parse(args.path).ext}`),
          }))
        },
      },
      require('esbuild-mdx')(),
    ],
    incremental: isDev,
    publicPath: '/',
    //inject: ['./src/assets/react-shim.js'],
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
    createServer((req, res) => {
      const { url, method, headers } = req
      if (req.url === '/esbuild')
        return clients.push(
          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          })
        )
      const path = ~url.split('/').pop().indexOf('.') ? url : `/index.html` //for PWA with router
      req.pipe(
        request({ hostname: '0.0.0.0', port: 8000, path, method, headers }, (prxRes) => {
          res.writeHead(prxRes.statusCode, prxRes.headers)
          prxRes.pipe(res, { end: true })
        }),
        { end: true }
      )
    }).listen(3000)

    setTimeout(() => {
      const op = { darwin: ['open'], linux: ['xdg-open'], win32: ['cmd', '/c', 'start'] }
      const ptf = process.platform
      if (clients.length === 0) spawn(op[ptf][0], [...[op[ptf].slice(1)], `http://localhost:3000`])
    }, 1000) //open the default browser only if it is not opened yet
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
