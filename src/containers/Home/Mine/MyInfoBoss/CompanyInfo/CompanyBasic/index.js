import React, { Component } from 'react';
import { List, Picker, NavBar, Icon, Button, InputItem, Toast } from 'antd-mobile'

import { connect } from 'react-redux'
import { updateUser } from '@/redux/actions/user-action'

import commonStyle from '../../../../../style'
import { pickerFinancing, pickerPPLNum } from '../../../../../../common/picker'
import formvalidate from '@/common/formvalidate'
import axios from '@/api/axios'

class CompanyBasic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            financing: '',
            scale: '',
            trade: ''
        }
    }
    componentWillMount() {
        if (this.props.state.user.company_info != null) {
            let company_info = this.props.state.user.company_info
            this.setState({
                financing: [company_info.financing],
                scale: [company_info.scale],
                trade: company_info.trade
            })
        }
    }
    submit() {
        const submit = formvalidate([
            {
                data: this.state.financing,
                required: () => {
                    Toast.info('请选择融资情况', 1.5)
                }
            },
            {
                data: this.state.scale,
                required: () => {
                    Toast.info('请选择人员规模', 1.5)
                }
            },
            {
                data: this.state.trade,
                required: () => {
                    Toast.info('请输入所在行业')
                }
            }
        ])
        if (submit === 1) {
            let data = {
                financing: this.state.financing[0],
                scale: this.state.scale[0],
                trade: this.state.trade
            }
            axios.post('/user/company', {
                data: JSON.stringify(data)
            }).then(res => {
                if (res.data.code === 0) {
                    this.props.updateUser({
                        company_info: res.data.company_info
                    })
                    Toast.info('保存成功', 1.5, () => {
                        this.props.history.goBack()
                    })
                } else if (res.data.code === 1) {
                    Toast.info('未知错误', 1.5)
                }
            }).catch(err => {
                Toast.info('未知错误', 1.5)
                console.log(err)
            })
        }
    }
    render() {
        return (
            <div>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    style={{ position: 'fixed', width: '100%', top: '0', zIndex: '2' }}>
                    基本信息
                </NavBar>
                <List style={{ marginTop: '45px' }} renderHeader={this.props.state.user.company}>
                    <Picker
                        data={pickerFinancing}
                        cols={1}
                        value={this.state.financing}
                        onOk={v => {
                            this.setState({
                                financing: v
                            })
                        }}>
                        <List.Item arrow="horizontal">融资情况</List.Item>
                    </Picker>
                    <Picker
                        data={pickerPPLNum}
                        cols={1}
                        value={this.state.scale}
                        onOk={v => {
                            this.setState({
                                scale: v
                            })
                        }}>
                        <List.Item arrow="horizontal">人员规模</List.Item>
                    </Picker>
                </List>
                <List style={{ marginTop: '10px' }}>
                    <InputItem
                        placeholder='如(互联网、金融、医疗...)'
                        value={this.state.trade}
                        onChange={v => {
                            this.setState({
                                trade: v
                            })
                        }}>
                        所在行业
                    </InputItem>
                </List>
                <div style={commonStyle.footerBtnContainer}>
                    <Button type="primary" style={commonStyle.footerBtn} onClick={() => { this.submit() }}>保存</Button>
                </div>
            </div>
        );
    }
}
const mapStateProps = state => {
    return { state }
}
const actionCreator = { updateUser }
CompanyBasic = connect(mapStateProps, actionCreator)(CompanyBasic)

export default CompanyBasic;