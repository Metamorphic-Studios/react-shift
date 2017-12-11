import React, {
   Component 
} from 'react';
import Modal from 'react-modal';
import Loader from 'react-jspm-loader';
import Select from 'react-select';

import BackIcon from 'react-icons/lib/io/ios-arrow-back';
import AddIcon from 'react-icons/lib/io/android-add';

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
         view: 'module',
         listProps : 0
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





   setModuleProps(props){
      this.setState({
         moduleProps : {...this.state.moduleProps, ...props}
      });
   }

   _renderBackButton(val){
      return (
         <BackIcon style={{position : 'absolute', left : '10px', top : '10px', height : '30px', width : '30px', fontSize : '24px'}} onClick={() => {this.setState({view : val})}}/>
      ); 
   }

   _renderAddButton() {
      return (
         <AddIcon style={{height : '30px', width : '30px', fontSize : '24px', marginTop : '50px'}} onClick={() => this.setState({listProps : this.state.listProps + 1})}/>
      );
   }

   _renderProps(){
      var jsx = [];
      for(var i = 0; i < this.state.listProps; i++){
         jsx.push(
            <PropEditor setProps={this.setModuleProps.bind(this)} component={this.state.module.Component} onSubmit={this._addComponent.bind(this)}/>
         );
      }
      return jsx;
   }

   _renderComponent(){
      return (
         <this.state.module.Component {...this.state.moduleProps} />
      );
   }




   submitModule(){
      this._addComponent(this.state.module.Component, this.state.moduleProps);
      this.setState({
         module: null,
         moduleProps: null
      });   
   }

   _renderModalInternals(){
      switch(this.state.view){
         case 'module':
            return (
               <NpmSearch onSelect={(module) => {
                  this.setState({
                     listProps : 0,
                     view: 'module-parser',
                     module: module
                  });
               }}/>
            );
         case 'module-parser':
            return (
               <div>
                  {this._renderBackButton('module')}
                  <ModuleChecker module={this.state.module} onChecked={(test, c) => {
                     if(test){
                        this.setState({view: 'submodules',submodules: c})
                     }else{
                        this.setState({view: 'props',module: c,});
                     }
                  }}/>
               </div>
            );
         case 'submodules':
            return (
               <div>
                  {this._renderBackButton('module-parser')}
                  <MultipleExports module={this.state.submodules} onSubmit={this._addComponent.bind(this)}/>
               </div>
            );
         case 'props':
         case 'default':
            return (
               <div>
                  {this._renderBackButton('module')}
                  <h2>{this.state.module.name}</h2>
                  {this._renderProps()}
                  {this._renderComponent()}
                  <button onClick={this.submitModule.bind(this)}>Add to dashboard</button>
                  {this._renderAddButton()}
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
