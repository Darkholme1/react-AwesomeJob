const express = require('express')
const Router = express.Router()
const model = require('./model')
const Chat = model.chats
const User = model.users

//添加一条信息
Router.post('/add', function (req, res) {
    let data = {
        chat_id: req.body.chat_id,
        from: req.body.from,
        to: req.body.to,
        text: req.body.text
    }
    Chat.create(data, function (err, doc) {
        if (!err) {
            res.send({ error: 0 })
        } else {
            res.send({ error: 1 })
        }
    })
})
//初始化聊天信息
Router.get('/init', function (req, res) {

    new Promise((resolve, reject) => {
        User.findOne(
            { _id: req.query.to },
            'nickname avatar',
            function (err, doc) {
                if (!err) {
                    let user = doc
                    resolve(user)
                } else {
                    res.send({ error: 1 })
                }
            })
    }).then((user) => {
        Chat.find(
            { chat_id: req.query.chat_id },
            function (err, doc) {
                if (!err) {
                    res.send({
                        error: 0,
                        user: user,
                        msg: doc
                    })
                } else {
                    res.send({ error: 0 })
                }
            }
        )
    })
})

module.exports = Router