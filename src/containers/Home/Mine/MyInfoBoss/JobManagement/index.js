import React, { Component } from 'react';
import { NavBar, Icon, Button, Toast } from 'antd-mobile'

import style from './style'
import axios from '@/api/axios'

class JobManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobList: [],
            touch: '',
            axiosOk: 0
        }

        sessionStorage.removeItem('job')
        sessionStorage.removeItem('isEdit')
    }
    componentWillMount() {
        axios.get('/job/list_mine').then(res => {
            if (!res.data.error) {
                this.setState({
                    jobList: res.data.doc,
                    axiosOk: 1
                })
            }
        }).catch(err => {
            Toast.info('未知错误', 1.5)
        })
    }
    componentDidMount() {
        Toast.loading('Loading...', 30, () => {
            console.log('Load complete !!!');
        });
    }
    componentDidUpdate() {
        if (this.state.axiosOk) {
            Toast.hide()
        }
    }
    routerPush(index) {
        let job = this.state.jobList[index]
        job.work_exp = [job.work_exp]
        job.education = [job.education]
        job.address = [job.address]
        sessionStorage.job = JSON.stringify(job)
        sessionStorage.isEdit = 1
        this.props.history.push('/add_job')
    }
    render() {
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ position: 'fixed', width: '100%', top: '0', zIndex: '2' }}
                >
                    职位管理
                </NavBar>
                <div style={this.state.axiosOk ? { marginTop: '45px' } : { marginTop: '45px', opacity: '0' }}>
                    {/* {(()=>{
                        return this.state.jobList.length===0?
                        <img style={style.img_nodata} src={require('@/resource/image/nodata.png')} alt="暂无数据" />:
                        <div id="myJobList">
                        {
                            this.state.jobList.map((current,index,arr)=>{
                            
                            })
                        }
                        </div>
                        
                    })()} */}
                    {
                        this.state.jobList.length === 0 ?
                            <img style={style.img_nodata} src={require('@/resource/image/nodata.png')} alt="暂无数据" /> :
                            <div id="myJobList">
                                {
                                    this.state.jobList.map((current, index, arr) => {
                                        return (<div
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
                                                <span style={style.jobName}>{current.job_name}</span>
                                                <span style={style.jobMoney}>
                                                    {current.salary[0] === 0 ? '面议' :
                                                        `${current.salary[0]}k-${current.salary[1]}k`}
                                                </span>
                                            </div>
                                            <div style={style.tagContainer}>
                                                <span style={{ ...style.jobTags, ...style.address }}>{current.address}</span>
                                                <span style={style.jobTags}>{current.work_exp}</span>
                                                <span style={style.jobTags}>{current.education}</span>
                                            </div>
                                        </div>)
                                    })
                                }
                            </div>
                    }
                    <Button style={style.btn_add} onClick={() => { this.props.history.push('/add_job') }}>
                        添加<img src={require('@/resource/image/icon/add.png')} style={{ width: 16, height: 16, marginLeft: 5 }} />
                    </Button>
                </div>
            </div>
        );
    }
}

export default JobManagement;