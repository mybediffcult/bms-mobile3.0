import React from 'react';
import {RadioButtonGroup,RadioButton} from 'material-ui';

import './styles/terminalcase.less';

export default class TerminalCase extends React.Component {
	constructor(props){
		super(props);
		this.state={
			buttonone:this.props.onstate.buttonone,
			buttontwo:this.props.onstate.buttontwo,
			buttonthree:this.props.onstate.buttonthree,
			buttonfour:this.props.onstate.buttonfour
		}
	}
    // componentWillReceiveProps(props){
    // 	this.setState({open:this.props.open});
    // }
    buttonSelect(event,value){
    	this.props.onButtonSelect(value);
    }

	render(){
		if(this.props.open){
		  return (
			<div className="terminalcase-page" >
			    <RadioButtonGroup name="button"  className="caseList" onChange={this.buttonSelect.bind(this)}>
                   <RadioButton value="online" label={this.state.buttonone} />
                   <RadioButton value="offline" label={this.state.buttontwo}  />
                   <RadioButton value="all" label={this.state.buttonthree}  />
                   <RadioButton value="cancel" label={this.state.buttonfour}  />
			    </RadioButtonGroup>   
            </div>
			);
	    }
	    else {
	    	return (
              <div className="blank-page"></div>
	    		);
	    }
	}
}