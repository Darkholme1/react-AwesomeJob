const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.users
const Job = model.jobs

//添加职位
Router.post('/add', function (req, res) {
    let job = JSON.parse(req.body.job)
    job = {
        user: req.cookies.user_id,
        ...job
    }
    Job.create(job, function (err, doc) {
        if (!err) {
            res.send({ code: 0 })
        } else {
            res.send({ code: 1 })
        }
    })
})
//更新职位
Router.post('/update', function (req, res) {
    let job = JSON.parse(req.body.job)
    Job.updateOne(
        { _id: job._id },
        {
            $set: job
        }, function (err) {
            if (!err) {
                res.send({ error: 0 })
            } else {
                res.send({ error: 1 })
            }
        }
    )
})
//删除职位
Router.post('/delete', function (req, res) {
    Job.deleteOne(
        { _id: req.body._id },
        function (err) {
            if (!err) {
                res.send({ error: 0 })
            } else {
                res.send({ error: 1 })
            }
        }
    )
})
//职位列表-当前BOSS
Router.get('/list_mine', function (req, res) {
    Job.find({
        user: req.cookies.user_id
    }, function (err, doc) {
        if (!err) {
            res.send({
                error: 0,
                doc: doc
            })
        } else {
            res.send({
                error: 1
            })
        }
    })
})
//职位列表
Router.get('/list', function (req, res) {
    Job.find({})
        .populate({
            path: 'user',
            select: 'company city nickname position avatar company_info'
        }).exec(function (err, doc) {
            if (!err) {
                res.send({
                    error: 0,
                    doc: doc
                })
            } else {
                res.send({
                    error: 1
                })
            }
        })
})
//根据boss查询其发布的职位
Router.get('/list_boss', function (req, res) {
    Job.find({ user: req.query.user_id })
        .populate({
            path: 'user',
            select: 'company city nickname position avatar company_info'
        }).exec(function (err, doc) {
            if (!err) {
                res.send({
                    error: 0,
                    doc: doc
                })
            } else {
                res.send({
                    error: 1
                })
            }
        })
})
//查询职位详情
Router.get('/job_detail', function (req, res) {
    Job.findOne({ _id: req.query.id })
        .populate({
            path: 'user',
            select: 'company city nickname position avatar company_info'
        }).exec(function (err, doc) {
            if (!err) {
                res.send({
                    error: 0,
                    doc: doc
                })
            } else {
                res.send({
                    error: 1
                })
            }
        })
})


module.exports = Router