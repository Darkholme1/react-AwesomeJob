import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { NavBar, Menu, ActivityIndicator, PullToRefresh, Button } from 'antd-mobile'
const data = [
    {
        value: '1',
        label: 'Food',
        children: [
            {
                label: 'All Foods',
                value: '1',
                disabled: false,
            },
            {
                label: 'Chinese Food',
                value: '2',
            }, {
                label: 'Hot Pot',
                value: '3',
            }, {
                label: 'Buffet',
                value: '4',
            }, {
                label: 'Fast Food',
                value: '5',
            }, {
                label: 'Snack',
                value: '6',
            }, {
                label: 'Bread',
                value: '7',
            }, {
                label: 'Fruit',
                value: '8',
            }, {
                label: 'Noodle',
                value: '9',
            }, {
                label: 'Leisure Food',
                value: '10',
            }],
    }, {
        value: '2',
        label: 'Supermarket',
        children: [
            {
                label: 'All Supermarkets',
                value: '1',
            }, {
                label: 'Supermarket',
                value: '2',
                disabled: true,
            }, {
                label: 'C-Store',
                value: '3',
            }, {
                label: 'Personal Care',
                value: '4',
            }],
    },
    {
        value: '3',
        label: 'Extra',
        isLeaf: true,
        children: [
            {
                label: 'you can not see',
                value: '1',
            },
        ],
    },
];
function genData() {
    const dataArr = [];
    for (let i = 0; i < 20; i++) {
        dataArr.push(i);
    }
    return dataArr;
}
class GeniusList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initData: '',
            show: false,
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: [],
        };
    }
    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() => this.setState({
            height: hei,
            data: genData(),
        }), 0);
    }
    onChange = (value) => {
        let label = '';
        data.forEach((dataItem) => {
            if (dataItem.value === value[0]) {
                label = dataItem.label;
                if (dataItem.children && value[1]) {
                    dataItem.children.forEach((cItem) => {
                        if (cItem.value === value[1]) {
                            label += ` ${cItem.label}`;
                        }
                    });
                }
            }
        });
        console.log(label);
    }
    handleClick = (e) => {
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
            show: !this.state.show,
        });
        // mock for async data loading
        if (!this.state.initData) {
            setTimeout(() => {
                this.setState({
                    initData: data,
                });
            }, 500);
        }
    }

    onMaskClick = () => {
        this.setState({
            show: false,
        });
    }

    render() {
        const initData = this.state.initData
        const show = this.state.show
        const menuEl = (
            <Menu
                className="foo-menu"
                data={initData}
                value={['1', '3']}
                onChange={this.onChange}
                height={document.documentElement.clientHeight * 0.6}
            />
        );
        const loadingEl = (
            <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </div>
        );
        return (
            <div className={show ? 'menu-active' : ''}>
                <div>
                    <NavBar
                        leftContent="Menu"
                        icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />}
                        onLeftClick={this.handleClick}
                        className="top-nav-bar"
                    >
                        Here is title
          </NavBar>
                </div>
                {show ? initData ? menuEl : loadingEl : null}
                {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
                <PullToRefresh
                    damping={60}
                    ref={el => this.ptr = el}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                    direction={this.state.down ? 'down' : 'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({ refreshing: true });
                        setTimeout(() => {
                            this.setState({ refreshing: false });
                        }, 1000);
                    }}
                >
                    {this.state.data.map(i => (
                        <div key={i} style={{ textAlign: 'center', padding: 20 }}>
                            {this.state.down ? 'pull down' : 'pull up'} {i}
                        </div>
                    ))}
                </PullToRefresh>
            </div>
        );
    }
}

export default GeniusList;