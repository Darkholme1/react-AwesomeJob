import React, { Component } from 'react';
import { NavBar, Icon, Button, List, InputItem, Picker, TextareaItem } from 'antd-mobile'

import { connect } from 'react-redux'
import { addProjectExp } from '@/redux/actions/projectexp-action'

import commonStyle from '../../../../../style'
import { pickerWorkTime, pickerWorkEnd } from '../../../../../../common/picker'

class AddProjectExp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectExp: {
                project_name: '',
                charactor: '',
                start: '',
                end: '',
                project_content: '',
                project_performance: '',
                link: ''
            }
        }
    }
    componentWillMount(){
        setTimeout(() => {
            this.setState({
                projectExp: this.props.state.projectExp
            })
        }, 0);
    }
    render() {
        const Item = List.Item
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ width: '100%' }}
                >
                    项目经历
                </NavBar>
                <List>
                    <InputItem
                        clear
                        placeholder="请输入项目名称"
                        value={this.state.projectExp.project_name}
                        onChange={v => {
                            this.setState({
                                projectExp: {
                                    ...this.state.projectExp,
                                    project_name: v
                                }
                            })
                        }}>
                        项目名称
                    </InputItem>
                    <InputItem
                        clear
                        placeholder="请输入担任角色"
                        value={this.state.projectExp.charactor}
                        onChange={v => {
                            this.setState({
                                projectExp: {
                                    ...this.state.projectExp,
                                    charactor: v
                                }
                            })
                        }}>
                        担任角色
                    </InputItem>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerWorkTime}
                        title="开始时间"
                        value={this.state.projectExp.start}
                        onOk={v => {
                            this.setState({
                                projectExp: {
                                    ...this.state.projectExp,
                                    start: v
                                }
                            })
                        }}
                    >
                        <List.Item arrow="horizontal">开始时间</List.Item>
                    </Picker>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerWorkEnd}
                        title="结束时间"
                        value={this.state.projectExp.end}
                        onOk={v => {
                            this.setState({
                                projectExp: {
                                    ...this.state.projectExp,
                                    end: v
                                }
                            })
                        }}
                    >
                        <List.Item arrow="horizontal">结束时间</List.Item>
                    </Picker>
                </List>
                <List style={{ marginTop: '10px' }}>
                    <Item
                        extra="extra"
                        arrow="horizontal"
                        onClick={() => {
                            this.props.addProjectExp(this.state.projectExp)
                            this.props.history.push('/project_content')
                        }}>项目描述</Item>
                    <Item
                        extra="extra"
                        arrow="horizontal"
                        onClick={() => {
                            this.props.addProjectExp(this.state.projectExp)
                            this.props.history.push('/project_performance')
                        }}>项目业绩</Item>
                    <InputItem
                        placeholder="选填"
                        value={this.state.projectExp.link}
                        onChange={v => {
                            this.setState({
                                projectExp: {
                                    ...this.state.projectExp,
                                    link: v
                                }
                            })
                        }}>
                        项目链接
                    </InputItem>
                </List>
                <div style={commonStyle.footerBtnContainer}>
                    <Button type="primary" style={commonStyle.footerBtn}>保存</Button>
                </div>
            </div>
        );
    }
}

const mapStateProps = state => {
    return { state }
}
const actionCreators = { addProjectExp }
AddProjectExp = connect(mapStateProps, actionCreators)(AddProjectExp)
export default AddProjectExp;