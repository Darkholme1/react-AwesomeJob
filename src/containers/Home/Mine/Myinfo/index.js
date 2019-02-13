/**
 * 牛人的个人中心
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { withRouter, Link } from 'react-router-dom'
import { NavBar, Grid, List, Button } from 'antd-mobile'

import style from '../style'

import emmiter from '../../../../common/emitter'

class Myinfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            actionData: [
                {
                    text: '沟通过',
                    num: 24
                },
                {
                    text: '已投递',
                    num: 6
                },
                {
                    text: '感兴趣',
                    num: 9
                }
            ],
            dynamicStyle: {
                navbar: {
                    opacity: '0',
                    position: 'fixed',
                    width: '100%',
                    top: 0,
                    zIndex: '2'
                }
            }
        }

    }
    componentDidMount() {
        const Myinfo = ReactDOM.findDOMNode(this.refs.Myinfo)
        Myinfo.addEventListener('scroll', () => {
            this.setState({
                dynamicStyle: {
                    ...this.state.dynamicStyle,
                    navbar: {
                        ...this.state.dynamicStyle.navbar,
                        opacity: Myinfo.scrollTop * 0.02 + ''
                    }
                }
            })
        })
    }
    render() {
        const actionData = Array.from(new Array(3)).map((_val, i) => ({
            text: this.state.actionData[i].text,
            num: this.state.actionData[i].num
        }));
        const Item = List.Item

        return (
            <div ref="Myinfo" style={{ height: '100%', overflowY: 'scroll' }}>
                <NavBar style={this.state.dynamicStyle.navbar}>{this.props.state.user.nickname}</NavBar>
                <header style={style.header}>
                    <h2 style={style.nickname}>{this.props.state.user.nickname}</h2>
                    {
                        (() => {
                            return this.props.state.user.avatar !== undefined ?
                                <img alt="头像" style={style.avatar} src={require(`../../../../resource/image/avatar/av${this.props.state.user.avatar}.jpg`)} /> : ''
                        })()
                    }
                </header>
                <Grid
                    data={actionData}
                    hasLine={false}
                    columnNum={3}
                    itemStyle={{ height: '60px' }}
                    renderItem={dataItem => (
                        <div style={{ marginTop: '-5px' }}>
                            <div style={{ fontSize: '18px', marginBottom: '5px' }}>{dataItem.num}</div>
                            <div style={{ fontSize: '10px', color: '#888' }}>{dataItem.text}</div>
                        </div>

                    )}
                />
                <List style={{ marginTop: '10px' }}>
                    <Item
                        arrow="horizontal"
                        thumb={require('../../../../resource/image/icon/resume.png')}
                        multipleLine
                        onClick={() => { this.props.history.push('/myresume') }}>
                        我的简历
                    </Item>
                    <Item
                        arrow="horizontal"
                        thumb={require('../../../../resource/image/icon/private.png')}
                        multipleLine
                        onClick={() => { }}>
                        隐私设置
                    </Item>
                    <Item
                        arrow="horizontal"
                        thumb={require('../../../../resource/image/icon/userinfo.png')}
                        multipleLine
                        onClick={() => { this.props.history.push('/geniusinfo') }}>
                        编辑资料
                    </Item>
                </List>
                {/* <List style={{ marginTop: '10px' }}>
                    <Item onClick={() => { }}>
                        退出登录
                    </Item>
                </List> */}
                <Button
                    style={{ color: 'red', marginTop: '10px', borderRadius: '0', fontSize: '17px' }}
                    onClick={() => { emmiter.emit('logout') }}>退出登录</Button>
            </div>
        );
    }
}

export default withRouter(Myinfo);