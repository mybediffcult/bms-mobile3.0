import React from 'react';

import './styles/terminalpicker.less';

export default class TerminalPicker extends React.Component {
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
        var targetValue = event.target.value;
        if(this.props.multiple) {

            var value = this.state.value;

            if(value) {
                if(value instanceof Array) {

                    var selected = false;
                    var newValue = [];
                    value.forEach((e)=>{
                        if(e != targetValue) {
                            newValue.push(e);
                        }
                        else {
                            selected = true;
                        }
                    })

                    if(!selected) {
                        newValue.push(targetValue);
                    }
                    this.setState({value: newValue});
                }
                else {
                    if(value == targetValue) {
                        this.setState({value: null});
                    }
                    else {
                        this.setState({value: [value, targetValue]});
                    }
                }
            }
            else {
                this.setState({value: [targetValue]});
            }

        }
        else {
            this.setState({value: targetValue});
        }
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
            var checked = false;

            if(this.props.multiple) {
                var value = this.state.value;
                if(value) {
                    if(value instanceof Array) {
                        checked = value.some(function(e) {
                            return e == terminal.terminalid;
                        });
                    }
                    else {
                        checked = (this.state.value == terminal.terminalid);
                    }
                }
            }

            else {
                checked = (this.state.value == terminal.terminalid);
            }

            return (
                <li key={"terminal-" + index}>
                    <input type="radio"
                           id={"radio-" + index}
                           checked={checked}
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

TerminalPicker.defaultProps = {
    value: '',
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