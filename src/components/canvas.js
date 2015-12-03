import * as ActionCreators from '../actions/points'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'

class Canvas extends Component {
  static propTypes = {
    lineColor: PropTypes.string.isRequired,
    lineWidth: PropTypes.number.isRequired,
    points: PropTypes.array.isRequired,
    setPoints: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

  requestAnimationFrame (callback) {
    window.cancelAnimationFrame(this.requestID)

    this.requestID = window.requestAnimationFrame(callback)
  }

  draw () {
    const {context, points, props} = this

    context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight)

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

    this.props.setPoints(points)

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

const mapStateToProps = state => {
  return {points: state.points}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
