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

module.exports = Router