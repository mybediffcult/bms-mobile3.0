import React from 'react';
import Icon from 'react-fa';
import NavBar from '../../components/NavBar';
import Navigation from '../../components/Navigation';
import TerminalList from '../../components/TerminalList';
import TerminalCase from '../../components/TerminalCase';
import SearchBar from   '../../components/SearchBar';
import Notification from '../../mixins/Notification';
import DropDownMenus from '../../components/DropDownMenus';

import DropDownMenu from 'material-ui';
import MenuItem from 'material-ui';

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
            value:1,
            page:1,
            size:200,
            mainText:"所有设备",
            buttonone:"所有设备",
            buttontwo:"离线设备",
            buttonthree:"在线设备",
            buttonfour:"取消",
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
        if(/[A-Z0-9]{10,12}/.test(code)){
            TerminalActions.getByTermianlCode(code);
            this.setState({
                isSearchBarOpen:!this.state.isSearchBarOpen
            });
        } 
        else if(code>=1 && code<=200){
            TerminalActions.getById(code);
            this.setState({
                isSearchBarOpen:!this.state.isSearchBarOpen
            });
        }
        else if(/[0-9]{6}/.test(code)){
            TerminalActions.getByOrganizationCode(code);
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
        console.log(field);
        //setTimeOut(3000);
       if(field=="online"){
         TerminalActions.getByStatus("1");
         this.setState({mainText:"在线设备"});
       }
       else if(field=="offline"){
         TerminalActions.getByStatus("0");
         this.setState({
          mainText:"离线设备"
          });
       }
       else if(field=="all"){
         TerminalActions.fetchAll(this.state.page,this.state.size);
         this.setState({
          mainText:"所有设备"
          });
       }
      else if(field=="cancel"){
       }
       else{
        notification.show(error);
       }
      // this.setState({isToggleCaseOpen:!this.state.isToggleCaseOpen});
    }

    /*
     *切换显示
    */
    handleChange(event,index,value){
      console.log(value);
      if(value==1){
        TerminalActions.getByStatus("1");
        this.setState({
          mainText:"所有设备",
          isToggleCaseOpen:!this.state.isToggleCaseOpen});
      }   
      else if(value==2){
         TerminalActions.getByStatus("0");
         this.setState({
          mainText:"离线设备",
          isToggleCaseOpen:!this.state.isToggleCaseOpen});        
      }
      else if(value==3){
         TerminalActions.fetchAll(this.state.page,this.state.size);
         this.setState({
          mainText:"在线设备",
          isToggleCaseOpen:!this.state.isToggleCaseOpen});        
      }
      else if(value==4){
         this.setState({
          mainText:"所有设备",
          isToggleCaseOpen:!this.state.isToggleCaseOpen});
      }
      else{
        notification.show(error);
       }
      this.setState({value:value});
    }
                    
    render() {


        return (
            <div className="terminal-list-page">
              <NavBar
                  mainText={this.state.mainText}
                  mainIcon={<Icon name="angle-down"/>}
                  onMainClick={this.onToggleCase.bind(this)} 
                  rightText="搜索"                 
                  onRightClick={this.showSearchBar.bind(this)}  />
                <TerminalList terminalList={this.state.terminalList} />
                <SearchBar open={this.state.isSearchBarOpen} 
                onShowSearchBar={this.showSearchBar.bind(this)}
                 onSubmit={this.onSubmit.bind(this)}/>
                <TerminalCase open={this.state.isToggleCaseOpen}
                onButtonSelect={this.onButtonSelect.bind(this)}
                 onstate={this.state} />
                <Navigation/>
            </div>
        );
    }
}
