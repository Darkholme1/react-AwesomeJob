import React, { Component } from 'react';
import io from 'socket.io-client'
import { List, InputItem } from 'antd-mobile'

import style from './style'

const socket = io('ws://localhost:8081')

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
    }
    componentDidMount() {
        socket.on('recvmsg', data=> {
            console.log(data)
            this.setState({
                msg: [...this.state.msg, data.text]
            })
        })
    }
    handleSubmit() {
        socket.emit('sendmsg', { text: this.state.text })
        this.setState({
            text: ''
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.msg.map(item=>{
                        return (
                            <p>{item}</p>
                        )
                    })
                }
                <List style={style.input}>
                    <InputItem
                        value={this.state.text}
                        onChange={v => {
                            this.setState({
                                text: v
                            })
                        }}
                        extra={
                            <span
                                onClick={() => this.handleSubmit()}>发送</span>

                        } />
                </List>
            </div>
        );
    }
}

export default Chat;