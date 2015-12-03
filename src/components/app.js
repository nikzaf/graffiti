import Input from './input'
import Output from './output'
import React, {Component} from 'react'

export default class App extends Component {
  render () {
    return (
      <div>
        <Input lineColor='blue'
          lineWidth={5}
          width={800}
          height={600}/>

        <Output/>
      </div>
    )
  }
}
