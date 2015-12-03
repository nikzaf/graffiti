import * as ActionCreators from '../actions/points'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'

class Input extends Component {
  static propTypes = {
    points: PropTypes.array.isRequired,
    setPoints: PropTypes.func.isRequired
  }

  handleMouseDown () {
    this.props.setPoints([])
  }

  handleMouseEnter () {

  }

  handleMouseLeave () {

  }

  handleMouseMove () {

  }

  handleMouseUp () {

  }

  render () {
    return (
      <canvas width='490'
        height='220'
        onMouseDown={::this.handleMouseDown}
        onMouseEnter={::this.handleMouseEnter}
        onMouseLeave={::this.handleMouseLeave}
        onMouseMove={::this.handleMouseMove}
        onMouseUp={::this.handleMouseUp}/>
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

/*
context = canvas.getContext("2d");

$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e){
  paint = false;
});

$('#canvas').mouseleave(function(e){
  paint = false;
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;

  for(var i=0; i < clickX.length; i++) {
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
}
*/
