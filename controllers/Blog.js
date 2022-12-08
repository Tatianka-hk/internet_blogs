const express = require('express');
const User = require('../models/user')
const Section = require('../models/section')
const {change} = require('../middleware/change_block')

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
        // console.log("data" , data)
    } ) 
   res.render("blog.ejs",{title:"Blog", sections:result, data, user_id:req.params.id})
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