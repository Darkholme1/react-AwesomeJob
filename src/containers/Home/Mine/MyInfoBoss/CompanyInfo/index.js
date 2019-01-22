import React, { Component } from 'react';
import { NavBar, Icon, List, InputItem, Picker, Button } from 'antd-mobile'
import style from './style'

import { createForm } from 'rc-form'

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
            }
        }
    }
    componentDidMount() {
        document.querySelector('body').setAttribute('style', 'background:white')
        setTimeout(() => {
            this.setState({
                company: this.props.state.user.company,
                basic: {
                    financing:this.props.state.user.company_info.financing,
                    scale: this.props.state.user.company_info.scale,
                    trade: this.props.state.user.company_info.trade
                }
            })
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
                                            this.state.basic.financing+' · '+
                                            this.state.basic.scale+' · '+
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
                            <div style={style.itemContainer} onClick={() => { this.props.history.push('/edit_company_introduce') }}>
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
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
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
                                <div
                                    style={this.state.touch === 'web' ?
                                        { ...style.itemBox, ...style.bgTap } :
                                        style.itemBox}
                                    onTouchStart={() => {
                                        this.setState({
                                            touch: 'web'
                                        })
                                    }}
                                    onTouchEnd={() => {
                                        this.setState({
                                            touch: ''
                                        })
                                    }}>
                                    <div style={style.itemHeader}>
                                        <span style={style.itemTitle}>浙江华云信息科技有限公司</span>

                                        <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                    </div>
                                </div>
                                <div
                                    style={this.state.touch === 'web' ?
                                        { ...style.itemBox, ...style.bgTap } :
                                        style.itemBox}
                                    onTouchStart={() => {
                                        this.setState({
                                            touch: 'web'
                                        })
                                    }}
                                    onTouchEnd={() => {
                                        this.setState({
                                            touch: ''
                                        })
                                    }}>
                                    <div style={style.itemHeader}>
                                        <span style={style.itemTitle}>浙江华云信息科技有限公司</span>

                                        <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                    </div>
                                </div>


                            </div>

                            <div style={{ ...style.itemPadding, ...style.btnContainer }}>
                                <Button onClick={() => { this.props.history.push('/company_address') }}>添加公司地址</Button>
                                <div style={style.itemBottom}></div>
                            </div>
                        </div>
                    </div>
                    <div tag="project-exp" >
                        <div tag="innerContainer" style={style.innerContainerItem}>
                            <span style={{ fontSize: '18px', fontWeight: 'bold', ...style.itemPadding }}>公司官网</span>
                            <div style={style.itemContainer}>
                                <div
                                    style={this.state.touch === 'web' ?
                                        { ...style.itemBox, ...style.bgTap } :
                                        style.itemBox}
                                    onTouchStart={() => {
                                        this.setState({
                                            touch: 'web'
                                        })
                                    }}
                                    onTouchEnd={() => {
                                        this.setState({
                                            touch: ''
                                        })
                                    }}>
                                    <div style={style.itemHeader}>
                                        <span style={style.itemTitle}>浙江华云信息科技有限公司</span>

                                        <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                    </div>
                                </div>
                                <div
                                    style={this.state.touch === 'web' ?
                                        { ...style.itemBox, ...style.bgTap } :
                                        style.itemBox}
                                    onTouchStart={() => {
                                        this.setState({
                                            touch: 'web'
                                        })
                                    }}
                                    onTouchEnd={() => {
                                        this.setState({
                                            touch: ''
                                        })
                                    }}>
                                    <div style={style.itemHeader}>
                                        <span style={style.itemTitle}>浙江华云信息科技有限公司</span>

                                        <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                    </div>
                                </div>
                            </div>
                            <div style={{ ...style.itemPadding, ...style.btnContainer }}>
                                <Button onClick={() => { this.props.history.push('/addprojectexp') }}>添加链接</Button>
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