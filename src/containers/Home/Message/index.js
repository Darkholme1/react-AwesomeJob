import React, { Component } from 'react';
import { NavBar, Toast } from 'antd-mobile'

import { connect } from 'react-redux'
// import { msgList } from '@/redux/actions/chat-action'

import axios from '@/api/axios'

class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        axios.get('/chat/list')
            .then(res => {
                if (res.status === 200 && res.data.error === 0) {
                    console.log('gourp:',res.data.doc)
                }
            }).catch(err => {
                Toast.info('未知错误',1.5)
            })
    }
    render() {
        return (
            <div>
                <NavBar>消息</NavBar>
            </div>
        );
    }
}

const mapStateProps = state => {
    return { state }
}
const actionCreator = {}
Message = connect(mapStateProps, actionCreator)(Message)

export default Message;