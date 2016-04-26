import webpack from 'webpack';
import _ from 'lodash';

export const HMR_ENTRY = 'webpack-hot-middleware/client';
export const HMR_PLUGINS = [
  webpack.optimize.OccurenceOrderPlugin,
  webpack.HotModuleReplacementPlugin,
  webpack.NoErrorsPlugin,
];

const concatHMREntry = (entry) => [HMR_ENTRY].concat(entry);

const isOneOfPlugins = (PluginList, plugin) =>
  _.reduce(PluginList, (result, Plugin) => (result || (plugin instanceof Plugin)), false);

export const patchEntry = (entry) => {
  if (_.isObject(entry)) {
    return _.mapValues(entry, concatHMREntry);
  }
  return concatHMREntry(entry);
};

export const patchPlugins = (plugins) => {
  const cleanedPlugins = _.dropWhile(plugins, (plugin) => isOneOfPlugins(HMR_PLUGINS, plugin));
  return _.concat(cleanedPlugins, _.map(HMR_PLUGINS, (Plugin) => new Plugin()));
};

const patchWebConfigWithHMR = (webpackConfig) => ({
  ...webpackConfig,
  entry: patchEntry(webpackConfig.entry),
  plugins: patchPlugins(webpackConfig.plugins),
});

export default patchWebConfigWithHMR;
