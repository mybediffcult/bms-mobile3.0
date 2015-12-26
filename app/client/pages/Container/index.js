import React from 'react';
import './styles/container.less';

export default class Container extends React.Component {

    render() {
        return <div id="container">{this.props.children}</div>;
    }
}