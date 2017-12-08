import React, {
   Component
} from 'react';
import Input from 'muicss/lib/react/input';
import 'muicss/dist/css/mui.min.css';

export default class NpmSearch extends Component {
   constructor(props){
      super(props);
      this.state = {
         search: '',
         searchResults: []
      }
   }
   

   _searchApi(q){
      return fetch('http://npmsearch.com/query?q=' + q +  '&fields=name,version').then((res) => res.json());
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
      var name = pkg;
      if(typeof(pkg) == 'object'){
         name = pkg.name[0];
         var version = pkg.version[0];
      }

      if(this.props.onSelect){
         this.props.onSelect(name);
      }

/*      let cmp = (<Loader module={"npm:" + name} onLoad={(component) => {

         if(typeof(component.Component) == 'object'){
            var cmp_list = [];
            for(var k in component.Component){
               cmp_list.push(k);
            }
            this.setState({propOptions: cmp_list.map((x) => {
               return {
                  value: component.Component[x],
                  label: x
               }
            })});
         }else{
            this.setState({propOptions: component.props.map((x) => {
               return {
                  value: x,
                  label: x
               }
            })});
         }
         console.log(component); 
      }}>
         <p>Loading</p>
         </Loader>);

         this.setState({
            view: 'props',
            cmp: cmp
         });
*/ 
/*      if(this.props.onSelectPackage){
         this.props.onSelectPackage(name, version);
      }*/
   }
   _onSearchKeyPress(e){
      if(e.key === 'Enter'){
         this._selectPackage(this.state.search);
      }
   }

   render(){
      return (
         <div>
            <div>
               <Input placeholder="Package name" value={this.state.search} onChange={this._search.bind(this)} onKeyPress={this._onSearchKeyPress.bind(this)}/>
            </div>
            <div>
               {this._renderSearchResults()}
            </div>
         </div>
      );
   }
}
