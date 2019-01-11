import React, { Component } from 'react';
import { NavBar, Icon, List, TextareaItem } from 'antd-mobile'

import { createForm } from 'rc-form'

class JobContent extends Component {
    render() {
        const { getFieldProps } = this.props.form
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ width: '100%' }}
                    rightContent={<span onClick={() => { }}>保存</span>}
                >
                    工作内容
                </NavBar>
                <List renderHeader={() => '请描述工作内容'}>
                    <TextareaItem
                        {...getFieldProps('content')}
                        rows={10}
                        count={1000}
                        placeholder="..."
                    />
                </List>
            </div>
        );
    }
}

export default createForm()(JobContent);