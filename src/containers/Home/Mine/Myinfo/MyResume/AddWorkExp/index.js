import React, { Component } from 'react';
import { NavBar, Icon, Button, List, InputItem, Picker, TextareaItem, Toast } from 'antd-mobile'

import { createForm } from 'rc-form'

import commonStyle from '../../../../../style'
import { pickerJob, pickerWorkTime } from '../../../../../../common/picker'

class AddWorkExp extends Component {
    render() {
        const { getFieldProps } = this.props.form
        const Item = List.Item
        return (
            <div style={{ marginBottom: '70px' }}>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ width: '100%' }}
                >
                    工作经历
                </NavBar>
                <List>
                    <InputItem
                        clear
                        {...getFieldProps('company')}
                        placeholder="请输入公司名称">
                        公司名称
                    </InputItem>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerWorkTime}
                        title="开始时间"
                        {...getFieldProps('startWork', {
                            initialValue: ['', ''],
                        })}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                    >
                        <List.Item arrow="horizontal">开始时间</List.Item>
                    </Picker>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerWorkTime}
                        title="结束时间"
                        {...getFieldProps('endWork', {
                            initialValue: ['', ''],
                        })}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                    >
                        <List.Item arrow="horizontal">结束时间</List.Item>
                    </Picker>
                </List>
                <List style={{ marginTop: '10px' }}>
                    <Picker extra="请选择"
                        cols={2}
                        data={pickerJob}
                        title="职位"
                        {...getFieldProps('jobName', {
                            initialValue: ['', ''],
                        })}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                    >
                        <List.Item arrow="horizontal">职位</List.Item>
                    </Picker>
                    <InputItem
                        clear
                        {...getFieldProps('department')}
                        placeholder="选填">
                        所属部门
                    </InputItem>
                </List>
                <List style={{ marginTop: '10px' }}>
                    {/* <TextareaItem
                        title="工作内容"
                        placeholder="请填写工作内容(可多行输入)"
                        data-seed="logId"
                        ref={el => this.autoFocusInst = el}
                        autoHeight
                        count={300}
                    />
                    <TextareaItem
                        title="工作业绩"
                        placeholder="选填(可多行输入)"
                        data-seed="logId"
                        ref={el => this.autoFocusInst = el}
                        autoHeight
                    /> */}
                    <Item
                        extra="extra content"
                        arrow="horizontal"
                        onClick={() => { 
                            this.props.history.push('/job_content')
                        }}>工作内容</Item>
                    <Item
                        extra="extra content"
                        arrow="horizontal"
                        onClick={() => { }}>工作业绩</Item>
                </List>
                <div style={commonStyle.footerBtnContainer}>
                    <Button type="primary" style={commonStyle.footerBtn}>保存</Button>
                </div>
            </div>
        );
    }
}

export default createForm()(AddWorkExp);