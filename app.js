const express =require('express')
const mongoose=require('mongoose');
const path = require('path');
var sha256 = require('js-sha256')
const User = require('./models/user')
const {message_check,register_check,login_checker,blog_checker} = require('./middleware/check')


const { check, validationResult, body } = require('express-validator');
const { ResultWithContext } = require('express-validator/src/chain');
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
                    res.redirect(`/user/${result["_id"]}`)
                }                
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
        res.redirect(`/user/${user["_id"]}`)
    }
})
app.get('/user/:id', (req,res)=>{
    User
        .findOne({_id:req.params.id})
        .then((result)=>{ 
            console.log(result)
            res.render("account.ejs",{title:"Personal account", user:result}) })
})


app.post('/user/:id', (req,res)=>{
    console.log("POST")
    console.log(req.body.edit_name_input)
    console.log(req.body.edit_email_input)
    if (req.body.edit_name_input != undefined && req.body.edit_name_input != ''  ){
        User
            .findOneAndUpdate({_id:req.params.id}, {name:req.body.edit_name_input})
            .then((result)=>{
                // console.log("===========================================")
                // console.log("updated info")
                // console.log(result)  
                // console.log("===========================================")
            })

    }
    if (req.body.edit_email_input != undefined && req.body.edit_email_input != ''  ){
        User
            .findOneAndUpdate({_id:req.params.id}, {email:req.body.edit_email_input})
            .then((result)=>{
                // console.log("===========================================")
                // console.log("updated info")
                // console.log(result)  
                // console.log("===========================================")
            })

    }
   if(req.body.edit_name_input == ''){console.log("null")}
    res.redirect(`/user/${req.params.id}`);
})

app.get('/user/:id/create_blog', (req,res)=>{
    User
        .findOne({_id:req.params.id})
        .then((result)=>{ 
            // console.log(result)
            res.render("create_blog.ejs",{title:"creating blog", user:result}) })
})


app.post('/user/:id/create_blog',blog_checker, (req,res)=>{
    const errors = validationResult(req)
    const title="Creating blog"
    if(!errors.isEmpty()) {
        const alert = errors.array()
        res.render('create_blog', { title, alert })
    }
    else{
        let new_blog={name: req.body.name }
        console.log(new_blog)
        User
        .findOneAndUpdate({_id:req.params.id}, {blogs:new_blog})
        .then((result)=>{ 
              console.log("===========================================")
                console.log("updated info")
                console.log(result)  
                console.log("===========================================")
            // res.render("create_blog.ejs",{title:"creating blog", user:result})
         })
         
    }
    res.redirect(`/user/${req.params.id}/blog/${req.body.name}`)
    
})

app.get(`/user/:id/blog/:name`,(req,res)=>{
    User
    .findOne({_id:req.params.id})
    .then((result)=>{ 
        console.log("===========================================")
        console.log("buscando info")
        console.log(result)  
        console.log("===========================================")
        res.render("blog.ejs",{title:"Blog"}) 
    })
   
    // res.render("blog", {title:"Blog"})
})