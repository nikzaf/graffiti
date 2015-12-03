import createCompiler from 'webpack'
import createDevMiddleware from 'webpack-dev-middleware'
import createExpress from 'express'
import createHotMiddleware from 'webpack-hot-middleware'
import {createServer} from 'http'
import Layout from './components/layout'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import webpackConfig from './webpack'

const compiler = createCompiler(webpackConfig)
const express = createExpress()

express.use(createDevMiddleware(compiler, {noInfo: true, publicPath: '/'}))
express.use(createHotMiddleware(compiler))

express.get('/', (req, res) => {
  res.send('<!DOCTYPE html>' + renderToStaticMarkup((
    <Layout state={{}} title='graffiti'/>
  )))
})

const port = 3000

createServer(express).listen(port, error => {
  if (error) throw error

  console.log(`Server listening at http://localhost:${port}`)
})
