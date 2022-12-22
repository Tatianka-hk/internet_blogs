const express = require('express');

const User = require('../models/user')
const{changed_name_checker,email_checker  } =  require('../middleware/check')
const { validationResult } = require('express-validator');
const Section =  require('../models/section')
const Post = require('../models/post')
const jwt = require('jsonwebtoken')
require('dotenv').config()
// mostrar pagina personal de usario
//get /user 
exports.user_get=( req,res )=>{
    console.log("USER GET")
    console.log(req.headers.authorization )
    try{
        if (typeof req.headers.authorization != 'undefined'){
            jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err){console.log(err)}
                User
                .findOne({_id:req.params.id})
                .then((result)=>{ 
                    console.log("get")
                    res.render("account",{title:"Personal account", user:result})
                })
                    .catch((error)=> {console.log(error)})
                      })
            
       
    }
    }catch(err){
        console.log(err)
    }
    
    
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

//
exports.put_project_name = (req, res)=>{
    console.log(req.params.name)
    console.log("put")
    const errors = validationResult(req)
        const title="Creating blog"
        if(!errors.isEmpty()) {
            const alert = errors.array()
            res.render('create_blog', { title, alert })
        }
        else{
            // User
            //     .updateOne({ id:req.params.id , "blogs.block_name" : req.params.name}, {$set: { "blogs.$.block_name": req.body.inputed_name}})
            //     .then(()=>{console.log("Changed")})
            User
            .findById(req.params.id)
            .then((result)=>{

                console.log(result)
                result["blogs"].forEach(section => { 
                    console.log(section.block_name ); 
                    if (section._id == req.params.name ){
                        section.block_name = req.body.inputed_name
                        console.log("t - ",  req.body.inputed_name)
                        
                    }
                } ) 
                console.log(result.blogs)
                User
                .findByIdAndUpdate(req.params.id, {blogs:result.blogs})
                .then(()=>{console.log("Changed")})
            })
}
}

// delete project
// delete user/:id/delete_project/:name
exports.delete_porject = (req, res)=>{
    console.log("delete")
    User
    .findById(req.params.id)
    .then((result)=>{

        console.log(result)
        let new_list = [];
        result["blogs"].forEach(section => { 
            console.log(section.block_name ); 
            if (section.block_name != req.params.name ){
                new_list.push(section)
                console.log("ti - ". section)
                
            }
        } ) 
        console.log(new_list)
        User
        .findByIdAndUpdate(req.params.id, {blogs:new_list})
        .then(()=>{console.log("Changed")})
    })

    Section
    .deleteMany({id_user: req.params.id, name_of_blog: req.params.name })
    .then(()=>{console.log("DELETED")})
    Post
    .deleteMany({id_user: req.params.id, name_of_blog: req.params.name})
    .then(()=>{console.log("DELETED")})
}

// publish 
// post user/:id/publish_project/:name
exports.post_publish = (req, res) =>{
    console.log("POST PUBLISH")
    console.log(req.params.name)
    User
    .findById(req.params.id)
    .then((result)=>{

        console.log(result)
        let url ;
        result["blogs"].forEach(section => { 
            console.log(section.block_name ); 
            if (section.block_name == req.params.name ){
                url = section._id;
                section.publich = true;
                console.log("ti - ", section)
                
            }
        } ) 
        console.log(url)
        User
        .findByIdAndUpdate(req.params.id, {blogs: result["blogs"]})
        .then(()=>{console.log("Changed")})

        Section
        .updateMany({id_user: req.params.id, name_of_blog: req.params.name }, {blog_id:url})
        .then(()=>{console.log("CHANGED")})

        Post
        .updateMany({user_id: req.params.id, blog_name: req.params.name }, {blog_id:url})
        .then(()=>{console.log("CHANGED")})

        res.redirect(`/fabula/${url}/`)


    })


  
}
// view
// get /fabula/:id
exports.get_view = (req, res)=>{
    Section
    .find({blog_id: req.params.id})
    .then((result)=>{ 
        let data="";
        let end="end827rifddfo"
        result.forEach(section => {
        //     console.log("++++++++++++++++++++++++++");
        //     console.log(section)
         data+=(section["code"]);data+=end 
        //     console.log("++++++++++++++++++++++++++");;
         console.log("data" , data[89509])
    } ) 
   res.render("view.ejs",{title:"Blog", sections:result, data, user_id:req.params.id, blog_name:req.params.name })
    })
    .catch((error)=>{console.log(error)
        //res.render("blog.ejs",{title:"Blog", sections:[]})
    }) 

}
