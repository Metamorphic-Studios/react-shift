import React, {
   Component
} from 'react';
import Loader from 'react-jspm-loader';

export default class ShiftComponent extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props,
         search: '',
      }
   }

   componentWillReceiveProps(newProps){
      if(this.props !== newProps){
         this.setState({
            ...newProps
         });
     }
   }

   _search(e){
      var val = e.target.value;

      this.setState({search: val});
      this._searchApi(val).then((r) => {
         console.log(r);
      });
   }

   render(){
      
      if(this.state.module){
         return (
            <Loader module={this.state.module}>
               <p>Loading...</p>
            </Loader>
         );
      }else{
         return null;
      }
   }
}  
