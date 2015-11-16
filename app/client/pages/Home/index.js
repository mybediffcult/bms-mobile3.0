import React from 'react';
import Icon from 'react-fa';
import RoundButton from '../../components/RoundButton';
import './styles/index.less';

export default class index extends React.Component {
    render() {
        return (
            <div className="home-index-page">
                <RoundButton link={true} href="#" className="btn-sign" lineHeight="1.8rem">
                    <Icon name="pencil"/>
                    <br/>
                    签到
                </RoundButton>
            </div>
        );
    }
}