import React from 'react';
import './styles/index.less';

export default class RoundButton extends React.Component {
    render() {
        var style = this.props.style ? this.props.style : {};
        style.width  =  style.width ? style.width : '10rem';
        style.height = style.width;
        style.lineHeight = style.width;

        return (
            <a className={this.props.className ? this.props.className + " round-button" : "round-button"} href={this.props.link ? this.props.href : 'javascript:;'} target={this.props.target} style={style} onClick={this.props.onClick}>
                <span className="label" style={{lineHeight: this.props.lineHeight ? this.props.lineHeight : '1.4rem'}}>
                    {this.props.children ? this.props.children : this.props.label}
                </span>
            </a>
        );
    }
}