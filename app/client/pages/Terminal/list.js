import React from 'react';
import Icon from 'react-fa';
import NavBar from '../../components/NavBar';
import Navigation from '../../components/Navigation';
import TerminalList from '../../components/TerminalList';
import TerminalCase from '../../components/TerminalCase';
import SearchBar from   '../../components/SearchBar';
import Notification from '../../mixins/Notification';

import TerminalStore from '../../stores/Terminal';
import TerminalActions from '../../actions/Terminal';

import UserStore from '../../stores/User';
import UserActions from '../../actions/User';

import './styles/list.less';
import '../../styles/page.less';

var notification = new Notification();
export default class list extends React.Component {
    constructor() {
        super();
        this.state = {
            page:1,
            size:200,
            isToggleCaseOpen:false,
            isSearchBarOpen:false,
            administration: null,
            terminalList: []
        };
    }

    componentWillMount() {
        this.unsubscribeTerminalStore = TerminalStore.listen(this.onTerminalStoreChange.bind(this));
        this.unsubscribeUserStore = UserStore.listen(this.onUserStoreChange.bind(this));
        UserActions.getUser();
    }

    componentWillUnmount() {
        this.unsubscribeTerminalStore();
        this.unsubscribeUserStore();
    }

    onTerminalStoreChange(data) {
        this.setState({terminalList: data});
    }

    onUserStoreChange(data) {
        this.setState({administration: data}, function() {
            TerminalActions.fetchAll(this.state.page,this.state.size);
        });
    }
    
    /*
      *设备选择框状态转换
    */
    onToggleCase(){
        if(this.state.isSearchBarOpen){
            this.setState({
                isToggleCaseOpen:!this.state.isToggleCaseOpen,
                isSearchBarOpen:!this.state.isSearchBarOpen
            });
        }
        else {
            this.setState({
                isToggleCaseOpen:!this.state.isToggleCaseOpen
            });
        }
    }
    
    /*
      *设备搜索框显示
    */
    showSearchBar(){
         if(this.state.isToggleCaseOpen){
            this.setState({
                isToggleCaseOpen:!this.state.isToggleCaseOpen,
                isSearchBarOpen:!this.state.isSearchBarOpen
            });
        }
        else {
            this.setState({
                isSearchBarOpen:!this.state.isSearchBarOpen
            });
        }
    }

    /*
      *搜索提交
    */
    onSubmit(code){
        console.log(code);
        if(/[0-9]{1,6}/.test(code)){
            TerminalActions.getByOrganizationCode(code);
            this.setState({
                isSearchBarOpen:!this.state.isSearchBarOpen
            });
        }
        else if(code>=1 &&code<=200){
            TerminalActions.getById(code);
            this.setState({
                isSearchBarOpen:!this.state.isSearchBarOpen
            });
        }
        else if(/[A-Z][0-9]{10}/.test(code)){
            TerminalActions.getByTermianlCode(code);
            this.setState({
                isSearchBarOpen:!this.state.isSearchBarOpen
            });
        }        
        else {
            notification.show("搜索条件不正确");
        }

    }
    /*
      *显示设备提交
    */
    onButtonSelect(field){
        console.log(fourth);
       if(field=="first"){
         TerminalActions.getByStatus("1");
       }
       if(field=="second"){
         TerminalActions.getByStatus("0");
       }
       if(field=="third"){
        return;
       }
       if(field=="fourth"){
         this.setState({isToggleCaseOpen:!this.state.isToggleCaseOpen});
       }
       else{

       }
    }
    render() {
        return (
            <div className="terminal-list-page">
                <NavBar
                  mainText="设备状态" 
                  mainIcon={<Icon name="angle-down"/>}
                  onMainClick={this.onToggleCase.bind(this)} 
                  rightText="搜索"
                  onRightClick={this.showSearchBar.bind(this)}  />
                <TerminalList terminalList={this.state.terminalList} />
                <SearchBar open={this.state.isSearchBarOpen} 
                onShowSearchBar={this.showSearchBar.bind(this)}
                 onSubmit={this.onSubmit.bind(this)}/>
                <TerminalCase open={this.state.isToggleCaseOpen} 
                onButtonSelect={this.onButtonSelect.bind(this)}/>
                <Navigation/>
            </div>
        );
    }
}