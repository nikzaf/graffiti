import {HotModuleReplacementPlugin, NoErrorsPlugin} from 'webpack'
import {resolve} from 'path'

export default {
  debug: true,
  devtool: '#inline-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    resolve(__dirname, './client.js')
  ],
  module: {
    loaders: [
      {
        include: __dirname,
        loader: 'babel',
        query: {
          plugins: ['transform-runtime', 'transform-strict-mode'],
          presets: ['es2015', 'react', 'stage-1']
        },
        test: /\.js$/
      }
    ]
  },
  output: {
    filename: 'client.js',
    path: __dirname
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin()
  ],
  target: 'web'
}
