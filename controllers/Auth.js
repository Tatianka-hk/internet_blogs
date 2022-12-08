const express = require('express');
const {change_password,  verify_access_token } = require('../middleware/for_auth')
const User = require('../models/user')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
require('dotenv').config()
//=============================================
// register
//=============================================
exports.register_get =(req,res) =>{ 
    const title = 'Register';
    res.render("register.ejs",{title})
}
exports.register_post =  (req,res) =>{
    const title="Register"
    //vaidate data
    const errors = validationResult(req)
     //output errors
    if(!errors.isEmpty()) {
        const alert = errors.array()
        res.render('register', { title, alert })
    }
    else{
        pas=change_password(req.body.password) //coding password
        let user = new User({ name:req.body.name,email:req.body.email, password:pas});//create new user in bd
        user.save();
        res.redirect(`/user/${user["_id"]}`)
    }
}
//=============================================
// login
//=============================================
exports.login_get =  (req,res) =>{ 
    const title = 'Start';
    res.render("login.ejs",{title})
}

exports.login_post = (req,res) =>{
    // if (req.body.access_token != null) {
    // jwt.verify(req.body.access_token,  process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //     if (!err) {
    //    //console.log(decoded.user.id) 
    //    res.redirect(`/user/6384fe6f3f357215ec58aa9f`)}
    //   })}
      
    console.log("login post")
    const title="Login"
    //vaidate data
    const errors = validationResult(req)
     //output errors
    if(!errors.isEmpty()) {
        const alert = errors.array()
        res.render('login', { title,alert})
    }
    else{
        console.log("no error")
        pas=change_password(req.body.password) //coding password
        User
            .findOne({ name:req.body.name , password:pas})//verifity user
            .then((result)=>{ 
                if (result!= null){
                    res.redirect(`/user/${result["_id"]}`)
                }                
                else{
                    const no_matching="no correct"
                    res.render('login', { title,no_matching})// output error
                }
            }).catch((error)=>{
                console.log(error)
                const no_matching="no correct"
            res.render('login', { title,no_matching})})
    }

}
