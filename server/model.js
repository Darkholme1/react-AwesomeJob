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
//子文档
const jobwantSchema = new mongoose.Schema({
    job_name: { type: Array, require: true },
    city: { type: String, require: true },
    salary: { type: Array, require: true }
})
const workexpSchema = new mongoose.Schema({
    company: { type: String, require: true },
    start: { type: Array, require: true },
    end: { type: Array, require: true },
    position: { type: Array, require: true },
    department: { type: String },
    job_content: { type: String, require: true },
    job_performance: { type: String }
})
const projectexpSchema = new mongoose.Schema({
    project_name: { type: String, require: true },
    charactor: { type: String, require: true },
    start: { type: Array, require: true },
    end: { type: Array, require: true },
    project_content: { type: String, require: true },
    project_performance: { type: String },
    link: { type: String }
})
const eduexpSchema = new mongoose.Schema({
    edu_bg: { type: Array, require: true },
    school: { type: String, require: true },
    major: { type: String, require: true },
    edu_time: { type: Array, require: true },
    school_exp: { type: String, require: true }
})
const companyInfoSchema = new mongoose.Schema({
    financing: { type: String, require: true },
    scale: { type: String, require: true },
    trade: { type: String, require: true },
    introduction: { type: String, require: true },
    address: { type: Array, require: true },
    web: { type: Array }
})

//文档
const users = mongoose.model('users', new mongoose.Schema({
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: Number, require: true },
    avatar: { type: String },//头像
    nickname: { type: String },//称呼
    city: { type: String },//城市
    //BOSS
    position: { type: String },//职位
    company: { type: String },//公司名称
    company_info: companyInfoSchema,//公司信息
    //牛人
    sex: { type: String }, //性别
}))
const resumes = mongoose.model('resumes', new mongoose.Schema({
    // user_id: { type: String, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    /* user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }, */
    basic_info: { type: Object, require: true },
    job_want: [jobwantSchema],
    work_exp: [workexpSchema],
    project_exp: [projectexpSchema],
    edu_exp: [eduexpSchema]
}))
const jobs = mongoose.model('jobs', new mongoose.Schema({
    // user_id: { type: String, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    job_name: { type: String, require: true },
    salary: { type: Array, require: true },
    city: { type: Array, require: true },
    address: { type: String, require: true },
    work_exp: { type: String, require: true },
    education: { type: String, require: true },
    detail: { type: String, require: true }
}))
const chats = mongoose.model("chats", new mongoose.Schema({
    chat_id: { type: String, require: true },
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'users', require: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'users', require: true },
    text: { type: String, require: true, default: '' },
    create_time: { type: Number, default: new Date().getTime() },
    read: { type: Boolean, default: false }
}))



module.exports = {
    users: users,
    resumes: resumes,
    jobs: jobs,
    chats: chats
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