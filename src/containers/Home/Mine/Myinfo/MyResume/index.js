import React, { Component } from 'react'
import axios from '../../../../../api/axios'
import { NavBar, Icon, Button, List, Modal, Toast } from 'antd-mobile'

import { connect } from 'react-redux'

import style from './style'

const datatype = require('../../../../../common/datatype.js')

class MyResume extends Component {
    constructor(props) {
        super(props)
        this.state = {
            axiosOk: 0,
            resume: [],
            touch: '',
            children: [],
            activeItemIndex: 0,

            //简历数据
            age: '--',
            jobWant: []
        }
        /* var timestamp = new Date()-new Date(1997,3,1)
        timestamp = parseInt(timestamp/1000/60/60/24/365)

        console.log(timestamp) */
    }
    componentWillMount() {
        axios.get('/user/resume/query').then((res) => {
            this.setState({
                resume: res.data,
                axiosOk: 1
            }, () => {
                //基本信息
                if (this.state.resume.basic_info) {
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
                        age: `${age} · ${work}`
                    })
                }
                //求职期望
                this.setState({
                    jobWant: this.state.resume.job_want
                })

            })
            // console.log(this.state.resume)
        }).catch((err) => {
            Toast.info('未知错误', 1.5)
            console.log(err)
        })
    }
    componentDidMount() {
        /* axios.get('/user/resume').then((res) => {
            if (res.data.resume.length > 0) {

            }
        }).catch((err) => {
            Toast.info('未知错误', 1.5)
            console.log(err)
        }) */
        document.querySelector('body').setAttribute('style', 'background:white')

    }
    componentWillUnmount() {
        document.querySelector('body').removeAttribute('style')
    }
    render() {
        const prompt = Modal.prompt
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.push({ pathname: '/', query: { tab: 2 } }) }}
                    style={{ position: 'fixed', width: '100%', top: '0', zIndex: '1' }}
                    rightContent={<span onClick={() => { }}>预览</span>}
                >
                    我的简历
                </NavBar>
                {/* <div style={{marginTop:'65px'}}>
                    {
                        (() => {
                            return this.state.resume.length > 0 ?
                                <div>简历列表</div> :
                                <div style={{ textAlign: 'center', marginTop: '50px', marginBottom: '30px' }}>
                                    <img style={{ width: '60%' }} src={require('../../../../resource/image/nodata.png')} />
                                </div>
                        })()
                    }
                </div>
                <Button style={style.btnAdd} onClick={() => { this.props.history.push('/addresume') }}>
                    <span>添加</span>
                    <img style={style.iconAdd} src={require('../../../../resource/image/icon/add.png')} />
                </Button> */}
                <div style={{ marginTop: '45px' }}>
                    <div tag="basic-information"
                        style={this.state.touch === '个人信息' ? { ...style.listItem, ...style.bgTap } : style.listItem}
                        onTouchStart={() => {
                            this.setState({
                                touch: '个人信息'
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
                            this.props.history.push({
                                pathname: '/basicinfo',
                                query: {
                                    basic_info: this.state.resume.basic_info
                                }
                            })
                        }}>
                        <div tag="innerContainer" style={style.innerContainerBasic}>
                            <div tag="data-information" style={style.dataInformation}>
                                <div tag="nameAndIcon" style={style.nameAndIcon}>
                                    <span style={{ fontSize: '2em', fontWeight: 'bold', marginRight: '10px' }}>{this.props.state.user.nickname}</span>
                                    <img src={require('../../../../../resource/image/icon/edit.png')} style={{ width: '15px', height: '15px' }} />
                                </div>
                                <div tag="worktime-age-education" style={{ color: 'rgb(136,136,136)' }}>
                                    <span>{this.state.age}</span>
                                </div>
                            </div>
                            <div tag="avatar">
                                {
                                    (() => {
                                        return this.props.state.user.avatar !== undefined ?
                                            <img alt="头像" style={style.avatar} src={require(`../../../../../resource/image/avatar/av${this.props.state.user.avatar}.jpg`)} /> : ''
                                    })()
                                }
                            </div>
                        </div>
                    </div>
                    <div tag="job-want">
                        <div tag="innerContainer" style={style.innerContainerItem}>
                            <span style={{ fontSize: '18px', fontWeight: 'bold', ...style.itemPadding }}>求职期望</span>
                            <div style={style.itemContainer}>
                                {
                                    (() => {
                                        if (this.state.axiosOk) {
                                            return this.state.jobWant.map((current, index, arr) => {
                                                var salary = current.salary[0] === 0 ? '面议' : `${current.salary[0]}-${current.salary[1]}k`
                                                return <div
                                                    key={index}
                                                    style={this.state.touch === `jobWant${index}` ?
                                                        { ...style.itemBox, ...style.bgTap } :
                                                        style.itemBox}
                                                    onTouchStart={() => {
                                                        this.setState({
                                                            touch: `jobWant${index}`
                                                        })
                                                    }}
                                                    onTouchEnd={() => {
                                                        this.setState({
                                                            touch: ''
                                                        })
                                                    }}
                                                    onClick={() => {
                                                        this.props.history.push({
                                                            pathname: '/addjobwant',
                                                            query: {
                                                                jobWant: current,
                                                                jobWantAll: this.state.jobWant
                                                            }
                                                        })
                                                    }}
                                                >
                                                    <div style={style.itemHeader}>
                                                        <span style={style.itemTitle}>{current.job_name[1]}</span>
                                                        <Icon type="right" size="xs" color="rgb(136, 136, 136)" />
                                                    </div>
                                                    <div>
                                                        <span style={style.itemTag}>{current.city} {salary}</span>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    })()
                                }
                            </div>
                            {
                                (() => {
                                    if (this.state.axiosOk) {
                                        return this.state.jobWant.length === 3 ? '' :
                                            <div style={{ ...style.itemPadding, ...style.btnContainer }}>
                                                <Button onClick={() => {
                                                    this.props.history.push({
                                                        pathname: '/addjobwant',
                                                        query: {
                                                            city: this.props.state.user.city
                                                        }
                                                    })
                                                }}>添加求职期望</Button>
                                                <div style={style.itemBottom}></div>
                                            </div>
                                    }
                                })()
                            }
                        </div>
                    </div>
                    <div tag="realStudy-exp" >
                        <div tag="innerContainer" style={style.innerContainerItem}>
                            <span style={{ fontSize: '18px', fontWeight: 'bold', ...style.itemPadding }}>工作经历</span>
                            <div style={style.itemContainer}>
                                <div
                                    style={this.state.touch === 'web' ?
                                        { ...style.itemBox, ...style.bgTap } :
                                        style.itemBox}
                                    onTouchStart={() => {
                                        this.setState({
                                            touch: 'web'
                                        })
                                    }}
                                    onTouchEnd={() => {
                                        this.setState({
                                            touch: ''
                                        })
                                    }}
                                >
                                    <div style={style.itemHeader}>
                                        <span style={style.itemTitle}>浙江华云信息科技有限公司</span>

                                        <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                    </div>
                                    <div>
                                        <span style={style.itemTag}>web前端</span>
                                        <section style={style.itemContent}>
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
                                        </section>
                                    </div>
                                </div>
                                <div
                                    style={this.state.touch === 'web' ?
                                        { ...style.itemBox, ...style.bgTap } :
                                        style.itemBox}
                                    onTouchStart={() => {
                                        this.setState({
                                            touch: 'web'
                                        })
                                    }}
                                    onTouchEnd={() => {
                                        this.setState({
                                            touch: ''
                                        })
                                    }}
                                >
                                    <div style={style.itemHeader}>
                                        <span style={style.itemTitle}>浙江华云信息科技有限公司</span>

                                        <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                    </div>
                                    <div>
                                        <span style={style.itemTag}>web前端</span>
                                        <section style={style.itemContent}>
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
                                        </section>
                                    </div>
                                </div><div
                                    style={this.state.touch === 'web' ?
                                        { ...style.itemBox, ...style.bgTap } :
                                        style.itemBox}
                                    onTouchStart={() => {
                                        this.setState({
                                            touch: 'web'
                                        })
                                    }}
                                    onTouchEnd={() => {
                                        this.setState({
                                            touch: ''
                                        })
                                    }}
                                >
                                    <div style={style.itemHeader}>
                                        <span style={style.itemTitle}>浙江华云信息科技有限公司</span>

                                        <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                    </div>
                                    <div>
                                        <span style={style.itemTag}>web前端</span>
                                        <section style={style.itemContent}>
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
                                        </section>
                                    </div>
                                </div>
                            </div>

                            <div style={{ ...style.itemPadding, ...style.btnContainer }}>
                                <Button onClick={() => { this.props.history.push('/addworkexp') }}>添加工作经历</Button>
                                <div style={style.itemBottom}></div>
                            </div>
                        </div>
                    </div>
                    <div tag="project-exp" >
                        <div tag="innerContainer" style={style.innerContainerItem}>
                            <span style={{ fontSize: '18px', fontWeight: 'bold', ...style.itemPadding }}>项目经历</span>
                            <div style={style.itemContainer}>
                                <div
                                    style={this.state.touch === 'web' ?
                                        { ...style.itemBox, ...style.bgTap } :
                                        style.itemBox}
                                    onTouchStart={() => {
                                        this.setState({
                                            touch: 'web'
                                        })
                                    }}
                                    onTouchEnd={() => {
                                        this.setState({
                                            touch: ''
                                        })
                                    }}
                                >
                                    <div style={style.itemHeader}>
                                        <span style={style.itemTitle}>浙江华云信息科技有限公司</span>

                                        <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                    </div>
                                    <div>
                                        <span style={style.itemTag}>web前端</span>
                                        <section style={style.itemContent}>
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
                                        </section>
                                    </div>
                                </div>
                                <div
                                    style={this.state.touch === 'web' ?
                                        { ...style.itemBox, ...style.bgTap } :
                                        style.itemBox}
                                    onTouchStart={() => {
                                        this.setState({
                                            touch: 'web'
                                        })
                                    }}
                                    onTouchEnd={() => {
                                        this.setState({
                                            touch: ''
                                        })
                                    }}
                                >
                                    <div style={style.itemHeader}>
                                        <span style={style.itemTitle}>浙江华云信息科技有限公司</span>

                                        <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                    </div>
                                    <div>
                                        <span style={style.itemTag}>web前端</span>
                                        <section style={style.itemContent}>
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
                                        </section>
                                    </div>
                                </div><div
                                    style={this.state.touch === 'web' ?
                                        { ...style.itemBox, ...style.bgTap } :
                                        style.itemBox}
                                    onTouchStart={() => {
                                        this.setState({
                                            touch: 'web'
                                        })
                                    }}
                                    onTouchEnd={() => {
                                        this.setState({
                                            touch: ''
                                        })
                                    }}
                                >
                                    <div style={style.itemHeader}>
                                        <span style={style.itemTitle}>浙江华云信息科技有限公司</span>

                                        <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                    </div>
                                    <div>
                                        <span style={style.itemTag}>web前端</span>
                                        <section style={style.itemContent}>
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div style={{ ...style.itemPadding, ...style.btnContainer }}>
                                <Button onClick={() => { this.props.history.push('/addprojectexp') }}>添加项目经历</Button>
                                <div style={style.itemBottom}></div>
                            </div>
                        </div>
                    </div>
                    <div tag="education-exp" >
                        <div tag="innerContainer" style={style.innerContainerItem}>
                            <span style={{ fontSize: '18px', fontWeight: 'bold', ...style.itemPadding }}>教育经历</span>
                            <div style={style.itemContainer}>
                                <div
                                    style={this.state.touch === 'web' ?
                                        { ...style.itemBox, ...style.bgTap } :
                                        style.itemBox}
                                    onTouchStart={() => {
                                        this.setState({
                                            touch: 'web'
                                        })
                                    }}
                                    onTouchEnd={() => {
                                        this.setState({
                                            touch: ''
                                        })
                                    }}
                                >
                                    <div style={style.itemHeader}>
                                        <span style={style.itemTitle}>浙江华云信息科技有限公司</span>

                                        <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                    </div>
                                    <div>
                                        <span style={style.itemTag}>web前端</span>
                                        <section style={style.itemContent}>
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
                                            哇雷瓦雷瓦空寂你娃空寂你娃空寂你娃
                                            空寂你娃空寂你娃啊啊撒旦吉萨可怜的
                                            健身卡立即打开领导卡拉季凯撒觉得拉丝机是
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div style={{ ...style.itemPadding, ...style.btnContainer }}>
                                <Button onClick={() => { this.props.history.push('/addeducationexp') }}>添加教育经历</Button>
                                <div style={style.itemBottom}></div>
                            </div>
                        </div>
                    </div>
                    <div tag="github" >
                        <div tag="innerContainer" style={style.innerContainerItem}>
                            <span style={{ fontSize: '18px', fontWeight: 'bold', ...style.itemPadding }}>社交主页</span>
                            <div style={style.itemPadding}>
                                <Button
                                    style={{ ...style.itemPadding, ...style.btnContainer }}
                                    onClick={() => prompt(
                                        '社交主页',
                                        '建议添加能突出个人实力的主页',
                                        [
                                            { text: '取消' },
                                            { text: '添加', onPress: password => console.log(`密码为:${password}`) },
                                        ],

                                    )}>添加链接</Button>
                                <div style={style.itemBottom}></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
const mapStateProps = (state) => {
    return { state }
}
const actionCreators = {}
MyResume = connect(mapStateProps, actionCreators)(MyResume)
export default MyResume;