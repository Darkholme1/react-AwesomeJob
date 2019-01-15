import React, { Component } from 'react';
import { NavBar, Icon, List, TextareaItem, Toast } from 'antd-mobile'

import { connect } from 'react-redux'
import {addProjectExp} from '@/redux/actions/projectexp-action'
import formvalidate from '@/common/formvalidate'
class ProjectContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
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
                    项目描述
                </NavBar>
                <List renderHeader={() => '请描述项目内容'}>
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
const actionCreators = {addProjectExp}
ProjectContent = connect(mapStateProps, actionCreators)(ProjectContent)
export default ProjectContent;