const User = require('../models/user')
const Block =  require('../models/bloсk');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// mostrar pagina personal de usario
//get /user s
exports.user_get=(req,res)=>{
    // console.log("USER GET")
    // console.log(req.headers.authorization)
    try{
        // if (typeof req.headers.authorization != 'undefined'){
            // jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            //     if (err){console.log(err)}
                User
                .findOne({_id:req.params.id})
                .then((result)=>{ 
                    console.log("get")
                    res.render("account",{title:"Personal account", user:result})
                })
                    .catch((error)=> {console.log(error)});
                      //})
            
       
   // }
    }catch(err){
        console.log(err)
    }
    
    
}
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
                if (result !=  null) { 
                    alerts.push("url ya exist")
                }
                     // find identical blog name
                User
                .findOne ({ "blogs.block_name":req.body.name, _id:req.params.id })
                .then((result)=>{ 
                    if (result !=  null) { 
                        alerts.push("blog ya exist") 
                    }
                    if ( alerts.length === 0 ){
                        console.log("tt")
                        let new_blog={ block_name:req.body.name, domen:req.body.domen, seo:req.body.seo }
                        User
                            .findOneAndUpdate({_id:req.params.id}, {$push: {blogs:new_blog}})
                            .then((result)=>{ res.redirect(`/user/${req.params.id}/blog/${req.body.name}`) });         
                    }  
                    else{
                        console.log("tut")
                        res.render("create_blog.ejs",{ title, alerts, user_id:req.params.id})
                    }     
                }) 
                
            }) 
       
        // if there no are identical blog name or domen
        console.log("alert" , alerts)
       
    } catch(err){ console.log (err) }
}
        



// post user/:id/change_project_name/:name'
exports.put_project_name = (req, res)=>{
    try{
        var alert = 'norm';
        User
        .findById(req.params.id)
        .then((result)=>{
            // console.log(result)
            result["blogs"].forEach(section => { 
                console.log(section)
                if (section.block_name == req.body.inputed_name ){
                    alert = 'blog is ya exist';
                    
                }
                
            } )
            if (alert == 'norm'){
                result["blogs"].forEach(section => { 
                    if (section.block_name == req.params.name ){
                        section.block_name = req.body.inputed_name;
                    } 
                    
                })
                console.log(result.blogs)
                User
                    .findByIdAndUpdate(req.params.id, {blogs:result.blogs})
                    .then(()=>{console.log("Changed")});
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
        console.log("delete")
        User
        .findById(req.params.id)
        .then((result)=>{
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

        Block
            .deleteMany({id_user: req.params.id, name_of_blog: req.params.name })
            .then(()=>{console.log("DELETED")})
    }catch(err){ console.log(err) }
}

// publish 
// post user/:id/publish_project/:name
exports.post_publish = (req, res) =>{
    try{
        console.log("POST PUBLISH")
        console.log(req.params.name)
        User
            .findById(req.params.id)
            .then((result)=>{
                var url ;
                result["blogs"].forEach(section => { 
                    console.log(section.block_name ); 
                    if (section.block_name == req.params.name ){
                        url = section.domen;
                        section.publich = true;
                        console.log("ti - ", section)
                        
                    }
                } ) 
                console.log(url)
                User
                    .findByIdAndUpdate(req.params.id, {blogs: result["blogs"]})
                    .then(()=>{console.log("Changed")});

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
        console.log("FABULA")
        console.log(req.params.id)
        Block
            .find({url: req.params.id, post:false}).sort({ id:1 })
            .then((result)=>{ 
                console.log(result)
                let data="";
                let end="end827rifddfo"
                result.forEach(section => {
                //     console.log("++++++++++++++++++++++++++");
                //     console.log(section)
                data+=(section["code"]);data+=end 
                //     console.log("++++++++++++++++++++++++++");;
                
                 } ) 
                
                var i=0;
                while( i < 0){
                    i = data.indexOf(`user/${result[0].user_id}/blog/${result[0].blog_name}/post/${result[0].post_name}`);
                    // i += `user/${req.params.id}/blog/${req.params.blog_name}/post/`.length;
                    var inserted_text =`fabula/${req.params.id}/${result[0].post_name}`;
                    var removed_text = `user/${result[0].user_id}/blog/${result[0].blog_name}/post/${result[0].post_name}`;
                    var ii = i + removed_text.length;
                    data = data.substring(0, i) + inserted_text+data.substring(ii);
                }
                console.log("data" , data)
                res.render("view.ejs",{title:"Blog", sections:result, data, user_id:req.params.id, blog_name:req.params.name })
            })
            .catch((error)=>{console.log(error)
                //res.render("blog.ejs",{title:"Blog", sections:[]})
            }) 
    }catch(err){ console.log(err) }

}
