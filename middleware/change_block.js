const Block = require('../models/bloсk')
const User = require('../models/user')


// main function which exposrts
module.exports = {
    change:(act,user_id,name,s_name,s_id,scs, s_text,text_number,s_start, s_end, s_add, style, s_color)=>{ //user_id = user if, s_name = section name; scs = code // s_id = section id
        if(act=="add_block"){ add_block(user_id,name,s_name,scs)}   
        else if(act == "delete"){delete_block(s_id)}
        else if(act == "hide"){hide_block(s_id)}
        else if(act == "demo"){demo(s_id)}
        else if(act == "up"){up(s_id,name,user_id)}
        else if(act == "down"){down(s_id,name,user_id)}
        else if(act=="change_text"){change_text(s_id, s_text,text_number)}// text_number = number of text in section ; s_text =  changed text 
        else if(act=="change_text_style"){change_text_style(s_start,s_end, s_add, s_id, text_number, style)}
        else if(act=="change_background_color"){change_background_color(s_id, s_color)}
        else if(act=="change_text_color"){change_text_color(s_id, s_color)}
        else if(act=="change_font"){change_font(s_id, s_color)}
        else if(act=="upload_file"){upload_file(s_id, s_color)}
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
function add_block(user_id,name,s_name,scs){
    try{
        User
            .findOne({ id_user:user_id, "blog.block_name":name, "blog.block_name":true })
            .then((result)=>{
                if (result != null ){
                    var domen = "";
                    result["blogs"].forEach(section => { 
                        if (section.block_name == name ){
                            domen = section.domen;  
                        }
                    } ) 
                    Block
                        .find({ id_user:user_id, name_of_blog:name, post:false }).sort({ id:-1}).limit(1)
                        .then((result)=>{ 
                            var s_id = find_max(result);
                           
                            var block = Block({ name_of_section:s_name, id:s_id, id_user:user_id, name_of_blog:name, code:scs, url:domen })   
                            block.save().then((result)=>{}).catch((error)=>{ console.log(error) });
                        })
                        .catch((error)=>{console.log(error)})
                }
                else{
                    Block
                        .find({ id_user:user_id, name_of_blog:name, post:false }).sort({ id:-1}).limit(1)
                        .then((result)=>{ 
                            var s_id = find_max(result);
                            var block = Block({ name_of_section:s_name, id:s_id, id_user:user_id, name_of_blog:name, code:scs })   
                            block.save().then((result)=>{}).catch((error)=>{ console.log(error) });
                        })
                        .catch((error)=>{console.log(error)})
                }

            })

       
    }catch(err){ console.log(err) }
}
// delete block
function delete_block(s_id){ // s_id = section id
    Block
        .deleteOne({ _id:s_id })
        .then((result)=>{ })
        .catch((error)=>console.log(error))
}
//hide block
function hide_block(s_id){
    Block
        .updateOne({ _id:s_id },{ hide:"none", demo:"grid" })
        .then((result)=>{})
        .catch((error)=>console.log(error))
}
//view block
function demo(s_id){
    Block
        .updateOne({ _id:s_id },{ hide:"grid", demo:"none"})
        .then((result)=>{})
        .catch((error)=>console.log(error))
}
function down(s_id,name,user_id){
    console.log("down")
    Block
        .find({ id_user:user_id, post:false, name_of_blog:name, id:{ $gte:s_id }}).sort({ id:1 })
        .then((result)=>{
            if ( result.length > 1 ){
                var temp_value = result[1].id;
                Block.updateOne({ id:result[1].id, post:false },{ id:s_id }).then((result)=>{}).catch((error)=>console.log(error));
                Block.updateOne({ id:result[0].id , post:false},{ id:temp_value }).then((result)=>{}).catch((error)=>console.log(error));
            }       
        })
        .catch((error)=>{console.log(error)})
}
function find_max(result){
    var s_id;
    console.log(result)
    if(result.length){
        s_id = result[0].id;
       s_id++;

   }
   else{s_id=0;}
   return s_id;
}

function up(s_id,name,user_id){
    console.log("s_id - ", s_id)
    Block
        .find({ id_user:user_id, name_of_blog:name, id:{ $lte: s_id}, post:false }).sort({ id: -1 })
        .then((result)=>{
            console.log(result)
            if ( result.length != 0 ){
                if ( result.length > 1 ){
                    var temp_value = result[1].id;
                    Block.updateOne({ id:result[1].id, post:false },{ id:s_id}).then((result)=>{}).catch((error)=>console.log(error));
                    Block.updateOne({ id:result[0].id, post:false },{ id:temp_value }).then((result)=>{}).catch((error)=>console.log(error));
                    console.log(result)
                } 
            }
        })
        .catch((error)=>{console.log(error)})
}


function change_text(s_id, s_text,text_number){// text_number = number of text in section ; s_text =  changed text 
    console.log("change text")
    Block
        .findByIdAndUpdate(s_id)
        .then((result)=>{
            var scs =  result.code;
            var t_position = 0;
            // find place for change
            for ( i=0; i<text_number; i++){
                t_position +=1;
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
         .then((result)=>{console.log("CHANGED")});
}

//change text color
function change_text_color(s_id, s_color){
    Block
         .findByIdAndUpdate(s_id, { text_color:s_color })
         .then((result)=>{console.log("CHANGED")});
}
//change text color
function change_font(s_id, s_color){
    Block
         .findByIdAndUpdate(s_id, { text_font:s_color })
         .then((result)=>{console.log("CHANGED")})
}


// module.exports = { find_max, change }
