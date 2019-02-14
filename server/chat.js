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
        text: req.body.text,
        create_time: new Date().getTime()
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
//聊天列表
Router.get('/list', function (req, res) {
    Chat.find({
        $or: [
            { "to": req.cookies.user_id },
            { "from": req.cookies.user_id }
        ],
    })
        .sort({ chat_id: -1, create_time: -1, })
        .exec(function (err, doc) {
            if (!err) {
                res.send({
                    error: 0,
                    doc: doc
                })
            } else {
                res.send({ error: 1 })
            }
        })

    /* Chat.aggregate([
        // { "$match": { "to": req.cookies.user_id} },
        {
            "$match": {
                "$or": [
                    { "to": req.cookies.user_id },
                    { "from": req.cookies.user_id }
                ]
            }
        },
        { "$sort": { "create_time": -1 } },
        {
            "$group": {
                _id: "$chat_id",
                "from": { "$first": "$from" },
                "to": { "$first": "$to" },
                "text": { "$first": "$text" },
                "create_time": { "$first": "$create_time" },
                "un_read": { "$sum": "$un_read" }
            }
        },
    ], function (err, doc) {
        if (!err) {
            let data = doc
            data.forEach((item, index, arr) => {
                User.findOne({ _id: item.from }, function (err, doc) {
                    if (!err) {
                        arr[index].nickname = doc.nickname
                        arr[index].avatar = doc.avatar

                        if (index === arr.length - 1) {
                            setTimeout(() => {
                                res.send({
                                    error: 0,
                                    doc: data
                                })
                            }, 0);
                        }
                    } else {
                        res.send({ error: 1 })
                    }
                })
            });

        } else {
            res.send({ error: 1 })
        }
    }) */
})
//已读
Router.post('/read', function (req, res) {
    Chat.updateMany(
        {
            chat_id: req.body.chat_id,
            to: req.cookies.user_id
        },
        {
            $set: { un_read: 0 }
        },
        function (err, doc) {
            if (!err) {
                res.send({ error: 0 })
            } else {
                res.send({ error: 1 })
            }
        }
    )
})
//获取聊天列表的用户头像和姓名
Router.get('/list_user', function (req, res) {
    let arr_user = JSON.parse(req.query.arr_user)
    console.log(arr_user)
    User.find({
        _id: {
            $in: arr_user
        }
    },
        'nickname avatar',
        function (err, doc) {
            if (!err) {
                res.send({
                    error: 0,
                    doc: doc
                })
            } else {
                res.send({ error: 1 })
            }
        })
})

module.exports = Router