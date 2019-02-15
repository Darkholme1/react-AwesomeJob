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
            btnResume: false
        }
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
                    axios.post('/chat/read', {
                        chat_id: this.state.chat_id,
                    }).then(res => {

                    }).catch(err => {
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
                axios.post('/chat/read', {
                    chat_id: this.state.chat_id,
                }).then(res => {

                }).catch(err => {
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
    sendResume() {
        // console.log('sender:', this.props.state.user._id)
        new Promise((resolve, reject) => {
            socket.emit('sendmsg', {
                chat_id: this.state.chat_id,
                from: this.state.from,
                to: this.state.to,
                text: '[投递简历]'
            })
            // Toast.info('socket send')
            resolve()
        }).then(() => {
            // console.log(_this)
            axios.post('/chat/add', {
                chat_id: this.state.chat_id,
                from: this.state.from,
                to: this.state.to,
                text: '[投递简历]'
            }).then(res => {
                if (res.status === 200 && res.data.error === 0) {
                    this.scroll()
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
                                                        {/* <span>{item.text}</span> */}
                                                        <div style={{ maxWidth: '60%' }}>
                                                            <div style={{ height: 10 }}></div>
                                                            <div style={style.msgCard}>
                                                                {item.text==='[投递简历]'?
                                                                (
                                                                    <div>
                                                                        <img 
                                                                        style={{
                                                                            width:15,
                                                                            height:15,
                                                                            marginRight:3,
                                                                            position: 'relative',
                                                                            top: 2
                                                                            }} src={require('@/resource/image/icon/resume.png')} />
                                                                    点击查看简历
                                                                    </div>
                                                                ):
                                                                item.text}
                                                            </div>
                                                        </div>
                                                        <img
                                                            style={{ ...style.avatar, marginLeft: 10 }}
                                                            src={require(`@/resource/image/avatar/av${this.state.myInfo.avatar}.jpg`)} />

                                                    </div>
                                                ) : (
                                                    <div style={style.msgHis}>
                                                        <img
                                                            style={{ ...style.avatar, marginRight: 10 }}
                                                            src={require(`@/resource/image/avatar/av${this.state.toInfo.avatar}.jpg`)} />
                                                        <div style={{ maxWidth: '60%' }}>
                                                            <div style={{ height: 10 }}></div>
                                                            <div style={style.msgCard}>
                                                                {item.text}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </div>
                                )
                            }) : ''
                    }
                </div>
                <div style={style.sendResumeBox}>
                    <div
                        style={
                            this.state.btnResume === false ?
                                {
                                    ...style.btnResume,
                                    opacity: 0
                                } :
                                {
                                    ...style.btnResume,
                                    opacity: 1,
                                    marginRight: 5
                                }
                        }
                        onClick={() => {
                            if(this.state.btnResume){
                                this.sendResume()
                            }
                        }}>发送简历</div>
                    <div
                        onClick={() => {

                            this.setState({
                                btnResume: this.state.btnResume === true ? false : true
                            })
                        }}
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            background: 'white',
                            opacity: this.state.btnResume ? '1' : '0.5',
                            transition: '0.5s'
                        }}>
                        <img
                            style={{
                                width: 30,
                                height: 30
                            }}
                            src={require('@/resource/image/icon/send_resume.png')} />
                    </div>
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