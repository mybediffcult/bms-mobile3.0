import React from 'react';
import {DropDownMenu,MenuItem} from 'material-ui';


import './styles/dropdownmenus.less';

export default class DropDownMenus extends React.Component {
	
	constructor(props) {
		super(props);
		this.state={
			value:this.props.onstate.value,
			buttonone:this.props.onstate.buttonone,
			buttontwo:this.props.onstate.buttontwo,
			buttonthree:this.props.onstate.buttonthree,
			buttonfour:this.props.onstate.buttonfour
		};
	}
     
    componentWillReceiveProps(props){
    	this.setState({			
    		value:this.props.onstate.value,
			buttonone:this.props.onstate.buttonone,
			buttontwo:this.props.onstate.buttontwo,
			buttonthree:this.props.onstate.buttonthree,
			buttonfour:this.props.onstate.buttonfour
		});
    }
     
    handleChange (event,index,value) {
    	console.log("1");
    	this.setState({value:value});
    	this.props.onHandleChange(value);
    }
	
	render() {
		console.log(this.props);
		console.log(this.props.onstate.value);
		console.log(this.state.value);

        // let menuItems = [
        //   {payload:'1',text:this.state.buttonone},
        //   {payload:'2',text:this.state.buttontwo},
        //   {payload:'3',text:this.state.buttonthree},
        //   {payload:'4',text:this.state.buttonfour}
        // ];

	  if(this.props.open){
		return(
            <DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)} openImmediately={true} >
               <MenuItem value={1} primaryText={this.state.buttonone}  />
               <MenuItem value={2} primaryText={this.state.buttontwo} />
               <MenuItem value={3} primaryText={this.state.buttonthree} />
               <MenuItem value={4} primaryText={this.state.buttonfour} />
            </DropDownMenu>
			);
	   }
	   else {
	   	  return(
	   	  <div className="blank-page"></div>
	   	  );
	   	}
	}
}