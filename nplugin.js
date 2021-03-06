var { readFile } = require('fs').promises
var { writeFileSync } = require('fs')
var { parse, join } = require('path')

module.exports = (conf) => {
  const alias = [
    { filter: /^react-native$/, path: './node_modules/react-native-web/dist/index.js' },
    {
      filter: /react-native-vector-icons\/MaterialCommunityIcons/,
      path: './node_modules/@expo/vector-icons/MaterialCommunityIcons.js',
    },
    /*     {
      filter: conf.light ? /MaterialCommunityIcons.ttf/ : /^$/,
      path: './src/assets/materialdesignicons-light-webfont.ttf',
    },
    {
      filter: conf.light
        ? /@expo\/vector-icons\/build\/vendor\/react-native-vector-icons\/glyphmaps\/MaterialCommunityIcons.json/
        : /^$/,
      path: './MaterialCommunityIconsLight.json',
    }, */
  ]
  conf.alias = [...alias, ...conf.alias]
  return {
    name: 'vector-icons',
    setup(build) {
      conf.alias.forEach(({ filter, path }) => {
        build.onResolve({ filter }, (args) => ({
          path: join(process.cwd(), path),
        }))
      })
      build.onLoad(
        {
          filter: /@expo.*glyphmaps.*json/,
        },
        async (args) => {
          const iconSet = parse(args.path).name
          let result
          if (conf.hasOwnProperty(iconSet)) {
            const source = await readFile(args.path, 'utf8')
            console.log(source)
            const glyphmap = JSON.parse(source)
            result = Object.fromEntries(
              Object.entries(glyphmap)
                .filter(([name, icon]) => conf.icons[iconSet].includes(name))
                .map(([name, icon]) => [name, icon])
            )
            console.log(result)
          }
          return { contents: `export default ${JSON.stringify(result)}` }
        }
      )
    },
  }
}

//https://materialdesignicons.com/cdn/light/0.2.63/

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
]

/* let light = require('./others/MaterialLightIcons.json')
light = Object.fromEntries(Object.entries(light).map(([name, icon]) => [name, icon + 0xf00]))
writeFileSync('MaterialCommunityIconsLight.json', JSON.stringify(light)) */
