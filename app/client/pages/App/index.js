import React from 'react';
import Navigation from '../../components/Navigation';
import './styles/main.less';
export default class App extends React.Component {
    render() {
        return (
            <div id="main">
                {this.props.children}
                <Navigation/>
            </div>
        );
    }
}