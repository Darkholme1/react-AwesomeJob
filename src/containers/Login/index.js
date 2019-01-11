import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { InputItem, Button, Toast, List } from 'antd-mobile'
import { createForm } from 'rc-form';
import { addUser } from '../../redux/actions/user-action'
import style from './style'
import axios from '../../api/axios'
import md5 from 'js-md5'
// import '../../resource/css/login.css'

const mapStateProps = (state) => {
    return { state }
}
const actionCreators = { addUser }
class Login extends Component {
    constructor(props) {
        super(props)
    }
    submit = () => {
        this.props.form.validateFields((error, values) => {
            if (values.username == null || values.username == '') {
                Toast.info('请输入用户名', 1.5)
                return
            }
            if (values.password == null || values.password == '') {
                Toast.info('请输入密码', 1.5)
                return
            }
            //检查用户名
            axios.get('/user/query', {
                params: { username: values.username }
            }).then((res) => {
                if (res.data.length === 0) {
                    Toast.info('用户名不存在', 1.5)
                } else {
                    /* if(res.data[0].pwd!==md5(values.password)){
                        Toast.info('密码错误',1.5)
                    }else{
                        Toast.info('登录成功',1.5)
                        setTimeout(() => {
                          this.props.history.push('/')  
                        }, 1500);
                    } */
                    //登录操作
                    axios.post('/user/login', {
                        user: values.username,
                        pwd: md5(values.password)
                    }).then(res => {
                        if (res.data.code === 1) {
                            Toast.info(res.data.msg, 1.5)
                        } else if (res.data.code === 0) {
                            this.props.addUser(res.data.user)
                            Toast.info(res.data.msg, 1.5)
                            setTimeout(() => {
                                this.props.history.push('/')
                            }, 1500);
                        }
                    }).catch(err => {
                        Toast.info('未知错误')
                    })
                }
            }).catch((err) => {
                Toast.info('未知错误', 1.5)
            })
        });
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <img style={style.imageJob} src={require('../../resource/image/logo.png')} />
                <List>
                    <InputItem
                        {...getFieldProps('username')}
                        placeholder="请输入用户名">用户名</InputItem>
                    <InputItem
                        {...getFieldProps('password')}
                        type="password"
                        placeholder="请输入密码">密码</InputItem>
                </List>
                <div style={style.btnBox}>
                    <Button type="primary" style={{ marginBottom: '0.2rem' }} onClick={this.submit}>登录</Button>
                    <Button type="default" onClick={() => this.props.history.push('/register')}>注册</Button>
                </div>
            </div>
        );
    }
}
Login = connect(mapStateProps, actionCreators)(Login)
export default createForm()(Login);