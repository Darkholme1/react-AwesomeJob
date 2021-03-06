import React, { Component } from 'react';
import { NavBar, Icon, List, TextareaItem, Toast } from 'antd-mobile'

import { connect } from 'react-redux'
import {updateProjectExp} from '@/redux/actions/projectexp-action'

import formvalidate from '@/common/formvalidate'
class ProjectPerformance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }
    componentWillMount(){
        if (this.props.state.projectExp.project_performance !== '') {
            this.setState({
                content: this.props.state.projectExp.project_performance
            })
        }
    }
    save() {


        const submit = formvalidate([
            {
                data: this.state.content,
                required: () => {
                    Toast.info('请输入项目业绩', 1.5)
                }
            }
        ])
        if (submit === 1) {
            this.props.updateProjectExp({
                project_performance: this.state.content
            })
            this.props.history.goBack()
        }

    }
    render() {
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ width: '100%' }}
                    rightContent={<span onClick={() => { this.save() }}>保存</span>}
                >
                    项目业绩
                </NavBar>
                <List renderHeader={() => '请描述项目业绩'}>
                    <TextareaItem
                        value={this.state.content}
                        rows={10}
                        count={1000}
                        placeholder="..."
                        onChange={v => {
                            this.setState({
                                content: v
                            })
                        }}
                    />
                </List>
            </div>
        );
    }
}
const mapStateProps = (state) => {
    return { state }
}
const actionCreators = {updateProjectExp}
ProjectPerformance = connect(mapStateProps, actionCreators)(ProjectPerformance)
export default ProjectPerformance;