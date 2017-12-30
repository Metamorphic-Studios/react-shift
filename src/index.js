import React, {Component} from 'react'

import RGL, { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGrid = WidthProvider(RGL);
import ShiftComponent from './shift-component';
import ModulePicker from './module-picker';
import ApiPicker from './api-picker';
import PropTypes from 'prop-types';
//import Edit from 'react-icons/fa/ellipsis-v';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './index.css';

class ShiftBox extends Component {

   /*
    * Prop Types
    *
    * layout: []
    * components: []
    * onLayoutChange: func
    * onComponentChange: func
    *
    */

   constructor(props){
      super(props);
      console.log("Initial", typeof(props.layout));
      this.state = {
         ...props,
         pickerOpen: false
      }
   }

   componentWillReceiveProps(newProps){
      console.log(typeof(newProps.layout))
      if(this.props !== newProps){
         this.setState({
            ...newProps
         });
      }
   }

   _render(){
      var components = this.state.components.map((x, ix) => {
         return (
            <div key={ix} style={{border: '1px solid #ddd', display: 'flex'}}>
               <ShiftComponent module={x} />
               <div style={{position: 'absolute', right: '5px', top: '5px', width: '5px', height: '5px'}}>
               </div>
            </div>
         );
      });
      return components;
   }


   _addNewPackage(Component, p){
      var components = this.state.components;
      var layout = this.state.layout;
      
      components.push((<Component {...p} />));
      layouts.push({i: components.length});
      this.setState({
         pickerOpen: false,
         components: components,
         layouts: layouts
     });
   }

   _onLayoutChange(layout){
      if(this.props.onLayoutChange){
         this.props.onLayoutChange(layout);
      }
   }

   render() {
   return (
      <div className="shift-box">
         <button onClick={() => this.setState({pickerOpen: true})}>Add</button>
         <ResponsiveGrid 
            className="layout"
            layouts={this.state.layout}
            cols={12}
            items={20}
            rowHeight={30}
            onLayoutChange={this._onLayoutChange.bind(this)}>
            {this._render()}
         </ResponsiveGrid>
         <ApiPicker />
         <ModulePicker open={this.state.pickerOpen} onNewComponent={this._addNewPackage.bind(this)}/>
      </div>
    );
  }
}

ShiftBox.propTypes = {
   layout: PropTypes.array.isRequired,
   components: PropTypes.array.isRequired,
   onLayoutChange: PropTypes.func,
   onComponentChange: PropTypes.func
};

export default ShiftBox;
