var { parse, join, resolve } = require('path')

module.exports = (conf) => {
  return {
    name: 'vector-icons',
    setup(build) {
      build.onLoad({ filter: /@expo.*glyphmaps.*json/ }, async (args) => {
        let result = {}
        const iconSet = parse(args.path).name
        if (conf.hasOwnProperty(iconSet)) {
          const glyphmap = require(args.path)
          result = Object.fromEntries(
            Object.entries(glyphmap)
              .filter(([name, icon]) => conf[iconSet].includes(name))
              .map(([name, icon]) => [name, icon])
          )
        }
        return { contents: `export default ${JSON.stringify(result)}` }
      })
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

/*


const importMap = {
  'react-native': './node_modules/react-native-web/dist/index.js',
  'react-native-vector-icons/MaterialCommunityIcons/':
    './node_modules/@expo/vector-icons/MaterialCommunityIcons.js',
  'MaterialCommunityIcons.ttf': './src/assets/materialdesignicons-webfont.ttf',
  '@expo/glyphmaps/MaterialCommunityIcons.json': './src/assets/materialdesignicons-webfont.json',
}

const alias = [
  { filter: /^react-native$/, path: './node_modules/react-native-web/dist/index.js' },
  {
    filter: /react-native-vector-icons\/MaterialCommunityIcons/,
    path: './node_modules/@expo/vector-icons/MaterialCommunityIcons.js',
  },
  {
    filter: /MaterialCommunityIcons\.ttf/,
    path: './src/assets/materialdesignicons-webfont.ttf',
  },
  {
    filter: /glyphmaps\/MaterialCommunityIcons\.json/,
    path: './src/assets/materialdesignicons-webfont.json',
  },
]*/

/*       alias.forEach(({ filter, path }) => {
        build.onResolve({ filter }, () => ({ path: resolve(path) }))
      }) */

/*  Object.keys(importMap).forEach((filter) => {
        build.onResolve({ filter: new RegExp(`^${filter}$`) }, () => ({
          path: resolve(importMap[filter]),
        }))
      }) */
