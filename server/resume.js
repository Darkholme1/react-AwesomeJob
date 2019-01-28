const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.users
const Resume = model.resumes

//查询当前用户的简历
Router.get('/query', function (req, res) {
    Resume.findOne({ user_id: req.cookies.user_id }, function (err, doc) {
        res.send(doc)
    })
})
//简历-更新个人信息
Router.post('/basicinfo', function (req, res) {
    /* resume: {
        basic_info: {
            mobile,
            email,
            sex,
            birth,
            start_work,
        }
    } */
    let basic_info = {
        mobile: req.body.mobile,
        email: req.body.email,
        sex: JSON.parse(req.body.sex),
        birth: JSON.parse(req.body.birth),
        start_work: JSON.parse(req.body.start_work)
    }
    //若有改动姓名，返回nickname并更新数据
    let code = req.body.nickname ? {
        nickname: req.body.nickname,
        code: 0
    } : {
            code: 0
        }
    if (req.body.nickname) {
        console.log(req.body.nickname)
        User.updateOne(
            { _id: req.cookies.user_id },
            {
                $set: {
                    nickname: req.body.nickname
                }
            },
            function (err) {

            }
        )
    }
    Resume.updateOne(
        { user_id: req.cookies.user_id },
        {
            $set: {
                basic_info: basic_info
            }
        },
        function (err) {
            if (err) {
                console.log(err)
                res.send({ code: 1 })
            } else {
                res.send(code)
            }
        }
    )
    /* User.updateOne(
        { _id: req.cookies.user_id },
        {
            $set: set
        },
        function (error) {
            if (error) {
                console.log(error)
                res.send({ code: 1 })
            } else {
                res.send(code)
            }
        }) */
})
//简历-添加求职期望
Router.post('/add_jobwant', function (req, res) {
    var obj = {
        job_name: JSON.parse(req.body.job_name),
        city: req.body.city,
        salary: JSON.parse(req.body.salary)
    }
    // var jobwant = new 
    Resume.findOne({ user_id: req.cookies.user_id }, function (err, doc) {
        if (err) {
            res.send(err)
        } else {
            var job_want = doc.job_want
            job_want.push(obj)
            Resume.updateOne(
                { user_id: req.cookies.user_id },
                {
                    $set: {
                        job_want: job_want
                    }
                },
                function (err) {
                    if (err) {
                        res.send({ code: 1 })
                    } else {
                        res.send({ code: 0 })
                    }
                }
            )
        }
    })
})
//简历-删除\更改求职期望(逻辑在前端)
Router.post('/update_jobwant', function (req, res) {
    Resume.updateOne(
        { user_id: req.cookies.user_id },
        {
            $set: {
                job_want: JSON.parse(req.body.jobwant_new)
            }
        }, function (err) {
            if (err) {
                res.send({ code: 1 })
            } else {
                res.send({ code: 0 })
            }
        }
    )
})
//简历-添加或更新经历(逻辑在后端) type:1.工作经历,2.项目经历,3.教育经历
Router.post('/update_exp', function (req, res) {
    Resume.findOne(
        { user_id: req.cookies.user_id },
        function (err, doc) {
            let expAll
            let type = JSON.parse(req.body.type)
            switch (type) {
                case 1: {
                    expAll = doc.work_exp
                    break
                }
                case 2: {
                    expAll = doc.project_exp
                    break
                }
                case 3: {
                    expAll = doc.edu_exp
                    break
                }
                default: {
                    res.send({ code: 1 })
                    break
                }
            }
            let expNew = JSON.parse(req.body.exp)
            //添加
            if (req.body.is_edit == 0) {
                expAll.push(expNew)
            }
            //更新
            else if (req.body.is_edit == 1) {

                expAll.forEach((current, index, arr) => {
                    if (current._id == expNew._id) {
                        arr[index] = expNew
                    }
                });
            }
            let setObj
            switch (type) {
                case 1: {
                    setObj = {
                        work_exp: expAll
                    }
                    break
                }
                case 2: {
                    setObj = {
                        project_exp: expAll
                    }
                    break
                }
                case 3: {
                    setObj = {
                        edu_exp: expAll
                    }
                    break
                }
                default: {
                    res.send({ code: 1 })
                    break
                }
            }
            Resume.updateOne(
                { user_id: req.cookies.user_id },
                {
                    $set: setObj
                },
                function (err) {
                    if (err) {
                        res.end({ code: 1 })
                    } else {
                        res.send({ code: 0 })
                    }
                }
            )
        }
    )
})
//删除经历 type:1.工作经历,2.项目经历,3.教育经历
Router.post('/delete_exp', function (req, res) {
    Resume.findOne(
        { user_id: req.cookies.user_id },
        function (err, doc) {
            let expAll
            let type = JSON.parse(req.body.type)
            switch (type) {
                case 1: {
                    expAll = doc.work_exp
                    break
                }
                case 2: {
                    expAll = doc.project_exp
                    break
                }
                case 3: {
                    expAll = doc.edu_exp
                    break
                }
                default: {
                    res.send({ code: 1 })
                    break
                }
            }
            expAll.forEach((current, index, arr) => {
                if (current._id == req.body._id) {
                    arr.splice(index, 1)
                }
            });
            let setObj
            switch (type) {
                case 1: {
                    setObj = {
                        work_exp: expAll
                    }
                    break
                }
                case 2: {
                    setObj = {
                        project_exp: expAll
                    }
                    break
                }
                case 3: {
                    setObj = {
                        edu_exp: expAll
                    }
                    break
                }
                default: {
                    res.send({ code: 1 })
                    break
                }
            }
            Resume.updateOne(
                { user_id: req.cookies.user_id },
                {
                    $set: setObj
                },
                function (err) {
                    if (err) {
                        res.end({ code: 1 })
                    } else {
                        res.send({ code: 0 })
                    }
                }
            )
        }
    )
})

module.exports = Router