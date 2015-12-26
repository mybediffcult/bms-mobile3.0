import React from 'react';
import './styles/progressbar.less';

export default class ProgressBar extends React.Component {

    onClick() {
        if(this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        return (
            <div className="progress-bar">
                <div className="axis">
                    <span className="handler" style={{left: this.props.value + '%'}} onClick={this.onClick.bind(this)}>{this.props.label}</span>
                    <span className="progressed" style={{width: this.props.value + '%'}}></span>
                </div>
            </div>
        );
    }
}

ProgressBar.defaultProps = {
    value: 80,
    label: "2"
}