import React from 'react';

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
                            <button onClick={this.onClickSubmit.bind(this)}>搜索</button>
                            <button onClick={this.props.onShowSearchBar}>取消</button>
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