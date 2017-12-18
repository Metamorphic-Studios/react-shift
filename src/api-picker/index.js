import React, { Component } from 'react';

import Modal from 'react-modal';

export default class ApiPicker extends Component {
   
   constructor(props){
      super(props);
      this.state = {
         ...props
      }
   }

   _getKeys(){
        var endpoint = this.state.endpoint;
      console.log(endpoint);
      this._fetch(endpoint).then((r) => console.log(r)); 
   }

   _fetch(url){
      return fetch(url).then((r) => {
         return r.json();
      });
   }

   render(){
      return (
         <Modal
            isOpen={false}
         >
            <input type="text" placeholder='API Endpoint' onChange={(e) => this.setState({endpoint: e.target.value})}/>
            <button onClick={this._getKeys.bind(this)}>Get keys</button>
         </Modal>
      );
   }
}
