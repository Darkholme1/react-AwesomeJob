import React, { Component } from 'react';
import { NavBar, Icon, Button, List, InputItem, Picker, Toast, Modal } from 'antd-mobile'

import { connect } from 'react-redux'

import { pickerSalary, pickerCity, pickerWorkExp, pickerEduBg } from '@/common/picker'
import formvalidate from '@/common/formvalidate'
import axios from '@/api/axios'
import commonStyle from '@/containers/style'

const alert = Modal.alert
class AddJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: 0,
            job: {
                job_name: '',
                salary: '',
                city: '',
                address: '',
                work_exp: '',
                education: '',
                detail: ''
            },
            pickerAddress: []
        }
    }
    componentWillMount() {
        if (sessionStorage.getItem('isEdit')) {
            this.setState({
                isEdit: 1
            })
        } else {
            this.setState({
                job: {
                    ...this.state.job,
                    city: [this.props.state.user.city]
                }
            })
        }

    }
    componentDidMount() {
        setTimeout(() => {
            if (!this.props.state.user.company_info) {
                Toast.info('请先完善公司信息', 1.5, () => {
                    this.props.history.goBack()
                })
            }
        }, 0);
        if (this.props.state.user.company_info) {
            let address = this.props.state.user.company_info.address
            let pickerAddress = []
            if (address && address.length > 0) {
                address.forEach(current => {
                    pickerAddress.push({
                        label: current,
                        value: current
                    })
                })
            } else {
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
        const submit = formvalidate([
            {
                data: this.state.job.job_name,
                required: () => {
                    Toast.info('请输入职位名称', 1.5)
                }
            },
            {
                data: this.state.job.salary,
                required: () => {
                    Toast.info('请选择薪资范围', 1.5)
                }
            },
            {
                data: this.state.job.address,
                required: () => {
                    Toast.info('请选择工作地址', 1.5)
                }
            },
            {
                data: this.state.job.work_exp,
                required: () => {
                    Toast.info('请选择经验要求', 1.5)
                }
            },
            {
                data: this.state.job.education,
                required: () => {
                    Toast.info('请选择学历要求', 1.5)
                }
            },
            {
                data: this.state.job.detail,
                required: () => {
                    Toast.info('请描述职位详情', 1.5)
                }
            }
        ])
        if (submit === 1) {
            if (this.state.isEdit) {
                axios.post('/job/update', {
                    job: JSON.stringify(this.state.job)
                }).then(res => {
                    if (res.data.error === 0) {
                        Toast.info('保存成功', 1.5)
                    } else {
                        Toast.info('未知错误', 1.5)
                    }
                }).catch(err => {
                    Toast.info('未知错误', 1.5)
                })
            } else {
                axios.post('/job/add', {
                    job: JSON.stringify(this.state.job)
                }).then(res => {
                    if (res.data.code === 0) {
                        Toast.info('添加成功', 1.5, () => {
                            this.props.history.goBack()
                        })
                    }
                }).catch(err => {
                    Toast.info('未知错误', 1.5)
                })
            }
        }

    }
    delete() {
        alert('删除', '真的要删除吗？', [
            { text: '取消' },
            {
                text: '确认', onPress: () => {
                    axios.post('/job/delete', {
                        _id: this.state.job._id
                    }).then(res => {
                        if (res.data.error === 0) {
                            Toast.info('删除成功', 1.5, () => {
                                this.props.history.goBack()
                            })
                        } else {
                            Toast.info('未知错误', 1.5)
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
        const rightContent = this.state.isEdit ?
            [
                <span
                    onClick={() => {
                        console.log('预览')
                    }}>预览</span>,
                <span
                    style={{ marginLeft: '5px' }}
                    onClick={() => {
                        this.submit()
                    }}>保存</span>
            ] :
            <span>预览</span>
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ position: 'fixed', width: '100%', top: '0', zIndex: '2' }}
                    rightContent={rightContent}
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
                    <Picker
                        data={pickerCity}
                        cols={1}
                        value={this.state.job.city}
                        onOk={v => this.setState({
                            job: {
                                ...this.state.job,
                                city: v
                            }
                        })}>
                        <List.Item arrow="horizontal">工作城市</List.Item>
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
                        this.state.isEdit ?
                            <Button type="warning" style={commonStyle.footerBtn} onClick={() => { this.delete() }}>删除本条</Button> :
                            <Button type="primary" style={commonStyle.footerBtn} onClick={() => { this.submit() }}>保存</Button>
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