import React, { Component } from 'react';
import { List, InputItem, Button, Toast, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { createForm } from 'rc-form';
import { addUser } from '../../redux/actions/user-action'
import style from './style'
import {regUsername,regPassword} from '../../common/reg'
import axios from '../../api/axios'
import md5 from 'js-md5';
// import * as datatype from '../../common/datatype'
const datatype = require('../../common/datatype')

// import '../../resource/css/login.css'
const mapStateProps = (state) => {
    return { state }
}
const actionCreators = { addUser }
const RadioItem = Radio.RadioItem;

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userType: -1
        }
    }
    onChangeType = (value) => {
        this.setState({
            userType: value
        })
    }
    submit = () => {
        this.props.form.validateFields((error, values) => {
            if (values.username == null || values.username == '') {
                Toast.info('请输入用户名', 1.5)
                return
            }
            if (regUsername.test(values.username) === false) {
                Toast.info('用户名不合法', 1.5)
                return
            }
            if (values.password == null || values.password == '') {
                Toast.info('请输入密码', 1.5)
                return
            }
            if (regPassword.test(values.password) === false) {
                Toast.info('密码格式为6~16位英文、数字、下划线', 1.5)
                return
            }
            if (values.password2 == null || values.password2 == '') {
                Toast.info('请再次输入密码', 1.5)
                return
            }
            if (values.password2 !== values.password) {
                Toast.info('密码不一致', 1.5)
                return
            }
            if (this.state.userType === -1) {
                Toast.info('请选择身份', 1.5)
                return
            }
            axios.get('/user/query', {
                params: { username: values.username }
            }).then((res) => {
                if (res.data.length > 0) {
                    Toast.info('用户名已存在', 1.5)
                } else {
                    var params = {
                        user: values.username,
                        pwd: md5(values.password),
                        type: this.state.userType
                    }
                    axios.post('/user/add', params).then((res) => {

                        //执行登录操作
                        axios.post('/user/login', {
                            user: values.username,
                            pwd: md5(values.password)
                        }).then(res => {
                            if (res.data.code === 1) {
                                Toast.info(res.data.msg, 1.5)
                            } else if (res.data.code === 0) {
                                this.props.addUser(res.data.user)
                                Toast.info('注册成功', 1.5)
                                setTimeout(() => {
                                    if (this.state.userType == datatype.user('BOSS')) {
                                        this.props.history.push('/bossinfo')
                                    } else {
                                        this.props.history.push('/geniusinfo')
                                    }
                                }, 1500);
                            }
                        }).catch(err => {
                            Toast.info('未知错误')
                        })


                    }).catch((err) => {
                        Toast.info('未知错误')
                        console.log(err)
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        });
    }
    render() {
        const { getFieldProps } = this.props.form;
        const userType = [
            { value: datatype.user('牛人'), label: '牛人' },
            { value: datatype.user('BOSS'), label: 'BOSS' }
        ]
        return (
            <div>
                <img style={style.imageJob} src={require('../../resource/image/logo.png')} />
                <List style={{ marginBottom: '0.1rem' }}>
                    <InputItem
                        {...getFieldProps('username')}
                        placeholder="请输入用户名"
                    >用户名</InputItem>
                    <InputItem
                        {...getFieldProps('password')}
                        type="password"
                        placeholder="请输入密码"
                    >密码</InputItem>
                    <InputItem
                        {...getFieldProps('password2')}
                        type="password"
                        placeholder="请再次输入密码"
                    >确认密码</InputItem>
                </List>
                <List>
                    {userType.map(i => (
                        <RadioItem key={i.value} checked={this.state.userType === i.value} onClick={() => this.onChangeType(i.value)}>
                            {i.label}
                        </RadioItem>
                    ))}
                </List>
                <div style={style.btnBox}>
                    <Button type="primary" style={{ marginBottom: '0.2rem' }} onClick={this.submit}>注册</Button>
                    <Button type="default" onClick={() => this.props.history.push('/login')}>返回</Button>
                </div>
            </div>
        );
    }
}
Register = connect(mapStateProps, actionCreators)(Register)
export default createForm()(Register);