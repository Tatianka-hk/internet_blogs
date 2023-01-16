const { change_password  } = require('../middleware/for_auth');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//=============================================
// register
//=============================================

// get auth/register 
exports.register_get =(req,res) => { 
    const title = 'Register';
    res.render('register.ejs' ,{ title });
}
// post auth/register 
exports.register_post =  (req,res) => {
    const title = 'Register';
    //validate data
    const errors = validationResult(req);
     //output errors
    if(!errors.isEmpty()) {
        const alert = errors.array();
        res.render('register', { title, alert });
    }
    else{
        pas=change_password(req.body.password); //coding password
        var user = new User({ name:req.body.name,email:req.body.email,password:pas });//create new user in bd
        user.save()
            .then(()=>{ res.redirect(`/user/${user._id}`)})
            .catch((error)=>{console.log(error)});
            console.log("rue")
           
    }
}
//=============================================
// login
//=============================================

// get auth/login 
exports.login_get =  (req,res) =>{ 
    const title = 'Start';
    res.render("login.ejs", { title, token : 'undefined', url : '/' }); 
}
// post auth/login 
exports.login_post = (req,res) =>{
    const title = 'Login';
    //validate data
    const errors = validationResult(req);
     //output errors
    if( !errors.isEmpty() ) {
        const alert = errors.array();
        res.render('login', { title,alert , token : 'indefined', url : '/' });
    }
    else{
        console.log('no error');
        pas=change_password(req.body.password); //coding password
        User
            .findOne({ name:req.body.name , password:pas })//verifity user
            .then((result)=>{ 
                if ( result!= null ){
                    res.redirect( `/user/${result["_id"]}` );
                }                
                else{
                    const no_matching="no correct";
                    res.render('login', { title,no_matching })// output error
                }
            }).catch((error)=>{
                console.log(error)
                const no_matching="no correct"
                res.render('login', { title,no_matching })});
    }
}