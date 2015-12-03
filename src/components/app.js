import Canvas from './canvas'
import React, {Component} from 'react'

export default class App extends Component {
  render () {
    return (
      <Canvas lineColor='blue'
        lineWidth={5}
        width={800}
        height={600}/>
    )
  }
}
