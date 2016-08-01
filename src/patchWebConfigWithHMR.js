import webpack from 'webpack';
import _ from 'lodash';

export const HMR_ENTRY = 'webpack-hot-middleware/client';

export const getHmrPluginsByVersion = (version) => {
  const majarVersion = String(version).split('.')[0];

  switch (majarVersion) {
    case '1':
      return [
        webpack.optimize.OccurenceOrderPlugin,
        webpack.HotModuleReplacementPlugin,
        webpack.NoErrorsPlugin,
      ];
    case '2':
    default:
      return [
        webpack.HotModuleReplacementPlugin,
        webpack.NoErrorsPlugin,
      ];
  }
};

const concatHMREntry = (entry) => [HMR_ENTRY].concat(entry);

const isOneOfPlugins = (PluginList, plugin) =>
  _.reduce(PluginList, (result, Plugin) => (result || (plugin instanceof Plugin)), false);

export const patchEntry = (entry) => {
  if (_.isObject(entry)) {
    return _.mapValues(entry, concatHMREntry);
  }
  return concatHMREntry(entry);
};

export const patchPlugins = (plugins, version) => {
  const hmrPlugins = getHmrPluginsByVersion(version);
  const cleanedPlugins = _.dropWhile(plugins, (plugin) => isOneOfPlugins(hmrPlugins, plugin));
  return _.concat(cleanedPlugins, _.map(hmrPlugins, (Plugin) => new Plugin()));
};

const patchWebConfigWithHMR = (webpackConfig, version) => ({
  ...webpackConfig,
  entry: patchEntry(webpackConfig.entry),
  plugins: patchPlugins(webpackConfig.plugins, version),
});

export default patchWebConfigWithHMR;
