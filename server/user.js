const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.users
const Resume = model.resumes
// var mongoose = require('mongoose');
// const md5 = require('js-md5')
const _hide = { 'pwd': 0 }//不读取密码
const datatype = require('../src/common/datatype')

Router.get('/list', function (req, res) {
    User.find({}).exec(function (err, doc) {
        res.json(doc)
    })
})
Router.get('/info', function (req, res) {
    res.json({
        code: 1
    })
})
//根据用户名查询用户
Router.get('/query', function (req, res) {
    var username = req.query.username
    User.find({ user: username }).exec(function (err, doc) {
        res.send(doc)
    })
})
//用户cookie校验
Router.get('/cookie', function (req, res) {
    if (!req.cookies.user_id) {
        res.send({
            code: 1
        })

    } else {
        User.findOne({ _id: req.cookies.user_id }, _hide).exec(function (err, doc) {
            res.send(doc)
        })
    }
})
//登录
Router.post('/login', function (req, res) {
    User.findOne({
        user: req.body.user,
        pwd: req.body.pwd
    }).exec(function (err, doc) {
        if (!doc) {
            res.send({
                code: 1,
                msg: '密码错误'
            })
        } else {
            //设置用户cookie30天后过期
            res.cookie('user_id', doc._id, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true })
            res.send({
                code: 0,
                msg: '登录成功',
                user: doc
            })
        }
    })
})
//注销
Router.get('/logout', function (req, res) {

    if (res.clearCookie('user_id')) {
        res.send({
            code: 0
        })
    } else {
        res.send({
            code: 1
        })
    }
})
//添加用户
Router.post('/add', function (req, res) {
    var data = {
        user: req.body.user,
        pwd: req.body.pwd,
        type: req.body.type,
        avatar: '0',
    }
    var user = new User(data)
    user.save(function (err, doc) {
        if (err) {
            res.send({ code: 0 })
        } else {
            var resume = new Resume({
                user_id: doc._id
            })
            resume.save()
            res.send(doc)
        }
    })
    /* User.create(data, function (err, doc) {
        res.send(doc)
    }) */
})
//完善信息
Router.post('/userinfo', function (req, res) {
    var update = req.body.type == datatype.user('BOSS') ? {
        city: req.body.city,
        avatar: req.body.avatar,
        nickname: req.body.nickname,
        position: req.body.position,
        company: req.body.company,
        address: req.body.address
    } : {
            city: req.body.city,
            avatar: req.body.avatar,
            nickname: req.body.nickname,
            /*             sex: req.body.sex,
                        birth: req.body.birth */
        }
    User.updateOne(
        { _id: req.cookies.user_id },
        {
            $set: update
        },
        function (error) {
            if (error) {
                console.log(error)
                res.send({ code: 1 })
            } else {
                User.findOne({ _id: req.cookies.user_id }, _hide).exec(function (err, doc) {
                    res.send(doc)
                })
            }
        })
})
//公司-更新详情
Router.post('/company', function (req, res) {
    let data = JSON.parse(req.body.data)
    let company_info
    User.findOne(
        { _id: req.cookies.user_id },
        function (err, doc) {
            if (!err) {
                if (doc.company_info) {
                    company_info = JSON.parse(JSON.stringify(doc.company_info))
                    company_info = {
                        ...company_info,
                        ...data
                    }
                } else {
                    company_info = data
                }
                User.updateOne(
                    { _id: req.cookies.user_id },
                    {
                        $set: {
                            company_info: company_info
                        }
                    },
                    function (err) {
                        if (!err) {
                            res.send({
                                code: 0,
                                company_info: company_info
                            })
                        } else {
                            res.send({
                                code: 1
                            })
                        }
                    }
                )
            }
        })
})

module.exports = Router