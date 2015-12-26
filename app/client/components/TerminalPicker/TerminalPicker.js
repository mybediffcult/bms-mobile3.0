import React from 'react';

import './styles/terminalpicker.less';

export default class TerminalSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    componentWillReceiveProps(props) {
        this.setState({value: props.value});
    }

    onChange(event) {
        this.setState({value: event.target.value});
    }

    onConfirm() {
        if(this.props.onPick){
            this.props.onPick(this.state.value);
        }

    }

    onCancel() {
        if(this.props.onCancel) {
            this.props.onCancel();
        }
    }

    render() {

        var terminalList = this.props.terminalList.map((terminal, index)=>{
            return (
                <li key={"terminal-" + index}>
                    <input type="radio"
                           id={"radio-" + index}
                           checked={this.state.value == terminal.terminalid}
                           value={terminal.terminalid}
                           onChange={this.onChange.bind(this)} />

                    <label className="name" htmlFor={"radio-" + index}>{terminal.name}</label>
                </li>
            );
        });

        return (
            <div className={"terminal-selector" + (this.props.open ? " open" : " hidden")}>
                <header className="header">
                    <span className="cancel" onClick={this.onCancel.bind(this)}>取消</span>
                    <span className="confirm" onClick={this.onConfirm.bind(this)}>确定</span>
                </header>

                <ul className="terminal-option-list">
                    {terminalList}
                </ul>
            </div>
        );
    }
}

TerminalSelector.defaultProps = {
    value: '1212',
    terminalList: [
        {
            terminalid: '1212',
            name: '北京地坛医院二楼骨科大厅'
        },
        {
            terminalid: '1213',
            name: '北京地坛医院二楼骨科大厅'
        }
    ]
}