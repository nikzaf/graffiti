import {HotModuleReplacementPlugin, NoErrorsPlugin} from 'webpack'
import {resolve} from 'path'

export default {
  debug: true,
  devtool: '#inline-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    resolve(__dirname, './client.js')
  ],
  module: {
    loaders: [
      {
        include: __dirname,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
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
