import React, { Component } from 'react';
import { Toast, NavBar, Icon, Button } from 'antd-mobile'
import ReactDOM from 'react-dom'

import axios from '@/api/axios'
import style from './style'

class GeniusDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            axiosOk: false,
            resume: '',
            age_work: '',
            navbarName: null
        }
    }
    componentWillMount() {
        if (sessionStorage.getItem('geniusId')) {
            // console.log(sessionStorage.getItem('geniusId'))
            axios.get('/resume/query_id', {
                params: {
                    _id: sessionStorage.getItem('geniusId')
                }
            }).then(res => {
                if (res.data.error === 0) {
                    this.setState({
                        resume: res.data.doc,
                        axiosOk: true
                    }, () => {
                        var year = new Date().getFullYear()
                        var age = year - this.state.resume.basic_info.birth[0] + '岁'
                        let work
                        if (this.state.resume.basic_info.start_work[0] === '0') {
                            work = '应届生'
                        } else {
                            work = year - new Date(this.state.resume.basic_info.start_work[0]).getFullYear()
                            if (work > 10 || this.state.resume.basic_info.start_work[0] === '1') {
                                work = '10年以上经验'
                            } else {
                                work += '年经验'
                            }
                        }

                        this.setState({
                            age_work: `${age} · ${work}`,

                        })
                    })
                } else {
                    Toast.info('未知错误', 1.5)
                }
            }).catch(err => {
                Toast.info('未知错误', 1.5)
            })
        }
    }
    componentDidMount() {
        Toast.loading('Loading...', 30, () => {
            console.log('Load complete !!!');
        });
        this.setState({
            navbarName: ReactDOM.findDOMNode(this.refs.navbar_name)
        })
    }
    componentDidUpdate() {
        if (this.state.axiosOk) {
            Toast.hide()
            document.addEventListener('scroll', () => {
                this.scroll()
            })
        }
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', () => {
            this.scroll()
        })
    }
    scroll() {
        this.state.navbarName.style.opacity = document.body.scrollTop === 0 ? document.documentElement.scrollTop * 0.01 : document.body.scrollTop * 0.01
    }
    goChat() {
        this.props.history.push(`/chat/${this.state.resume.user._id}`)
    }
    render() {
        return (
            <div>
                <NavBar
                    ref="navbar"
                    mode="light"
                    style={style.navbar}
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}>
                    <span ref="navbar_name" style={{ opacity: 0 }}>{this.state.axiosOk ? this.state.resume.user.nickname : ''}</span>
                </NavBar>
                {
                    this.state.axiosOk ? (
                        <div id="container"
                            style={style.container}
                            ref="container">
                            <div style={style.innerContainerBasic}>
                                <div style={style.dataInformation}>
                                    <div style={style.nameAndIcon}>
                                        <span style={{ fontSize: '2em', fontWeight: 'bold', marginRight: '10px' }}>
                                            {this.state.resume.user.nickname}
                                        </span>
                                        <div style={{ color: 'rgb(136,136,136)', marginTop: '10px' }}>
                                            <span>{this.state.age_work}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {
                                        this.state.resume.user.avatar !== undefined ?
                                            <img alt="头像" style={style.avatar} src={require(`../../../../../resource/image/avatar/av${this.state.resume.user.avatar}.jpg`)} /> : ''

                                    }
                                </div>
                            </div>
                            <div style={style.container_me}>
                                <span style={style.font_mobileAndEmail}>
                                    <img style={style.icon_mobileAndEmail} src={require('@/resource/image/icon/mobile.png')} />
                                    {this.state.resume.basic_info.mobile}
                                </span>
                                <span style={style.font_mobileAndEmail}>
                                    <img style={style.icon_mobileAndEmail} src={require('@/resource/image/icon/email.png')} />
                                    {this.state.resume.basic_info.email}
                                </span>
                            </div>
                            <div id="jobWant" style={style.containerCommon}>
                                <div style={style.containerTitle}>
                                    <div style={style.circle}></div>
                                    <span style={style.title}>求职期望</span>
                                </div>
                                <div style={style.containerJob}>
                                    <span style={style.jobName}>
                                        {this.state.resume.job_want[0].job_name[1] + ',' + this.state.resume.job_want[0].city}
                                    </span>
                                    <span style={style.salary}>
                                        {this.state.resume.job_want[0].salary[0] === 0 ?
                                            '面议' : `${this.state.resume.job_want[0].salary[0]}k-${this.state.resume.job_want[0].salary[1]}k`}
                                    </span>
                                </div>
                                <div></div>
                            </div>
                            <div id="jobExp" style={style.containerCommon}>
                                <div style={style.containerTitle}>
                                    <div style={style.circle}></div>
                                    <span style={style.title}>工作经历</span>
                                </div>
                                {
                                    this.state.resume.work_exp.length > 0 ?
                                        this.state.resume.work_exp.map((item, index, arr) => {
                                            return (
                                                <div key={index}>
                                                    <div style={style.containerJob}>
                                                        <span style={style.itemName}>{item.company}</span>
                                                        <span style={style.datetime}>
                                                            {item.start[0]}.{item.start[1]}-
                                                            {item.end[0] == 0 ? '至今' : `${item.end[0]}.${item.end[1]}`}
                                                        </span>
                                                    </div>
                                                    <div style={style.position}>
                                                        <span>{item.position[0]},{item.position[1]}</span>
                                                    </div>
                                                    <div style={style.content}>
                                                        <pre>
                                                            {item.job_content}
                                                        </pre>
                                                    </div>
                                                </div>
                                            )
                                        }) : '暂无'
                                }

                            </div>
                            <div id="projectExp" style={style.containerCommon}>
                                <div style={style.containerTitle}>
                                    <div style={style.circle}></div>
                                    <span style={style.title}>项目经历</span>
                                </div>
                                {
                                    this.state.resume.project_exp.length > 0 ?
                                        this.state.resume.project_exp.map((item, index, arr) => {
                                            return (
                                                <div key={index}>
                                                    <div style={style.containerJob}>
                                                        <span style={style.itemName}>{item.project_name}</span>
                                                        <span style={style.datetime}>
                                                            {item.start[0]}.{item.start[1]}-
                                                            {item.end[0] == 0 ? '至今' : `${item.end[0]}.${item.end[1]}`}
                                                        </span>
                                                    </div>
                                                    <div style={style.position}>
                                                        <span>担任 {item.charactor}</span>
                                                    </div>
                                                    <div style={style.content}>
                                                        <pre>
                                                            {item.project_content}
                                                        </pre>
                                                    </div>
                                                </div>
                                            )
                                        }) : '暂无'
                                }
                            </div>
                            <div id="eduExp" style={style.containerCommon}>
                                <div style={style.containerTitle}>
                                    <div style={style.circle}></div>
                                    <span style={style.title}>教育经历</span>
                                </div>
                                {
                                    this.state.resume.edu_exp.length > 0 ?
                                        this.state.resume.edu_exp.map((item, index, arr) => {
                                            return (
                                                <div key={index}>
                                                    <div style={style.containerJob}>
                                                        <span style={style.itemName}>{item.school}</span>
                                                        <span style={style.datetime}>
                                                            {item.edu_time[0]}-{item.edu_time[1]}
                                                        </span>
                                                    </div>
                                                    <div style={style.position}>
                                                        <span>{item.edu_bg[0]} {item.major}</span>
                                                    </div>
                                                    <div style={style.content}>
                                                        <pre>
                                                            {item.school_exp}
                                                        </pre>
                                                    </div>
                                                </div>
                                            )
                                        }) : '暂无'
                                }
                            </div>
                        </div>
                    ) : ''
                }
                <div style={style.btnBox}>
                    <Button type="primary" style={style.button} onClick={() => { this.goChat() }}>立即沟通</Button>
                </div>
            </div>
        );
    }
}

export default GeniusDetail;