import React, { Component } from 'react';
import { NavBar, Toast, List } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { updateCount } from '@/redux/actions/chat-action'

import axios from '@/api/axios'
import style from './style'
import socket from '@/api/socket'

class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: [],
            axiosOk: false,
            height: document.documentElement.clientHeight - 90,
            width: document.documentElement.clientWidth,
        }
    }
    componentDidMount() {
        this.getMsgList()
        socket.on('recvmsg', data => {
            // Toast.info('socket ok')
            if (data.to === this.props.state.user._id) {
                this.getMsgList()
            }

        })
    }
    getMsgList() {
        axios.get('/chat/list')
            .then(res => {
                if (res.status === 200 && res.data.error === 0) {
                    // console.log(res.data.doc)
                    let data = res.data.doc //聊天记录在后端根据chat_id(即聊天对象)排序过
                    let chatId = ''
                    let msgOne = [] //存放单个聊天对象的记录
                    let msgAll = [] //存放所有聊天对象的记录
                    let msgList = [] //用于界面展示的聊天列表数据
                    if (data.length > 0) {
                        data.forEach((item, index, arr) => {
                            if (chatId === '') {
                                chatId = item.chat_id
                            }
                            //当聊天对象不同时,msgOne加入msgAll,msgOne初始化为空数组
                            else if (chatId !== item.chat_id) {
                                msgAll.push(msgOne)
                                msgOne = []
                                chatId = item.chat_id
                            }
                            msgOne.push({
                                chat_id: item.chat_id,
                                create_time: item.create_time,
                                from: item.from,
                                text: item.text,
                                to: item.to,
                                un_read: item.un_read
                            })
                            //循环结束时将最后一组记录加入msgAll
                            if (index === data.length - 1) {
                                msgAll.push(msgOne)
                            }
                        });
                        //循环结束后msgAll成功以chat_id分组，每组以create_time倒序排序，即每组第一个元素为最新消息
                        //按每组最新消息的时间排序
                        if (data.length > 1) {
                            for (var i = 0; i < msgAll.length; i++) {
                                for (var j = i + 1; j < msgAll.length; j++) {
                                    if (msgAll[j][0].create_time > msgAll[i][0].create_time) {
                                        var temp = msgAll[j]
                                        msgAll[j] = msgAll[i]
                                        msgAll[i] = temp
                                    }
                                }
                            }
                        }
                        //获取聊天对象的名字和头像
                        setTimeout(() => {
                            let user = this.props.state.user._id //当前用户id
                            let arr_user = [] //将用户id存入数组后向后端获取名字头像
                            let unRead = 0
                            let unReadAll = 0
                            msgAll.forEach(item => {
                                //提取聊天对象id
                                if (item[0].from === user) {
                                    arr_user.push(item[0].to)
                                } else {
                                    arr_user.push(item[0].from)
                                }
                                //计算未读数量
                                item.forEach(itemOne => {
                                    if (itemOne.to === user && itemOne.un_read === 1) {
                                        unRead++
                                    }
                                })
                                var obj = {
                                    ...item[0],
                                    un_read: unRead
                                }
                                msgList.push(obj)//顺便加入msgList
                                unReadAll += unRead
                                unRead = 0
                            })

                            this.props.updateCount(unReadAll)
                            axios.get('/chat/list_user', {
                                params: {
                                    arr_user: JSON.stringify(arr_user)
                                }
                            }).then(res => {
                                var arrOpposite = res.data.doc
                                //加入头像和名字
                                msgList.forEach((item, index, arr) => {
                                    arrOpposite.forEach((itemOp, indexOp, arrOp) => {
                                        if (item.from === itemOp._id) {
                                            arr[index].nickname = itemOp.nickname
                                            arr[index].avatar = itemOp.avatar
                                            return false
                                        } else if (item.to === itemOp._id) {
                                            arr[index].nickname = itemOp.nickname
                                            arr[index].avatar = itemOp.avatar
                                            return false
                                        }
                                    })
                                })
                                this.setState({
                                    msg: msgList
                                }, () => {
                                    //计算聊天时间
                                    let today = new Date().getTime()
                                    this.state.msg.forEach(item => {
                                        var ms = today - item.create_time
                                        var hour = ms / 1000 / 60 / 60
                                        let time
                                        let createTime = new Date(item.create_time)
                                        var day = createTime.getDate()
                                        var dayToady = new Date().getDate()
                                        if (hour < 24 && day === dayToady) {
                                            var clockHour = createTime.getHours() < 10 ? '0' + createTime.getHours() : createTime.getHours()
                                            var clockMin = createTime.getMinutes() < 10 ? '0' + createTime.getMinutes() : createTime.getMinutes()
                                            time = clockHour + ':' + clockMin
                                        } else {
                                            time = createTime.getMonth() + 1 + '-' + createTime.getDate()
                                        }
                                        item.time = time
                                    })
                                    this.setState({
                                        axiosOk: true
                                    })
                                })
                                // console.log(msgList)
                            }).catch(err => {

                            })
                        }, 0);
                    }
                    // console.log(msgAll)

                } else {
                    Toast.info('未知错误', 1.5)
                }
            }).catch(err => {
                // Toast.info('未知错误', 1.5)
            })
    }
    render() {
        const Item = List.Item
        const Brief = Item.Brief
        const avatar = (avatar, unRead) => (
            <div
                style={{
                    position: 'relative'
                }}>
                <img
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%'
                    }}
                    src={require(`@/resource/image/avatar/av${avatar}.jpg`)} />
                {
                    unRead === 0 ? '' : (
                        <div style={{
                            width: 17,
                            height: 17,
                            borderRadius: '50%',
                            background: '#e94f4f',
                            color: 'white',
                            fontSize: 12,
                            textAlign: 'center',
                            lineHeight: 1.3,
                            position: 'absolute',
                            top: 0,
                            right: 0
                        }}>{unRead}</div>
                    )
                }
            </div>
        )
        return (
            <div>
                <NavBar
                    style={{
                        position: 'fixed',
                        width: '100%',
                        top: 0
                    }}
                >消息</NavBar>
                <div style={{
                    height: this.state.height,
                    width: this.state.width,
                    overflow: 'auto',
                    position: 'absolute',
                    top: '45px',
                }}>
                    <List>
                        {
                            this.state.axiosOk ?
                                this.state.msg.map((item, index, arr) => {
                                    return (
                                        <Item
                                            key={index}
                                            extra={item.time}
                                            align="top"
                                            thumb={avatar(item.avatar, item.un_read)}
                                            multipleLine
                                            onClick={() => {
                                                var id = this.props.state.user._id === item.from ? item.to : item.from
                                                this.props.history.push(`/chat/${id}`)
                                            }}>
                                            {item.nickname} <Brief>{item.text}</Brief>
                                        </Item>
                                    )
                                }) : ''
                        }
                    </List>
                </div>
            </div>
        );
    }
}

const mapStateProps = state => {
    return { state }
}
const actionCreator = { updateCount }
Message = connect(mapStateProps, actionCreator)(Message)

export default withRouter(Message);