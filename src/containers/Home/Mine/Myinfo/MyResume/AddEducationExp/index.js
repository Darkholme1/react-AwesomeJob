import React, { Component } from 'react';
import { NavBar, Icon, Button, List, InputItem, Picker, TextareaItem } from 'antd-mobile'

import { createForm } from 'rc-form'

import commonStyle from '../../../../../style'
import { pickerEduTime,pickerEduBg } from '../../../../../../common/picker'
class AddEducationExp extends Component {
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ width: '100%' }}
                >
                    教育经历
                </NavBar>
                <List style={{ marginBottom: '10px' }}>
                    <Picker extra="请选择"
                        cols={1}
                        data={pickerEduBg}
                        title="学历"
                        {...getFieldProps('startWork', {
                            initialValue: [''],
                        })}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                    >
                        <List.Item arrow="horizontal">学历</List.Item>
                    </Picker>
                </List>
                <List>
                    <InputItem
                        clear
                        {...getFieldProps('school')}
                        placeholder="请输入学校名称">
                        学校
                    </InputItem>
                    <InputItem
                        clear
                        {...getFieldProps('major')}
                        placeholder="请输入专业名称">
                        专业
                    </InputItem>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerEduTime}
                        title="时间段"
                        {...getFieldProps('startWork', {
                            initialValue: ['', ''],
                        })}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                    >
                        <List.Item arrow="horizontal">时间段</List.Item>
                    </Picker>
                </List>
                <List style={{ marginTop: '10px' }}>
                    <TextareaItem
                        title="在校经历"
                        placeholder="请描述在校经历(可多行输入)"
                        data-seed="logId"
                        ref={el => this.autoFocusInst = el}
                        autoHeight
                        count={300}
                    />
                </List>
                <div style={commonStyle.footerBtnContainer}>
                    <Button type="primary" style={commonStyle.footerBtn}>保存</Button>
                </div>
            </div>
        );
    }
}

export default createForm()(AddEducationExp);