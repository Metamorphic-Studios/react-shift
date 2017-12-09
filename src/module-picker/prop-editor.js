import React, {
   Component
} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
export default class PropEditor extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props,
         propTypes: this._getProps(props.component) || [],
         props: {}
      }
   }

   componentWillReceiveProps(newProps){
      if(this.props !== newProps){
         this.setState({
            ...newProps,
            propTypes: this._getProps(newProps.component)
         });
      }
   }

   _getProps(c){
      var props = [];
      if(c.propTypes){
         for(var k in c.propTypes){
            props.push(k);
         }
         return props;
      }else{
         return []
      }
   }

   _selectProp(e){
         this.setState({
            selectedProp: e.value
         });
   }

   _renderPropInput(){
      if(this.state.selectedProp){
         return (
            <input type="text" onChange={(e) => {
               var props = this.state.props;
               props[this.state.selectedProp] = e.target.value;
               this.props.setProps(props);
               this.setState({
                  props: props,
                  propInput: e.target.value
               });
            }} value={this.state.propInput} />
         );
      }else{
         return null;
      }
   }

   _submit(){
      if(this.props.onSubmit){
         this.props.onSubmit(this.state.component, this.state.props);
         this.setState({
            component: null,
            props: null
         });   
      }
   }

   render(){
      return (
         <div>
            <div>
               <Select options={this.state.propTypes.map((x) => ({label: x, value: x}))} onChange={this._selectProp.bind(this)} value={this.state.selectedProp}  allowCreate={true}/>
               {this._renderPropInput()}
            </div>
            <div>
               
            </div>
         </div>
      );
   }
}
