const express = require('express');
const {change} = require('../middleware/change_post_block')
const Post = require('../models/post')
const Section = require('../models/section')

// get /user/:id/blog/:blog_name/post/:post_name
exports.get_post = (req, res)=>{
    console.log()
    Post
    .find({user_id:req.params.id ,blog_name:req.params.blog_name, post_name: req.params.post_name}).sort({order: 1})
    .then((result)=>{ 
        let data="";
        let end="end827rifddfo"
        result.forEach(section => { data+=(section["code"]);data+=end } ) 
   res.render("post.ejs",{title:"post", sections:result, data, user_id:req.params.id, blog_name:req.params.blog_name , post_name:req.params.post_name})})
    .catch((error)=>{console.log(error) }) 
}
// post /user/:id/blog/:blog_name/post/:post_name
exports.post_post = (req, res)=>{
    console.log("post post")
    change(req.body.act,req.params.id, req.params.blog_name, req.params.post_name, req.body.type_name, req.body.scs, req.body.s_id, req.body.s_text, req.body.text_number, req.body.s_color)
}
//get /user/:id/blog/:blog_name/post/:post_name/change_post_name

exports.get_change_post_name =(req,res)=>{
    console.log("aqui")
    try{
        console.log("ku")
    res.render("change_post_name.ejs", {title:"change post name"})
   
} catch(error){console.log("error")}
}
// post /user/:id/blog/:blog_name/post/:post_name/change_post_name
exports.change_post_name = (req, res)=>{
    console.log("aqui");
    let title="change post name";
    let alert='norm';
    console.log("name - " , req.body.name);

    if (req.body.name.length == 0  ){
        console.log("aquie")
        alert="No inputed post name"
       res.render("change_post_name",{title, alert})
    }
    Section 
    .findOne({id_user : req.params.id,name_of_blog:req.params.blog_name , name_of_section:'posts'})
    .then((result)=>{
        console.log(result)
        let post={post_name:req.body.name}
        
            console.log(result["posts"])
            result["posts"].forEach( pos =>{
                if (pos.post_name == req.body.name){
                    alert = 'post ya is exicted'
                }
           })
           if (alert == 'norm'){
            //change text
            let i=0;
                i=result["code"].indexOf(`user/${req.params.id}/blog/${req.params.blog_name}/post/${req.params.post_name}`);
                console.log(i);
                i += `user/${req.params.id}/blog/${req.params.blog_name}/post/`.length;
                let inserted_text=`${req.body.name}'>${req.body.name}`;
                let removed_text = `${req.params.post_name}'>${req.params.post_name}`;
                let ii = i+removed_text.length;
                let text =result["code"].substring(0, i) +inserted_text+result["code"].substring(ii)
                console.log(text);
            //change_array
            result["posts"].forEach( pos =>{
                if (pos.post_name == req.params.post_name){
                    pos.post_name = req.body.name
                }
           })

            Section.findOneAndUpdate({id_user : req.params.id,name_of_blog:req.params.blog_name , name_of_section:'posts'}, {code:text, posts:result["posts"]}).then(()=>{console.log("ADDED block")})

            Post
            .updateMany({user_id: req.params.id,post_name:req.params.post_name ,blog_name:req.params.blog_name }, {post_name:req.body.name}).then(()=>{console.log("CHANGEd")})
            res.redirect(`/user/${req.params.id}/blog/${req.params.blog_name}/post/${req.body.name}`)
        }
        else{
       res.render("change_post_name",{title, alert})

        }
})
}

// delete /user/:id/blog/:blog_name/post/:post_name/delete_post
exports.delete_post = (req, res)=>{
    console.log("aqui");
    Section 
    .findOne({id_user : req.params.id,name_of_blog:req.params.blog_name , name_of_section:'posts'})
    .then((result)=>{
            //change text
            let i=0;
            let deleted_text =`<div class='section post'>    <a class='texto_centro a' href='/user/${req.params.id}/blog/${req.params.blog_name}/post/${req.params.post_name}'>${req.params.post_name}</a>`
                i=result["code"].indexOf(deleted_text);
                console.log(i);
                let ii = result["code"].indexOf("<div class='section post'>    <a class='texto_centro a' href='/user/", i+1);
                console.log(ii);
                let text =''
                if (ii!=-1){
                    text=result["code"].substring(0, i) +result["code"].substring(ii)
                }
                else {
                    console.log(result["code"].substring(0, i) )
                     text =result["code"].substring(0, i) 
                }
              
              // console.log(text);
                if ((i==0 || i==1) && ii==-1){
                    Section.deleteOne({id_user : req.params.id,name_of_blog:req.params.blog_name , name_of_section:'posts'}).then(()=>{console.log("DELETED SECTIOn")})
                }
                else{
            //change_array
            let arra =[]
            result["posts"].forEach( pos =>{
                if (pos.post_name != req.params.post_name){
                    arra.push(pos)
                }
           })

            Section.findOneAndUpdate({id_user : req.params.id,name_of_blog:req.params.blog_name , name_of_section:'posts'}, {code:text, posts:arra}).then(()=>{console.log("ADDED block")})
        }
            Post
            .deleteMany({user_id: req.params.id,post_name:req.params.post_name ,blog_name:req.params.blog_name }).then(()=>{})

            


})
}

//<div class='section post'>    <a class='texto_centro a' href='/user/63a0d11fdae706d431dcc818/blog/Lola/post/Tota'>Tota</a>
//<div class='section post'>    <a class='texto_centro a' href='/user/63a0d11fdae706d431dcc818/blog/Lola/post/Tota'>Tota</a>