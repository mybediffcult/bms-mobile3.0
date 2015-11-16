import React from 'react';
import Navigation from '../../components/Navigation';
import './styles/main.less';
export default class App extends React.Component {
    render() {
        return (
            <div id="main">
                <div id="content">
                {this.props.children}
                </div>
                <Navigation/>
            </div>
        );
    }
}