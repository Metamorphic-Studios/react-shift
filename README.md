# react-shift

## Usage

```javascript

import ShiftBox from 'react-shift';

render(){
   return (
      <ShiftBox
         layout={[{i: 0, w: 1, h: 2, x: 0, y: 0}, {i: 1, w: 2, h: 2, x: 2, y: 3}]} //react-grid-layout layout props
         components={["npm:react-dropzone", "npm:react-analog-clock"]} //JSPM.io package descriptors
         onLayoutChange={} //react-grid-layout callback
         onComponentsChange={} //On component configuration or array change
         />
   );
}
```
