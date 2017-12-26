import React, {Component} from 'react'
import {render} from 'react-dom'
import Terminal from 'terminal-in-react';
import Example from '../../src'
import CoinHive from 'react-coin-hive';
import './index.css';

class Demo extends Component {
   constructor(props){
      super(props);
      this.state = {
         layout: [{isDraggable: true, i: "0", w: 2, h: 2, x: 0, y: 0},{i: "1", w: 1, h: 1, x: 5, y: 5}]
      }
   }
  render() {
    return <div>
         <Example         
            layout={this.state.layout}
            components={["npm:react-dropzone", "npm:react-analog-clock"]}
            onLayoutChange={(layout) => {
               this.setState({layout: layout})  
            }
            }/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
