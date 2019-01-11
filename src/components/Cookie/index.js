import React, { Component } from 'react';
import axios from '../../api/axios'
import { withRouter } from 'react-router-dom'
import { addUser } from '../../redux/actions/user-action'
import { connect } from 'react-redux'

class Cookie extends Component {
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
                    
                } else {
                    //redux设置
                    this.props.addUser(res.data)
                }
            }).catch(err => {
                console.log(err)
            })
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
Cookie = connect(mapStateProps, actionCreators)(Cookie)
export default withRouter(Cookie);