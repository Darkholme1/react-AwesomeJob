import React, { Component } from 'react';
import { NavBar, Toast, PullToRefresh, SearchBar, Menu, ActivityIndicator, Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
// import ReactDOM from 'react-dom'

import axios from '@/api/axios'
import style from './style'
import { pickerCity } from '@/common/picker'

const city = ['全部']
pickerCity.forEach(item => {
    city.push(item.label)
});
class JobList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            axiosOk: false,
            refreshing: true,
            height: document.documentElement.clientHeight - 134,
            width: document.documentElement.clientWidth,
            jobList: [],
            // areaShow: false,
            areaSelected: '',
            areaShowStyle: {
                position: 'absolute',
                color: 'black',
                background: 'white',
                padding: '7px 20px',
                borderRadius: 5,
                boxShadow: '0 0 10px rgba(136,136,136,0.5)',
                zIndex: 1,
                visibility: 'hidden',
                opacity: 0,
                transition: '0.3s',
                marginTop: 5
            },
            city: '全部',
            search: ''
        }
    }
    componentDidMount() {
        this.getJobList()
        sessionStorage.removeItem('jobShow')
        // this.JobListContainer = ReactDOM.findDOMNode(this.refs.JobListContainer)
    }
    getJobList() {
        axios.get('/job/list',
        {
            params: {
                city: this.state.city,
                search: this.state.search
            }
        }).then(res => {
            this.setState({
                jobList: res.data.doc
            })
            Toast.hide()
        }).catch(err => {
            Toast.info('未知错误', 1.5)
        })
    }
    areaShow() {
        this.setState({
            areaShowStyle: this.state.areaShowStyle.opacity == 0 ?
                {
                    ...this.state.areaShowStyle,
                    opacity: 1,
                    visibility: 'visible'
                } : {
                    ...this.state.areaShowStyle,
                    opacity: 0,
                    visibility: 'hidden'
                }
        })
    }
    areaHide() {
        this.setState({
            areaShowStyle: {
                ...this.state.areaShowStyle,
                opacity: 0,
                visibility: 'hidden'
            }
        })
    }
    /* routerPush(index) {
        sessionStorage.jobShow = JSON.stringify(this.state.jobList[index])
        this.props.history.push('/job_show')
    } */
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
                        // this.routerPush(index)
                        this.props.history.push('/job_show/' + item._id)
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
                        <span style={{ ...style.jobTags, ...style.address }}>{item.city[0]}</span>
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
        const leftContent = (
            <div>
                <span
                    onClick={() => { this.areaShow() }}>{this.state.city}</span>
                <div style={this.state.areaShowStyle}>
                    {
                        city.map(item => {
                            return (
                                <div
                                    style={{
                                        textAlign: 'center',
                                        padding: '5px 0'
                                    }}
                                    onClick={() => {
                                        this.setState({
                                            city: item
                                        },()=>{
                                            this.getJobList()
                                        })
                                    }}>
                                    {item}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
        return (
            <div onClick={() => { this.areaHide() }}>
                <NavBar
                    style={{ position: 'fixed', top: '0', width: '100%', zIndex: '1' }}
                    leftContent={leftContent}
                    onLeftClick={(event) => {
                        event.stopPropagation()
                        this.areaShow()
                    }}>
                    AwesomeJob
                </NavBar>
                <SearchBar 
                style={{ position: 'absolute', width: this.state.width, top: 45, zIndex: 0 }} 
                placeholder="搜索" 
                maxLength={8}
                onChange={v=>{
                    this.setState({
                        search: v
                    })
                }}
                onSubmit={()=>{
                    this.getJobList()
                }} />
                <PullToRefresh
                    damping={60}
                    ref={el => this.ptr = el}
                    style={{
                        height: this.state.height,
                        width: this.state.width,
                        overflow: 'auto',
                        position: 'absolute',
                        top: '89px',
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