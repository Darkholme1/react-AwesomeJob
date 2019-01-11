import React, { Component } from 'react';
import { NavBar, Icon, Button, List, InputItem, Picker, TextareaItem, Toast } from 'antd-mobile'

import { connect } from 'react-redux'
import { addWorkexp } from '@/redux/actions/workexp-action'

import commonStyle from '../../../../../style'
import { pickerJob, pickerWorkTime } from '../../../../../../common/picker'
import formvalidate from '@/common/formvalidate'
import { regCompany, regNickname } from '@/common/reg'

class AddWorkExp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            workExp: {
                company: '',
                startWork: '',
                endWork: '',
                jobName: '',
                department: '',
                jobContent: '',
                jobPerformance: ''
            }
        }
    }
    componentWillMount() {
        this.setState({
            workExp: this.props.state.workExp
        })
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
                data: this.state.workExp.startWork,
                required: () => {
                    Toast.info('请选择工作开始时间', 1.5)
                }
            },
            {
                data: this.state.workExp.endWork,
                required: () => {
                    Toast.info('请选择工作结束时间', 1.5)
                }
            },
            {
                data: this.state.workExp.jobName,
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
                data: this.state.workExp.jobContent,
                required: () => {
                    Toast.info('请输入工作内容', 1.5)
                }
            }
        ])
        if(submit===1){
            
        }
    }
    render() {
        const Item = List.Item
        return (
            <div style={{ marginBottom: '70px' }}>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ width: '100%' }}
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
                        value={this.state.workExp.startWork}
                        onOk={v => this.setState({
                            workExp: {
                                ...this.state.workExp,
                                startWork: v
                            }
                        })}
                    >
                        <List.Item arrow="horizontal">开始时间</List.Item>
                    </Picker>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerWorkTime}
                        title="结束时间"
                        value={this.state.workExp.endWork}
                        onOk={v => this.setState({
                            workExp: {
                                ...this.state.workExp,
                                endWork: v
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
                        value={this.state.workExp.jobName}
                        onOk={v => this.setState({
                            workExp: {
                                ...this.state.workExp,
                                jobName: v
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
                        extra={this.state.workExp.jobContent === '' ? '请填写' : this.state.workExp.jobContent}
                        arrow="horizontal"
                        onClick={() => {
                            this.props.addWorkexp(this.state.workExp)
                            this.props.history.push('/job_content')
                        }}>工作内容</Item>
                    <Item
                        extra={this.state.workExp.jobPerformance === '' ? '选填' : this.state.workExp.jobPerformance}
                        arrow="horizontal"
                        onClick={() => {
                            this.props.history.push('/job_performance')
                        }}>工作业绩</Item>
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
const actionCreators = { addWorkexp }
AddWorkExp = connect(mapStateProps, actionCreators)(AddWorkExp)
export default AddWorkExp;