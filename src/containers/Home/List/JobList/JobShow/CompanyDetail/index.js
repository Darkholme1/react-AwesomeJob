import React, { Component } from 'react';
import { Toast, NavBar, Icon } from 'antd-mobile';

import axios from '@/api/axios'
import style from './style'


class CompanyDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            axiosOk: false,
            opacity: 0
        }
    }
    componentWillMount() {
        this.getCompanyInfo()
    }
    componentDidMount() {
        document.addEventListener('scroll', () => {
            this.scroll()
        })
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', () => {
            this.scroll()
        })
    }
    scroll() {
        this.setState({
            opacity: document.body.scrollTop === 0 ? document.documentElement.scrollTop * 0.02 : document.body.scrollTop * 0.02
        })
    }
    getCompanyInfo() {
        axios.get('/user/query_id', {
            params: {
                user_id: this.props.match.params.user
            }
        }).then(res => {
            if (res.status === 200 && res.data.error === 0) {
                this.setState({
                    user: res.data.doc,
                    axiosOk: true
                })
            } else {
                Toast.info('未知错误', 1.5)
            }
        }).catch(err => {
            Toast.info('未知错误', 1.5)
        })
    }
    render() {
        return (
            <div>
                <NavBar
                    style={{
                        position: 'fixed',
                        width: '100%',
                        top: 0
                    }}
                    icon={<Icon type="left" />}
                    mode="light"
                    onLeftClick={() => { this.props.history.goBack() }}>
                    <span style={{
                        opacity: this.state.opacity
                    }}>
                        {this.state.axiosOk ? this.state.user.company : ''}
                    </span>
                </NavBar>
                {this.state.axiosOk ? (
                    <div style={{ background: 'white', marginTop: 45 }}>
                        <div tag="basic-information"
                            style={style.listItem}>
                            <div tag="innerContainer" style={style.innerContainerBasic}>
                                <div tag="data-information">
                                    <div tag="nameAndIcon" style={style.nameAndIcon}>
                                        <span style={{ fontSize: '1.5em', fontWeight: 'bold', marginRight: '10px' }}>
                                            {this.state.user.company}
                                        </span>

                                    </div>
                                    <div tag="worktime-age-education" style={{ color: 'rgb(136,136,136)', marginTop: '10px' }}>
                                        <span>
                                            {
                                                this.state.user.company_info.financing + ' · ' +
                                                this.state.user.company_info.scale + ' · ' +
                                                this.state.user.company_info.trade
                                            }
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div tag="job-want">
                            <div tag="innerContainer" style={style.innerContainerItem}>
                                <span style={{ fontSize: '18px', fontWeight: 'bold', ...style.itemPadding }}>公司介绍</span>
                                <div style={style.itemContainer}>
                                    <div>
                                        <div style={style.itemHeader}>
                                            <section style={{ ...style.itemContent, width: '90%', marginTop: '0' }}>
                                                <pre style={{
                                                    whiteSpace: 'pre-wrap',
                                                    fontFamily: 'Microsoft Yahei',
                                                    lineHeight: 1.4,
                                                    textAlign: 'justify'
                                                }}>
                                                    {this.state.user.company_info.introduction != null ?
                                                        this.state.user.company_info.introduction : '暂无'}
                                                </pre>
                                            </section>
                                            {/* <Icon type="right" size="xs" color="rgb(136, 136, 136)" /> */}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ ...style.itemPadding, ...style.btnContainer, marginBottom: '15px' }}>
                                    <div style={style.itemBottom}></div>
                                </div>
                            </div>
                        </div>
                        <div tag="realStudy-exp" >
                            <div tag="innerContainer" style={{ ...style.innerContainerItem, paddingTop: '0' }}>
                                <span style={{ fontSize: '18px', fontWeight: 'bold', ...style.itemPadding }}>公司地址</span>
                                <div style={style.itemContainer}>
                                    {
                                        this.state.user.company_info.address.length > 0 ?
                                            this.state.user.company_info.address.map((current, index, arr) => {
                                                return <div
                                                    key={index}
                                                    style={style.itemBox}>
                                                    <div style={style.itemHeader}>
                                                        <span style={style.itemTitle}>{current}</span>

                                                        {/* <Icon type="right" size="xs" color="rgb(136, 136, 136)" /> */}

                                                    </div>
                                                </div>
                                            }) : (
                                                <span style={{ marginLeft: 15 }}>暂无</span>
                                            )}
                                </div>

                                {/* <div style={{ ...style.itemPadding, ...style.btnContainer }}>
                                <Button onClick={() => {
                                    this.props.history.push({
                                        pathname: '/company_address',
                                        query: {
                                            address: this.state.address
                                        }
                                    })
                                }}>添加公司地址</Button>
                                <div style={style.itemBottom}></div>
                            </div> */}
                            </div>
                        </div>
                        <div tag="project-exp" >
                            <div tag="innerContainer" style={style.innerContainerItem}>
                                <span style={{ fontSize: '18px', fontWeight: 'bold', ...style.itemPadding }}>公司官网</span>
                                <div style={style.itemContainer}>

                                    {
                                        this.state.user.company_info.web.length > 0 ?
                                            this.state.user.company_info.web.map((current, index, arr) => {
                                                return <div
                                                    key={index}
                                                    style={style.itemBox}>
                                                    <div style={style.itemHeader}>
                                                        <span style={style.itemTitle}>{current}</span>

                                                        {/* <Icon type="right" size="xs" color="rgb(136, 136, 136)" /> */}

                                                    </div>
                                                </div>
                                            }) : (
                                                <span style={{ marginLeft: 15 }}>暂无</span>
                                            )
                                    }
                                </div>
                                {/* <div style={{ ...style.itemPadding, ...style.btnContainer }}>
                                <Button onClick={() => {
                                    this.props.history.push({
                                        pathname: '/company_web',
                                        query: {
                                            web: this.state.web
                                        }
                                    })
                                }}>添加链接</Button>
                                <div style={style.itemBottom}></div>
                            </div> */}
                            </div>
                        </div>
                    </div>
                ) : ''}
            </div>
        );
    }
}

export default CompanyDetail;