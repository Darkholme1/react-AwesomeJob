import React, { Component } from 'react';
import { List, TextareaItem, NavBar, Icon,Button } from 'antd-mobile'

import { createForm } from 'rc-form'

import commonStyle from '../../../../../style'

class EditCompanyIntroduce extends Component {
    render() {
        const { getFieldProps } = this.props.form
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ position: 'fixed', width: '100%', top: '0', zIndex: '2' }}>
                    公司介绍
                </NavBar>
                <List renderHeader={() => '编辑'} style={{ marginTop: '45px' }}>
                    <TextareaItem
                        {...getFieldProps('count', {
                            initialValue: '计数功能,我的意见是...',
                        })}
                        rows={6}
                        count={1000}
                        autoHeight
                    />
                </List>
                <div style={commonStyle.footerBtnContainer}>
                    <Button type="primary" style={commonStyle.footerBtn}>保存</Button>
                </div>
            </div>
        );
    }
}

export default createForm()(EditCompanyIntroduce);