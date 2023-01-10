const Block = require('../models/bloсk')
const User = require('../models/user')
// main function which exports
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
    },
    find_max:(result)=>{
        let s_id;
        console.log(result)
        if(result.length){
            s_id = result[0].id;
           s_id++;
    
       }
       else{s_id=0;}
       return s_id;
    }

}
// add block
function add_block(user_id, blog_name, post_name,type_name, scs){
    var now = new Date();
    console.log(blog_name)
    User//find user for find out if user does publish
    .findOne({ id_user:user_id, "blogs.block_name":blog_name, "blogs.publich":true })
    .then((result)=>{// if user published blog
        if (result != null ){
            var url = "";
            result["blogs"].forEach(section => { //change array
                if (section.block_name == blog_name ){
                    url = section.domen;  
                }
            } ) //save block in bd
            Block
                .find({ id_user:user_id,name_of_blog:blog_name, post_name:post_name}).sort({order: -1}).limit(1)
                .then((result)=>{ 
                    var s_id= find_max(result);
                    console.log()
                    var block = Block({type_name:type_name, id_user:user_id,name_of_blog:blog_name, post_name:post_name,code:scs, date:now, id:s_id, post:true, url })   
                    block
                         .save()
                         .then((result)=>{console.log(result)})
                         .catch((error)=>{console.log(error)});
                }).catch((error)=>{console.log(error)})
        }
        else{// if user didn't publish blog
            //save block in bd
            Block
                .find({ id_user:user_id,name_of_blog:blog_name, post_name:post_name}).sort({order: -1}).limit(1)
                .then((result)=>{ 
                    var s_id= find_max(result);
                    var block = Block({type_name:type_name, id_user:user_id,name_of_blog:blog_name, post_name:post_name,code:scs, date:now, id:s_id, post:true})   
                    block.save().then((result)=>{}).catch((error)=>{console.log(error)});
                }).catch((error)=>{console.log(error)})
        }
    })  
}
// delete block
function delete_block(s_id){ // s_id = section id
    Block
        .deleteOne({_id:s_id})
        .then((result)=>{ })
        .catch((error)=>console.log(error))
}
//hide block
function hide_block(s_id){
    Block
        .updateOne({ _id:s_id },{ hide:"none", demo:"grid" })
        .then((result)=>{ })
        .catch((error)=>console.log(error))
}
//view block
function demo(s_id){
    Block
        .updateOne({ _id:s_id },{ hide:"grid", demo:"none" })
        .then((result)=>{ })
        .catch((error)=>console.log(error))
}
//button "down"
function down(s_id,user_id, blog_name, post_name){
    Block
        .find({ user_id:user_id,blog_name:blog_name, post_name:post_name, post:true , id:{ $gte: s_id}}).sort({ id:1 })
        .then((result)=>{
            if ( result.length > 1 ){
                //swip with 'id'
                var temp_value = result[1].id;
                Block.updateOne({ _id:result[1]._id },{ id:s_id }).then((result)=>{ }).catch((error)=>console.log(error));
                Block.updateOne({ _id:result[0]._id },{ id:temp_value }).then((result)=>{ }).catch((error)=>console.log(error));
            }      
        }).catch((error)=>{console.log(error)});
}
//button "down"
function up(s_id,user_id, blog_name, post_name){
    Block
        .find({ user_id:user_id,blog_name:blog_name, post_name:post_name, post:true, id:{ $lte: s_id}}).sort({ id:-1 })
        .then((result)=>{
            if ( result.length >1 ){
                  //swip with 'id'
                var temp_value = result[1].id;
                Block.updateOne({ _id:result[1]._id, },{ id:s_id }).then((result)=>{ }).catch((error)=>console.log(error));
                Block.updateOne({ _id:result[0]._id  },{ id:temp_value }).then((result)=>{ }).catch((error)=>console.log(error));
            }
        }).catch((error)=>{console.log(error)})
}

// find maximum number of order
function find_max(result){
    var s_id;
    if(result.length){
        s_id = result[0].id;
        s_id++;
   }
   else{s_id=0;}
   return s_id;
}
//change text
function change_text(s_id, s_text,text_number){// text_number = number of text in section ; s_text =  changed text 
    Block
        .findByIdAndUpdate(s_id)
        .then((result)=>{
            var scs =  result.code;
            var t_position = 0;
            // find place for change
            for ( i=0;i<text_number;i++){
                console.log("i")
                t_position += 1;
                t_position = scs.indexOf("text7y88098hdf",t_position);
            }
            //find start position
            t_position += 1;
            t_position = scs.indexOf("text7y88098hdf",t_position);
            var start_position = scs.indexOf(">",t_position);
            start_position+=1;
            //find end position
            var end_position = scs.indexOf("</div",start_position);
            scs = scs.replace(scs.substring(start_position,end_position ), s_text);
            //keep change
            Block
            .findByIdAndUpdate(s_id, {code:scs})
            .then((result)=>{console.log("CHANGED")});
        })
}

//change background color
function change_background_color(s_id, s_color){
    Block
         .findByIdAndUpdate(s_id, { backgorund_color:s_color })
         .then((result)=>{console.log("CHANGED")})
}

//change text color
function change_text_color(s_id, s_color){
    Block
         .findByIdAndUpdate(s_id, { text_color:s_color })
         .then((result)=>{console.log("CHANGED")})
}
//change text font
function change_font(s_id, s_color){
    Block
         .findByIdAndUpdate(s_id, { text_font:s_color })
         .then((result)=>{console.log("CHANGED")})
}