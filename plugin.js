var { readFile } = require('fs').promises;
var { parse } = require('path');

module.exports = (conf) => {
  return {
    name: 'vector-icons',
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
  };
};

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
