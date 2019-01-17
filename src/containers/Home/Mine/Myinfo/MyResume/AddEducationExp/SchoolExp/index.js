import React, { Component } from 'react';
import { NavBar, Icon, List, TextareaItem, Toast } from 'antd-mobile'

import { connect } from 'react-redux'
import { updateEduExp } from '@/redux/actions/eduexp-action'
import formvalidate from '@/common/formvalidate'
class SchoolExp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }
    componentWillMount() {
        if (this.props.state.eduExp.school_exp !== '') {
            this.setState({
                content: this.props.state.eduExp.school_exp
            })
        }
    }
    save() {


        const submit = formvalidate([
            {
                data: this.state.content,
                required: () => {
                    Toast.info('请输入在校经历', 1.5)
                }
            }
        ])
        if (submit === 1) {
            /* this.props.history.goBack.arguments = [
                values.content
            ] */
            this.props.updateEduExp({
                school_exp: this.state.content
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
const actionCreators = { updateEduExp }
SchoolExp = connect(mapStateProps, actionCreators)(SchoolExp)
export default SchoolExp;