import React, { Component } from 'react';
import { List, TextareaItem, NavBar, Icon, Button, Toast } from 'antd-mobile'

import { createForm } from 'rc-form'

import { connect } from 'react-redux'
import { updateUser } from '@/redux/actions/user-action'

import commonStyle from '../../../../../style'
import formvalidate from '@/common/formvalidate'
import axios from '@/api/axios'

class EditCompanyIntroduce extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }
    componentWillMount() {
        this.setState({
            content: this.props.location.query.introduction
        })
        console.log(this.state.content)
    }
    submit() {
        this.props.form.validateFields((error, values) => {
            const submit = formvalidate([
                {
                    data: values.content,
                    required: () => {
                        Toast.info('请输入公司介绍', 1.5)
                    }
                }
            ])
            if (submit === 1) {
                let data = {
                    introduction: values.content
                }
                axios.post('/user/company', {
                    data: JSON.stringify(data)
                }).then(res => {
                    if (res.data.code === 0) {
                        console.log(res.data.company_info)
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
    render() {
        const { getFieldProps } = this.props.form
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ position: 'fixed', width: '100%', top: '0', zIndex: '2' }}>
                    公司介绍
                </NavBar>
                <List renderHeader={() => '编辑'} style={{ marginTop: '45px' }}>
                    <TextareaItem
                        {...getFieldProps('content', {
                            initialValue: this.state.content,
                        })}
                        placeholder="..."
                        rows={6}
                        count={1000}
                        autoHeight
                    />
                </List>
                <div style={commonStyle.footerBtnContainer}>
                    <Button type="primary" style={commonStyle.footerBtn} onClick={() => { this.submit() }}>保存</Button>
                </div>
            </div>
        );
    }
}

const mapStateProps = state => {
    return { state }
}
const actionCreator = { updateUser }
EditCompanyIntroduce = connect(mapStateProps, actionCreator)(EditCompanyIntroduce)

export default createForm()(EditCompanyIntroduce);