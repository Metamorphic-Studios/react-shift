import React, {
   Component 
} from 'react';
import Modal from 'react-modal';
import Loader from 'react-jspm-loader';
import Select from 'react-select';

import NpmSearch from './npm-search';
import MultipleExports from './multiple-exports';
import ModuleChecker from './module-checker';
import PropEditor from './prop-editor';

import 'react-select/dist/react-select.css';
import './index.css';

export default class ModulePicker extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props,
         search: '',
         searchResults: [],
         view: 'module'
      }
   }

   componentWillReceiveProps(newProps){
      if(this.props !== newProps){
         this.setState({
            ...newProps
         });
      }
   }

   _addComponent(c, p){
      if(this.props.onNewComponent){
         this.props.onNewComponent(c, p);
         this.setState({
            view: 'module'
         });
      }
   }

   handleSelect(selected){
      this.setState({
         cmp: <selected.value />
      });
      console.log(selected);
   }

   _renderModalInternals(){
      if(this.state.view == 'module'){
         return (
            <NpmSearch onSelect={(module) => {
               this.setState({
                  view: 'module-parser',
                  module: module
               });
            }}/>
         );
      }else if(this.state.view == 'module-parser'){
         return (
            <ModuleChecker module={this.state.module} onChecked={(test, c) => {
               if(test){
                  this.setState({
                     view: 'submodules',
                     submodules: c
                  });
               }else{
                  this.setState({
                     view: 'props',
                     module: c,
                  });
               }
            }}/>
         );
      }else if(this.state.view == 'submodules'){    
         return (
            <MultipleExports module={this.state.submodules} onSubmit={this._addComponent.bind(this)}/>
         );
      }else{
         return (
            <div>
               <h2>{this.state.module.name}</h2>
               <PropEditor component={this.state.module.Component} onSubmit={this._addComponent.bind(this)}/> 
            </div>
         );
      }
   }     

   render(){
      return (
         <Modal
            isOpen={this.state.open}
         >
         {this._renderModalInternals()} 

         </Modal>
      );
   }     
}
