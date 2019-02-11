const express = require('express');
const userRouter = require('./user')
const resumeRouter = require('./resume')
const jobRouter = require('./job')
const cookieParser = require('cookie-parser')

/* mongoose.connect(DB_URL, {useNewUrlParser:true}, function(err){
　　if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!') }
})
const User = mongoose.model('bs_users',new mongoose.Schema({
    username: {type: String,require: true},
    age: {type:Number,require:false}
})) */


const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/user', userRouter)
app.use('/resume', resumeRouter)
app.use('/job', jobRouter)

//socket
io.on('connection', function (socket) {
    socket.on('sendmsg', function (data) {
        console.log(data)
        io.emit('recvmsg', data)
    })
})

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.post('/test', function (req, res) {
    res.send('123')
})
app.get('/cookie', function (req, res) {
    res.send(req.cookies)
    console.log(req.cookies)
})
app.get('/get_test', function (req, res) {
    var response = {
        word1: req.query.word1,
        word2: req.query.word2,
        word3: req.query.word3
    }
    console.log(response)
    res.send(JSON.stringify(response))
})
app.post('/post_test', function (req, res) {
    var response = {
        word1: req.body.word1,
        word2: req.body.word2,
        word3: req.body.word3
    }
    console.log(response)
    res.json(response)
})
var sv = server.listen(8081, function () {
    var host = sv.address().address
    var port = sv.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
// app.listen(8081)