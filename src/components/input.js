import * as ActionCreators from '../actions/points'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'

class Input extends Component {
  static propTypes = {
    points: PropTypes.array.isRequired,
    setPoints: PropTypes.func.isRequired
  }

  requestAnimationFrame (callback) {
    window.cancelAnimationFrame(this.requestID)

    this.requestID = window.requestAnimationFrame(callback)
  }

  draw () {
    const {context, points} = this

    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    if (!points) return

    context.strokeStyle = '#df4b26'
    context.lineJoin = 'round'
    context.lineWidth = 5

    points.forEach((point, index) => {
      const lastPoint = points[index - 1]

      context.beginPath()

      if (lastPoint) {
        context.moveTo(lastPoint.x, lastPoint.y)
      } else {
        context.moveTo(point.x, point.y)
      }

      context.lineTo(point.x, point.y)
      context.closePath()
      context.stroke()
    })
  }

  addPoint (event) {
    const {points} = this

    if (!points) return

    points.push({
      x: event.pageX - event.target.offsetLeft,
      y: event.pageY - event.target.offsetTop
    })
  }

  start (event) {
    this.points = []

    this.addPoint(event)
    this.requestAnimationFrame(::this.draw)
  }

  move (event) {
    this.addPoint(event)
    this.requestAnimationFrame(::this.draw)
  }

  end () {
    this.points = null

    this.requestAnimationFrame(::this.draw)
  }

  render () {
    return (
      <canvas ref={element => this.context = element.getContext('2d')}
        width='490'
        height='220'
        onMouseDown={::this.start}
        onMouseLeave={::this.end}
        onMouseMove={::this.move}
        onMouseUp={::this.end}/>
    )
  }
}

const mapStateToProps = state => {
  return {points: state.points}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)
