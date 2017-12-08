import React, {
   Component 
} from 'react';
import Modal from 'react-modal';
import Loader from 'react-jspm-loader';
import Select from 'react-select';

import BackIcon from 'react-icons/lib/io/ios-arrow-back';


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

   _renderBackButton(val) {
      return (
         <BackIcon style={{position : 'absolute', left : '10px', top : '10px', height : '30px', width : '30px', fontSize : '24px'}} onClick={() => {this.setState({view : val})}}/>
      );
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
            <div>
               {this._renderBackButton('module')}
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
            </div>
         );
      }else if(this.state.view == 'submodules'){    
         return (
            <div>
               {this._renderBackButton('module-parser')}
               <MultipleExports module={this.state.submodules} onSubmit={this._addComponent.bind(this)}/>
            </div>
         );
      }else{
         return (
            <div>
               {this._renderBackButton('module')}
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
            style={{position : 'relative'}}
         >
         {this._renderModalInternals()} 

         </Modal>
      );
   }     
}
