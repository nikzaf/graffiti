import {recognize} from '../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'

class Input extends Component {
  static propTypes = {
    lineColor: PropTypes.string.isRequired,
    lineWidth: PropTypes.number.isRequired,
    recognize: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

  getWidth () {
    return this.context.canvas.clientWidth
  }

  getHeight () {
    return this.context.canvas.clientHeight
  }

  requestAnimationFrame (callback) {
    window.cancelAnimationFrame(this.requestID)

    this.requestID = window.requestAnimationFrame(callback)
  }

  draw () {
    const {context, points, props} = this

    context.clearRect(0, 0, this.getWidth(), this.getHeight())

    if (!points) return

    const {lineColor, lineWidth} = props

    context.strokeStyle = lineColor
    context.lineJoin = 'round'
    context.lineWidth = lineWidth

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
    const {points} = this

    if (!points) return

    this.props.recognize({points, size: {
      width: this.getWidth(),
      height: this.getHeight()
    }})

    this.points = null

    this.requestAnimationFrame(::this.draw)
  }

  render () {
    const {width, height} = this.props

    return (
      <canvas ref={element => this.context = element.getContext('2d')}
        width={width}
        height={height}
        onMouseDown={::this.start}
        onMouseLeave={::this.end}
        onMouseMove={::this.move}
        onMouseUp={::this.end}/>
    )
  }
}

export default connect(() => ({}), dispatch => {
  return bindActionCreators({recognize}, dispatch)
})(Input)
