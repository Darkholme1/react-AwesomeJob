import React, { Component } from 'react';
import { NavBar, PullToRefresh, Toast } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

import ReactDOM from 'react-dom'

import style from './style'

import axios from '@/api/axios'

class GeniusList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            axiosOk: false,
            refreshing: true,
            height: document.documentElement.clientHeight - 90,
            width: document.documentElement.clientWidth,
            resumes: [],
            resumeList: []
        };
    }
    componentWillMount() {
        this.getGeniusList()
        sessionStorage.removeItem('geniusId')
    }
    componentDidMount(){
        Toast.loading('Loading...', 10, () => {
            console.log('Load complete !!!');
        });
    }
    componentDidUpdate(){
        if (this.state.axiosOk) {
            Toast.hide()
        }
    }

    getGeniusList() {
        axios.get('/resume/list').then(res => {
            if (res.data.error === 0) {
                this.setState({
                    resumes: res.data.doc,
                    axiosOk: true
                }, () => {
                    let resumeList
                    var year = new Date().getFullYear()
                    resumeList = this.state.resumes.map(item => {
                        var work
                        if (item.basic_info.start_work[0] === '0') {
                            work = '应届生'
                        } else {
                            work = year - new Date(item.basic_info.start_work[0]).getFullYear()
                            if (work > 10 || item.basic_info.start_work[0] === '1') {
                                work = '10年以上经验'
                            } else {
                                work += '年经验'
                            }
                        }

                        return {
                            _id: item._id,
                            jobWant: item.job_want[0].job_name[0] + ' · ' + item.job_want[0].job_name[1],
                            avatar: item.user.avatar,
                            nickname: item.user.nickname,
                            city: item.user.city,
                            workExp: work,
                            eduExp: item.edu_exp.length > 0 ? item.edu_exp[0].edu_bg[0] : '暂无学历'
                        }
                    })
                    this.setState({
                        resumeList: resumeList
                    })
                })
                /* console.log(this.state.resumes)
                console.log(this.state.resumeList) */
            }
        }).catch(err => {
            Toast.info('未知错误', 1.5)
        })
    }

    render() {
        const row = (obj, index) => {
            return (
                <div key={index}>
                    <div
                        style={this.state.touch === `genius${index}` ? { ...style.geniusItem, ...style.bgTap } : style.geniusItem}
                        onTouchStart={() => {
                            this.setState({
                                touch: `genius${index}`
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
                            // sessionStorage.geniusId = obj._id
                            this.props.history.push('/genius_detail/'+obj._id)
                        }}
                    >
                        <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid rgba(136,136,136,0.2)' }}>
                            {obj.jobWant}
                        </div>
                        <div style={{ display: '-webkit-box', display: 'flex', padding: '15px' }}>
                            <img
                                style={{ height: '63px', width: '63px', marginRight: '15px' }}
                                src={require(`@/resource/image/avatar/av${obj.avatar}.jpg`)}
                                alt="牛人" />
                            <div style={{ display: 'inline-block' }}>
                                <div style={{ marginBottom: '8px', color: '#000', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>
                                    {obj.nickname}
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <span style={style.jobTags}>{obj.city}</span>
                                    <span style={style.jobTags}>{obj.workExp}</span>
                                    <span style={style.jobTags}>{obj.eduExp}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div
                        style={{
                            backgroundColor: '#F5F5F9',
                            height: 8,
                            borderTop: '1px solid #ECECED',
                            borderBottom: '1px solid #ECECED',
                        }}
                    />
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
                    ref={el=>this.ptr=el}
                    style={{
                        height: this.state.height,
                        width: this.state.width,
                        overflow: 'auto',
                        position: 'absolute',
                        top: '45px',
                    }}
                    indicator={{ deactivate: '下拉可以刷新' }}
                    direction='down'
                    onScroll={()=>{
                        /* const ptr = ReactDOM.findDOMNode(this.ptr)
                        console.log(ptr.scrollTop) */
                    }}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({ refreshing: true });
                        this.getGeniusList()
                        setTimeout(() => {
                            this.setState({ refreshing: false });
                        }, 1000);
                    }}
                >
                    {this.state.resumeList.map((item, index, arr) => row(item, index))}
                </PullToRefresh>
            </div>

        );
    }
}

export default withRouter(GeniusList);