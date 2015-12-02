import React, {Component, PropTypes} from 'react'
import {renderToJSON} from '../util'
import {renderToString} from 'react-dom/server'

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    state: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  }

  render () {
    const {children, state, title} = this.props

    return (
      <html lang='en'>
        <head>
          <meta name='viewport' content='width=device-width, initial-scale=1'/>

          <title>{title}</title>
        </head>
        <body>
          <main dangerouslySetInnerHTML={{
            __html: renderToString(children)
          }}/>

          <script dangerouslySetInnerHTML={{
            __html: 'window.__state__ = ' + renderToJSON(state)
          }}/>

          <script src='/client.js'/>
        </body>
      </html>
    )
  }
}
