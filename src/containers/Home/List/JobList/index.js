import React, { Component } from 'react';
import {NavBar,Grid} from 'antd-mobile'

class JobList extends Component {
    constructor(props){
        super(props)
        this.state = {
            fuckingGrid: 0
        }
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({
                fuckingGrid: 1
            })
        }, 0);
    }
    render() {
        const data = Array.from(new Array(9)).map((_val, i) => ({ icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png', text: `name${i}`, }));
        return (
            <div>
                <Grid data={data} isCarousel onClick={_el => console.log(_el)} />
            </div>
        );
    }
}

export default JobList;