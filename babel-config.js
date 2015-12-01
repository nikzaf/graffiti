'use strict'

const plugins = [
  'transform-node-env-inline',
  'transform-runtime',
  'transform-strict-mode',
  'transform-undefined-to-void'
]

if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-react-constant-elements')
  plugins.push('transform-react-inline-elements')
  plugins.push('transform-remove-console')
  plugins.push('transform-remove-debugger')
}

const presets = ['react', 'stage-1']

exports.client = {plugins, presets: [...presets, 'es2015']}
exports.server = {plugins, presets: [...presets, 'es2015-node5']}
