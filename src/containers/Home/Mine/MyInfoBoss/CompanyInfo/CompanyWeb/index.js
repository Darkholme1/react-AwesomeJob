import React, { Component } from 'react';
import { List, NavBar, Icon, Button, InputItem, Toast, Modal } from 'antd-mobile'

import { connect } from 'react-redux'
import { updateUser } from '@/redux/actions/user-action'

import commonStyle from '../../../../../style'
import formvalidate from '@/common/formvalidate'
import axios from '@/api/axios'

const alert = Modal.alert
class CompanyWeb extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: undefined,
            content: ''
        }
    }
    componentWillMount() {
        if (this.props.location.query && this.props.location.query.index !== undefined) {
            this.setState({
                index: this.props.location.query.index,
                content: this.props.location.query.web[this.props.location.query.index]
            })
        }
    }
    submit(isDel) {
        if (isDel) {
            alert('删除', '真的要删除吗?', [
                {
                    text: '取消'
                },
                {
                    text: '确认', onPress: () => {
                        let web = this.props.location.query.web
                        web.splice(this.state.index, 1)
                        let data = {
                            web: web
                        }
                        axios.post('/user/company', {
                            data: JSON.stringify(data)
                        }).then(res => {
                            if (res.data.code === 0) {
                                this.props.updateUser({
                                    company_info: res.data.company_info
                                })
                                Toast.info('删除成功', 1.5, () => {
                                    this.props.history.goBack()
                                })
                            } else {
                                Toast.info('未知错误', 1.5)
                            }
                        }).catch(err => {
                            Toast.info('未知错误', 1.5)
                            console.log(err)
                        })
                    }
                },
            ])
        } else {
            const submit = formvalidate([
                {
                    data: this.state.content,
                    required: () => {
                        Toast.info('请输入官网链接', 1.5)
                    }
                }
            ])
            if (submit === 1) {
                let web = this.props.location.query.web
                if (this.state.index === undefined) {
                    web.push(this.state.content)
                } else {
                    web[this.state.index] = this.state.content
                }
                let data = {
                    web: web
                }
                axios.post('/user/company', {
                    data: JSON.stringify(data)
                }).then(res => {
                    if (res.data.code === 0) {
                        this.props.updateUser({
                            company_info: res.data.company_info
                        })
                        Toast.info('保存成功', 1.5, () => {
                            this.props.history.goBack()
                        })
                    } else {
                        Toast.info('未知错误', 1.5)
                    }
                }).catch(err => {
                    Toast.info('未知错误', 1.5)
                    console.log(err)
                })
            }
        }
    }
    render() {
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ position: 'fixed', width: '100%', top: '0', zIndex: '2' }}
                    rightContent={this.state.index === undefined ? '' :
                        <span onClick={() => { this.submit() }}>保存</span>}>
                    公司官网
                </NavBar>
                <List renderHeader={() => '链接'} style={{ marginTop: '45px' }}>
                    <InputItem
                        value={this.state.content}
                        onChange={v => {
                            this.setState({
                                content: v
                            })
                        }}
                    />
                </List>
                <div style={commonStyle.footerBtnContainer}>

                    {(() => {
                        return this.state.index === undefined ?
                            <Button type="primary" style={commonStyle.footerBtn} onClick={() => { this.submit() }}>保存</Button> :
                            <Button type="warning" style={commonStyle.footerBtn} onClick={() => { this.submit(1) }}>删除本条</Button>
                    })()}
                </div>
            </div>
        );
    }
}

const mapStateProps = state => {
    return { state }
}
const actionCreator = { updateUser }
CompanyWeb = connect(mapStateProps, actionCreator)(CompanyWeb)

export default CompanyWeb;