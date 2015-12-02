'use strict'

require('babel-core/register')({
  plugins: ['transform-runtime', 'transform-strict-mode'],
  presets: ['es2015-node5', 'react', 'stage-1']
})

require('./src/server')
