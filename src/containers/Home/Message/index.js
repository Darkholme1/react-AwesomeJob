import React, { Component } from 'react';
import { NavBar } from 'antd-mobile'

import { connect } from 'react-redux'
import { msgList } from '@/redux/actions/chat-action'

import axios from '@/api/axios'

class Message extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    componentDidMount() {
        
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
const actionCreator = { msgList }
Message = connect(mapStateProps, actionCreator)(Message)

export default Message;