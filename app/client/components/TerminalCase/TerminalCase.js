import React from 'react';
import {RadioButtonGroup,RadioButton} from 'material-ui';

import './styles/terminalcase.less';

export default class TerminalCase extends React.Component {
	constructor(props){
		super(props);
		this.state={
			value:"1",
		};
	}

	componentWillReceiveProps(props){
		this.setState({value:this.props.value});
	}
    
    onButtonSelect(field){
    	this.props.onButtonSelect(field);
        }
	render(){
		console.log(this.props.open);
		if(this.props.open){
		  return (
			<div className="terminalcase-page">
			    <RadioButtonGroup name="button"  className="caseList" defaultSelceted="fourth">
                   <RadioButton value="first" label="查看在线设备" onChange={this.onButtonSelect.bind(this,"first")}/>
                   <RadioButton value="second" label="查看离线设备" onChange={this.onButtonSelect.bind(this,"second")} />
                   <RadioButton value="third" label="查看所有设备"  onChange={this.onButtonSelect.bind(this,"third")}/>
                   <RadioButton value="fourth" label="取消" onChange={this.onButtonSelect.bind(this,"fourth")} />
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