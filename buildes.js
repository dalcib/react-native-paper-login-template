var { readFile } = require('fs').promises;
var { parse, join } = require('path');
var prod = !(process.argv[2] === 'dev');

require('esbuild')
  .build({
    entryPoints: ['./node_modules/expo/AppEntry.js'],
    bundle: true,
    outfile: './public/bundle.js',
    format: 'esm',
    tsconfig: 'tsconfig.json',
    define: {
      'process.env.NODE_ENV': prod ? '"production"' : '"development"',
      __DEV__: !prod,
      global: 'window',
    },
    loader: { '.png': 'file', '.ttf': 'file', '.js': 'jsx' },
    resolveExtensions: [".web.tsx", ".web.ts", ".web.jsx", ".web.js", ".tsx", ".ts", ".jsx", ".js"], //prettier-ignore
    minify: prod,
    sourcemap: prod,
    watch: !prod,
    /*    ? false
      : {
          onRebuild(error, result) {
            console.log(error ? error : '...');
          },
        } */
    logLevel: 'error',
    plugins: [
      {
        name: 'example',
        setup(build) {
          build.onLoad(
            {
              filter: /@expo.*glyphmaps.*json/,
            },
            async (args) => {
              //console.log(args);
              let result = '{}';
              const iconSet = parse(args.path).name;
              if (conf.hasOwnProperty(iconSet)) {
                const source = await readFile(args.path, 'utf8');
                const glyphmap = JSON.parse(source);
                result = JSON.stringify(
                  Object.fromEntries(
                    Object.entries(glyphmap).filter(([name, icon]) =>
                      conf[iconSet].includes(name)
                    )
                  )
                );
                //console.log(result);
              }
              return { contents: `export default ${result}` };
            }
          );
        },
      },
    ],
    incremental: !prod,
    //metafile: 'meta.json',
  })
  /*   .then((result) => {
    result.stop();
  }); */
  .catch(() => process.exit(1));

const glyphmaps = [
  'AntDesign',
  'Entypo',
  'EvilIcons',
  'Feather',
  'FontAwesome',
  'FontAwesome5Free',
  'FontAwesome5Pro',
  'Fontisto',
  'Foundation',
  'Ionicons',
  'MaterialCommunityIcons',
  'MaterialIcons',
  'Octicons',
  'SimpleLineIcons',
  'Zocial',
];

const conf = {
  MaterialCommunityIcons: ['camera'],
  AntDesign: ['stepbackward'],
};
