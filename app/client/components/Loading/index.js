import React from 'react';
import Icon from 'react-fa';
import './styles/index.less';
export default class Loading extends React.Component {
    render() {
        return (
            <div className="loading">
                <Icon className="loading-icon" spin name="spinner" />
            </div>
        );

    }
}