import React, { Component } from 'react';

import { List, InputItem, Toast, NavBar, Icon } from 'antd-mobile'

import { connect } from 'react-redux'
import { updateCount } from '@/redux/actions/chat-action'

import style from './style'
import axios from '@/api/axios'
import socket from '@/api/socket'


/* let socket
axios.get('/ip')
    .then(res => {
        socket = io(`ws://${res.data}:8081`)
    }).catch(err => {
        console.log(err)
    }) */
class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: [],
            chat_id: '',
            from: '',
            to: '',
            toInfo: {
                nickname: '--'
            },
            myInfo: {

            },
            axiosOk: false,
        }
    }
    componentWillMount() {

    }
    componentDidMount() {

        Toast.loading('Loading...', 10, () => {
            Toast.info('网络超时', 1.5)
        });
        socket.on('recvmsg', data => {
            // Toast.info('socket ok')
            if (data.chat_id === this.state.chat_id) {
                this.setState({
                    msg: [
                        ...this.state.msg,
                        {
                            from: data.from,
                            to: data.to,
                            text: data.text
                        }
                    ]
                }, () => {
                    axios.post('/chat/read',{
                        chat_id: this.state.chat_id,
                    }).then(res=>{
    
                    }).catch(err=>{
                        // Toast.info('未知错误')
                    })
                    this.scroll()
                })
            }
        })
        //计时器防刷新获取不到当前用户
        setTimeout(() => {
            this.setState({
                from: this.props.state.user._id,
                to: this.props.match.params.user,
                chat_id: [this.props.state.user._id, this.props.match.params.user].sort().join('_')
            }, () => {
                this.setState({
                    myInfo: {
                        nickname: this.props.state.user.nickname,
                        avatar: this.props.state.user.avatar
                    }
                })
                //获取聊天历史
                axios.get('/chat/init', {
                    params: {
                        to: this.state.to,
                        chat_id: this.state.chat_id
                    }
                }).then(res => {
                    if (res.status === 200 && res.data.error === 0) {
                        this.setState({
                            toInfo: res.data.user,
                            msg: res.data.msg,
                            axiosOk: true
                        }, () => {
                            Toast.hide()
                            this.scroll()
                        })
                    }
                }).catch(err => {
                    Toast.info('未知错误', 1.5)
                })
                //清除未读状态
                axios.post('/chat/read',{
                    chat_id: this.state.chat_id,
                }).then(res=>{

                }).catch(err=>{
                    // Toast.info('未知错误')
                })
            })
        }, 100);
        // console.log(this.props.match.params.user)
    }
    scroll() {
        document.documentElement.scrollTop = document.documentElement.scrollHeight
        if (document.documentElement.scrollTop === 0) {
            document.body.scrollTop = document.body.scrollHeight
        }
    }
    handleSubmit() {
        // console.log('sender:', this.props.state.user._id)
        new Promise((resolve, reject) => {
            socket.emit('sendmsg', {
                chat_id: this.state.chat_id,
                from: this.state.from,
                to: this.state.to,
                text: this.state.text
            })
            // Toast.info('socket send')
            resolve()
        }).then(() => {
            // console.log(_this)
            axios.post('/chat/add', {
                chat_id: this.state.chat_id,
                from: this.state.from,
                to: this.state.to,
                text: this.state.text
            }).then(res => {
                if (res.status === 200 && res.data.error === 0) {
                    this.setState({
                        text: ''
                    }, () => {
                        this.scroll()
                    })
                }
            }).catch(err => {
                Toast.info('未知错误', 1.5)
            })

        })
    }
    render() {
        return (
            <div>
                <NavBar
                    icon={<Icon type="left" onClick={() => { this.props.history.goBack() }} />}
                    style={{
                        position: 'fixed',
                        width: '100%',
                        top: 0
                    }}>
                    {this.state.toInfo.nickname}
                </NavBar>
                <div style={{
                    marginTop: 45,
                    marginBottom: 44,
                    padding: '1px 0'
                }}>
                    {
                        this.state.axiosOk ?
                            this.state.msg.map((item, index, arr) => {
                                return (
                                    // <p>{item.from}:{item.text}</p>
                                    <div
                                        key={index}>
                                        {
                                            item.from === this.state.from ?
                                                (
                                                    <div style={style.msgMine}>
                                                        <span>{item.text}</span>
                                                        <img
                                                            style={style.avatar}
                                                            src={require(`@/resource/image/avatar/av${this.state.myInfo.avatar}.jpg`)} />

                                                    </div>
                                                ) : (
                                                    <div style={style.msgHis}>
                                                        <img
                                                            style={style.avatar}
                                                            src={require(`@/resource/image/avatar/av${this.state.toInfo.avatar}.jpg`)} />
                                                        <span>{item.text}</span>
                                                    </div>
                                                )
                                        }
                                    </div>
                                )
                            }) : ''
                    }
                </div>
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

const mapStateProps = state => {
    return { state }
}
const actionCreator = { updateCount }
Chat = connect(mapStateProps, actionCreator)(Chat)

export default Chat;