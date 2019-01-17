import React, { Component } from 'react'
import axios from '../../../../../api/axios'
import { NavBar, Icon, Button, List, Modal, Toast } from 'antd-mobile'

import { connect } from 'react-redux'
import { deleteWorkexp } from '@/redux/actions/workexp-action'
import { deleteProjectExp } from '@/redux/actions/projectexp-action'
import { deleteEduExp } from '@/redux/actions/eduexp-action'

import style from './style'

// const datatype = require('../../../../../common/datatype.js')

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
            jobWant: [],
            workExp: [],
            projectExp: [],
            eduExp: []
        }
        /* var timestamp = new Date()-new Date(1997,3,1)
        timestamp = parseInt(timestamp/1000/60/60/24/365)

        console.log(timestamp) */
    }
    componentWillMount() {
        this.props.deleteWorkexp()
        this.props.deleteProjectExp()
        this.props.deleteEduExp()
        if (sessionStorage.isEdit) {
            sessionStorage.removeItem('isEdit')
        }
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
                        age: `${age} · ${work}`,
                        jobWant: this.state.resume.job_want,
                        workExp: this.state.resume.work_exp,
                        projectExp: this.state.resume.project_exp,
                        eduExp: this.state.resume.edu_exp
                    })
                }

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
        Toast.loading('Loading...', 30, () => {
            console.log('Load complete !!!');
        });


    }
    componentWillUnmount() {
        document.querySelector('body').removeAttribute('style')
    }
    componentDidUpdate() {
        if (this.state.axiosOk) {
            Toast.hide()
        }
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
                <div style={this.state.axiosOk ? { opacity: '1' } : { opacity: '0' }}>
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

                                        })()
                                    }
                                </div>
                                {
                                    (() => {

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

                                    })()
                                }
                            </div>
                        </div>
                        <div tag="realStudy-exp" >
                            <div tag="innerContainer" style={style.innerContainerItem}>
                                <span style={{ fontSize: '18px', fontWeight: 'bold', ...style.itemPadding }}>工作经历</span>
                                <div style={style.itemContainer}>
                                    {
                                        (() => {

                                            return this.state.workExp.map((current, index, arr) => {
                                                return <div
                                                    key={index}
                                                    style={this.state.touch === `workExp${index}` ?
                                                        { ...style.itemBox, ...style.bgTap } :
                                                        style.itemBox}
                                                    onTouchStart={() => {
                                                        this.setState({
                                                            touch: `workExp${index}`
                                                        })
                                                    }}
                                                    onTouchEnd={() => {
                                                        this.setState({
                                                            touch: ''
                                                        })
                                                    }}
                                                    onClick={() => {
                                                        this.props.history.push({
                                                            pathname: '/addworkexp',
                                                            query: {
                                                                workExp: current
                                                            }
                                                        })
                                                    }}>
                                                    <div style={style.itemHeader}>
                                                        <span style={style.itemTitle}>{current.company}</span>

                                                        <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                                    </div>
                                                    <div>
                                                        <span style={style.itemTag}>{current.position[1]}</span>
                                                        <section style={style.itemContent}>

                                                            {current.job_content}

                                                        </section>
                                                    </div>
                                                </div>
                                            })

                                        })()
                                    }
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

                                    {(() => {
                                        return this.state.projectExp.map((current, index, arr) => {
                                            return <div
                                                key={index}
                                                style={this.state.touch === `projectExp${index}` ?
                                                    { ...style.itemBox, ...style.bgTap } :
                                                    style.itemBox}
                                                onTouchStart={() => {
                                                    this.setState({
                                                        touch: `projectExp${index}`
                                                    })
                                                }}
                                                onTouchEnd={() => {
                                                    this.setState({
                                                        touch: ''
                                                    })
                                                }}
                                                onClick={() => {
                                                    this.props.history.push({
                                                        pathname: '/addprojectexp',
                                                        query: {
                                                            projectExp: current
                                                        }
                                                    })
                                                }}>
                                                <div style={style.itemHeader}>
                                                    <span style={style.itemTitle}>{current.project_name}</span>

                                                    <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                                </div>
                                                <div>
                                                    <span style={style.itemTag}>{current.charactor}</span>
                                                    <section style={style.itemContent}>
                                                        {current.project_content}
                                                    </section>
                                                </div>
                                            </div>
                                        })
                                    })()}
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
                                    {(() => {
                                        return this.state.eduExp.map((current, index, arr) => {
                                            return <div
                                                key={index}
                                                style={this.state.touch === `eduExp${index}` ?
                                                    { ...style.itemBox, ...style.bgTap } :
                                                    style.itemBox}
                                                onTouchStart={() => {
                                                    this.setState({
                                                        touch: `eduExp${index}`
                                                    })
                                                }}
                                                onTouchEnd={() => {
                                                    this.setState({
                                                        touch: ''
                                                    })
                                                }}
                                                onClick={() => {
                                                    this.props.history.push({
                                                        pathname: '/addeducationexp',
                                                        query: {
                                                            eduExp: current
                                                        }
                                                    })
                                                }}>
                                                <div style={style.itemHeader}>
                                                    <span style={style.itemTitle}>{current.school}</span>

                                                    <Icon type="right" size="xs" color="rgb(136, 136, 136)" />

                                                </div>
                                                <div>
                                                    <span style={style.itemTag}>
                                                        {current.edu_bg[0] + " " + current.major}
                                                    </span>
                                                    <section style={style.itemContent}>
                                                        {current.school_exp}
                                                    </section>
                                                </div>
                                            </div>
                                        })
                                    })()}
                                </div>
                                <div style={{ ...style.itemPadding, ...style.btnContainer }}>
                                    <Button onClick={() => { this.props.history.push('/addeducationexp') }}>添加教育经历</Button>
                                    <div style={style.itemBottom}></div>
                                </div>
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
const actionCreators = { deleteWorkexp, deleteProjectExp, deleteEduExp }
MyResume = connect(mapStateProps, actionCreators)(MyResume)
export default MyResume;