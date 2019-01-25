import React, { Component } from 'react';
import { NavBar, Icon, Button, List, InputItem, Picker } from 'antd-mobile'

import { pickerSalary, pickerCity, pickerWorkExp, pickerEduBg } from '@/common/picker'
import formvalidate from '@/common/formvalidate'
import axios from '@/api/axios'

class AddJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: 0,
            job: {
                jobName: '',
                salary: '',
                city: '',
                workExp: '',
                education: '',
                detail: ''
            }
        }
    }
    render() {
        const Item = List.Item
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ position: 'fixed', width: '100%', top: '0', zIndex: '2' }}
                    rightContent={<span>预览</span>}
                >
                    添加职位
                </NavBar>
                <List style={{ marginTop: '45px' }}>
                    <InputItem
                        clear
                        placeholder="请输入职位名称"
                        value={this.state.job.jobName}
                        onChange={v => {
                            this.setState({
                                job: {
                                    ...this.state.job,
                                    jobName: v
                                }
                            })
                        }}
                    >职位名称</InputItem>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerSalary}
                        title="期望薪资(月薪)"
                        value={this.state.job.salary}
                        onOk={v => this.setState({
                            job: {
                                ...this.state.job,
                                salary: v
                            }
                        })}>
                        <List.Item arrow="horizontal">薪资范围</List.Item>
                    </Picker>
                    <Picker
                        data={pickerWorkExp}
                        cols={1}
                        value={this.state.workExp}
                        onOk={v => this.setState({
                            job: {
                                ...this.state.job,
                                workExp: v
                            }
                        })}>
                        <List.Item arrow="horizontal">经验要求</List.Item>
                    </Picker>
                    <Picker
                        data={pickerEduBg}
                        cols={1}
                        value={this.state.education}
                        onOk={v => this.setState({
                            job: {
                                ...this.state.job,
                                education: v
                            }
                        })}>
                        <List.Item arrow="horizontal">学历要求</List.Item>
                    </Picker>
                    {/* 在已有的公司地址中选择 */}
                    <Picker
                        data={pickerCity}
                        cols={1}
                        value={this.state.city}
                        onOk={v => this.setState({
                            job: {
                                ...this.state.job,
                                city: v
                            }
                        })}>
                        <List.Item arrow="horizontal">工作地点</List.Item>
                    </Picker>
                </List>
                <List style={{ marginTop: '10px' }}>
                    <Item
                        extra={this.state.job.detail === '' ? '请填写' : this.state.job.detail}
                        arrow="horizontal"
                        onClick={() => {
                            // this.props.addWorkexp(this.state.workExp)
                            if (this.state.isEdit) {
                                sessionStorage.isEdit = 1
                            }
                            this.props.history.push('/job_content')
                        }}>职位详情</Item>
                </List>
            </div>
        );
    }
}

export default AddJob;