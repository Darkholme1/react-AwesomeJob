import React, { Component } from 'react';
import { NavBar, Icon, Button } from 'antd-mobile'

import style from './style'

class JobManagement extends Component {
    constructor(props){
        super(props)
        sessionStorage.removeItem('job')
    }
    render() {
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.push({ pathname: '/', query: { tab: 2 } }) }}
                    style={{ position: 'fixed', width: '100%', top: '0', zIndex: '2' }}
                >
                    职位管理
                </NavBar>
                <div style={{ marginTop: '45px' }}>
                    <img style={style.img_nodata} src={require('@/resource/image/nodata.png')} alt="暂无数据" />
                    {/* <div id="myJobList">
                        <div style={style.jobListItem}>
                            <div style={style.NameAndMoney}>
                                <span style={style.jobName}>前端工程师</span>
                                <span style={style.jobMoney}>10k-14k</span>
                            </div>
                            <div>
                                <span style={style.jobTags}>杭州</span>
                                <span style={style.jobTags}>1-3年</span>
                                <span style={style.jobTags}>本科</span>
                            </div>
                        </div>
                        <div style={style.jobListItem}>
                            <div style={style.NameAndMoney}>
                                <span style={style.jobName}>前端工程师</span>
                                <span style={style.jobMoney}>10k-14k</span>
                            </div>
                            <div>
                                <span style={style.jobTags}>杭州</span>
                                <span style={style.jobTags}>1-3年</span>
                                <span style={style.jobTags}>本科</span>
                            </div>
                        </div>
                    </div> */}
                    <Button style={style.btn_add} onClick={() => { this.props.history.push('/add_job') }}>
                        添加<img src={require('@/resource/image/icon/add.png')} style={{ width: 16, height: 16, marginLeft: 5 }} />
                    </Button>
                </div>
            </div>
        );
    }
}

export default JobManagement;