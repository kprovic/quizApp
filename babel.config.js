// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//   };
// };
// module.exports = {
//   presets: ["module:metro-react-native-babel-preset"],
//   plugins: [
//     [
//       "module:react-native-dotenv",
//       {
//         envName: "APP_ENV",
//         moduleName: "@env",
//         path: ".env",
//         safe: false,
//         allowUndefined: true,
//         verbose: false,
//       },
//     ],
//   ],
// };
module.exports = function (api) {
  api.cache(true);

  const presets = [
    "babel-preset-expo",
    "module:metro-react-native-babel-preset",
  ];
  const plugins = [
    [
      "module:react-native-dotenv",
      {
        envName: "APP_ENV",
        moduleName: "@env",
        path: ".env",
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
