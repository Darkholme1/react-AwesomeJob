import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';

import axios from '@/api/axios'

class Chatted extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <div>
                <NavBar
                    leftContent={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}>
                    沟通过
                </NavBar>
            </div>
        );
    }
}

export default Chatted;