import React from 'react';
import Icon from 'react-fa';
import RoundButton from '../../components/RoundButton';
import './styles/index.less';

export default class index extends React.Component {
    constructor() {
        super();
        this.state = {
            isSigned: window.localStorage.getItem('isSigned')
        };
    }

    signup() {
        window.localStorage.setItem('isSigned', true);
        this.setState({isSigned: true});
    }

    render() {

        return (
            <div className="home-index-page">
                <RoundButton className="btn-sign" lineHeight="1.8rem" onClick={this.signup.bind(this)}>
                    <Icon name="pencil"/>
                    <br/>
                    {this.state.isSigned ? '已签到' : '签到'}
                </RoundButton>
            </div>
        );
    }
}