const User = require('../models/user')
const Block =  require('../models/bloсk');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// mostrar pagina personal de usario
//get /user s
exports.user_get=(req,res)=>{
    try{
                User
                .findOne({_id:req.params.id})
                .then((result)=>{ 
                    console.log(result)
                    res.render("account",{title:"Personal account", user:result})
                })
                .catch((error)=> {console.log(error)});
                            
   } catch(err){ console.log(err)}
};
// cambiar nomdre de usario 
//post ./user/:id/name
exports.change_name = (req,res)=>{
    try {
        User
            .findOneAndUpdate({ _id:req.params.id }, { name:req.body.edit_name_input })
            .then((result)=>{ res.redirect(`/user/${req.params.id}`)});
    } catch (err) { console.log (err)}
}

// cambiar correo electronico de usario 
//post./user/:id/name  
exports.change_email = (req,res)=>{
    try {
        User
            .findOneAndUpdate({ _id:req.params.id }, { email:req.body.edit_name_input })
            .then((result)=>{ res.redirect(`/user/${req.params.id}`) });
    } catch (err) { console.log (err)}
}

//delete user account
//delete /user/:id
exports.delete_user = (req,res)=>{
    try {
        User
            .findByIdAndDelete(req.params.id)
            .then((result)=>{});
        res.redirect("/")
   } catch (err) { console.log (err)}
 }
// render page of creating blog
// render /user/:id/create_blog
exports.get_create_blog = (req,res)=>{
    try {
        User
            .findOne({ _id:req.params.id })
            .then((result)=>{ res.render("create_blog.ejs",{ title:"creating blog" , user:result, user_id:result._id}) })
    } catch (err) { console.log (err)}
} 

//add blog
// post user/:id/create_blog
exports.post_create_blog = (req,res)=>{
    var title = "creating blog";
    var alerts = [];
    try {
        // find identical domen
        User
            .findOne ({ "blogs.domen":req.body.domen })
            .then((result)=>{ 
                //if user published blog
                if (result !=  null) { 
                    alerts.push("url ya exist")
                }
                     // find identical blog name
                User
                .findOne ({ "blogs.block_name":req.body.name, _id:req.params.id })
                .then((result)=>{ 
                    if (result !=  null) { 
                        alerts.push("blog ya exist") 
                    }//if isn't errors here
                    if ( alerts.length === 0 ){
                        let new_blog={ block_name:req.body.name, domen:req.body.domen}
                        User
                            .findOneAndUpdate({_id:req.params.id}, {$push: {blogs:new_blog}})
                            .then((result)=>{ res.redirect(`/user/${req.params.id}/blog/${req.body.name}`) });         
                    }  
                    //if user didn't published blog
                    else{
                        res.render("create_blog.ejs",{ title, alerts, user_id:req.params.id})
                    }     
                }) 
                
            }) 
        // if there no are identical blog name or domen
    } catch(err){ console.log (err) }
}
// change blog name
// post user/:id/change_project_name/:name'
exports.put_project_name = (req, res)=>{
    try{
        var alert = 'norm';
        User
        .findById(req.params.id)
        .then((result)=>{
            // find out if blog is existed
            result["blogs"].forEach(section => { 
                console.log(section)
                if (section.block_name == req.body.inputed_name ){
                    alert = 'blog is ya exist';
                    
                }
            } ) //if blog isn't existed
            if (alert == 'norm'){
                //change array
                result["blogs"].forEach(section => { 
                    if (section.block_name == req.params.name ){
                        section.block_name = req.body.inputed_name;
                    } 
                })
                //save blog in model "user"
                User
                    .findByIdAndUpdate(req.params.id, {blogs:result.blogs})
                    .then(()=>{console.log("Changed")});
                    //save blog
                Block
                    .updateMany({ blog_name:req.params.name, user_id:req.params.is }, { blog_name:req.body.name })
                    .then(()=>{console.log("Changed")});
                res.redirect(`/user/${req.params.id}`);
            }
            else{
                // res.render(`account`,{ alert, user:result, title:"Personal account" });
                res.redirect(`/user/${req.params.id}`);
            }
            
        })
    }catch(err){ console.log(err) }
}

// delete project
// delete user/:id/delete_project/:name
exports.delete_porject = (req, res)=>{
    try{
        User
        .findById(req.params.id)
        .then((result)=>{
            let new_list = [];
            result["blogs"].forEach(section => { 
                //change array
                console.log(section.block_name ); 
                if (section.block_name != req.params.name ){
                    new_list.push(section)                 
                }
            } ) 
            console.log(new_list)
             // delete block from model 'user'
            User
            .findByIdAndUpdate(req.params.id, {blogs:new_list})
            .then(()=>{console.log("Changed")})
        })
        // delete block
        Block
            .deleteMany({id_user: req.params.id, name_of_blog: req.params.name })
            .then(()=>{console.log("DELETED")})
    }catch(err){ console.log(err) }
}

// publish 
// post user/:id/publish_project/:name
exports.post_publish = (req, res) =>{
    try{
        User
            .findById(req.params.id)
            .then((result)=>{
                var url ;
                result["blogs"].forEach(section => {
                     // change status of blog
                    console.log(section.block_name ); 
                    if (section.block_name == req.params.name ){
                        url = section.domen;
                        section.publich = true; 
                    }
                } ) 
                // save user in bd
                User
                    .findByIdAndUpdate(req.params.id, {blogs: result["blogs"]})
                    .then(()=>{console.log("Changed")});
                // save blog in bd
                Block
                    .updateMany({id_user: req.params.id, name_of_blog: req.params.name }, {url:url})
                    .then(()=>{console.log("CHANGED")});
                res.redirect(`/fabula/${url}/`);
        })
    }catch(err){ console.log(err) }
}
// view
// get /fabula/:id
exports.get_view = (req, res)=>{
    try{
        Block
            .find({url: req.params.id, post:false}).sort({ id:1 })
            .then((result)=>{ 
                // process text
                let data="";
                let end="end827rifddfo"
                result.forEach(section => {
                data+=(section["code"]);data+=end 
                 } ) 
                 console.log(data)
                var i = data.indexOf(`user/${result[0].id_user}/blog/${result[0].name_of_blog}`);
                // change text
                while( i > 0){     
                    var removed_text = `user/${result[0].id_user}/blog/${result[0].name_of_blog}`;
                    var ii = i + removed_text.length;
                    var iii = data.indexOf("'>", ii);
                    var post_name = data.substring(ii+6, iii);
                    var inserted_text =`fabula/${req.params.id}`;
                    data = data.substring(0, i) + inserted_text+data.substring(ii);
                    i = data.indexOf(`user/${result[0].id_user}/blog/${result[0].name_of_blog}`, i+2);
                }
                // render page
                res.render("view.ejs",{title:"Blog", sections:result, data, user_id:req.params.id, blog_name:req.params.name })
            })
            .catch((error)=>{console.log(error)
                //res.render("blog.ejs",{title:"Blog", sections:[]})
            }) 
    }catch(err){ console.log(err) }
}
//get /fabula/:id/post/name
exports.get_post_view = (req, res)=>{
    console.log("GET POST")
    try{
        Block
            .find({url: req.params.id, post:true, post_name:req.params.name}).sort({ id:1 })
            .then((result)=>{ 
                console.log(result)
                // process text
                let data="";
                let end="end827rifddfo"
                result.forEach(section => {
                data+=(section["code"]);data+=end 
                 } ) 
                res.render("view.ejs",{title:"Blog", sections:result, data, user_id:req.params.id, blog_name:req.params.name })
            })
            .catch((error)=>{console.log(error)
            }) 
    }catch(err){ console.log(err) }
}