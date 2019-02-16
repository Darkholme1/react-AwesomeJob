import React, { Component } from 'react';
import { NavBar, Icon, Button, Toast } from 'antd-mobile'
import ReactDOM from 'react-dom'

import style from './style'
import axios from '@/api/axios'

class JobShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            job: '',
            axiosOk: false,
            opacity: 0
        }
    }
    componentWillMount(){
        this.getJobDetail()
    }
    componentDidMount() {
        Toast.loading('Loading...', 10, () => {
            Toast.info('网络超时', 1.5)
        });
        document.addEventListener('scroll', () => {
            this.scroll()
        })
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', () => {
            this.scroll()
        })
    }
    getJobDetail() {
        axios.get('/job/job_detail', {
            params: {
                id: this.props.match.params.job
            }
        }).then(res => {
            if (res.status === 200 && res.data.error === 0) {
                this.setState({
                    job: res.data.doc,
                    axiosOk: true
                },()=>{
                    Toast.hide()
                })
            }
        }).catch(err => {

        })
    }
    scroll() {
        this.setState({
            opacity: document.body.scrollTop === 0 ? document.documentElement.scrollTop * 0.01 : document.body.scrollTop * 0.01
        })
    }
    goChat() {
        this.props.history.push(`/chat/${this.state.job.user._id}`)
    }
    render() {
        return (
            <div style={{ width: document.documentElement.clientWidth }}>
                {
                    this.state.axiosOk ? (
                        <div>
                            <NavBar
                                mode="light"
                                style={{ ...style.navbar, width: document.documentElement.clientWidth }}
                                icon={<Icon type="left" />}
                                onLeftClick={() => { this.props.history.goBack() }}>
                                <span ref="navbar_name" style={{ opacity: this.state.opacity }}>{this.state.job.job_name}</span>
                            </NavBar>
                            <div style={style.container}>
                                <div style={style.jobInfo}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            // alignItems: 'center'
                                        }}>
                                        <span style={style.jobName}>{this.state.job.job_name}</span>
                                        <span style={{ color: '#108ee9' }}>{this.state.job.salary[0] === 0 ? '面议' :
                                            `${this.state.job.salary[0]}k-${this.state.job.salary[1]}k`}</span>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            marginTop: 10
                                        }}>
                                        <span style={style.iconBox}>
                                            <img style={style.icon} src={require('@/resource/image/icon/location.png')} />
                                            {this.state.job.user.city}
                                        </span>
                                        <span style={style.iconBox}>
                                            <img style={style.icon} src={require('@/resource/image/icon/exp.png')} />
                                            {this.state.job.work_exp}
                                        </span>
                                        <span style={style.iconBox}>
                                            <img style={style.icon} src={require('@/resource/image/icon/edu.png')} />
                                            {this.state.job.education}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    style={style.boss}
                                    onClick={() => {
                                        this.props.history.push('/boss_detail/' + this.state.job.user._id)
                                    }}>
                                    <div>
                                        <img
                                            style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: '50%'
                                            }}
                                            src={require(`@/resource/image/avatar/av${this.state.job.user.avatar}.jpg`)} />
                                    </div>
                                    <div style={{
                                        flexGrow: 0.8
                                    }}>
                                        <span>{this.state.job.user.nickname} · </span>
                                        <span>{this.state.job.user.position}</span>
                                    </div>
                                    <div>
                                        <Icon type="right" style={{ color: '#888888' }} />
                                    </div>
                                </div>
                                <div style={style.detail}>
                                    <span style={style.title}>职位详情</span>
                                    <pre
                                        style={{
                                            fontFamily: 'Microsoft YaHei',
                                            whiteSpace: 'pre-wrap',
                                        }}>
                                        {this.state.job.detail}
                                    </pre>
                                </div>
                                <div style={style.company}>
                                    <div>
                                        <span
                                            style={{
                                                display: 'block',
                                                fontSize: 15,
                                                marginBottom: 10
                                            }}>{this.state.job.user.company}</span>
                                        <span>
                                            {this.state.job.user.company_info.financing} · {this.state.job.user.company_info.scale} · {this.state.job.user.company_info.trade}
                                        </span>
                                    </div>
                                    <Icon type="right" style={{ color: '#888888' }} />
                                </div>
                                <div style={{ paddingBottom: 15 }}>
                                    <span style={style.title}>工作地点</span>
                                    <div style={{ marginTop: 10 }}>
                                        <span>{this.state.job.address}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={style.btnBox}>
                                <Button type="primary" style={style.button} onClick={() => { this.goChat() }}>立即沟通</Button>
                            </div>
                        </div>
                    ):''
                }
            </div>
        );
    }
}

export default JobShow;