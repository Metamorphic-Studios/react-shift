# react-shift

## Description

react-shift is a modular dashboard system for asynchronously loading available react components and allowing end user configuration of views

## Demo

```javascript
git clone https://github.com/Metamorphic-Studios/react-shift
cd react-shift
npm start
```

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

## Components

react-shift utilises systemjs to import components from the configured registries

Currently available registries are

npm:
github:
