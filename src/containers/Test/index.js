import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addBoy, deleteBoy, updateBoy } from '../../redux/actions/boy-action'
import { addGirl } from '../../redux/actions/girl-action'
import { Button } from 'antd-mobile'
import ajax from '../../api/ajax'
import axios from '../../api/axios'


class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {
                word1: 'deep',
                word2: 'dark',
                word3: 'develop'
            }
        }
    }
    componentDidMount() {
        axios.get('/user/list').then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }
    sendAjax() {
        this.props.addBoy('mark', 'guangdong')
        // console.log(this.state.params)
        ajax({
            method: 'get',
            url: 'http://127.0.0.1:8081/get_test',
            data: this.state.params,
            async: true,
            success: function (data) {
                console.log(data)
            },
            error: function (err) {
                console.log(err)
            }
        })
        axios.post('/post_test', this.state.params)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get('/get_test', {
            params: this.state.params
        }).then(function (res) {
            console.log(res)
        }).catch(function (err) {
            console.log(err)
        })
    }
    showBoys() {
        console.log(this.props.state.boys)
    }
    showGirls() {
        console.log(this.props.state.girls)
    }
    addUser = () => {
        axios.get('/user/query', {
            params: {
                username: 'vvv'
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        // const store = this.props.store;
        const addBoy = this.props.addBoy;
        return (
            <div>
                <button onClick={()=>this.props.addBoy('van', 'deep')}>addVan</button>
                <Button onClick={this.sendAjax.bind(this)}>send ajax</Button>
                <button onClick={addBoy.bind(this, 'billy', 'ass')}>addBilly</button>
                <button onClick={this.props.addGirl.bind(this,'mm','thats good')}>addgirl</button>
                <button onClick={this.props.deleteBoy.bind(this,'van')}>delete boy</button>
                <button onClick={this.props.updateBoy.bind(this,'van','ass we can')}>update boy</button>
                <button onClick={this.showBoys.bind(this)}>show boys</button>
                <br/>
                <button onClick={this.addUser}>add user</button>
            </div>
        );
    }
}
const mapStateProps = (state) => {
    return { state }
}
const actionCreators = { addBoy, addGirl, deleteBoy, updateBoy }
Test = connect(mapStateProps, actionCreators)(Test)
export default Test;