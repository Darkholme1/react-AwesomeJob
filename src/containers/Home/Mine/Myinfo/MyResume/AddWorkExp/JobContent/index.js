import React, { Component } from 'react';
import { NavBar, Icon, List, TextareaItem, Toast } from 'antd-mobile'

import { connect } from 'react-redux'
import { updateWorkexp } from '@/redux/actions/workexp-action'

import formvalidate from '@/common/formvalidate'

class JobContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }
    componentWillMount() {
        if (this.props.state.workExp.jobContent !== '') {
            this.setState({
                content: this.props.state.workExp.jobContent
            })
        }
    }
    save() {


        const submit = formvalidate([
            {
                data: this.state.content,
                required: () => {
                    Toast.info('请输入工作业绩', 1.5)
                }
            }
        ])
        if (submit === 1) {
            /* this.props.history.goBack.arguments = [
                values.content
            ] */
            this.props.updateWorkexp({
                jobContent: this.state.content
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
                    工作内容
                </NavBar>
                <List renderHeader={() => '请描述工作内容'}>
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
const actionCreators = { updateWorkexp }
JobContent = connect(mapStateProps, actionCreators)(JobContent)
export default JobContent;