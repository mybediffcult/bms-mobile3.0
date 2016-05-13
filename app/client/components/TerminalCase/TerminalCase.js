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
		this.setState({value:this.props.open});
	}

	render(){
		console.log(this.props.open);
		return (
			<div className={"terminalcase-page" + (this.props.open? "open":"hidden")}>
			    <RadioButtonGroup name="button"  className="caseList" defaultSelceted="third">
                   <RadioButton value="first" label="查看在线设备" />
                   <RadioButton value="second" label="查看离线设备" />
                   <RadioButton value="third" label="查看所有设备" />
			    </RadioButtonGroup>   
            </div>
			);
	}
}