import React from 'react';
import Icon from 'react-fa';
import './styles/navbar.less';

export default class NavBar extends React.Component {

    onLeftClick() {
        if(this.props.onLeftClick)
            this.props.onLeftClick();
    }

    onRightClick() {
        if(this.props.onRightClick)
            this.props.onRightClick();
    }

    onMainClick() {
        if(this.props.onMainClick)
            this.props.onMainClick();
    }

    render() {
        return (
            <header className="nav-bar">
                <div className="left">
                    <div className="wrapper" onClick={this.onLeftClick.bind(this)}>
                    {this.props.leftIcon ? <span className="left-icon">{this.props.leftIcon}</span> : ''}
                    {this.props.leftText}
                    </div>
                </div>

                <div className="main" onClick={this.onMainClick.bind(this)}>
                    {this.props.mainText}
                    {this.props.mainIcon ? <span className="main-icon">{this.props.mainIcon}</span> : ''}
                </div>

                <div className="right">
                    <div className="wrapper" onClick={this.onRightClick.bind(this)}>
                    {this.props.rightText}
                    {this.props.rightIcon ? <span className="right-icon">{this.props.rightIcon}</span> : ''}
                    </div>
                </div>
            </header>
        );
    }
}

NavBar.defaultProps = {
    leftText: "",
    rightText: "",
    mainText: ""
}