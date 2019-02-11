import React, { Component } from 'react';
import { NavBar, Toast, PullToRefresh } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

import axios from '@/api/axios'
import style from './style'

class JobList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            axiosOk: false,
            refreshing: true,
            height: document.documentElement.clientHeight - 90,
            width: document.documentElement.clientWidth,
            jobList: [],
            height: document.documentElement.clientHeight - 90,
            width: document.documentElement.clientWidth,
        }
    }
    componentDidMount() {
        this.getJobList()
        sessionStorage.removeItem('jobShow')
    }
    getJobList() {
        axios.get('/job/list').then(res => {
            this.setState({
                jobList: res.data.doc
            }, () => {
                console.log(this.state.jobList)
            })
            Toast.hide()
        }).catch(err => {
            Toast.info('未知错误', 1.5)
        })
    }
    routerPush(index){
        sessionStorage.jobShow = JSON.stringify(this.state.jobList[index])
        this.props.history.push('/job_show')
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
                        this.routerPush(index)
                    }}>
                    <div style={style.NameAndMoney}>
                        <span style={style.jobName}>{item.job_name}</span>
                        <span style={style.jobMoney}>
                            {item.salary[0] === 0 ? '面议' :
                                `${item.salary[0]}k-${item.salary[1]}k`}
                        </span>
                    </div>
                    <div style={style.company}>
                        <span>{item.user.company}</span>
                    </div>
                    <div style={style.tagContainer}>
                        <span style={{ ...style.jobTags, ...style.address }}>{item.user.city}</span>
                        <span style={style.jobTags}>{item.work_exp}</span>
                        <span style={style.jobTags}>{item.education}</span>
                    </div>
                    <div style={style.boss}>
                        <img
                            style={{ height: 25, width: 25, marginRight: 10, borderRadius: '50%' }}
                            src={require(`@/resource/image/avatar/av${item.user.avatar}.jpg`)}
                            alt="BOSS" />
                            <span>{item.user.nickname} · {item.user.position}</span>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <NavBar
                    style={{ position: 'fixed', top: '0', width: '100%', zIndex: '1' }}>
                    Here is title
                </NavBar>
                <PullToRefresh
                    damping={60}
                    ref={el => this.ptr = el}
                    style={{
                        height: this.state.height,
                        width: this.state.width,
                        overflow: 'auto',
                        position: 'absolute',
                        top: '45px',
                    }}
                    indicator={{ deactivate: '下拉可以刷新' }}
                    direction='down'
                    onScroll={() => {
                        /* const ptr = ReactDOM.findDOMNode(this.ptr)
                        console.log(ptr.scrollTop) */
                    }}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({ refreshing: true });
                        this.getJobList()
                        setTimeout(() => {
                            this.setState({ refreshing: false });
                        }, 1000);
                    }}
                >
                    {this.state.jobList.map((item, index, arr) => row(item, index))}
                </PullToRefresh>
            </div>
        );
    }
}

export default withRouter(JobList);