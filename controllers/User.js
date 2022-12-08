const express = require('express');
const {generateAccessToken} = require('../middleware/for_auth')
const User = require('../models/user')
const{changed_name_checker,email_checker  } =  require('../middleware/check')
const { validationResult } = require('express-validator');
// mostrar pagina personal de usario
//get /user 
exports.user_get=(req,res)=>{
    User
        .findOne({_id:req.params.id})
        .then((result)=>{ 
            console.log(req.params)
            access_token = generateAccessToken(result)
            res.render("account.ejs",{title:"Personal account", user:result, access_token:access_token})
        })
            .catch((error)=> {console.log(error)})
}
// cambiar nomdre de usario 
//put./user/:id/name
exports.change_name = (req,res)=>{
    let errores = changed_name_checker(req.body.edit_name_input)//check inputed data
    if (errores.length == 0 ){//if no errors
    User
                .findOneAndUpdate({_id:req.params.id}, {name:req.body.edit_name_input})
                .then((result)=>{
                    res.render('account', { title:"personal page",  user:result, access_token:"t" })
                })
            }
}
// cambiar correo electronico de usario 
//put./user/:id/name  
exports.change_email = (req,res)=>{
    let errores = email_checker(req.body.edit_name_input)//check inputed data
    console.log(errores)
    if (errores.length == 0 ){//if no errors
    User
                .findOneAndUpdate({_id:req.params.id}, {email:req.body.edit_name_input})
                .then((result)=>{
                    res.render('account', { title:"personal page",  user:result, access_token:"t" })
                })
            }
}


//delete user account
//delete /user/:id
exports.delete_user = (req,res)=>{
        User
            .findByIdAndDelete(req.params.id)
            .then((result)=>{})
        res.redirect("/")
    }

// render /user/:id/create_blog
exports.get_create_blog = (req,res)=>{
        User
            .findOne({_id:req.params.id})
            .then((result)=>{ 
                // console.log(result)
                res.render("create_blog.ejs",{title:"creating blog", user:result}) })
} 

//add blog
// post user/:id/create_blog
exports.post_create_blog =  (req,res)=>{
        const errors = validationResult(req)
        const title="Creating blog"
        if(!errors.isEmpty()) {
            const alert = errors.array()
            res.render('create_blog', { title, alert })
        }
        else{
            let new_blog={block_name: req.body.name }
            console.log(new_blog)
            User
            .findOneAndUpdate({_id:req.params.id}, {$push: {blogs:new_blog}})
            .then((result)=>{ })
             
        }
        res.redirect(`/user/${req.params.id}/blog/${req.body.name}`)
        
    }