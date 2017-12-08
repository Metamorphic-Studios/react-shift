import React, {Component} from 'react'

import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGrid = WidthProvider(Responsive);
import ShiftComponent from './shift-component';
import ModulePicker from './module-picker';
import './index.css';

export default class extends Component {

   constructor(props){
      super(props);
      this.state = {
         ...props,
         components: [],
         layouts: [],
         pickerOpen: true
      }
   }

   componentWillMount(){
   
   }

   _render(){
      var components = this.state.components.map((x, ix) => {
         return (
            <div key={ix} style={{border: '1px solid #ddd', display: 'flex'}}>
               {x} 
            </div>
         );
      });
      return components;
   }


   _addNewPackage(Component, p){
      var components = this.state.components;
      var layouts = this.state.layouts;
      
      components.push((<Component {...p} />));
      layouts.push({i: components.length});
      this.setState({
         pickerOpen: false,
         components: components,
         layouts: layouts
     });
   }

   render() {
   return (
      <div className="shift-box">
      <ResponsiveGrid className="layout"
         layouts={this.state.layouts}
         breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
         cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
         {this._render()}
      </ResponsiveGrid>
      <ModulePicker open={this.state.pickerOpen} onNewComponent={this._addNewPackage.bind(this)}/>
      </div>
    );
  }
}
