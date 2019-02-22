import React, { Component } from 'react';
import { NavBar, PullToRefresh, Toast, SearchBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

import ReactDOM from 'react-dom'
import style from './style'

import axios from '@/api/axios'
import { pickerCity } from '@/common/picker'

const city = ['全部']
pickerCity.forEach(item => {
    city.push(item.label)
});

class GeniusList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            axiosOk: false,
            refreshing: true,
            height: document.documentElement.clientHeight - 90,
            width: document.documentElement.clientWidth,
            resumes: [],
            resumeList: [],
            city: '全部',
            search: '',
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
        };
    }
    componentWillMount() {
        this.getGeniusList()
        sessionStorage.removeItem('geniusId')
        var city = /杭州/
        console.log(city.test('杭州'))
    }
    componentDidMount() {
        Toast.loading('Loading...', 10, () => {
            console.log('Load complete !!!');
        });
    }
    componentDidUpdate() {
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
                    }, () => {
                        console.log(this.state.resumeList)
                        let filterList = this.state.resumeList
                        //条件筛选
                        if (this.state.city !== '全部') {
                            var regCity = new RegExp(this.state.city)
                            filterList = filterList.filter(item => regCity.test(item.city) === true)
                            
                        }
                        if (this.state.search !== '') {
                            var regSearch = new RegExp(this.state.search,'i')
                            filterList = filterList.filter(item => regSearch.test(item.jobWant) === true)
                        }
                        this.setState({
                            resumeList: filterList
                        })
                    })
                })
                /* console.log(this.state.resumes)
                console.log(this.state.resumeList) */
            }
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
                            this.props.history.push('/genius_detail/' + obj._id)
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
                                        }, () => {
                                            this.getGeniusList()
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
                    onChange={v => {
                        this.setState({
                            search: v
                        })
                    }}
                    onSubmit={() => {
                        this.getGeniusList()
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