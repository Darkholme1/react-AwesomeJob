import React, { Component } from 'react';
import { List, Picker, NavBar, Icon, Button, InputItem } from 'antd-mobile'

import { createForm } from 'rc-form'

import commonStyle from '../../../../../style'
import { pickerFinancing, pickerPPLNum } from '../../../../../../common/picker'

class CompanyBasic extends Component {
    render() {
        const { getFieldProps } = this.props.form
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ position: 'fixed', width: '100%', top: '0', zIndex: '2' }}>
                    基本信息
                </NavBar>
                <List style={{ marginTop: '45px' }} renderHeader={'杭州老王科技'}>
                    <Picker data={pickerFinancing} cols={1} {...getFieldProps('financing')} className="forss">
                        <List.Item arrow="horizontal">融资情况</List.Item>
                    </Picker>
                    <Picker data={pickerPPLNum} cols={1} {...getFieldProps('pplNum')} className="forss">
                        <List.Item arrow="horizontal">人员规模</List.Item>
                    </Picker>
                </List>
                <List style={{marginTop:'10px'}}>
                    <InputItem {...getFieldProps('trade')}>
                        所在行业
                    </InputItem>
                </List>
                <div style={commonStyle.footerBtnContainer}>
                    <Button type="primary" style={commonStyle.footerBtn}>保存</Button>
                </div>
            </div>
        );
    }
}

export default createForm()(CompanyBasic);