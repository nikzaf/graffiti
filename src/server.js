import App from './components/app'
import webpackConfig from './webpack'
import createCompiler from 'webpack'
import createDevMiddleware from 'webpack-dev-middleware'
import createExpress from 'express'
import createHotMiddleware from 'webpack-hot-middleware'
import {createServer} from 'http'
import createSessionMiddleware from 'express-session'
import {createStore} from 'redux'
import Layout from './components/layout'
import {Provider} from 'react-redux'
import React from 'react'
import reducer from './reducers'
import {renderToStaticMarkup} from 'react-dom/server'

const compiler = createCompiler(webpackConfig)
const express = createExpress()

express.use(createDevMiddleware(compiler, {noInfo: true, publicPath: '/'}))
express.use(createHotMiddleware(compiler))

express.use(createSessionMiddleware({
  resave: false,
  saveUninitialized: false,
  secret: 'secret'
}))

express.get('/', (req, res) => {
  const state = req.session.state = req.session.state || {} // TODO
  const store = createStore(reducer, state)

  res.send('<!DOCTYPE html>' + renderToStaticMarkup((
    <Layout state={state} title='graffiti'>
      <Provider store={store}>
        <App/>
      </Provider>
    </Layout>
  )))
})

createServer(express).listen(3000, error => {
  if (error) throw error

  console.log(`Server listening at http://localhost:3000`)
})
