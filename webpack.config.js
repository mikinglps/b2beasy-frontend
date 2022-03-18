// const webpack = require('webpack');
// const nrwlConfig = require('@nrwl/react/plugins/webpack');

// module.exports = (config, context) => {
//   nrwlConfig(config);

//   return {
//     ...config,
//     resolve: {
//       ...config.resolve,
//       fallback: {
//         module: 'empty',
//         dgram: 'empty',
//         dns: 'mock',
//         fs: 'empty',
//         http2: 'empty',
//         net: 'empty',
//         tls: 'empty',
//         child_process: 'empty',
//         process: require.resolve('process/browser'),
//         zlib: require.resolve('browserify-zlib'),
//         stream: require.resolve('stream-browserify'),
//         util: require.resolve('util'),
//         buffer: require.resolve('buffer'),
//         asset: require.resolve('assert'),
//       },
//     },
//     plugins: [
//       ...config.plugins,
//       new webpack.ProvidePlugin({
//         Buffer: ['buffer', 'Buffer'],
//         process: 'process/browser',
//       }),
//     ],
//     node: undefined,
//   };
// };