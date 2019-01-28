import React, { Component } from 'react';
import { NavBar, Icon, List, TextareaItem,Toast } from 'antd-mobile'

/* import { connect } from 'react-redux'
import { updateJobDetail } from '@/redux/actions/jobDetail-action' */

import formvalidate from '@/common/formvalidate'

class JobDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            content: ''
        }
    }
    componentWillMount(){
        if(sessionStorage.job){
            this.setState({
                content: JSON.parse(sessionStorage.job).detail
            })
        }
    }
    save() {


        const submit = formvalidate([
            {
                data: this.state.content,
                required: () => {
                    Toast.info('请输入职位详情', 1.5)
                }
            }
        ])
        if (submit === 1) {
            /* this.props.history.goBack.arguments = [
                values.content
            ] */
            let job =JSON.parse(sessionStorage.job)
            job.detail = this.state.content
            sessionStorage.job = JSON.stringify(job)
            this.props.history.goBack()
        }

    }
    render() {
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ position: 'fixed', width: '100%', top: '0', zIndex: '2' }}
                    rightContent={<span onClick={()=>{this.save()}}>保存</span>}>
                职位详情
                </NavBar>
                <List renderHeader={() => '请描述职位详情'}>
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

/* const mapStateProps = (state) => {
    return { state }
}
const actionCreators = { updateJobDetail }
JobDetail = connect(mapStateProps, actionCreators)(JobDetail) */
export default JobDetail;