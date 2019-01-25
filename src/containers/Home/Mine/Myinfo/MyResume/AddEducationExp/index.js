import React, { Component } from 'react';
import { NavBar, Icon, Button, List, InputItem, Picker, Toast, Modal } from 'antd-mobile'

import { connect } from 'react-redux'
import { addEduExp } from '@/redux/actions/eduexp-action'

import commonStyle from '../../../../../style'
import { pickerEduTime, pickerEduBg } from '../../../../../../common/picker'
import axios from '@/api/axios'
import formvalidate from '@/common/formvalidate'

class AddEducationExp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: 0,
            eduExp: {
                edu_bg: '',
                school: '',
                major: '',
                edu_time: '',
                school_exp: ''
            },
            buttonStyle: {
                display: 'block'
            }
        }
    }
    componentWillMount() {
        if (this.props.history.location.query) {
            this.props.addEduExp(this.props.history.location.query.eduExp)
            this.setState({
                isEdit: 1
            })
        }
        if (sessionStorage.isEdit) {
            this.setState({
                isEdit: 1
            })
        }
        setTimeout(() => {
            this.setState({
                eduExp: this.props.state.eduExp
            })
        }, 0);
    }
    componentDidMount() {
        setTimeout(() => {
            if (sessionStorage.mSystem == 1) {
                let initHeight = window.innerHeight
                window.onresize = () => {
                    if (window.innerHeight == initHeight) {
                        this.buttonShow()
                    } else if (window.innerHeight < initHeight) {
                        this.buttonHide()
                    }
                }
            } else if (sessionStorage.mSystem == 0) {
                document.addEventListener('focusin', () => {
                    this.buttonHide()
                })
                document.addEventListener('focusout', () => {
                    this.buttonShow()
                })
            }
        }, 500);
    }
    componentWillUnmount() {
        if (sessionStorage.mSystem == 1) {
            window.onreset = ''
        } else if (sessionStorage.mSystem == 0) {
            document.removeEventListener('focusin', () => {
                this.buttonHide()
            })
            document.removeEventListener('focusout', () => {
                this.buttonShow()
            })
        }
    }
    buttonHide() {
        this.setState({
            buttonStyle: {
                display: 'none'
            }
        })
    }
    buttonShow() {
        this.setState({
            buttonStyle: {
                display: 'block'
            }
        })
    }
    submit() {
        const submit = formvalidate([
            {
                data: this.state.eduExp.edu_bg,
                required: () => {
                    Toast.info('请选择学历', 1.5)
                }
            },
            {
                data: this.state.eduExp.school,
                required: () => {
                    Toast.info('请输入学校名称', 1.5)
                }
            },
            {
                data: this.state.eduExp.major,
                required: () => {
                    Toast.info('请输入专业名称', 1.5)
                }
            },
            {
                data: this.state.eduExp.edu_time,
                required: () => {
                    Toast.info('请选择在校时间', 1.5)
                }
            }
        ])
        if (submit === 1) {
            if (!this.state.isEdit) {
                axios.post('/resume/update_exp', {
                    exp: JSON.stringify(this.state.eduExp),
                    is_edit: 0,
                    type: 3
                }).then(res => {
                    // console.log(res)
                    if (res.data.code === 0) {
                        Toast.info("添加成功", 1.5, () => {
                            this.props.history.goBack()
                        })
                    }
                }).catch(err => {
                    Toast.info('未知错误', 1.5)
                    console.log(err)
                })
            } else {
                axios.post('/resume/update_exp', {
                    exp: JSON.stringify(this.state.eduExp),
                    is_edit: 1,
                    type: 3
                }).then(res => {
                    // console.log(res)
                    if (res.data.code === 0) {
                        Toast.info("保存成功", 1.5)
                        setTimeout(() => {
                            this.props.history.goBack()
                        }, 1500);
                    }
                }).catch(err => {
                    Toast.info('未知错误', 1.5)
                    console.log(err)
                })
            }
        }
    }
    delete() {

        Modal.alert('删除', '真的要删除吗？', [
            { text: '取消', onPress: () => { } },
            {
                text: '确认', onPress: () => {
                    axios.post('/resume/delete_exp', {
                        _id: this.state.eduExp._id,
                        type: 3
                    }).then(res => {
                        console.log(res)
                        if (res.data.code === 0) {
                            Toast.info('删除成功', 1.5, () => {
                                this.props.history.goBack()
                            })
                        }
                    }).catch(err => {
                        Toast.info('未知错误', 1.5)
                    })
                }
            },
        ])
    }
    render() {
        const Item = List.Item
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ width: '100%' }}
                    rightContent={this.state.isEdit ? <span onClick={() => { this.submit() }}>保存</span> : ''}
                >
                    教育经历
                </NavBar>
                <List style={{ marginBottom: '10px' }}>
                    <Picker extra="请选择"
                        cols={1}
                        data={pickerEduBg}
                        title="学历"
                        value={this.state.eduExp.edu_bg}
                        onOk={v => {
                            this.setState({
                                eduExp: {
                                    ...this.state.eduExp,
                                    edu_bg: v
                                }
                            })
                        }}>
                        <List.Item arrow="horizontal">学历</List.Item>
                    </Picker>
                </List>
                <List>
                    <InputItem
                        clear
                        value={this.state.eduExp.school}
                        onChange={v => {
                            this.setState({
                                eduExp: {
                                    ...this.state.eduExp,
                                    school: v
                                }
                            })
                        }}
                        placeholder="请输入学校名称">
                        学校
                    </InputItem>
                    <InputItem
                        clear
                        value={this.state.eduExp.major}
                        onChange={v => {
                            this.setState({
                                eduExp: {
                                    ...this.state.eduExp,
                                    major: v
                                }
                            })
                        }}
                        placeholder="请输入专业名称">
                        专业
                    </InputItem>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerEduTime}
                        title="时间段"
                        value={this.state.eduExp.edu_time}
                        onOk={v => {
                            this.setState({
                                eduExp: {
                                    ...this.state.eduExp,
                                    edu_time: v
                                }
                            })
                        }}
                    >
                        <List.Item arrow="horizontal">时间段</List.Item>
                    </Picker>
                </List>
                <List style={{ marginTop: '10px' }}>
                    <Item
                        extra={this.state.eduExp.school_exp === '' ? '选填' : this.state.eduExp.school_exp}
                        arrow="horizontal"
                        onClick={() => {
                            this.props.addEduExp(this.state.eduExp)
                            if (this.state.isEdit) {
                                sessionStorage.isEdit = 1
                            }
                            this.props.history.push('/school_exp')
                        }}>在校经历</Item>
                </List>
                <div style={{...commonStyle.footerBtnContainer,...this.state.buttonStyle}}>
                    {
                        (() => {
                            return this.state.isEdit ?
                                <Button type="warning" style={commonStyle.footerBtn} onClick={() => { this.delete() }}>删除本条</Button> :
                                <Button type="primary" style={commonStyle.footerBtn} onClick={() => { this.submit() }}>保存</Button>
                        })()
                    }
                </div>
            </div>
        );
    }
}

const mapStateProps = state => {
    return { state }
}
const actionCreator = { addEduExp }
AddEducationExp = connect(mapStateProps, actionCreator)(AddEducationExp)
export default AddEducationExp;