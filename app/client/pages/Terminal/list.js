import React from 'react';
import Icon from 'react-fa';
import NavBar from '../../components/NavBar';
import Navigation from '../../components/Navigation';
import TerminalList from '../../components/TerminalList';
import TerminalCase from '../../components/TerminalCase';

import TerminalStore from '../../stores/Terminal';
import TerminalActions from '../../actions/Terminal';

import UserStore from '../../stores/User';
import UserActions from '../../actions/User';

import './styles/list.less';
import '../../styles/page.less';

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
        this.setState({isToggleCaseOpen:!this.state.isToggleCaseOpen});
    }
    
    /*
      *设备搜索框显示
    */
    showSearchBar(){
        this.setState({isSearchBarOpen:!this.state.isSearchBarOpen});
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
                <SearhBar open={this.state.isSearchBarOpen} />
                <TerminalCase open={this.state.isToggleCaseOpen} />
                <Navigation/>
            </div>
        );
    }
}