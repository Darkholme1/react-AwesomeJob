import React, { Component } from 'react';
import { List, Picker, NavBar, Icon, Button, InputItem, TextareaItem } from 'antd-mobile'

import { createForm } from 'rc-form'

import commonStyle from '../../../../../style'
class CompanyAddress extends Component {
    render() {
        const { getFieldProps } = this.props.form
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ position: 'fixed', width: '100%', top: '0', zIndex: '2' }}>
                    公司地址
                </NavBar>
                <List renderHeader={() => '添加地址'} style={{ marginTop: '45px' }}>
                    <TextareaItem
                        {...getFieldProps('count', {
                            initialValue: '',
                        })}
                        rows={3}
                    />
                </List>
                <div style={commonStyle.footerBtnContainer}>
                    <Button type="primary" style={commonStyle.footerBtn}>保存</Button>
                </div>
            </div>
        );
    }
}

export default createForm()(CompanyAddress);