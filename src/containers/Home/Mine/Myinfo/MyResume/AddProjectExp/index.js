import React, { Component } from 'react';
import { NavBar, Icon, Button, List, InputItem, Picker, Toast, Modal } from 'antd-mobile'

import { connect } from 'react-redux'
import { addProjectExp } from '@/redux/actions/projectexp-action'

import commonStyle from '../../../../../style'
import { pickerWorkTime, pickerWorkEnd } from '../../../../../../common/picker'

import formvalidate from '@/common/formvalidate'
import axios from '@/api/axios'

class AddProjectExp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: 0,
            projectExp: {
                project_name: '',
                charactor: '',
                start: '',
                end: '',
                project_content: '',
                project_performance: '',
                link: ''
            },
            buttonStyle: {
                display: 'block'
            }
        }
    }
    componentWillMount() {
        if (this.props.history.location.query) {
            this.props.addProjectExp(this.props.history.location.query.projectExp)
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
                projectExp: this.props.state.projectExp
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
                data: this.state.projectExp.project_name,
                required: () => {
                    Toast.info('请输入项目名称', 1.5)
                }
            },
            {
                data: this.state.projectExp.charactor,
                required: () => {
                    Toast.info('请输入角色', 1.5)
                }
            },
            {
                data: this.state.projectExp.start,
                required: () => {
                    Toast.info('请选择开始时间', 1.5)
                }
            },
            {
                data: this.state.projectExp.end,
                required: () => {
                    Toast.info('请选择结束时间', 1.5)
                }
            },
            {
                data: this.state.projectExp.project_content,
                required: () => {
                    Toast.info('请填写项目描述')
                }
            }
        ])
        if (submit === 1) {
            if (!this.state.isEdit) {
                // console.log(this.state.workExp)
                axios.post('/user/resume/update_exp', {
                    exp: JSON.stringify(this.state.projectExp),
                    is_edit: 0,
                    type: 2
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
                axios.post('/user/resume/update_exp', {
                    exp: JSON.stringify(this.state.projectExp),
                    is_edit: 1,
                    type: 2
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
                    axios.post('/user/resume/delete_exp', {
                        _id: this.state.projectExp._id,
                        type: 2
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
                    项目经历
                </NavBar>
                <List>
                    <InputItem
                        clear
                        placeholder="请输入项目名称"
                        value={this.state.projectExp.project_name}
                        onChange={v => {
                            this.setState({
                                projectExp: {
                                    ...this.state.projectExp,
                                    project_name: v
                                }
                            })
                        }}>
                        项目名称
                    </InputItem>
                    <InputItem
                        clear
                        placeholder="请输入担任角色"
                        value={this.state.projectExp.charactor}
                        onChange={v => {
                            this.setState({
                                projectExp: {
                                    ...this.state.projectExp,
                                    charactor: v
                                }
                            })
                        }}>
                        担任角色
                    </InputItem>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerWorkTime}
                        title="开始时间"
                        value={this.state.projectExp.start}
                        onOk={v => {
                            this.setState({
                                projectExp: {
                                    ...this.state.projectExp,
                                    start: v
                                }
                            })
                        }}
                    >
                        <List.Item arrow="horizontal">开始时间</List.Item>
                    </Picker>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerWorkEnd}
                        title="结束时间"
                        value={this.state.projectExp.end}
                        onOk={v => {
                            this.setState({
                                projectExp: {
                                    ...this.state.projectExp,
                                    end: v
                                }
                            })
                        }}
                    >
                        <List.Item arrow="horizontal">结束时间</List.Item>
                    </Picker>
                </List>
                <List style={{ marginTop: '10px' }}>
                    <Item
                        extra={this.state.projectExp.project_content == '' ? '请填写' : this.state.projectExp.project_content}
                        arrow="horizontal"
                        onClick={() => {
                            this.props.addProjectExp(this.state.projectExp)
                            if (this.state.isEdit) {
                                sessionStorage.isEdit = 1
                            }
                            this.props.history.push('/project_content')
                        }}>项目描述</Item>
                    <Item
                        extra={this.state.projectExp.project_performance == '' ? '选填' : this.state.projectExp.project_performance}
                        arrow="horizontal"
                        onClick={() => {
                            this.props.addProjectExp(this.state.projectExp)
                            if (this.state.isEdit) {
                                sessionStorage.isEdit = 1
                            }
                            this.props.history.push('/project_performance')
                        }}>项目业绩</Item>
                    <InputItem
                        placeholder="选填"
                        value={this.state.projectExp.link}
                        onChange={v => {
                            this.setState({
                                projectExp: {
                                    ...this.state.projectExp,
                                    link: v
                                }
                            })
                        }}>
                        项目链接
                    </InputItem>
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
const actionCreators = { addProjectExp }
AddProjectExp = connect(mapStateProps, actionCreators)(AddProjectExp)
export default AddProjectExp;