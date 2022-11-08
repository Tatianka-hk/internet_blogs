const express =require('express')
const mongoose=require('mongoose');
const path = require('path');
const { check, validationResult } = require('express-validator')

const app =  express();
const PORT = 5000;
const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true } ))


app.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
})

app.get('/', (req,res) =>{ 
    const title = 'Start';
    res.render("index.ejs",{title})
})
app.post('/',[ 
    check('name', 'Name is no inputed')
    .notEmpty(),
    check('email', 'Email is not valid')
    .exists()
    .isEmail()
    .normalizeEmail(),
    check('phone', 'Phone is not valid')
    .isMobilePhone(),
    check('message', 'Message is no inputed')
    .notEmpty() ], (req,res) =>{
    const title="Start"
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('index', { title,
            alert
        })
    }
    else{
        console.log("CHECK")
        res.render('index', { title
        })
    }
})

app.get('/login', (req,res) =>{ 
    const title = 'Start';
    res.render("login.ejs",{title})
})
app.post('/login',[ 
    check('name', 'Name is no inputed')
    .notEmpty(),
    check('email', 'Email is not valid')
    .exists()
    .isEmail()
    .normalizeEmail(),
    check('phone', 'Phone is not valid')
    .isMobilePhone(),
    check('message', 'Message is no inputed')
    .notEmpty() ], (req,res) =>{
    const title="Start"
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('index', { title,
            alert
        })
    }
    else{
        console.log("CHECK")
        res.render('index', { title
        })
    }
})
app.get('/register', (req,res) =>{ 
    const title = 'Register';
    res.render("register.ejs",{title})
})

app.post('/register',[ 
    check('name', 'Name is no inputed')
    .notEmpty(),
    check('email', 'Email is not valid')
    .exists()
    .isEmail()
    .normalizeEmail(),
    check('password', 'Password is not valid')
    .exists()
    .isLength({ min: 8 })], (req,res) =>{
    const title="Register"
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('register', { title,
            alert
        })
        console.log("NO CHECK")
    }
    else{
        let t="Personal account"
        console.log("CHECK")
        // res.render('index', { t
        // })
    }
})
