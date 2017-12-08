import React, {
   Component
} from 'react';
import PropEditor from './prop-editor';
import Loader from 'react-jspm-loader';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class MultipleExports extends Component {
   constructor(props){
      super(props);

      var submodules = [];
      for(var k in props.module){
         submodules.push(k);
      }
      this.state = {
         ...props,
         submodules: submodules
      }
   }  

   componentWillReceiveProps(newProps){
      if(this.props !== newProps){
         this.setState({
            ...newProps
         });
      }
   }

   _getSubmodules(){
      console.log(this.state.module);
      var submodules = []
      for(var k in this.state.module.Component){
         submodules.push(k);   
      }

      return submodules.map((x) => {
                  return {
                     value: x, 
                     label: x
                  }
               }) 
   }

   _selectSubmodule(e){
      this.setState({
         submodule: this.props.module.Component[e.value],
         selectedSubmodule: e.value
      });
   }

   _submit(component, props){
      if(this.props.onSubmit){
         this.props.onSubmit(component, props);
      }

   }

   _renderPropChecker(){
      if(this.state.submodule){
         return (
            <PropEditor component={this.state.submodule} onSubmit={this._submit.bind(this)}/> 
         );
      }else{
         return null;
      }
   }

   render(){
      return (
         <div>
            <div>
               <h2>{this.state.module.name}</h2>
            </div>
            <div>
             <Select options={this._getSubmodules()} onChange={this._selectSubmodule.bind(this)} value={this.state.selectedSubmodule} />
               {this._renderPropChecker()}
            </div>
         </div>   
      );
   }
}
