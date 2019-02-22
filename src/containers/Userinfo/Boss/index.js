import React, { Component } from 'react';
import { NavBar, Grid, Icon, List, InputItem, Button, Toast, Picker } from 'antd-mobile'
import { createForm } from 'rc-form'
import axios from '../../../api/axios'
import style from './style'
import {regNickname,regCompany} from '../../../common/reg'
import formvalidate from '../../../common/formvalidate'
import { connect } from 'react-redux'
import { addUser } from '../../../redux/actions/user-action'
import {pickerCity} from '@/common/picker'
// import * as datatype from '../../../common/datatype'
const datatype = require('../../../common/datatype')
const avatarData = Array.from(new Array(15)).map((_val, i) => ({
    icon: require(`../../../resource/image/avatar/av${i}.jpg`),
    index: i,
}));
class BossInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isNamed: 0,
            avatarChecked: 0,
            city: [],
            nickname: '',
            position: '',
            company: '',
            address: ''
        }
    }
    componentDidMount() {
        if (this.props.state.user._id != undefined) {
            this.setState({
                avatarChecked: this.props.state.user.avatar,
                nickname: this.props.state.user.nickname,
                city: [this.props.state.user.city],
                position: this.props.state.user.position,
                company: this.props.state.user.company,
                // address: this.props.state.user.address
            })
        }
        if (this.props.state.user.nickname != undefined) {
            this.setState({
                isNamed: 1
            })
        }
    }
    onChangeAvatar(el) {
        this.setState({
            avatarChecked: el.index
        })
    }
    submit() {
        this.props.form.validateFields((error, values) => {
            const submit = formvalidate([
                {
                    data: values.city,
                    required: ()=>{
                        Toast.info('请选择所在地区', 1.5)
                    }
                },
                {
                    data: values.nickname,
                    required: ()=>{
                        Toast.info('请输入您的称呼', 1.5)
                    },
                    RegExp:{
                        value: regNickname,
                        callback: () => {
                            Toast.info('您输入的称呼不合法', 1.5)
                        }
                    }
                },
                {
                    data: values.position,
                    required: ()=>{
                        Toast.info('请输入您的职位', 1.5)
                    },
                    RegExp: {
                        value: regNickname,
                        callback: () => {
                            Toast.info('您输入的职位不合法', 1.5)
                        }
                    }
                },
                {
                    data: values.company,
                    required: ()=>{
                        Toast.info('请输入公司名称', 1.5)
                    },
                    RegExp: {
                        value: regCompany,
                        callback: () => {
                            Toast.info('您输入的公司名称不合法', 1.5)
                        }
                    }
                },
            ])
            if (submit === 1) {
                axios.post('/user/userinfo', {
                    type: datatype.user('BOSS'),
                    city: values.city[0],
                    avatar: this.state.avatarChecked,
                    nickname: values.nickname,
                    position: values.position,
                    company: values.company,
                    address: values.address
                }).then((res) => {
                    if (res.data.code === 1) {
                        Toast.info('未知错误')
                    } else {
                        this.props.addUser(res.data)
                        Toast.info('保存成功', 1.5)
                        setTimeout(() => {
                            this.props.history.push('/')
                        }, 1500);
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        })
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <NavBar
                    icon={this.state.isNamed === 1 ? <Icon type="left" /> : ''}
                    onLeftClick={() => {
                        return this.state.isNamed === 1 ?
                            this.props.history.goBack() : ''
                    }}>
                    {(() => {
                        return this.state.isNamed === 1 ? '编辑资料' : 'BOSS信息完善'
                    })()}
                </NavBar>
                <List style={{ marginBottom: '10px' }}>
                    <InputItem disabled>
                        <span style={{ color: 'black' }}>头像选择</span>
                    </InputItem>
                    <Grid
                        onClick={(el) => this.onChangeAvatar(el)}
                        data={avatarData}
                        columnNum={5}
                        hasLine={false}
                        renderItem={(dataItem, index) => (
                            <div style={style.avatarBox}>
                                <img src={dataItem.icon} style={style.avatar} alt="" />
                                {
                                    index == this.state.avatarChecked ? <Icon type={'check-circle'} style={style.checkCircle} /> : ''
                                }
                            </div>
                        )} />

                </List>
                <List>
                    <Picker data={pickerCity} cols={1} {...getFieldProps('city', { initialValue: this.state.city })}>
                        <List.Item arrow="horizontal">所在地区</List.Item>
                    </Picker>

                    <InputItem
                        clear
                        {...getFieldProps('nickname', { initialValue: this.state.nickname })}
                        placeholder="您的称呼将被求职者看到">
                        称呼
                    </InputItem>
                    <InputItem
                        clear
                        {...getFieldProps('position', { initialValue: this.state.position })}
                        placeholder="如(人事、HR、CEO)等">
                        您的职位
                    </InputItem>
                    <InputItem
                        clear
                        {...getFieldProps('company', { initialValue: this.state.company })}
                        placeholder="请输入公司名称">
                        所在公司
                    </InputItem>
                    {/* <InputItem
                        clear
                        {...getFieldProps('address', { initialValue: this.state.address })}
                        placeholder="请输入公司地址">
                        公司地址
                    </InputItem> */}
                </List>
                <div style={{ padding: "0 0.3rem", marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                    <Button type="primary" onClick={() => this.submit()}>保存</Button>
                </div>
            </div>
        );
    }
}
const mapStateProps = (state) => {
    return { state }
}
const actionCreators = { addUser }
BossInfo = connect(mapStateProps, actionCreators)(BossInfo)
export default createForm()(BossInfo);