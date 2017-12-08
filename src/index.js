import React, {Component} from 'react'

import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGrid = WidthProvider(Responsive);

export default class extends Component {
  render() {
     const layouts = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2},
      {i: 'b', x: 2, y: 1, w: 1, h: 1}
     ];
    return (
      <ResponsiveGrid className="layout"
         layouts={layouts}
         breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
         cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
         
         <div key="a">ABC</div>
         <div key="b">DFG</div>
       </ResponsiveGrid>
    );
  }
}
