import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import axios from '../../api/axios'
import AuthRoute from '../../components/AuthRoute'
import { deleteUser } from '../../redux/actions/user-action'
import { Link } from 'react-router-dom'
import { TabBar, Modal, Toast } from 'antd-mobile'
import JobList from './List/JobList'
import GeniusList from './List/GeniusList'
import Message from './Message'

import Myinfo from './Mine/Myinfo'
import MyinfoBoss from './Mine/MyInfoBoss'


import emitter from '../../common/emitter'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hidden: false,
            selectedTab: 0
        }
    }
    componentDidMount() {
        emitter.addListener('logout', this.logout)
        if (this.props.location.query) {
            this.setState({
                selectedTab: this.props.location.query.tab
            })
        }
    }
    componentWillUnmount() {
        emitter.removeListener('logout', this.logout)
    }
    logout = () => {
        Modal.alert('退出', '真的要退出吗？', [
            { text: '取消', onPress: () => { } },
            {
                text: '确认', onPress: () => {
                    axios.get('/user/logout').then((res) => {
                        this.props.deleteUser()
                        this.props.history.push('/login')
                    }).catch((err) => {
                        console.log(err)
                        Toast.info('未知错误', 1.5)
                    })
                }
            },
        ])
    }
    renderContent(pageText) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                {/* <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
                <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                            hidden: !this.state.hidden,
                        });
                    }}
                >
                    Click to show/hide tab-bar
            </a>
                <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                            fullScreen: !this.state.fullScreen,
                        });
                    }}
                >
                    Click to switch fullscreen
            </a> */}
            </div>
        );
    }
    render() {
        const title1 = this.props.state.user.type == 0 ? '职位' : '牛人'
        return (
            <div>
                <AuthRoute>
                    {/* {用户cookie校验} */}
                </AuthRoute>
                <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                    >
                        {
                            this.props.state.user.type == 0 ?
                                <TabBar.Item
                                    title="职位"
                                    key="job"
                                    icon={<div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: `url(${require('../../resource/image/navbar/work-list.png')}) center center / 21px 21px no-repeat`
                                    }}
                                    />
                                    }
                                    selectedIcon={<div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: `url(${require('../../resource/image/navbar/work-list-active.png')}) center center / 21px 21px no-repeat`
                                    }}
                                    />
                                    }
                                    selected={this.state.selectedTab === 0}
                                    // badge={1}
                                    onPress={() => {
                                        this.setState({
                                            selectedTab: 0,
                                        });
                                    }}
                                    data-seed="logId"
                                >
                                    <JobList props={this.props}></JobList>
                                </TabBar.Item> :
                                <TabBar.Item
                                    title="牛人"
                                    key="job"
                                    icon={<div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: `url(${require('../../resource/image/navbar/work-list.png')}) center center / 21px 21px no-repeat`
                                    }}
                                    />
                                    }
                                    selectedIcon={<div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: `url(${require('../../resource/image/navbar/work-list-active.png')}) center center / 21px 21px no-repeat`
                                    }}
                                    />
                                    }
                                    selected={this.state.selectedTab === 0}
                                    // badge={1}
                                    onPress={() => {
                                        this.setState({
                                            selectedTab: 0,
                                        });
                                    }}
                                    data-seed="logId"
                                >
                                    <GeniusList props={this.props}></GeniusList>
                                    {/* <Home2></Home2> */}
                                </TabBar.Item>
                        }
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${require('../../resource/image/navbar/message.png')}) center center / 21px 21px no-repeat`
                                }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${require('../../resource/image/navbar/message-active.png')}) center center / 21px 21px no-repeat`
                                }}
                                />
                            }
                            title="消息"
                            key="message"
                            // badge={'new'}
                            selected={this.state.selectedTab === 1}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 1,
                                });
                            }}
                            data-seed="logId1"
                        >
                            <Message></Message>
                        </TabBar.Item>
                        <TabBar.Item

                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${require('../../resource/image/navbar/user.png')}) center center / 21px 21px no-repeat`
                                }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${require('../../resource/image/navbar/user-active.png')}) center center / 21px 21px no-repeat`
                                }}
                                />
                            }
                            title="我的"
                            key="my"
                            // dot
                            selected={this.state.selectedTab === 2}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 2,
                                });
                            }}

                        >
                            {/* <Myinfo state={this.props.state} logout={this.logout}></Myinfo> */}
                            {
                                this.props.state.user.type == 0 ?
                                    <Myinfo state={this.props.state} logout={this.logout}></Myinfo> :
                                    <MyinfoBoss state={this.props.state} logout={this.logout}></MyinfoBoss>
                            }
                        </TabBar.Item>
                    </TabBar>
                </div>

            </div>
        );
    }
}
const mapStateProps = (state) => {
    return { state }
}
const actionCreators = { deleteUser }
Home = connect(mapStateProps, actionCreators)(Home)
export default Home;