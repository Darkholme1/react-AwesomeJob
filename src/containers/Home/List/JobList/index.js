import React, { Component } from 'react';
import {NavBar,Toast} from 'antd-mobile'

class JobList extends Component {
    constructor(props){
        super(props)
        this.state = {
            axiosOk: false,
            refreshing: true,
            height: document.documentElement.clientHeight - 90,
            width: document.documentElement.clientWidth,
            jobs: [],
            jobList: []
        }
    }
    componentDidMount(){
        
    }
    getJobList(){
        
    }
    render() {
        return (
            <div>
                <NavBar
                    style={{ position: 'fixed', top: '0', width: '100%', zIndex: '1' }}>
                    Here is title
                </NavBar>
            </div>
        );
    }
}

export default JobList;