import React, {
   Component
} from 'react';
import Loader from 'react-jspm-loader';
var Spinner = require('react-spinkit');

export default class ModuleChecker extends Component {
   constructor(props){
      super(props);

      let cmp = (
         <Loader module={"npm:" + this.props.module } onLoad={(c) => {
            c.name = this.props.module;
            if(c && this.props.onChecked){
               this.props.onChecked(typeof(c.Component) == 'object', c);
            }
         }}>
               <div style={{display: 'flex', flex: 1, alignItems: 'center', flexDirection: 'column'}}>
               <Spinner name='folding-cube' />
               </div>   
         </Loader>
      ); 
      console.log("CMP", cmp);
      this.state = {
         ...props,
         cmp: cmp
      }
   }

   render(){
      return (
         <div>
            {(this.state.cmp) ? this.state.cmp: null}  
         </div>
      );
   }
}
