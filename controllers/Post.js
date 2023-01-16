const {change} = require('../middleware/change_post_block')
const Block = require('../models/bloсk')
var fs = require('fs');
var path = require('path');
// get /user/:id/blog/:blog_name/post/:post_name
exports.get_post = (req, res)=>{
    try{
        Block
        .find({ user_id:req.params.id, post:true, blog_name:req.params.blog_name, post_name:req.params.post_name }).sort({ id:1 })
        .then((result)=>{ //process text
            var data = "";
            var end = "end827rifddfo"
            result.forEach(section => { data += (section["code"]); data += end; } ); 
            res.render("post.ejs",{ title:"post", sections:result, data, user_id:req.params.id, blog_name:req.params.blog_name , post_name:req.params.post_name })})
        .catch((error)=>{ console.log(error) });
    }catch(err){ console.log(err) }
}
// post /user/:id/blog/:blog_name/post/:post_name
exports.post_post = (req, res)=>{
    try{
    change(req.body.act,req.params.id, req.params.blog_name, req.params.post_name, req.body.type_name, req.body.scs, req.body.s_id, req.body.s_text, req.body.text_number, req.body.s_color)
    }catch(err){console.log(err)}
}

//get /user/:id/blog/:blog_name/post/:post_name/change_post_name
exports.get_change_post_name =(req,res)=> {
    try{ 
        res.render("change_post_name.ejs", { title:"change post name", user_id:req.params.id, blog_name:req.params.blog_name, post_name:req.params.post_name });
    } catch(error){ console.log("error") }
}

// post /user/:id/blog/:blog_name/post/:post_name/change_post_name
exports.change_post_name = (req, res)=>{
    try{
        var title = "change post name";
        var alert = 'norm';
        Block 
        .findOne({ id_user:req.params.id, name_of_blog:req.params.blog_name, name_of_section:'posts', post:false })
        .then((result)=>{
            result["posts"].forEach( pos =>{//checking if post isn't existed
                if (pos.post_name == req.body.name){
                    alert = 'post ya is existed'
                }
            })
            if (alert == 'norm'){
                //change text
                var i=0;
                i = result["code"].indexOf(`user/${req.params.id}/blog/${req.params.blog_name}/post/${req.params.post_name}`);
                i += `user/${req.params.id}/blog/${req.params.blog_name}/post/`.length;
                var inserted_text =`${req.body.name}'>${req.body.name}`;
                var removed_text = `${req.params.post_name}'>${req.params.post_name}`;
                var ii = i + removed_text.length;
                var text = result["code"].substring(0, i) + inserted_text+result["code"].substring(ii);
                //change_array
                result["posts"].forEach( pos =>{
                    if (pos.post_name == req.params.post_name){
                        pos.post_name = req.body.name
                    }
                })
                Block//save block 'posts'
                    .findOneAndUpdate({ id_user:req.params.id, name_of_blog:req.params.blog_name , name_of_section:'posts', post:false }, { code:text, posts:result["posts"] })
                    .then(()=>{})

                Block//save post
                    .updateMany({ id_user:req.params.id, post_name:req.params.post_name, name_of_blog:req.params.blog_name, post:true }, { post_name:req.body.name })
                    .then(()=>{})
                res.redirect(`/user/${req.params.id}/blog/${req.params.blog_name}/post/${req.body.name}`)
            }
            else{//output errors
                res.render("change_post_name",{ title, alert, user_id:req.params.id, blog_name:req.params.blog_name, post_name:req.params.post_name })
            }
        })
    }catch(err){ console.log(err) }
}

// delete /user/:id/blog/:blog_name/post/:post_name/delete_post
exports.delete_post = (req, res)=>{
    try{
        console.log("delete post");
        Block 
        .findOne({ id_user:req.params.id, name_of_blog:req.params.blog_name, name_of_section:'posts', post:false })
        .then((result)=>{
                //change text
                console.log(result["code"])
                var i = 0;
                var deleted_text = `<div class='section post'><a class='texto_centro a' href='/user/${req.params.id}/blog/${req.params.blog_name}/post/${req.params.post_name}'>${req.params.post_name}</a>`
                i = result["code"].indexOf(deleted_text);
                var ii = result["code"].indexOf("<div class='section post'><a class='texto_centro a' href='/user/", i+1);
                var text = '';
                if (ii != -1){
                    text = result["code"].substring(0, i) +result["code"].substring(ii);
                }
                else {
                    text = result["code"].substring(0, i);
                }
            // if post is last
                if ((i==0 || i==1) && ii==-1){
                    Block
                        .deleteOne({ id_user:req.params.id, name_of_blog:req.params.blog_name, name_of_section:'posts', post:false })
                        .then(()=>{})
                }
                else{
                //change_array
                    var arra = [];
                    result["posts"].forEach(pos => {
                        if (pos.post_name != req.params.post_name){
                            arra.push(pos);
                        }
                    })
                    Block//save block 'post'
                        .findOneAndUpdate({ id_user:req.params.id, name_of_blog:req.params.blog_name , name_of_section:'posts', post:false }, { code:text,posts:arra })
                        .then(()=>{console.log("ADDED block")})
                }
                // delete posts
                Block
                    .deleteMany({ user_id:req.params.id, post_name:req.params.post_name, blog_name:req.params.blog_name })
                    .then(()=>{})

        }) 
    }catch(err){ console.log(err)}
}

//upload 1 image
exports.blog_upload_file = (req,res)=>{
    try{
        //create image
        var obj = {
            data: fs.readFileSync(path.join(path.dirname(__dirname)) + '/uploads/' + req.file.filename),
            contentType: 'image/png'
        }
        Block
            . findByIdAndUpdate(req.params.s_id)
            .then((result)=>{
                //process text
                code = result["code"];
                var inserted_text = `i8938423740298341730' src='data:image/${obj.contentType};base64,${obj.data.toString('base64')}`;
                var temp_code = result["code"].substring(0,result["code"].indexOf("i8938423740298341730") ) ;
                temp_code +=  inserted_text+"'";
                temp_code += result["code"].substring(result["code"].indexOf("i8938423740298341730") + 45  ) ;
                //save image in bd
                Block
                    .findByIdAndUpdate(req.params.s_id, {img1:obj, code:temp_code})
                    .then((result)=>{console.log("CHANGED")});
                    res.redirect(`/user/${req.params.id}/blog/${req.params.name}/post/${req.body.name}`)
            })
    }catch(err){console.log(err)}
}