import React, { Component } from 'react';
import { NavBar, Icon, List, Picker, Button, Toast, Modal } from 'antd-mobile'

import { pickerJob, pickerCity, pickerSalary } from '../../../../../../common/picker'
import commonStyle from '../../../../../style'
import formvalidate from '@/common/formvalidate'
import axios from '@/api/axios'

const alert = Modal.alert;
class AddJobWant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobName: null,
            city: null,
            salary: null,
            isEdit: 0
        }
    }
    componentWillMount() {
        if (this.props.location.query) {
            if (this.props.location.query.city) {
                this.setState({
                    city: [this.props.location.query.city]
                })
            }
            if (this.props.location.query.jobWant) {
                this.setState({
                    isEdit: 1,
                    city: [this.props.location.query.jobWant.city],
                    jobName: this.props.location.query.jobWant.job_name,
                    salary: this.props.location.query.jobWant.salary
                })

            }
        }
    }
    submit() {
        const submit = formvalidate([
            {
                data: this.state.jobName,
                required: () => {
                    Toast.info('请选择期望职位', 1.5)
                }
            },
            {
                data: this.state.city,
                required: () => {
                    Toast.info('请选择工作城市', 1.5)
                }
            },
            {
                data: this.state.salary,
                required: () => {
                    Toast.info('请选择期望薪资', 1.5)
                }
            }
        ])
        if (submit === 1) {
            axios.post('/resume/add_jobwant', {
                job_name: JSON.stringify(this.state.jobName),
                city: this.state.city[0],
                salary: JSON.stringify(this.state.salary)
            }).then((res) => {
                if (res.data.code === 0) {
                    Toast.info('添加成功', 1.5)
                    setTimeout(() => {
                        this.props.history.goBack()
                    }, 1500);
                }
            }).catch((err) => {
                Toast.info('未知错误', 1.5)
                console.log(err)
            })
        }
    }
    edit() {
        var jobWantAll = this.props.location.query.jobWantAll
        jobWantAll.forEach((current, index, arr) => {
            if (current._id === this.props.location.query.jobWant._id) {
                arr[index] = {
                    job_name: this.state.jobName,
                    city: this.state.city[0],
                    salary: this.state.salary,
                    _id: current._id
                }
            }
        });
        axios.post('/resume/update_jobwant', {
            jobwant_new: JSON.stringify(jobWantAll)
        }).then((res) => {
            if (res.data.code === 0) {
                Toast.info('保存成功', 1.5)
                setTimeout(() => {
                    this.props.history.push('/myresume')
                }, 1500);
            }
        }).catch((err) => {
            Toast.info('未知错误', 1.5)
            console.log(err)
        })
    }
    delete() {
        alert('删除', '真的要删除吗？', [
            { text: '取消' },
            {
                text: '确认', onPress: () => {
                    var jobWantAll = this.props.location.query.jobWantAll
                    jobWantAll.forEach((current, index, arr) => {
                        if (current._id === this.props.location.query.jobWant._id) {
                            arr.splice(index, 1)
                        }
                    });
                    axios.post('/resume/update_jobwant', {
                        jobwant_new: JSON.stringify(jobWantAll)
                    }).then((res) => {
                        if (res.data.code === 0) {
                            Toast.info('删除成功', 1.5)
                            setTimeout(() => {
                                this.props.history.push('/myresume')
                            }, 1500);
                        }
                    }).catch((err) => {
                        Toast.info('未知错误', 1.5)
                        console.log(err)
                    })
                }
            },
        ])
    }
    render() {
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ width: '100%' }}
                    rightContent={this.state.isEdit ?
                        <span onClick={() => { this.edit() }}>保存</span> : ''}
                >
                    求职期望
                </NavBar>
                <List>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerJob}
                        title="期望职位"
                        value={this.state.jobName}
                        onOk={e => this.setState({ jobName: e })}
                    >
                        <List.Item arrow="horizontal">期望职位</List.Item>
                    </Picker>
                    <Picker
                        data={pickerCity}
                        cols={1}
                        value={this.state.city}
                        onOk={e => this.setState({ city: e })}>
                        <List.Item arrow="horizontal">工作城市</List.Item>
                    </Picker>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerSalary}
                        title="期望薪资(月薪)"
                        value={this.state.salary}
                        onOk={e => this.setState({ salary: e })}>
                        <List.Item arrow="horizontal">期望薪资</List.Item>
                    </Picker>
                </List>

                {
                    /* (() => {
                        return this.state.isEdit ?
                            <Button type="warning" style={commonStyle.footerBtn} onClick={() => { this.delete() }}>删除本条</Button> :
                            <Button type="primary" style={commonStyle.footerBtn} onClick={() => { this.submit() }}>保存</Button>
                    })() */
                    (() => {
                        if (this.state.isEdit) {
                            if (this.props.location.query.jobWantAll.length === 1) {
                                return ''
                            } else {
                                return <div style={commonStyle.footerBtnContainer}>
                                    <Button type="warning" style={commonStyle.footerBtn} onClick={() => { this.delete() }}>删除本条</Button>
                                </div>
                            }
                        } else {
                            return <div style={commonStyle.footerBtnContainer}>
                                <Button type="primary" style={commonStyle.footerBtn} onClick={() => { this.submit() }}>保存</Button>
                            </div>
                        }
                    })()
                }
            </div>
        );
    }
}

export default AddJobWant;