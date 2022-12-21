const express = require('express');
const User = require('../models/user')
const Section = require('../models/section')
const {change} = require('../middleware/change_block')
const Post = require('../models/post')
const { validationResult } = require('express-validator');
var fs = require('fs');
var path = require('path');
const upload = require('../middleware/upload_image')
// get /user/:user_id/blog/:blog_id
exports.blog_get = (req, res)=>{
    console.log()
    Section
    .find({id_user:req.params.id ,name_of_blog:req.params.name}).sort({id: 1})
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
   res.render("blog.ejs",{title:"Blog", sections:result, data, user_id:req.params.id, blog_name:req.params.name })
    })
    .catch((error)=>{console.log(error)
        //res.render("blog.ejs",{title:"Blog", sections:[]})
    }) 
}
// post /user/:user_id/blog/:blog_id
exports.blog_post = (req,res)=>{
    console.log("POST")
    console.log(req.body.act)
    change(req.body.act,req.params.id, req.params.name, req.body.s_name, req.body.s_id, req.body.scs, req.body.s_text, req.body.text_number , req.body.s_start, req.body.s_end, req.body.s_add, req.body.style, req.body.s_color)
    res.redirect(`/user/${req.params.id}/blog/${req.body.name}`)
    
}
// get /user/:user_id/blog/:blog_id/create_post
exports.get_create_post = (req,res)=>{
    console.log("aqui")
    try{
        console.log("ku")
    res.render("create_post.ejs", {title:"create post"})
   
} catch(error){console.log("error")}
}

// get /user/:user_id/blog/:blog_id/create_post
exports.get_create_post = (req,res)=>{
    console.log("aqui")
    try{
        console.log("ku")
    res.render("create_post.ejs", {title:"create post"})
   
} catch(error){console.log("error")}
}

//post /user/:user_id/blog/:blog_id/create_post
exports.post_create_post = (req,res)=>{
    let now = new Date();
    code = `<div class='section post'><a class='texto_centro a' href='/user/${req.params.id}/blog/${req.params.name}/post/${req.body.name}'>${req.body.name}</a>${now}</div>` ;
    
    const title="Creating post"
    let alert='norm';
    console.log("name - " , req.body.name);

    if (req.body.name.length == 0  ){
        alert="No inputed post name"
         res.render('create_post', { title, alert })
    }
    Section 
    .findOne({id_user : req.params.id,name_of_blog:req.params.name , name_of_section:'posts'})
    .then((result)=>{
        console.log(result)
        let post={post_name:req.body.name}
        
        if (result == null){
            
            console.log("tut")
            
            let section = new Section({code:code, post:true, name_of_section:'posts',id_user:req.params.id,  name_of_blog:req.params.name, data:now , posts:post});
            console.log("tut")
            section.save();
            console.log("tut")
            res.redirect(`/user/${req.params.id}/blog/${req.params.name}/post/${req.body.name}`)
        }
        else{
            console.log(result["posts"])
            result["posts"].forEach( pos =>{
                if (pos.post_name == req.body.name){
                    alert = 'post ya is exicted'
                }
           })
           if (alert == 'norm'){
            code +=result["code"];
            Section.findOneAndUpdate({id_user : req.params.id,name_of_blog:req.params.name , name_of_section:'posts'}, {code:code, $push:{posts:post}}).then(()=>{console.log("ADDED block")})
            res.redirect(`/user/${req.params.id}/blog/${req.params.name}/post/${req.body.name}`)
        }
        else{
            res.render('create_post', { title, alert })
        }
           
        }
        
    })
       
}

exports.blog_upload_file = (req,res)=>{
    console.log("desca")

    var obj = {
 
        data: fs.readFileSync(path.join(path.dirname(__dirname)) + '/uploads/' + req.file.filename),
        contentType: 'image/png'
    
    }
    Section
        . findByIdAndUpdate(req.params.s_id)
        .then((result)=>{
            code=result["code"];
            let val = result.img.data; 
            //   console.log("val - ", val);

            let inserted_text = `i8938423740298341730' src='data:image/${obj.contentType};base64,${obj.data.toString('base64')}`
            
            let temp_code = result["code"].substring(0,result["code"].indexOf("i8938423740298341730") ) ;
                temp_code+= inserted_text+"'"
             temp_code += result["code"].substring(result["code"].indexOf("i8938423740298341730") + 45  ) 
              console.log(temp_code)

                Section
                .findByIdAndUpdate(req.params.s_id, {img:obj, code:temp_code})
                .then((result)=>{console.log("CHANGED")})
        })
        
    
}//i8938423740298341732

exports.blog_upload_file2 = (req,res)=>{
    console.log("desca")

    var obj = {
 
        data: fs.readFileSync(path.join(path.dirname(__dirname)) + '/uploads/' + req.file.filename),
        contentType: 'image/png'
    
    }
    Section
        . findByIdAndUpdate(req.params.s_id)
        .then((result)=>{
            code=result["code"];
            let val = result.img.data; 
            //   console.log("val - ", val);

            let inserted_text = `i8938423740298341732' src='data:image/${obj.contentType};base64,${obj.data.toString('base64')}`
            
            let temp_code = result["code"].substring(0,result["code"].indexOf("i8938423740298341732") ) ;
                temp_code+= inserted_text+"'"
             temp_code += result["code"].substring(result["code"].indexOf("i8938423740298341732") + 45  ) 
              console.log(temp_code)

                Section
                .findByIdAndUpdate(req.params.s_id, {img:obj, code:temp_code})
                .then((result)=>{console.log("CHANGED")})
        })
        
    
}//i8938423740298341733

exports.blog_upload_file3 = (req,res)=>{
    console.log("desca")

    var obj = {
 
        data: fs.readFileSync(path.join(path.dirname(__dirname)) + '/uploads/' + req.file.filename),
        contentType: 'image/png'
    
    }
    Section
        . findByIdAndUpdate(req.params.s_id)
        .then((result)=>{
            code=result["code"];
            let val = result.img.data; 
            //   console.log("val - ", val);

            let inserted_text = `i8938423740298341733' src='data:image/${obj.contentType};base64,${obj.data.toString('base64')}`
            
            let temp_code = result["code"].substring(0,result["code"].indexOf("i8938423740298341733") ) ;
                temp_code+= inserted_text+"'"
             temp_code += result["code"].substring(result["code"].indexOf("i8938423740298341733") + 45  ) 
              console.log(temp_code)

                Section
                .findByIdAndUpdate(req.params.s_id, {img:obj, code:temp_code})
                .then((result)=>{console.log("CHANGED")})
        })
        
    
}//i8938423740298341734
exports.blog_upload_file4 = (req,res)=>{
    console.log("desca")

    var obj = {
 
        data: fs.readFileSync(path.join(path.dirname(__dirname)) + '/uploads/' + req.file.filename),
        contentType: 'image/png'
    
    }
    Section
        . findByIdAndUpdate(req.params.s_id)
        .then((result)=>{
            code=result["code"];
            let val = result.img.data; 
            //   console.log("val - ", val);

            let inserted_text = `i8938423740298341734' src='data:image/${obj.contentType};base64,${obj.data.toString('base64')}`
            
            let temp_code = result["code"].substring(0,result["code"].indexOf("i8938423740298341734") ) ;
                temp_code+= inserted_text+"'"
             temp_code += result["code"].substring(result["code"].indexOf("i8938423740298341734") + 45  ) 
              console.log(temp_code)

                Section
                .findByIdAndUpdate(req.params.s_id, {img:obj, code:temp_code})
                .then((result)=>{console.log("CHANGED")})
        })
        
    
}//i8938423740298341733