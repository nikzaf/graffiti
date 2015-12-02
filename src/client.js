import {App} from './components/app'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import React from 'react'
import {reducer} from './reducers'
import {render} from 'react-dom'

const store = createStore(reducer, window.__state__)

render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.querySelector('main'))
