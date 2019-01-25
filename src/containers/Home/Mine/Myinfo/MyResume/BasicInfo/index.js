import React, { Component } from 'react';
import { NavBar, Icon, List, InputItem, Picker, Button, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import { connect } from 'react-redux'
import { updateUser } from '@/redux/actions/user-action'
// import axios from '../../../../../../api/axios'
import axios from '@/api/axios'
import formvalidate from '@/common/formvalidate'
import { regNickname, regMobile, regEmail } from '@/common/reg'

import commonStyle from '../../../../../style'

class BasicInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nickname: props.state.user.nickname,
            sex: [1],
            birthValue: null,
            startWork: null,
            mobile: '',
            email: ''
        }
        
    }
    componentWillMount() {
        if (this.props.location.query.basic_info) {
            let basic_info = this.props.location.query.basic_info
            this.setState({
                sex: [basic_info.sex],
                birthValue: basic_info.birth,
                startWork: basic_info.start_work,
                mobile: basic_info.mobile,
                email: basic_info.email
            })
        }
    }
    submit() {
        this.props.form.validateFields((error, values) => {
            const submit = formvalidate([
                {
                    data: values.nickname,
                    required: () => {
                        Toast.info('请输入姓名', 1.5)
                    },
                    RegExp: {
                        value: regNickname,
                        callback: () => {
                            Toast.info('姓名不合法', 1.5)
                        }
                    }
                },
                {
                    data: values.mobile,
                    required: () => {
                        Toast.info('请输入手机号', 1.5)
                    },
                    RegExp: {
                        value: regMobile,
                        callback: () => {
                            Toast.info('请输入正确的手机号', 1.5)
                        }
                    }
                },
                {
                    data: values.email,
                    required: () => {
                        Toast.info('请输入邮箱', 1.5)
                    },
                    RegExp: {
                        value: regEmail,
                        callback: () => {
                            Toast.info('请输入正确的邮箱', 1.5)
                        }
                    }
                },
                {
                    data: this.state.birthValue,
                    required: () => {
                        Toast.info('请选择出生日期', 1.5)
                    }
                },
                {
                    data: this.state.startWork,
                    required: () => {
                        Toast.info('请选择工作时间', 1.5)
                    }
                }
            ])
            if (submit === 1) {
                let basic_info = {
                    nickname: values.nickname,
                    mobile: values.mobile,
                    email: values.email,
                    sex: this.state.sex[0],
                    birth: JSON.stringify(this.state.birthValue),
                    start_work: JSON.stringify(this.state.startWork)
                }
                if (values.nickname === this.props.state.user.nickname) {
                    delete basic_info.nickname
                }
                axios.post('/resume/basicinfo', {
                    ...basic_info
                }).then((res) => {
                    //如果有改动姓名，更新redux中的nickname
                    if (res.data.nickname) {
                        this.props.updateUser({
                            nickname: res.data.nickname
                        })
                    }
                    if (res.data.code === 0) {
                        Toast.info('保存成功', 1.5)
                        setTimeout(() => {
                            this.props.history.goBack()
                        }, 1500);
                    }
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            }
        })
    }
    render() {
        const { getFieldProps } = this.props.form;
        //picker-sex
        const sex = [
            {
                label: '男',
                value: 1
            },
            {
                label: '女',
                value: 0
            }
        ]
        //picker-birthday
        let year = []
        let month = []
        for (var i = 1; i <= 12; i++) {
            if (i < 10) {
                month.push({
                    label: '0' + i,
                    value: '0' + i
                })
            } else {
                month.push({
                    label: i + '',
                    value: i + ''
                })
            }
        }
        let currentYear = new Date().getFullYear()
        var start = currentYear - 68
        var end = currentYear - 15
        for (var i = end; i >= start; i--) {
            year.push({
                label: i + '',
                value: i + ''
            })
        }
        const birth = [year, month]
        //picker-参加工作时间
        let startWork = [
            {
                label: '应届生',
                value: '0'
            }
        ]
        for (var i = currentYear - 1; i >= 1990; i--) {
            startWork.push({
                label: i + '',
                value: i + '',
                children: month
            })
        }
        startWork.push({
            label: '1990以前',
            value: '1'
        })

        return (
            <div style={{ marginTop: '45px' }}>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ position: 'fixed', width: '100%', top: '0', zIndex: '1' }}
                >
                    个人信息
                </NavBar>
                <List>
                    <InputItem
                        clear
                        {...getFieldProps('nickname', { initialValue: this.state.nickname })}
                        placeholder="请输入您的姓名">
                        姓名
                    </InputItem>
                    <InputItem
                        type='number'
                        clear
                        {...getFieldProps('mobile', { initialValue: this.state.mobile })}
                        placeholder="请输入手机号">
                        手机号
                    </InputItem>
                    <InputItem
                        clear
                        {...getFieldProps('email', { initialValue: this.state.email })}
                        placeholder="请输入邮箱">
                        邮箱
                    </InputItem>
                    <Picker
                        data={sex}
                        cols={1}
                        value={this.state.sex}
                        onOk={v => this.setState({ sex: v })}>
                        <List.Item arrow="horizontal">性别</List.Item>
                    </Picker>
                    <Picker
                        data={birth}
                        title="出生年月"
                        cascade={false}
                        extra="请选择"
                        value={this.state.birthValue}
                        onOk={v => this.setState({ birthValue: v })}
                    >
                        <List.Item arrow="horizontal">出生年月</List.Item>
                    </Picker>
                    <Picker extra="请选择"
                        cols={2}
                        data={startWork}
                        value={this.state.startWork}
                        title="参加工作时间"
                        onOk={v => this.setState({ startWork: v })}
                    >
                        <List.Item arrow="horizontal">参加工作时间</List.Item>
                    </Picker>

                </List>
                <div style={commonStyle.footerBtnContainer}>
                    <Button type="primary" style={commonStyle.footerBtn} onClick={() => { this.submit() }}>保存</Button>
                </div>
            </div>
        );
    }
}
const mapStateProps = (state) => {
    return { state }
}
const actionCreators = { updateUser }
BasicInfo = connect(mapStateProps, actionCreators)(BasicInfo)
export default createForm()(BasicInfo);