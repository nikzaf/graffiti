import Input from './input'
import React, {Component} from 'react'

export default class App extends Component {
  render () {
    return (
      <Input lineColor='blue'
        lineWidth={5}
        width={800}
        height={600}/>
    )
  }
}
