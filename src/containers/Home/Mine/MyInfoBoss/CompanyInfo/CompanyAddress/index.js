import React, { Component } from 'react';
import { List, NavBar, Icon, Button, TextareaItem, Toast, Modal } from 'antd-mobile'

import { createForm } from 'rc-form'

import { connect } from 'react-redux'
import { updateUser } from '@/redux/actions/user-action'

import commonStyle from '../../../../../style'
import formvalidate from '@/common/formvalidate'
import axios from '@/api/axios'

const alert = Modal.alert
class CompanyAddress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }
    componentWillMount() {
        if (this.props.location.query.index !== undefined) {
            this.setState({
                content: this.props.location.query.address[this.props.location.query.index]
            })
        }
    }
    submit() {
        this.props.form.validateFields((error, values) => {
            const submit = formvalidate([
                {
                    data: values.content,
                    required: () => {
                        Toast.info('请输入公司地址', 1.5)
                    }
                }
            ])
            if (submit === 1) {
                let address = this.props.location.query.address
                if (this.props.location.query.index === undefined) {
                    address.push(values.content)
                } else {
                    address[this.props.location.query.index] = values.content
                }
                let data = {
                    address: address
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
        });
    }
    delete() {

        alert('删除', '真的要删除吗?', [
            {
                text: '取消'
            },
            {
                text: '确认', onPress: () => {
                    let address = this.props.location.query.address
                    /* address = address.filter((current,index,arr)=>{
                        return index!==this.props.location.query.index
                    }) */
                    address.splice(this.props.location.query.index, 1)
                    let data = {
                        address: address
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
    }
    render() {
        const { getFieldProps } = this.props.form

        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ position: 'fixed', width: '100%', top: '0', zIndex: '2' }}
                    rightContent={this.props.location.query.index === undefined ? '' :
                        <span onClick={() => { this.submit() }}>保存</span>}>
                    公司地址
                </NavBar>
                <List renderHeader={() => '添加地址'} style={{ marginTop: '45px' }}>
                    <TextareaItem
                        {...getFieldProps('content', {
                            initialValue: this.state.content,
                        })}
                        rows={3}
                    />
                </List>
                <div style={commonStyle.footerBtnContainer}>

                    {(() => {
                        return this.props.location.query.index === undefined ?
                            <Button type="primary" style={commonStyle.footerBtn} onClick={() => { this.submit() }}>保存</Button> :
                            <Button type="warning" style={commonStyle.footerBtn} onClick={() => { this.delete() }}>删除本条</Button>
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
CompanyAddress = connect(mapStateProps, actionCreator)(CompanyAddress)

export default createForm()(CompanyAddress);