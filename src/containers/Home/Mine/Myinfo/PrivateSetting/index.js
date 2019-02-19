import React, { Component } from 'react';
import { List, Switch, Toast, NavBar, Icon, Tag } from 'antd-mobile'
import { createForm } from 'rc-form';

import axios from '@/api/axios'

class PrivateSetting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            switch: false
        }
    }
    componentWillMount() {
        this.getShow()
    }
    getShow() {
        axios.get('/resume/query').then(res => {
            if (res.status === 200) {
                this.setState({
                    switch: res.data.show
                })
            }
        }).catch(err => {

        })
    }
    changeShow(show) {
        axios.post("/resume/private", {
            show: JSON.stringify(show)
        }).then(res => {
            if (res.status === 200 && res.data.error === 0) {
                if (show === false) {
                    Toast.info('已隐藏简历', 1.5)
                } else {
                    Toast.info('已展示简历', 1.5)
                }
            }
        }).catch(err => {

        })
    }
    render() {
        const Item = List.Item;
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <NavBar
                    leftContent={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}>
                    隐私设置
                </NavBar>
                <List style={{marginBottom: 15}}>
                    <Item
                        extra={<Switch {...getFieldProps('switch', {
                            initialValue: this.state.switch,
                            valuePropName: 'checked',
                            onChange: (val) => {
                                console.log(val);
                                this.changeShow(val)
                                // Do not `setState` with rc-form
                                // this.setState({ checked1: val });
                            },
                        })} />}
                    >是否展示简历</Item>
                </List>
                <span style={{
                    color: 'gray',
                    marginLeft: 15
                }}>隐藏后BOSS将无法主动查看您的简历</span>
            </div>
        );
    }
}

export default createForm()(PrivateSetting);