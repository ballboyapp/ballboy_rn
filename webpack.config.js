const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  // https://github.com/peteruithoven/d3-sankey-circular-test/pull/1
  // https://github.com/expo/expo-cli/issues/919
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
  });
  // If you want to add a new alias to the config.
  // https://docs.expo.io/versions/latest/guides/customizing-webpack/
  // https://github.com/necolas/react-native-web/issues/1020
  // https://github.com/expo/expo-cli/blob/72e35aea644ce38a5389595f3ff18b45454d7986/packages/webpack-config/webpack/webpack.common.js#L312-L322
  // config.resolve.alias['react-native-web/dist/exports/Modal'] = 'modal-enhanced-react-native-web';
  // config.resolve.alias['react-native/Libraries/Modal'] = 'modal-enhanced-react-native-web';

  return config;
};
