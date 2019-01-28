import React, { Component } from 'react';
import { NavBar, Icon, Button, List, InputItem, Picker } from 'antd-mobile'

import { connect } from 'react-redux'

import { pickerSalary, pickerCity, pickerWorkExp, pickerEduBg } from '@/common/picker'
import formvalidate from '@/common/formvalidate'
import axios from '@/api/axios'
import commonStyle from '@/containers/style'

class AddJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: 0,
            job: {
                job_name: '',
                salary: '',
                address: [],
                work_exp: '',
                education: '',
                detail: ''
            },
            pickerAddress: []
        }
    }
    componentDidMount() {
        if (this.props.state.user.company_info) {
            let address = this.props.state.user.company_info.address
            let pickerAddress = []
            if (address.length > 0){
                address.forEach(current=>{
                    pickerAddress.push({
                        label: current,
                        value: current
                    })
                })
            }else{
                pickerAddress = [
                    {
                        label: '暂无工作地址',
                        value: '暂无工作地址'
                    }
                ]
            }
            this.setState({
                pickerAddress: pickerAddress
            })
            
        }


        if (sessionStorage.job) {
            this.setState({
                job: JSON.parse(sessionStorage.job)
            })
        }
    }
    submit() {
        if(this.state.isEdit){

        }else{
            
        }
    }
    delete() {

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
                        value={this.state.job.job_name}
                        onChange={v => {
                            this.setState({
                                job: {
                                    ...this.state.job,
                                    job_name: v
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
                        value={this.state.job.work_exp}
                        onOk={v => this.setState({
                            job: {
                                ...this.state.job,
                                work_exp: v
                            }
                        })}>
                        <List.Item arrow="horizontal">经验要求</List.Item>
                    </Picker>
                    <Picker
                        data={pickerEduBg}
                        cols={1}
                        value={this.state.job.education}
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
                        data={this.state.pickerAddress}
                        cols={1}
                        value={this.state.job.address}
                        onOk={v => this.setState({
                            job: {
                                ...this.state.job,
                                address: v
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
                            sessionStorage.job = JSON.stringify(this.state.job)
                            this.props.history.push('/job_detail')
                        }}>职位详情</Item>
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

const mapStateProps = state => {
    return { state }
}
const actionCreator = {}
AddJob = connect(mapStateProps, actionCreator)(AddJob)

export default AddJob;