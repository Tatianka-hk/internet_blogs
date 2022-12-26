const {change, find_max} = require('../middleware/change_block')
var fs = require('fs');
var path = require('path');
const Block = require('../models/bloсk')

// get /user/:user_id/blog/:blog_id
exports.blog_get = (req, res)=>{
    try{
        Block
            .find({ id_user:req.params.id , name_of_blog:req.params.name }).sort({ id:1 })
            .then((result)=>{ 
                var data = "";
                var end = "end827rifddfo"
                result.forEach(section => {
                data+=(section["code"]);data+=end 
            }) 
            res.render("blog.ejs",{ title:req.params.name, sections:result, data, user_id:req.params.id, blog_name:req.params.name })
        })
        .catch((error)=>{console.log(error)}) 
    }catch(err){ console.log(err) }
}
// post /user/:user_id/blog/:blog_id
exports.blog_post = (req,res)=>{
    try{
        change(req.body.act,req.params.id, req.params.name, req.body.s_name, req.body.s_id, req.body.scs, req.body.s_text, req.body.text_number , req.body.s_start, req.body.s_end, req.body.s_add, req.body.style, req.body.s_color, req.body.is_post)
        res.redirect(`/user/${req.params.id}/blog/${req.body.name}`)
    } catch(err){ console.log(err) }
    
    
}
// get /user/:user_id/blog/:blog_id/create_post
exports.get_create_post = (req,res)=>{
    try{
        console.log("ku")
    res.render("create_post.ejs", { title:"create post" })
   
} catch(error){console.log("error")}
}

// get /user/:id/blog/:name/create_post
exports.get_create_post = (req,res)=>{
    try{ res.render("create_post.ejs", { title:"create post", user_id:req.params.id, blog_name:req.params.name }) 
    } catch(error){console.log("error")}
}

//post /user/:user_id/blog/:blog_id/create_post
exports.post_create_post = (req,res)=>{
    try{
        var now = new Date();
        code = `<div class='section post'><a class='texto_centro a' href='/user/${req.params.id}/blog/${req.params.name}/post/${req.body.name}'>${req.body.name}</a>${now}</div>` ;
        const title = "Creating post";
        var alert = 'norm';
        Block 
        .findOne({ id_user:req.params.id, post:false, name_of_blog:req.params.name, name_of_section:'posts'})
        .then((result)=>{
            // if post aren't exist 
            
            let post={ post_name:req.body.name }
            if (result == null){
                Block 
                    .find({ id_user:req.params.id, post:false, name_of_blog:req.params.name})
                    .then((result)=>{
                        var s_id = find_max(result);
                        let block = new Block({ code:code, post:false, name_of_section:'posts', id_user:req.params.id,  name_of_blog:req.params.name, data:now , posts:post, id:s_id });
                        block.save();
                        res.redirect(`/user/${req.params.id}/blog/${req.params.name}/post/${req.body.name}`)
                    })
            }
            // if post name ya is there
            else{
                result["posts"].forEach(pos =>{
                    if (pos.post_name == req.body.name){
                        alert = 'post ya is exicted'
                    }
            })
            // add post
            if (alert == 'norm'){
                code +=result["code"];
                Block
                    .findOneAndUpdate({ id_user:req.params.id, name_of_blog:req.params.name, name_of_section:'posts' }, { code:code, $push:{ posts:post }})
                    .then(()=>{console.log("ADDED block")})
                res.redirect(`/user/${req.params.id}/blog/${req.params.name}/post/${req.body.name}`)
            }
            else{
                res.render('create_post', { title, alert, user_id:req.params.id, blog_name:req.params.name }) //output error
                }
            } 
        })
    }catch(err){ console.log(err) }
       
}

exports.blog_upload_file = (req,res)=>{
    try{
        var obj = {
            data: fs.readFileSync(path.join(path.dirname(__dirname)) + '/uploads/' + req.file.filename),
            contentType: 'image/png'
        }
        Block
            . findByIdAndUpdate(req.params.s_id)
            .then((result)=>{
                code = result["code"];
                var inserted_text = `i8938423740298341730' src='data:image/${obj.contentType};base64,${obj.data.toString('base64')}`;
                var temp_code = result["code"].substring(0,result["code"].indexOf("i8938423740298341730") ) ;
                temp_code +=  inserted_text+"'";
                temp_code += result["code"].substring(result["code"].indexOf("i8938423740298341730") + 45  ) ;
                Block
                    .findByIdAndUpdate(req.params.s_id, {img1:obj, code:temp_code})
                    .then((result)=>{console.log("CHANGED")});
            })
    }catch(err){console.log(err)}
        
    
}

exports.blog_upload_file2 = (req,res)=>{
    try{
        var obj = {
            data: fs.readFileSync(path.join(path.dirname(__dirname)) + '/uploads/' + req.file.filename),
            contentType: 'image/png'
        }
        Block
            . findByIdAndUpdate(req.params.s_id)
            .then((result)=>{
                code=result["code"];
                var inserted_text = `i8938423740298341732' src='data:image/${obj.contentType};base64,${obj.data.toString('base64')}`;
                var temp_code = result["code"].substring(0,result["code"].indexOf("i8938423740298341732") ) ;
                temp_code+= inserted_text+"'";
                temp_code += result["code"].substring(result["code"].indexOf("i8938423740298341732") + 45  ) ;
                Block
                    .findByIdAndUpdate(req.params.s_id, {img2:obj, code:temp_code})
                    .then((result)=>{console.log("CHANGED")});
            })
    }catch(err){console.log(err)}
        
    
}

exports.blog_upload_file3 = (req,res)=>{
    try{
        var obj = {
            data: fs.readFileSync(path.join(path.dirname(__dirname)) + '/uploads/' + req.file.filename),
            contentType: 'image/png'
        }
        Block
            . findByIdAndUpdate(req.params.s_id)
            .then((result)=>{
                code=result["code"];
                var inserted_text = `i8938423740298341733' src='data:image/${obj.contentType};base64,${obj.data.toString('base64')}`;
                var temp_code = result["code"].substring(0,result["code"].indexOf("i8938423740298341733") ) ;
                temp_code+= inserted_text+"'";
                temp_code += result["code"].substring(result["code"].indexOf("i8938423740298341733") + 45  ) ;
                Block
                    .findByIdAndUpdate(req.params.s_id, {img3:obj, code:temp_code})
                    .then((result)=>{console.log("CHANGED")});
            })
    }catch(err){console.log(err)}
        
    
}
exports.blog_upload_file4 = (req,res)=>{
    try{
        var obj = {
            data: fs.readFileSync(path.join(path.dirname(__dirname)) + '/uploads/' + req.file.filename),
            contentType: 'image/png'
        }
        Block
            . findByIdAndUpdate(req.params.s_id)
            .then((result)=>{
                code=result["code"];
                var inserted_text = `i8938423740298341734' src='data:image/${obj.contentType};base64,${obj.data.toString('base64')}`;
                var temp_code = result["code"].substring(0,result["code"].indexOf("i8938423740298341734") ) ;
                temp_code+= inserted_text+"'";
                temp_code += result["code"].substring(result["code"].indexOf("i8938423740298341734") + 45  ) ;
                Block
                    .findByIdAndUpdate(req.params.s_id, {img4:obj, code:temp_code})
                    .then((result)=>{console.log("CHANGED")})
            })
    }catch(err){console.log(err)}
        
    
}