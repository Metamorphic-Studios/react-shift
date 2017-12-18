import React, {Component} from 'react'
import {render} from 'react-dom'
import Terminal from 'terminal-in-react';
import Example from '../../src'
import CoinHive from 'react-coin-hive';
import './index.css';

class Demo extends Component {
  render() {
    return <div>
      <h1>react-shift</h1>
         <Example/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
