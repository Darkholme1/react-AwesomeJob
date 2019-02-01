import React, { Component } from 'react';
import { NavBar, Icon, List, InputItem, Picker, Button } from 'antd-mobile'
import style from './style'
import { connect } from 'react-redux'

import commonStyle from '../../../../style'

class CompanyInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            touch: '',
            activeItemIndex: 0,
            company: '',
            basic: {
                financing: '',
                scale: '',
                trade: ''
            },
            introduction: '',
            address: [],
            web: []
        }
    }
    componentDidMount() {
        document.querySelector('body').setAttribute('style', 'background:white')

        setTimeout(() => {
            this.setState({
                company: this.props.state.user.company,
            })
            if (this.props.state.user.company_info) {
                this.setState({
                    
                    basic: {
                        financing: this.props.state.user.company_info.financing,
                        scale: this.props.state.user.company_info.scale,
                        trade: this.props.state.user.company_info.trade
                    },
                    introduction: this.props.state.user.company_info.introduction,
                    address: this.props.state.user.company_info.address?this.props.state.user.company_info.address:[],
                    web: this.props.state.user.company_info.web?this.props.state.user.company_info.web:[]
                })
            }
        }, 0);

    }
    componentWillUnmount() {
        document.querySelector('body').removeAttribute('style')
    }
    render() {
        const Item = List.Item
        const Brief = Item.Brief
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.push({ pathname: '/', query: { tab: 2 } }) }}
                    style={{ position: 'fixed', width: '100%', top: '0', zIndex: '2' }}
                    rightContent={<span onClick={() => { }}>预览</span>}
                >
                    公司详情
                </NavBar>
                <div style={{ marginTop: '45px' }}>
                    <div tag="basic-information"
                        style={this.state.touch === '个人信息' ? { ...style.listItem, ...style.bgTap } : style.listItem}
                        onTouchStart={() => {
                            this.setState({
                                touch: '个人信息'
                            })
                        }}
                        onTouchEnd={
                            () => {
                                this.setState({
                                    touch: ''
                                })
                            }
                        }
                        onClick={() => {
                            this.props.history.push('/company_basic')
                        }}>
                        <div tag="innerContainer" style={style.innerContainerBasic}>
                            <div tag="data-information">
                                <div tag="nameAndIcon" style={style.nameAndIcon}>
                                    <span style={{ fontSize: '1.5em', fontWeight: 'bold', marginRight: '10px' }}>
                                        {this.state.company}
                                    </span>
                                    <img src={require('../../../../../resource/image/icon/edit.png')} style={{ width: '15px', height: '15px' }} />
                                </div>
                                <div tag="worktime-age-education" style={{ color: 'rgb(136,136,136)', marginTop: '10px' }}>
                                    <span>
                                        {
                                            this.state.basic.financing + ' · ' +
                                            this.state.basic.scale + ' · ' +
                                            this.state.basic.trade
                                        }
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div tag="job-want">
                        <div tag="innerContainer" style={style.innerContainerItem}>
                            <span style={{ fontSize: '18px', fontWeight: 'bold', ...style.itemPadding }}>公司介绍</span>
                            <div style={style.itemContainer}
                                onClick={() => {
                                    this.props.history.push({
                                        pathname: '/edit_company_introduce',
                                        query: {
                                            introduction: this.state.introduction
                                        }
                                    })
                                }}>
                                <div
                                    style={this.state.touch === 'introduce' ?
                                        { ...style.itemBox, ...style.bgTap } :
                                        style.itemBox}
                                    onTouchStart={() => {
                                        this.setState({
                                            touch: 'introduce'
                                        })
                                    }}
                                    onTouchEnd={() => {
                                        this.setState({
                                            touch: ''
                                        })
                                    }}
                                >
                                    <div style={style.itemHeader}>
                                        <section style={{ ...style.itemContent, width: '90%', marginTop: '0' }}>
                                            {this.state.introduction}
                                        </section>
                                        <Icon type="right" size="xs" color="rgb(136, 136, 136)" />
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
                                {(() => {
                                    return this.state.address.map((current, index, arr) => {
                                        return <div
                                            key={index}
                                            style={this.state.touch === `addr${index}` ?
                                                { ...style.itemBox, ...style.bgTap } :
                                                style.itemBox}
                                            onTouchStart={() => {
                                                this.setState({
                                                    touch: `addr${index}`
                                                })
                                            }}
                                            onTouchEnd={() => {
                                                this.setState({
                                                    touch: ''
                                                })
                                            }}
                                            onClick={() => {
                                                this.props.history.push({
                                                    pathname: '/company_address',
                                                    query: {
                                                        address: this.state.address,
                                                        index: index
                                                    }
                                                })
                                            }}>
                                            <div style={style.itemHeader}>
                                                <span style={style.itemTitle}>{current}</span>

                                                <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                            </div>
                                        </div>
                                    })
                                })()}
                            </div>

                            <div style={{ ...style.itemPadding, ...style.btnContainer }}>
                                <Button onClick={() => {
                                    this.props.history.push({
                                        pathname: '/company_address',
                                        query: {
                                            address: this.state.address
                                        }
                                    })
                                }}>添加公司地址</Button>
                                <div style={style.itemBottom}></div>
                            </div>
                        </div>
                    </div>
                    <div tag="project-exp" >
                        <div tag="innerContainer" style={style.innerContainerItem}>
                            <span style={{ fontSize: '18px', fontWeight: 'bold', ...style.itemPadding }}>公司官网</span>
                            <div style={style.itemContainer}>

                                {(() => {
                                    return this.state.web.map((current, index, arr) => {
                                        return <div
                                            key={index}
                                            style={this.state.touch === `web${index}` ?
                                                { ...style.itemBox, ...style.bgTap } :
                                                style.itemBox}
                                            onTouchStart={() => {
                                                this.setState({
                                                    touch: `web${index}`
                                                })
                                            }}
                                            onTouchEnd={() => {
                                                this.setState({
                                                    touch: ''
                                                })
                                            }}
                                            onClick={() => {
                                                this.props.history.push({
                                                    pathname: '/company_web',
                                                    query: {
                                                        web: this.state.web,
                                                        index: index
                                                    }
                                                })
                                            }}>
                                            <div style={style.itemHeader}>
                                                <span style={style.itemTitle}>{current}</span>

                                                <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                            </div>
                                        </div>
                                    })
                                })()}
                            </div>
                            <div style={{ ...style.itemPadding, ...style.btnContainer }}>
                                <Button onClick={() => {
                                    this.props.history.push({
                                        pathname: '/company_web',
                                        query: {
                                            web: this.state.web
                                        }
                                    })
                                }}>添加链接</Button>
                                <div style={style.itemBottom}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateProps = (state) => {
    return { state }
}
const actionCreators = {}
CompanyInfo = connect(mapStateProps, actionCreators)(CompanyInfo)
export default CompanyInfo;