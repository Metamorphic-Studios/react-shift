import React, {
   Component
} from 'react';
import Loader from 'react-jspm-loader';
var Spinner = require('react-spinkit');

export default class ShiftComponent extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props
      }
   }

   componentWillReceiveProps(newProps){
      if(this.props !== newProps){
         this.setState({
            ...newProps
         });
     }
   }


   render(){
     return (
         <Loader module={this.state.module } onLoad={(c) => {
               c.name = this.state.module;
               if(c && this.props.onChecked){
     //             this.props.onChecked(typeof(c.Component) == 'object', c);
               }
            }}>
               <div style={{display: 'flex', flex: 1, alignItems: 'center', flexDirection: 'column'}}>
                  <Spinner name='folding-cube' />
               </div>
         </Loader>
     );
   }
}  
