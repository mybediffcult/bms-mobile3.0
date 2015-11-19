import React from 'react';
import Navigation from '../../components/Navigation';
import Notification from '../../mixins/Notification';
import './styles/main.less';

var notification = new Notification();

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true
        };
    }

    componentWillMount() {
        var ad = window.localStorage.getItem('administration');
        if(!ad) {
            window.location.hash = '#/login';
        }
        else {
            this.setState({loading: false});
        }
    }

    render() {
        return this.state.loading ? (<div className="blank-page"></div>) : (<div id="main">{this.props.children}<Navigation/></div>);
    }
}