const express =require('express')
const mongoose=require('mongoose');
const path = require('path');
var sha256 = require('js-sha256')
const User = require('./models/user')
const {message_check,register_check,login_checker} = require('./middleware/check')


const { check, validationResult, body } = require('express-validator')
require('dotenv').config()

const app =  express();
const PORT = 5000;
const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true } ))
app.use(express.json())

const bd =process.env.mongo;
mongoose
       .connect(bd, { useNewUrlParser: true, useUnifiedTopology: true })
       .then((res)=>console.log("Connection to DB"))
       .catch((error)=>console.log(error))

app.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
})

app.get('/', (req,res) =>{ 
    const title = 'Start';
    res.render("index.ejs",{title})
})
app.post('/',message_check, (req,res) =>{
    const title="Start"
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const alert = errors.array()
        res.render('index', { title,alert })
    }
    else{
        console.log("CHECK")
        res.render('index', { title})
    }
})

app.get('/login', (req,res) =>{ 
    const title = 'Start';
    res.render("login.ejs",{title})
})
app.post('/login',login_checker, (req,res) =>{
    console.log("lol")
    const title="Login"
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const alert = errors.array()
        res.render('login', { title,alert})
    }
    else{
        console.log("CHECK")
        var pass=process.env.salt;
        pass+=req.body.password
        var pas=sha256(pass);
        console.log(pass)
        User
            .findOne({ name:req.body.name , password:pas})
            .then((result)=>{ 
                if (result!= null){
                    res.render("account.ejs",{title:"Personal account"})}
                
                else{
                    const no_matching="no correct"
                    res.render('login', { title,no_matching})
                }
            })
    }
})

                
                

app.get('/register', (req,res) =>{ 
    const title = 'Register';
    res.render("register.ejs",{title})
})

app.post('/register', register_check, (req,res) =>{
    const title="Register"
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const alert = errors.array()
        res.render('register', { title, alert })
    }
    else{
        var pass=process.env.salt;
        pass+=req.body.password
        let user = new User({ name:req.body.name,email:req.body.email, password:pass});
        user.save();
        res.render("account.ejs",{title:"Personal account"})
    }
})
