require('dotenv').config();
const express = require('express')
    ,cors = require('cors')
    ,session = require('express-session')
    ,mysql = require('mysql')
    ,bodyParser = require('body-parser')
    ,socket = require('socket.io')
    ,quizCtrl = require('./quizCtrl')
    ,{Quiz} = require('./utils/quiz')

const env = {
    SERVER_PORT: "3030",
    SESSION_SECRET:"suce",
    DOMAIN:"localhost:3000",
    CLIENT_ID:"suce",
    CLIENT_SECRET:"suce",
    CALLBACK_URL:"http://localhost:3000",
    CONNECTION_STRING:"mongodb+srv://nathan:!!Nathan89@cluster0.tzray.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    FRONTEND_URL:"localhost:3030"
}

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    FRONTEND_URL
} =  env//process.env;

const app = express();
const io = socket(app.listen(SERVER_PORT, ()=>{console.log('Connected on port',SERVER_PORT)}))

//When a connection to server is made from client
io.on('connection', socket => {
    
    // Host Connection
    socket.on('host-join', (data) => {
        socket.join(data.pin)   
    })
    //Player Join Room
    socket.on('player-joined', (data) => {
       socket.join(data) 
    })
    //Add player to Quiz Object
    socket.on('player-add', (data) => {
        socket.to(`${data.selectedPin}`).emit('room-joined', {name: data.nickname, id: socket.id});
    })

    socket.on('question-over', (data) => {
        socket.to(`${data.pin}`).emit('question-over')
    })
    socket.on('next-question', (data) => {
        socket.to(`${data.pin}`).emit('next-question')

    })
    socket.on('question-answered', (data) => {
        socket.to(data.pin).emit('player-answer', {name : data.name, answer: data.answer})
    })
   
    socket.on('sent-info', (data) => {
        io.to(data.id).emit('sent-info', {answeredCorrect: data.answeredCorrect, score: data.score});
    })

})

app.use(express.static(`${__dirname}/../build`))
app.use(bodyParser.json())
app.use(cors({
    origin:'http://192.168.1.29:3000',
    credentials:true
}))

app.set('db',mysql.createConnection({
    host:'localhost',
    port:'8889',
    user:'root',
    password:'root',
    database:'mykwiz'
}))

app.use(session({
    secret:SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure:false
    }
}))

app.post('/auth', (req,res)=>{
    const user = {
        id:1
    }
    if (req.body.login === "suce" && req.body.password === "pute"){
        req.session.user = user
        res.send(true)
    }else {
        res.send(false)
    }
});

app.get('/auth/user', (req,res)=>{
    req.user
        ? res.status(200).send(req.user)
        : res.status(401).send('Not signed in')
})


/////////////////// DB calls for quizzes

//Get

app.get('/api/getQuizzes', quizCtrl.getQuizzes )
app.get('/api/getquestions/:id', quizCtrl.getQuestions)
app.get('/api/getquestion/:id', quizCtrl.getQuestion)
app.get('/api/getquiz/:id', quizCtrl.getQuiz)

//Put

app.put('/api/updatequestion', quizCtrl.updateQuestion)
app.put('/api/updatequiz', quizCtrl.updateQuiz)

//Post

app.post('/api/newquestion', quizCtrl.addQuestion)
app.post('/api/newquiz', quizCtrl.newQuiz ) 

//Delete

app.delete('/api/deletequiz/:id', quizCtrl.deleteQuiz)
app.delete('/api/deletequestion/:id', quizCtrl.deleteQuestion)