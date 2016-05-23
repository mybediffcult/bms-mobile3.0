import React from 'react';
import {RaisedButton} from 'material-ui';

import './styles/searchbar.less';



export default class SearchBar extends React.Component {
	constructor(props){
		super(props);
		this.state={
		   open:props.open,
           value:''
		};
	}
    componentWillReceiveProps(props) {
        this.setState({open: props.open});
    }

    onKeySubmit(event){
    	if(event.nativeEvent.keyCode==13){
    		this.props.onSubmit(this.state.value);
    	}
    }
    onClickSubmit(){
        this.props.onSubmit(this.state.value);
    }
    /*
     *表单项改变
    */
    onFieldChange(event){
      if(this.state.value!==event.target.value){
      	this.setState({value:event.target.value});
      }
    }
	render() {
		if(this.props.open){
		    return (
                <div className="searchbar">
                    <div className="bar">
                    <input type="text" placeholder="请输入你想要搜索的机构名称" 
                        value={this.state.value} 
                        onChange={this.onFieldChange.bind(this)}
                        onKeyUp={this.onKeySubmit.bind(this)}/>
                        <div className="choosebutton">
                            <RaisedButton className="button"   onMouseDown={this.onClickSubmit.bind(this)} label="搜索" primary={true}/>
                            <RaisedButton className="button"  onMouseDown={this.props.onShowSearchBar} label="取消" secondary={true}/>
                        </div>
                    </div>    
                </div>
			)
	    }
	    else {
	    	return(
               <div className="blank-page"> </div>
	    	)
	    }
	}
}