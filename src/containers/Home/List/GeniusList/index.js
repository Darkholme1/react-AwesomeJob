import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { NavBar, Menu, ActivityIndicator, PullToRefresh, ListView, Toast } from 'antd-mobile'

import axios from '@/api/axios'

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];
const NUM_ROWS = 10;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataArr = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
    }
    return dataArr;
}
class GeniusList extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight - 90,
            width: document.documentElement.clientWidth,
            resumes: [],
            resumeList: []
        };
    }
    componentWillMount() {
        axios.get('/resume/list').then(res => {
            if (res.data.error === 0) {
                this.setState({
                    resumes: res.data.doc
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
                            jobWant: item.job_want[0].job_name[1],
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
                console.log(this.state.resumes)
                console.log(this.state.resumeList)
            }
        }).catch(err => {
            Toast.info('未知错误', 1.5)
        })
    }
    componentDidMount() {
        /* const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() => this.setState({
            height: hei,
            data: genData(),
        }), 0); */
    }
    componentDidMount() {
        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(genData()),
                refreshing: false,
                isLoading: false,
            });
        }, 1500);
    }

    onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
        // simulate initial Ajax
        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                isLoading: false,
            });
        }, 600);
    };

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.rData = [...this.rData, ...genData(++pageIndex)];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    };

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        let index = this.state.resumeList.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = this.state.resumeList.length - 1;
            }
            const obj = this.state.resumeList[index--];
            return (
                <div key={rowID}
                    style={{
                        width: this.state.width,
                        padding: '0 15px',
                        backgroundColor: 'white',
                    }}
                >
                    <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
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
                            <div style={{ fontSize: '16px' }}>
                            <span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span> 元/任务
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div>
                <NavBar
                    style={{ position: 'fixed', top: '0', width: '100%', zIndex: '1' }}>
                    Here is title
                </NavBar>
                <ListView
                    key={this.state.useBodyScroll ? '0' : '1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    // renderHeader={() => <span>Pull to refresh</span>}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    renderRow={row}
                    renderSeparator={separator}
                    style={{
                        border: '1px solid #ddd',
                        position: 'absolute',
                        height: this.state.height,
                        width: this.state.width,
                        top: '45px',
                        overflowX: 'hidden'
                    }}
                    pullToRefresh={<PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
                    onEndReached={this.onEndReached}
                    pageSize={5}
                />
            </div>

        );
    }
}

export default GeniusList;