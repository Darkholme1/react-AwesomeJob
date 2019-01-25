import React, { Component } from 'react';
import { NavBar, Icon, Button, List, InputItem, Picker, Modal, Toast } from 'antd-mobile'

import { connect } from 'react-redux'
import { addWorkexp } from '@/redux/actions/workexp-action'

import commonStyle from '../../../../../style'
import { pickerJob, pickerWorkTime, pickerWorkEnd } from '../../../../../../common/picker'
import formvalidate from '@/common/formvalidate'
import { regCompany, regNickname } from '@/common/reg'
import axios from '@/api/axios'

class AddWorkExp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: 0,
            workExp: {
                company: '',
                start: '',
                end: '',
                position: '',
                department: '',
                job_content: '',
                job_performance: ''
            },
            buttonStyle: {
                display: 'block'
            }
        }
    }
    componentWillMount() {
        if (this.props.history.location.query) {
            this.props.addWorkexp(this.props.history.location.query.workExp)
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
                workExp: this.props.state.workExp
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
    submit() {
        const submit = formvalidate([
            {
                data: this.state.workExp.company,
                required: () => {
                    Toast.info('请输入公司名称', 1.5)
                },
                RegExp: {
                    value: regCompany,
                    callback: () => {
                        Toast.info('公司名称不合法', 1.5)
                    }
                }
            },
            {
                data: this.state.workExp.start,
                required: () => {
                    Toast.info('请选择工作开始时间', 1.5)
                }
            },
            {
                data: this.state.workExp.end,
                required: () => {
                    Toast.info('请选择工作结束时间', 1.5)
                }
            },
            {
                data: this.state.workExp.position,
                required: () => {
                    Toast.info('请选择职位', 1.5)
                }
            },
            {
                data: this.state.workExp.department,
                RegExp: {
                    value: regNickname,
                    callback: () => {
                        Toast.info('部门名称不合法', 1.5)
                    }
                }
            },
            {
                data: this.state.workExp.job_content,
                required: () => {
                    Toast.info('请输入工作内容', 1.5)
                }
            }
        ])
        if (submit === 1) {
            if (!this.state.isEdit) {
                axios.post('/resume/update_exp', {
                    exp: JSON.stringify(this.state.workExp),
                    is_edit: 0,
                    type: 1
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
                    exp: JSON.stringify(this.state.workExp),
                    is_edit: 1,
                    type: 1
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
                        _id: this.state.workExp._id,
                        type: 1
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
    render() {
        const Item = List.Item
        return (
            <div style={{ marginBottom: '70px' }}>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ width: '100%' }}
                    rightContent={this.state.isEdit ? <span onClick={() => { this.submit() }}>保存</span> : ''}
                >
                    工作经历
                </NavBar>
                <List>
                    <InputItem
                        clear
                        value={this.state.workExp.company}
                        placeholder="请输入公司名称"
                        onChange={v => {
                            this.setState({
                                workExp: {
                                    ...this.state.workExp,
                                    company: v
                                }
                            })
                        }}>
                        公司名称
                    </InputItem>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerWorkTime}
                        title="开始时间"
                        value={this.state.workExp.start}
                        onOk={v => this.setState({
                            workExp: {
                                ...this.state.workExp,
                                start: v
                            }
                        })}
                    >
                        <List.Item arrow="horizontal">开始时间</List.Item>
                    </Picker>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerWorkEnd}
                        title="结束时间"
                        value={this.state.workExp.end}
                        onOk={v => this.setState({
                            workExp: {
                                ...this.state.workExp,
                                end: v
                            }
                        })}
                    >
                        <List.Item arrow="horizontal">结束时间</List.Item>
                    </Picker>
                </List>
                <List style={{ marginTop: '10px' }}>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerJob}
                        title="职位"
                        value={this.state.workExp.position}
                        onOk={v => this.setState({
                            workExp: {
                                ...this.state.workExp,
                                position: v
                            }
                        })}
                    >
                        <List.Item arrow="horizontal">职位</List.Item>
                    </Picker>
                    <InputItem
                        clear
                        value={this.state.workExp.department}
                        onChange={v =>
                            this.setState({
                                workExp: {
                                    ...this.state.workExp,
                                    department: v
                                }
                            })
                        }
                        placeholder="选填">
                        所属部门
                    </InputItem>
                </List>
                <List style={{ marginTop: '10px' }}>
                    {/* <TextareaItem
                        title="工作内容"
                        placeholder="请填写工作内容(可多行输入)"
                        data-seed="logId"
                        ref={el => this.autoFocusInst = el}
                        autoHeight
                        count={300}
                    />
                    <TextareaItem
                        title="工作业绩"
                        placeholder="选填(可多行输入)"
                        data-seed="logId"
                        ref={el => this.autoFocusInst = el}
                        autoHeight
                    /> */}
                    <Item
                        extra={this.state.workExp.job_content === '' ? '请填写' : this.state.workExp.job_content}
                        arrow="horizontal"
                        onClick={() => {
                            this.props.addWorkexp(this.state.workExp)
                            if (this.state.isEdit) {
                                sessionStorage.isEdit = 1
                            }
                            this.props.history.push('/job_content')
                        }}>工作内容</Item>
                    <Item
                        extra={this.state.workExp.job_performance === '' ? '选填' : this.state.workExp.job_performance}
                        arrow="horizontal"
                        onClick={() => {
                            this.props.addWorkexp(this.state.workExp)
                            if (this.state.isEdit) {
                                sessionStorage.isEdit = 1
                            }
                            this.props.history.push('/job_performance')
                        }}>工作业绩</Item>
                </List>
                <div style={{ ...commonStyle.footerBtnContainer, ...this.state.buttonStyle }}>
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

const mapStateProps = (state) => {
    return { state }
}
const actionCreators = { addWorkexp }
AddWorkExp = connect(mapStateProps, actionCreators)(AddWorkExp)
export default AddWorkExp;