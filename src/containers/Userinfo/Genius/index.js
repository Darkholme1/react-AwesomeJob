import React, { Component } from 'react';
import { NavBar, Grid, Icon, List, InputItem, Button, Toast, Picker } from 'antd-mobile'
import { createForm } from 'rc-form'
import axios from '../../../api/axios'
import style from './style'
import {regNickname} from '../../../common/reg'
import formvalidate from '../../../common/formvalidate'
import { connect } from 'react-redux'
import { addUser } from '../../../redux/actions/user-action'
// import * as datatype from '../../../common/datatype'
import { pickerCity } from '../../../common/picker'
const datatype = require('../../../common/datatype')
// import {Link} from 'react-router-dom'

const avatarData = Array.from(new Array(15)).map((_val, i) => ({
    icon: require(`../../../resource/image/avatar/av${i}.jpg`),
    index: i,
}));
class GeniusInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarChecked: 0,
            nickname: '',
            city: '',
            isNamed: 0
            /* sex: '',
            birthValue: ['1996', '06'] */
        }

    }
    componentDidMount() {
        if (this.props.state.user._id != undefined) {
            this.setState({
                avatarChecked: this.props.state.user.avatar,
                nickname: this.props.state.user.nickname,
                city: [this.props.state.user.city],
                /* sex: [this.props.state.user.sex],
                birthValue: JSON.parse(this.props.state.user.birth) */
            })
        }
        if(this.props.state.user.nickname!=undefined){
            this.setState({
                isNamed: 1
            })
        }
    }
    onChangeAvatar(el) {
        console.log(el)
        this.setState({
            avatarChecked: el.index
        })
    }
    submit() {
        this.props.form.validateFields((error, values) => {
            const submit = formvalidate([
                {
                    data: values.nickname,
                    required: ()=>{
                        Toast.info('请输入您的姓名', 1.5)
                    },
                    RegExp: {
                        value: regNickname,
                        callback: () => {
                            Toast.info('您输入的姓名不合法', 1.5)
                        }
                    }
                },
                {
                    data: values.city,
                    required: ()=>{
                        Toast.info('请选择所在地区', 1.5)
                    }
                },
            ])
            if (submit === 1) {
                axios.post('/user/userinfo', {
                    type: datatype.user('牛人'),
                    city: values.city[0],
                    avatar: this.state.avatarChecked,
                    nickname: values.nickname,
                    /*                     sex: values.sex[0],
                                        birth: JSON.stringify(this.state.birthValue) */
                }).then((res) => {
                    if (res.data.code === 1) {
                        Toast.info('未知错误')
                    } else {
                        this.props.addUser(res.data)
                        Toast.info('保存成功', 1.5)

                        if (this.props.state.user._id !== undefined) {
                            setTimeout(() => {
                                this.props.history.push('/')
                            }, 1500);
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        })
    }
    render() {
        const { getFieldProps } = this.props.form;
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
        for (var i = 1950; i <= 2003; i++) {
            year.push({
                label: i + '',
                value: i + ''
            })
        }
        const birth = [year, month]

        return (
            <div>
                <NavBar icon={this.state.isNamed === 1 ? <Icon type="left" /> : ''}
                    onLeftClick={() => {
                        return this.state.isNamed === 1 ?
                            this.props.history.goBack() : ''
                    }}>
                    {(() => {
                        return this.state.isNamed === 1 ? '编辑资料' : '牛人信息完善'
                    })()}
                </NavBar>
                <List style={{ marginBottom: '0.1rem' }}>
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
                    <InputItem
                        clear
                        {...getFieldProps('nickname', { initialValue: this.state.nickname })}
                        placeholder="请输入您的姓名">
                        姓名
                    </InputItem>
                    <Picker data={pickerCity} cols={1} {...getFieldProps('city', { initialValue: this.state.city })}>
                        <List.Item arrow="horizontal">所在地区</List.Item>
                    </Picker>
                </List>
                {/* <List>
                    <Picker data={picker.sex} cols={1} {...getFieldProps('sex', { initialValue: this.state.sex })}>
                        <List.Item arrow="horizontal">性别</List.Item>
                    </Picker>
                </List>
                <List>
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
                </List> */}
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
GeniusInfo = connect(mapStateProps, actionCreators)(GeniusInfo)
export default createForm()(GeniusInfo);