const Post = require('../models/post')

// main function which exposrts
module.exports = {
    change:(act, user_id, blog_name, post_name,type_name, scs, s_id,s_text,text_number,s_color)=>{ //user_id = user if, s_name = section name; scs = code // s_id = section id
        if(act=="add_block"){ add_block( user_id, blog_name, post_name,type_name, scs)}   
        else if(act == "delete"){delete_block(s_id)}
        else if(act == "hide"){hide_block(s_id)}
        else if(act == "demo"){demo(s_id)}
        else if(act == "up"){up(s_id,user_id, blog_name, post_name)}
        else if(act == "down"){down(s_id,user_id, blog_name, post_name)}
        else if(act=="change_text"){change_text(s_id, s_text,text_number)}// text_number = number of text in section ; s_text =  changed text 
        else if(act=="change_text_style"){change_text_style(s_start,s_end, s_add, s_id, text_number, style)}
        else if(act=="change_background_color"){change_background_color(s_id, s_color)}
        else if(act=="change_text_color"){change_text_color(s_id, s_color)}
        else if(act=="change_font"){change_font(s_id, s_color)}

    }

}
// add block
function add_block(user_id, blog_name, post_name,type_name, scs){
    var now = new Date();
    Post
    .find({ user_id:user_id,blog_name:blog_name, post_name:post_name}).sort({order: -1}).limit(1)
    .then((result)=>{ 
        let s_id= find_max(result);
        console.log(result)
        console.log("ADD POST BLOCK", s_id)
        let post = Post({type_name:type_name, user_id:user_id,blog_name:blog_name, post_name:post_name,code:scs, date:now, order:s_id})   
        post.save().then((result)=>{}).catch((error)=>{console.log(error)});
    
})
   .catch((error)=>{console.log(error)})


}
// delete block
function delete_block(s_id){ // s_id = section id
    console.log("delete")
    Post
        .deleteOne({_id:s_id})
        .then((result)=>{ })
        .catch((error)=>console.log(error))
}
//hide block
function hide_block(s_id){
    Post
    .updateOne({_id:s_id},{hide : "none",demo: "grid"})
    .then((result)=>{ })
    .catch((error)=>console.log(error))
}
//view block
function demo(s_id){
    Post
    .updateOne({_id:s_id},{hide : "grid",demo: "none"})
    .then((result)=>{ })
    .catch((error)=>console.log(error))
}
function down(s_id,user_id, blog_name, post_name){
    console.log("down")
    console.log(user_id, blog_name, post_name, s_id)
    Post
    .find({ user_id:user_id,blog_name:blog_name, post_name:post_name, order: { $gte: s_id}}).sort({order: 1})
    .then((result)=>{
        console.log("down1")
        if ( result.length > 1 ){
            console.log(result)
             let temp_value = result[1].order;
            Post.updateOne({_id:result[1]._id},{order : s_id}).then((result)=>{ }).catch((error)=>console.log(error))
            Post.updateOne({_id:result[0]._id},{order : temp_value}).then((result)=>{ }).catch((error)=>console.log(error))
        }      
     })
    .catch((error)=>{console.log(error)})
}
function up(s_id,user_id, blog_name, post_name){
    console.log("up")
    Post
    .find({ user_id:user_id,blog_name:blog_name, post_name:post_name, order:{ $lte: s_id}}).sort({order: -1})
    .then((result)=>{
        if ( result.length >1 ){
            Post.updateOne({_id:result[1]._id},{order : s_id}).then((result)=>{ }).catch((error)=>console.log(error))
            Post.updateOne({_id:result[0]._id},{order : temp_value}).then((result)=>{ }).catch((error)=>console.log(error))
        }
     })
    .catch((error)=>{console.log(error)})
}

// find maximum number of order
function find_max(result){
    let s_id;
    if(result.length){
        s_id = result[0].order;
       s_id++;

   }
   else{s_id=0;}
   return s_id;
}
//change text
function change_text(s_id, s_text,text_number){// text_number = number of text in section ; s_text =  changed text 
    console.log("change_text")
    console.log(text_number)
    Post
    .findByIdAndUpdate(s_id)
    .then((result)=>{
        var scs =  result.code;
        let t_position = 0;
        // find place for change
        for ( i=0;i<text_number;i++){
            console.log("i")
            t_position +=1;
            t_position = scs.indexOf("text7y88098hdf",t_position);

        }
        //find start position
        t_position +=1;
        t_position = scs.indexOf("text7y88098hdf",t_position);
        var start_position = scs.indexOf(">",t_position);
        start_position+=1;
        //find end position
        var end_position = scs.indexOf("</div",start_position);
        console.log(scs.substring(start_position,end_position))
        scs = scs.replace(scs.substring(start_position,end_position ), s_text)
        console.log(scs)
        //keep change
        Post
        .findByIdAndUpdate(s_id, {code:scs})
        .then((result)=>{console.log("CHANGED")})
    })
    
   
}

//change background color
function change_background_color(s_id, s_color){
    Post
         .findByIdAndUpdate(s_id, {backgorund_color:s_color})
         .then((result)=>{console.log("CHANGED")})
}

//change text color
function change_text_color(s_id, s_color){
    Post
         .findByIdAndUpdate(s_id, {text_color:s_color})
         .then((result)=>{console.log("CHANGED")})
}
//change text font
function change_font(s_id, s_color){
    Post
         .findByIdAndUpdate(s_id, {text_font:s_color})
         .then((result)=>{console.log("CHANGED")})
}