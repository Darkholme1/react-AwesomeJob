import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { NavBar, Toast, Icon } from 'antd-mobile'

import style from './style'
import axios from '@/api/axios'

class BossDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // user: props.match.params.user
            user: {},
            jobList: [],
            axiosOk: false,
            opacity: 0,

        }
    }
    componentWillMount() {

        Promise.all([this.getBossInfo(), this.getJobList()])
            .then((data) => {
                this.setState({
                    axiosOk: true
                })

            }).catch((err) => {
                Toast.info('未知错误', 1.5)
            })
    }
    componentDidMount() {
        document.addEventListener('scroll', () => {
            this.scroll()
        })
        // document.querySelector('body').setAttribute('style', 'background:white')
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', () => {
            this.scroll()
        })
        // document.querySelector('body').removeAttribute('style')
    }
    scroll() {
        this.setState({
            opacity: document.body.scrollTop === 0 ? document.documentElement.scrollTop * 0.02 : document.body.scrollTop * 0.02
        })
    }
    getBossInfo() {
        return new Promise((resolve, reject) => {
            axios.get('/user/query_id', {
                params: {
                    user_id: this.props.match.params.user
                }
            }).then(res => {
                if (res.status === 200 && res.data.error === 0) {
                    this.setState({
                        user: res.data.doc,
                        axiosOk: true
                    }, () => {
                        resolve()
                        // console.log(res.data.doc)
                    })


                } else {
                    reject()
                }
            }).catch(err => {
                reject()
            })
        })

    }
    getJobList() {
        return new Promise((resolve, reject) => {
            axios.get('/job/list_boss', {
                params: {
                    user_id: this.props.match.params.user
                }
            }).then(res => {
                if (res.status === 200 && res.data.error === 0) {
                    this.setState({
                        jobList: res.data.doc
                    }, () => {
                        console.log(this.state.jobList)
                        resolve()
                    })
                } else {
                    reject()
                }
            }).catch(err => {
                reject()
            })
        })
    }
    render() {
        const row = (item, index) => {
            return (
                <div
                    key={index}
                    style={this.state.touch === `job${index}` ? { ...style.jobListItem, ...style.bgTap } : style.jobListItem}
                    onTouchStart={() => {
                        this.setState({
                            touch: `job${index}`
                        })
                    }}
                    onTouchEnd={
                        () => {
                            this.setState({
                                touch: ''
                            })
                        }
                    }
                    onClick={() => {
                        this.props.history.push('/job_show/' + item._id)
                    }}>
                    <div style={style.NameAndMoney}>
                        <span style={style.jobName}>{item.job_name}</span>
                        <span style={style.jobMoney}>
                            {item.salary[0] === 0 ? '面议' :
                                `${item.salary[0]}k-${item.salary[1]}k`}
                        </span>
                    </div>
                    <div style={style.tagContainer}>
                        <span style={{ ...style.jobTags, ...style.address }}>{item.user.city}</span>
                        <span style={style.jobTags}>{item.work_exp}</span>
                        <span style={style.jobTags}>{item.education}</span>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {
                    this.state.axiosOk ? (
                        <div>
                            <NavBar
                                icon={<Icon type="left" />}
                                onLeftClick={() => { this.props.history.goBack() }}
                                style={style.navbar}>
                                <span style={{
                                    opacity: this.state.opacity
                                }}>{this.state.user.nickname}</span>
                            </NavBar>
                            <header style={style.header}>
                                <div>
                                    <h2 style={style.nickname}>{this.state.user.nickname}·{this.state.user.position}</h2>
                                    <span style={{
                                        color: 'white',
                                        position: 'relative',
                                        bottom: 12
                                    }}>{this.state.user.company}</span>
                                </div>

                                <img alt="头像" style={style.avatar} src={require(`@/resource/image/avatar/av${this.state.user.avatar}.jpg`)} />

                            </header>
                            <div>
                                <h3 style={{ paddingLeft: 20 }}>{this.state.jobList.length}个在招职位</h3>
                                {this.state.jobList.map((item, index, arr) => row(item, index))}
                            </div>
                        </div>
                    ) : ''
                }
            </div>
        );
    }
}

export default BossDetail;