import React from 'react';
import Icon from 'react-fa';
import {DropDownMenu,MenuItem} from 'material-ui';

import './styles/dropdownmenu.less';

export default class DropDownMenu extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			value=props.value,
			buttonone:this.props.onstate.buttonone,
			buttontwo:this.props.onstate.buttontwo,
			buttonthree:this.props.onstate.buttonthree,
			buttonfour:this.props.onstate.buttonfour
		}
	}
     
    componentWillRecriveProps(props){
    	this.setState({value:props.value});
    }
     
    handleChange(event,index,value){
    	this.props.onHandleChange(value);

    }

	render(){
		console.log(this.props);
	  if(this.props.open){
		return(
            <DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)}>
                <MenuItem value={1} primaryText={buttonone}/>
                <MenuItem value={2} primaryText={buttontwo}/>
                <MenuItem value={3} primaryText={buttonthree}}/>
                <MenuItem value={4} primaryText={buttonfour} />
                <MenuItem value={5} primaryText="搜索" />
                <MenuItem value={6} primaryText={"其他"+<Icon name="angle-down"/>} />
            </DropDownMenu> 
			);
	   }
	   else {
	   	  <div className="blank-page"></div>
	   }
	}
}