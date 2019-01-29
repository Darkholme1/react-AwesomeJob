const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.users
const Job = model.jobs

//添加职位
Router.post('/add', function (req, res) {
    let job = JSON.parse(req.body.job)
    job = {
        user_id: req.cookies.user_id,
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
        user_id: req.cookies.user_id
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


module.exports = Router