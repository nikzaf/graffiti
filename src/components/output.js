import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'

class Output extends Component {
  static propTypes = {
    letter: PropTypes.string.isRequired
  }

  render () {
    const {letter} = this.props

    return (
      <span>{letter}</span>
    )
  }
}

export default connect(({letter}) => ({letter}))(Output)
