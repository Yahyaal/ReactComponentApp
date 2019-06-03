import React, { Component } from 'react';
import './App.css';
import './style.css';
import { cpuObj } from './datasource.js' ;

// requestAnimationFrame Shim
(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();
function rect(props) {
  const {context, width, height } = props;
  const radius = 75;
  const x = width / 2;
  const y = height / 2;
  let cpuUsage = cpuObj.cpuUsage
  let endPercent = cpuUsage
  let curPerc = 0;
  const circ = Math.PI * 2;
  const quart = Math.PI / 2;
  context.lineWidth = 10;
  context.strokeStyle = '#ee2247';
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.shadowBlur = 10;
  context.shadowColor = '#656565';

  function animate(current) { 
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
    context.lineCap = 'round';
    context.stroke();
    curPerc++;
    if (curPerc <= endPercent) {
      var percentStr = curPerc + '%';
      props.percentStr = percentStr;
      
      requestAnimationFrame(function () {
        animate(curPerc/100)
      });
    }
  }
  animate();
}
class CanvasComponent extends React.Component {
  componentDidMount() {
    this.setState({
      percentage: cpuObj.cpuUsage
    });
    this.updateCanvas();
  }
  componentDidUpdate() {
    this.updateCanvas();
  }
  updateCanvas() {
    const context = this.refs.canvas.getContext('2d');
    context.clearRect(0, 0, 250, 250);
    let curPerc = 0
    curPerc++;
    if (curPerc < this.props.percentage) {
      this.percentStr = curPerc + '%';
    }
    
    rect({ cpuObj, context, width: 250, height: 250 });
  }
  render() {
    return (
      <div className="container">
        <canvas id='myCanvas' ref="canvas" width={250} height={250} />
        <div id="inset">
          <div className="numbers">
            { this.props.percentStr }
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      percentage: cpuObj.cpuUsage
    };
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
  }

  handleChangeEvent(event) {
    this.setState({
      percentage: cpuObj.cpuUsage
    });
  }

  componentDidMount() {
    this.percentage = setInterval(
      () => this.handleChangeEvent(),
      5000
    );
  }
  
  render() {    
    return (
      <div>
        <CanvasComponent 
          width="250"
          height="250"
          lineWidth="10"
          strokeStyle='#ee2247'
          shadowOffsetX="0"
          shadowOffsetY="0"
          shadowBlur="10"
          shadowColor='#656565'
          percentage={this.props.percentage}
          // onChange={this.handleChangeEvent}
          percentStr={this.state.percentage+'%'} 
          />
      </div>
    );
  }
}

export default App;
