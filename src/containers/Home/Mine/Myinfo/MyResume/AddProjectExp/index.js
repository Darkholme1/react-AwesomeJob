import React, { Component } from 'react';
import { NavBar, Icon, Button, List, InputItem, Picker, TextareaItem } from 'antd-mobile'

import { createForm } from 'rc-form'

import commonStyle from '../../../../../style'
import { pickerWorkTime } from '../../../../../../common/picker'

class AddProjectExp extends Component {
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ width: '100%' }}
                >
                    项目经历
                </NavBar>
                <List>
                    <InputItem
                        clear
                        {...getFieldProps('projectName')}
                        placeholder="请输入项目名称">
                        项目名称
                    </InputItem>
                    <InputItem
                        clear
                        {...getFieldProps('charactor')}
                        placeholder="请输入担任角色">
                        担任角色
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
                    <TextareaItem
                        title="项目描述"
                        placeholder="请填写项目描述(可多行输入)"
                        data-seed="logId"
                        ref={el => this.autoFocusInst = el}
                        autoHeight
                        count={300}
                    />
                    <TextareaItem
                        title="项目业绩"
                        placeholder="选填(可多行输入)"
                        data-seed="logId"
                        ref={el => this.autoFocusInst = el}
                        autoHeight
                    />
                    <InputItem
                        {...getFieldProps('projectLink')}
                        placeholder="选填">
                        项目链接
                    </InputItem>
                </List>
                <div style={commonStyle.footerBtnContainer}>
                    <Button type="primary" style={commonStyle.footerBtn}>保存</Button>
                </div>
            </div>
        );
    }
}

export default createForm()(AddProjectExp);