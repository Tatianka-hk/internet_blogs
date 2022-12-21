const Section = require('../models/section')


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
    }

}
// add block
function add_block(user_id,name,s_name,scs){
    console.log("Add_block")


    Section
    .find({ id_user:user_id, name_of_blog:name}).sort({id: -1}).limit(1)
    .then((result)=>{ 
        let s_id= find_max(result);
        let section = Section({name_of_section:s_name, id:s_id,id_user:user_id, name_of_blog:name,code:scs})   
        section.save().then((result)=>{}).catch((error)=>{console.log(error)});
    
})
   .catch((error)=>{console.log(error)})
}
// delete block
function delete_block(s_id){ // s_id = section id
    console.log("delete")
    Section
        .deleteOne({_id:s_id})
        .then((result)=>{ })
        .catch((error)=>console.log(error))
}
//hide block
function hide_block(s_id){
    Section
    .updateOne({_id:s_id},{hide : "none",demo: "grid"})
    .then((result)=>{ })
    .catch((error)=>console.log(error))
}
//view block
function demo(s_id){
    Section
    .updateOne({_id:s_id},{hide : "grid",demo: "none"})
    .then((result)=>{ })
    .catch((error)=>console.log(error))
}
function down(s_id,name,user_id){
    console.log("down")
    Section
    .find({ id_user:user_id, name_of_blog:name, id: { $gte: s_id}}).sort({id: 1})
    .then((result)=>{
        if ( result.length > 1 ){
            let temp_value = result[1].id;
            Section.updateOne({_id:result[1].id},{id : s_id}).then((result)=>{ }).catch((error)=>console.log(error))
            Section .updateOne({id_user:result[0].id},{id : temp_value}).then((result)=>{ }).catch((error)=>console.log(error))
        }       
     })
    .catch((error)=>{console.log(error)})
}
function up(s_id,name,user_id){
    
    console.log("up")
    Section
    .find({ id_user:user_id, name_of_blog:name, id: { $lte: s_id}}).sort({id: -1})
    .then((result)=>{
        if ( result.length != 0 ){
            if ( result.length > 1 ){
                let temp_value = result[1].id;
                Section.updateOne({_id:result[1].id},{id : s_id}).then((result)=>{ }).catch((error)=>console.log(error))
                Section .updateOne({id_user:result[0].id},{id : temp_value}).then((result)=>{ }).catch((error)=>console.log(error))
            } 
        }
     })
    .catch((error)=>{console.log(error)})
}

function find_max(result){
    let s_id;
    if(result.length){
        s_id = result[0].id;
       s_id++;

   }
   else{s_id=0;}
   return s_id;
}


function change_text(s_id, s_text,text_number){// text_number = number of text in section ; s_text =  changed text 
    console.log("change_text")
    console.log(text_number)
    Section
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
        console.log("sss - ", scs)
        //keep change
        Section
        .findByIdAndUpdate(s_id, {code:scs})
        .then((result)=>{console.log("CHANGED")})
    })
    
   
}

function change_text_style(start,end, add, s_id, text_number, style){
    console.log("change_text_style")
    console.log(text_number)
    Section
    .findById(s_id)
    .then((result)=>{
        var scs = String(result.code);
        let t_position = 0;
        
        for ( i=0;i<text_number;i++){
            console.log("i")
            t_position +=1;
            t_position = scs.indexOf("text7y88098hdf",t_position);

        }
        t_position +=1;
        t_position = scs.indexOf("text7y88098hdf",t_position);
        var start_position = scs.indexOf(">",t_position);
        
        start_position+=1;
        let end_position = start_position+end+3;
        start_position+=start;
        
        if(add=="add"){
            let add_end_text= style.substring(0,1)+'/'+style.substring(1);
            let result =scs.substring(0,start_position)+style+scs.substring(start_position);
            console.log(result)
            scs = result.substring(0,end_position)+add_end_text+result.substring(end_position);
            console.log(scs)

            
        }
        else{
            //scs=src.remove
        }
       
        Section
        .findByIdAndUpdate(s_id, {code:scs})
        .then((result)=>{console.log("CHANGED")})
    })
}
//change background color
function change_background_color(s_id, s_color){
    Section
         .findByIdAndUpdate(s_id, {backgorund_color:s_color})
         .then((result)=>{console.log("CHANGED")})
}

//change text color
function change_text_color(s_id, s_color){
    Section
         .findByIdAndUpdate(s_id, {text_color:s_color})
         .then((result)=>{console.log("CHANGED")})
}
//change text color
function change_font(s_id, s_color){
    Section
         .findByIdAndUpdate(s_id, {text_font:s_color})
         .then((result)=>{console.log("CHANGED")})
}

// function upload_file(s_id, s_color){
//     console.log("tut")
//     // upload.single('image')
//     // let img=  {
//     //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + s_color)),
//     //     contentType: 'image/png'
//     // }
//     console.log(s_color)

    // Section
    //      .findByIdAndUpdate(s_id, {img})
    //      .then((result)=>{console.log("CHANGED")})

//}
