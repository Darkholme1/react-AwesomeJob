import React, { Component } from 'react';
import axios from '../../api/axios'
import { withRouter } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { addUser } from '../../redux/actions/user-action'
import { connect } from 'react-redux'
// import * as datatype from '../../common/datatype'
const datatype = require('../../common/datatype')

class AuthRoute extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal1: false
        }
    }
    componentDidMount() {
        if (Object.keys(this.props.state.user).length === 0) {
            axios.get('/user/cookie').then((res) => {
                if (res.data.code === 1) {
                    Toast.info('请先登录', 1.5)
                    setTimeout(() => {
                        this.props.history.push('/login')
                    }, 1500);
                } else {
                    //redux设置
                    this.props.addUser(res.data)
                    var url = this.props.state.user.type == datatype.user('牛人') ? '/geniusinfo' : '/bossinfo'
                    if (!this.props.state.user.nickname) {
                        Toast.info('请完善个人信息', 1.5)
                        setTimeout(() => {
                            this.props.history.push(url)
                        }, 1500);
                    }
                }
            }).catch(err => {

            })
        } else {
            var url = this.props.state.user.type == datatype.user('牛人') ? '/geniusinfo' : '/bossinfo'
            if (!this.props.state.user.nickname) {
                Toast.info('请完善个人信息', 1.5)
                setTimeout(() => {
                    this.props.history.push(url)
                }, 1500);
            }
        }
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}
const mapStateProps = (state) => {
    return { state }
}
const actionCreators = { addUser }
AuthRoute = connect(mapStateProps, actionCreators)(AuthRoute)
export default withRouter(AuthRoute);