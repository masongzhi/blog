const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = function override(config, env) {
  config.resolve = {
    alias: {
      '@': resolve('src'),
    },
  };
  config.externals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    urijs: 'URI',
  };
  if (process.env.ANALYSIS) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  config = rewireLess(config, env);
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
    config
  );
  config = injectBabelPlugin(['syntax-dynamic-import'], config);
  return config;
};
