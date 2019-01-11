var mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/boss';
mongoose.connect(DB_URL, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('Connection success!')
    }
})

/* const resumes = mongoose.model('resumes', new mongoose.Schema({
    job_want: { type: Array, required: true },
    work_exp: { type: Array },
    project_exp: { type: Array },
    education_exp: { type: Array },
    github: { type: Array }
})) */
const jobwantSchema = new mongoose.Schema({
    'job_name': { type: Array, require: true },
    'city': { type: String, require: true },
    'salary': { type: Array, require: true }
})
const workexpSchema = new mongoose.Schema({
    'company': { type: String, require: true },
    'start': { type: Array, require: true },
    'end': { type: Array, require: true },
    'position': { type: Array, require: true },
    'department': { type: String },
    'job_content': { type: String, require: true },
    'job_performance': { type: String }
})

const users = mongoose.model('users', new mongoose.Schema({
    'user': { type: String, require: true },
    'pwd': { type: String, require: true },
    'type': { type: Number, require: true },
    'avatar': { type: String },//头像
    'nickname': { type: String },//称呼
    'city': { type: String },//城市
    //BOSS
    'position': { type: String },//职位
    'company': { type: String },//公司名称
    //牛人
    'sex': { type: String }, //性别
}))
const resumes = mongoose.model('resumes', new mongoose.Schema({
    'user_id': { type: String, require: true },
    'basic_info': { type: Object, require: true },
    'job_want': [jobwantSchema],
    'work_exp': [workexpSchema]
}))



module.exports = {
    users: users,
    resumes: resumes
    /* getModel: function (name) {
        return mongoose.model(name)
    } */
}

/* const models = {
    users: {
        'user': { type: String, require: true },
        'pwd': { type: String, require: true },
        'type': { type: Number, require: true },
        'avatar': { type: String },//头像
        'nickname': { type: String },//称呼
        'city': { type: String },//城市
        //BOSS
        'position': { type: String },//职位
        'company': { type: String },//公司名称
        //牛人
        'sex': { type: String }, //性别
        // 'resume': { type: Object }, //简历
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
} */