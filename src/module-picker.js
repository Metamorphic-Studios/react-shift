import React, {
   Component 
} from 'react';
import Modal from 'react-modal';
import './module-picker.css';

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
   _searchApi(q){
      return fetch('http://npmsearch.com/query?q=' + q +  '&fields=name,version').then((res) => res.json());
   }

   _search(e){
      var q = e.target.value;
      console.log(q); 
      this.setState({
         search: q
      });
      this._searchApi(q).then((r) => {
         this.setState({
            searchResults: r.results
         });
      });
   }

   _selectPackage(pkg){
      var name = pkg.name[0];
      var version = pkg.version[0];
      if(this.props.onSelectPackage){
         this.props.onSelectPackage(name, version);
      }
   }

   _renderSearchResults(){
      var items = this.state.searchResults.map((x) => {
         return (
            <li onClick={this._selectPackage.bind(this, x)}>{x.name}</li>
         );
      });

      return (
         <ul className="search-results">
            {items}
         </ul>
      );
   }


   _renderModalInternals(){
      if(this.state.view == 'module'){
         return (
            <div>
            <div className="module-search">
               <input type="text" value={this.state.search} onChange={this._search.bind(this)}/>
            </div>
            <div className="module-results">
               {this._renderSearchResults()}           
            </div>
            </div>
         );
      }else{
         return (
            <div>
               <h2>Add props</h2>
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
