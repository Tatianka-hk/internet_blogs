// view types of post blocks
function view_types_of_section(){
    console.log(document.getElementById("types_post_block"))
    document.getElementById("types_post_block").style.display = "grid";
}
// close view of post blocks
function close_view_types_of_section(){
    document.getElementById("types_post_block").style.display = "none";
}
// add post block
function add_block_post(post_section){
    let setcion_code=""
    // find code
    for(i=0;i<post_blocks.length;i++){
        if(post_blocks[i]['name']==post_section){
            setcion_code = post_blocks[i]["codes"]
        }
    }
    console.log(setcion_code)
    // find parameters from link
    let user_id = find_user_id()
    let blog_name = find_blog_name()
    let post_name=find_post_name();
    //send info
    var xhr = new window.XMLHttpRequest()
    xhr.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.send(JSON.stringify({act:"add_block", type_name:post_section , scs:setcion_code}))
    //window.location.reload()

    close_view_types_of_section()
}

//find user id from link
function find_user_id(){
    let position1 = window.location.href.search("/user");
    position1+=6;
    let position2 = window.location.href.search("/blog");
    let str = window.location.href;
    let user_id=str.substring(position1,position2)
    console.log(user_id)
    return user_id

}
//find blog name from link
function find_blog_name(){
    let position1 = window.location.href.search("/blog");
    position1+=6;
    let position2 = window.location.href.search("/post");
    let str = window.location.href;
    let blog_name=str.substring(position1, position2) 
    console.log(blog_name)
    return blog_name

}
//find post name from link
function find_post_name(){
    let position1 = window.location.href.search("/post");
    position1+=6;
    let str = window.location.href;
    let post_name=str.substring(position1) 
    console.log(post_name)
    return post_name
}
// loading post
function load_blocks(data){
    console.log(data)
    let sections = document.getElementsByClassName("for_load");
     let position0=0;
     var i=0;
     let position1 = data.search("end827rifddfo");
    while(position1 > 0){ 
       sections[i].innerHTML =data.substring(position0, position1);
       console.log(sections[i])
        i++;
    position0 =  position1 +13;
        position1 =data.indexOf("end827rifddfo", position1+1);

    }
}

//change block
function act(act_s, id, ob){
    // find parameters from link
    let user_id = find_user_id()
    let blog_name = find_blog_name()
    let post_name=find_post_name();
    //send info
    var xhr_demo = new window.XMLHttpRequest()
    xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true)
    xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr_demo.send(JSON.stringify({act:act_s, s_id:id    }))
   window.location.reload()
    

}
//change text
function change_text1(event,ob){
    let parnode = ob.parentNode;
    let texts = parnode.getElementsByClassName("text7y88098hdf");
    let text_number = 0
    for (i=0;i<texts.length;i++){
        if (texts[i]== ob){  text_number = i }
    }
    //find section_id
    while (parnode.getAttribute('id') == null){//while DOM element hasn't atribute "ID"
        parnode = parnode.parentNode;
     }
     
     let section_number= String(parnode.id)
     console.log(text_number, section_number, ob.innerHTML)
    if(event.keyCode === 13){// if user press "Enter"
        text_from_user = ob.innerHTML
    // find parameters from link
    let user_id = find_user_id()
    let blog_name = find_blog_name()
    let post_name=find_post_name();
    //send info
    var xhr_demo = new window.XMLHttpRequest()
    xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true)
    xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr_demo.send(JSON.stringify({act:"change_text", s_text:text_from_user, text_number:text_number, s_id:section_number   }))
    window.location.reload()
    }
}

function color_button(all_text,selected_text,parted_text,start){
    let buttons = document.getElementsByClassName("herramineta");
    console.log("aqui color button")
    let ind = all_text.indexOf(parted_text)
    console.log(ind)
    console.log(ind+start)
    let index_started = all_text.indexOf("<", ind+start-1)
    let index_ended = all_text.indexOf("</",ind+start-1)
    let next_index_ended = all_text.indexOf("</", index_ended+1)
    console.log(index_started,index_ended)
    console.log(index_ended,next_index_ended)
    if (index_ended <= index_started){
        if ( all_text.substring(index_ended,next_index_ended).includes("</b>") == true ){
            buttons[0].style.background = "skyblue"
            console.log("bold")
        }
        if ( all_text.substring(index_ended,next_index_ended).includes("</i>") == true){
            buttons[1].style.background = "skyblue"
            console.log("italic")
        }
        if ( all_text.substring(index_ended,next_index_ended).includes("</u>") == true){
            buttons[2].style.background = "skyblue"
            console.log("under")
        }
        if ( all_text.substring(index_ended,next_index_ended).includes("</s>") == true){
            buttons[3].style.background = "skyblue"
            console.log("stroke")
        }
    }

}

//view setting by selecting
function selected_text(event  ,ob){
    //find parrent node of text
    let parnode = ob.parentNode;
    let texts = parnode.getElementsByClassName("text7y88098hdf");
    //find text_number
    let text_number = 0
    for (i=0;i<texts.length;i++){
        if (texts[i]== ob){  text_number = i }
    }
    //find section_id
    while (parnode.getAttribute('id') == null){
       parnode = parnode.parentNode;
    }
    let section_number= String(parnode.id)

   let text_sele = window.getSelection().getRangeAt(0);// find selected text
   let start = text_sele.startOffset//find start of selected text
   let end = text_sele.startOffset +text_sele.toString().length;//find end of selected text

   console.log(ob)
   //remove all instrumentos
   let herramientos = document.getElementsByClassName("herramientos")
   for (i=0;i<herramientos.length;i++){
       herramientos[i].style.display="none"
       console.log("i - ", i)
  }
   if (text_sele.toString().length > 0 ){

 

   //create new div with instrumentos
   const  instrumentNode = document.createElement('herramients')
   instrumentNode.style.marginBottom = '3px'
   instrumentNode.innerHTML+=` <div class='herramientos'  style='display:flex; background-color: aliceblue; margin-bottom:3px'>\
   <button class='herramineta' onclick = "change_text_style(${start}, ${end}, '<b>','${section_number}', ${text_number}, 0,  '${ob.innerHTML}' ,  '${text_sele.toString()}' ,  '${ text_sele.commonAncestorContainer.data}')"><b>B</b></button>\
   <button class='herramineta'  onclick = "change_text_style(${start}, ${end}, '<i>','${section_number}', ${text_number}, 0,  '${ob.innerHTML}','${text_sele.toString()}' ,  '${ text_sele.commonAncestorContainer.data}')" ><i>I</i></button>\
   <button class='herramineta'  onclick = "change_text_style(${start}, ${end}, '<u>','${section_number}', ${text_number}, 0,  '${ob.innerHTML}','${text_sele.toString()}' ,  '${ text_sele.commonAncestorContainer.data}')" ><u>U</u></button>\
   <button class='herramineta'  onclick = "change_text_style(${start}, ${end}, '<s>','${section_number}', ${text_number}, 0,  '${ob.innerHTML}', '${text_sele.toString()}' ,  '${ text_sele.commonAncestorContainer.data}')" ><s>U</s></button>\
   
   <select class='herramineta' name='color' onchange="make_up_style(this,'${section_number}', ${text_number})">\
   <option value = "choose_color">choose color</option>
   <option value="FFFF00">yellow</option>\
   <option value="00FF00">green</option>\
   <option value="0000FF">blue</option>\
   <option value="ffffff">white</option>\
   <option value="000000">black</option>\
   <option value="828282">gris</option>\
   <option value="ffc0cb">pink</option>\
   <option value="FF0000">red</option>\
   <option value="964B00">brown</option>\
   <option value="BF40BF">purple</option>\
   </select>\
   <select class='herramineta' name='background-color'  onchange="make_up_style1(this,'${section_number}', ${text_number})">\
   <option value = "choose_color">choose color</option>
                                           <option value="FFFF00">yellow</option>\
                                           <option value="00FF00">green</option>\
                                           <option value="0000FF">blue</option>\
                                           <option value="ffffff">white</option>\
                                           <option value="000000">black</option>\
                                           <option value="828282">gris</option>\
                                           <option value="ffc0cb">pink</option>\
                                           <option value="FF0000">red</option>\
                                           <option value="964B00">brown</option>\
                                           <option value="BF40BF">purple</option>\
   </select>\
</div>`
//insert new div with instrumentos before textarea in which is selected text
ob.parentNode.insertBefore(instrumentNode, ob)
// color buttons
//color_button(ob.innerHTML ,  text_sele.toString() ,   text_sele.commonAncestorContainer.data, start)
}
else{
  //  change_text(ob)
}

}

function make_up_style(ob, section_number, text_number){
    let style_name='SPAN';
    let style=`<span style='color:#${ob.value}'>`
    console.log(style)
    style_end='</span>'
    change_text_style( style, style_name,  section_number, text_number,style_end)

}
function make_up_style1(ob, section_number, text_number){
    let style_name='SPAN';
    let style=`<span style='background-color:#${ob.value}'>`
    console.log(style)
    style_end='</span>'
    change_text_style( style, style_name,  section_number, text_number,style_end)

}

function change_text_style( style, style_name,  section_number, text_number,style_end){
    document.getElementById("her").style.display='none;'
    console.log("true");
    if (styled(style, style_name,  section_number, text_number)==true){
        add( style, style_name,  section_number, text_number, style_end);
    }
    else{
        let text_sele = window.getSelection().getRangeAt(0);// find selected text  0 221
        if (text_sele.toString() ==  text_sele.commonAncestorContainer.nodeValue){
            full(  style, style_name,  section_number, text_number, style_end)
        }
        else{
            let start = text_sele.startOffset//find start of selected text
            // let style_end='</'+style.substring(1);
            let end = text_sele.startOffset +text_sele.toString().length;//find end of selected text
            text_sele.commonAncestorContainer.nodeValue  = text_sele.commonAncestorContainer.nodeValue.substring(0, start)+style_end + text_sele.commonAncestorContainer.nodeValue.substring(start,end) +style+ text_sele.commonAncestorContainer.nodeValue.substring(end)                  
console.log(text_sele.commonAncestorContainer)
let par = text_sele.commonAncestorContainer.parentNode
    while (par.nodeName != "DIV"){
        console.log()
        if (par.nodeName == style_name){
            flag = false;
        }
        par = par.parentNode;
    }

    console.log(par.innerHTML)
    let text = par.innerHTML;
     while (text.includes('&lt;') == true){
        let index1 =  text.indexOf('&lt;')
        text = text.substring(0, index1)+'<'+text.substring(index1+4);
        console.log(text.innerHTML)
     }
     while (text.includes('&gt;') == true){
        let index =  text.indexOf('&gt;')
        console.log(text.substring(0, index)+'>')
        text = text.substring(0, index)+'>'+text.substring(index+4)
        console.log(text)
     }
     while (text.includes('"') == true){
        let index =  text.indexOf('"')
        console.log(text.substring(0, index)+'>')
        text = text.substring(0, index)+"'"+text.substring(index+1)
        console.log(text)
     }

let user_id = find_user_id()
let blog_name = find_blog_name()
var xhr_demo = new window.XMLHttpRequest()
xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true)
xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
xhr_demo.send(JSON.stringify({act:"change_text", s_text:text, text_number:text_number, s_id:section_number   }))
window.location.reload()
            }


    }

   
}


function full( style, style_name,  section_number, text_number,style_end){
    console.log("full")
    let text_sele = window.getSelection().getRangeAt(0);// find selected text  0 221
    let flag = true;
    console.log(text_sele)
    let par = text_sele.commonAncestorContainer.parentNode
    while (par.nodeName != "DIV"){
        console.log(par.nodeName)
        if (par.nodeName == style_name){
            flag = false;
            let pp =  par.parentNode;
            
            console.log(par.childNodes)
            pp.insertBefore(par.childNodes[0], par);
            pp.removeChild(par)
            par = pp;
        }
        else{
            par=par.parentNode;
        }
       
        
    }
    console.log("parNode - ", par);
    let all_text = par.innerHTML

console.log("finally - ", all_text)
//save in bs
let user_id = find_user_id()
let blog_name = find_blog_name()
var xhr_demo = new window.XMLHttpRequest()
xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true)
xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
xhr_demo.send(JSON.stringify({act:"change_text", s_text:all_text, text_number:text_number, s_id:section_number   }))
window.location.reload()
}
function styled(  style, style_name,  section_number, text_number){
    console.log(style_name)
    let text_sele = window.getSelection().getRangeAt(0);// find selected text  0 221
    let flag = true;
    console.log(text_sele)
    let par = text_sele.commonAncestorContainer.parentNode
    while (par.nodeName != "DIV"){
        console.log()
        if (par.nodeName == style_name){
            flag = false;
        }
        par = par.parentNode;
    }
    console.log("flag - ", flag);
    return flag;

}
    

function add( style, style_name,  section_number, text_number,style_end){
    console.log("add")
    //finds values
    let text_sele = window.getSelection().getRangeAt(0);// find selected text  0 221
    let start = text_sele.startOffset//find start of selected text
let end = text_sele.startOffset +text_sele.toString().length;//find end of selected text
// let style_end='</'+style.substring(1);
//change_text
text_sele.commonAncestorContainer.nodeValue  = text_sele.commonAncestorContainer.nodeValue.substring(0, start)+ style + text_sele.commonAncestorContainer.nodeValue.substring(start,end) +style_end+ text_sele.commonAncestorContainer.nodeValue.substring(end)
console.log(text_sele.commonAncestorContainer.nodeValue)
let par = text_sele.commonAncestorContainer.parentNode
    while (par.nodeName != "DIV"){
        console.log()
        if (par.nodeName == style_name){
            flag = false;
        }
        par = par.parentNode;
    }

    console.log(par.innerHTML)
    let text = par.innerHTML;
     while (text.includes('&lt;') == true){
        let index1 =  text.indexOf('&lt;')
        text = text.substring(0, index1)+'<'+text.substring(index1+4);
        console.log(text.innerHTML)
     }
     while (text.includes('&gt;') == true){
        let index =  text.indexOf('&gt;')
        console.log(text.substring(0, index)+'>')
        text = text.substring(0, index)+'>'+text.substring(index+4)
        console.log(text)
     }
     while (text.includes('"') == true){
        let index =  text.indexOf('"')
        console.log(text.substring(0, index)+'>')
        text = text.substring(0, index)+"'"+text.substring(index+1)
        console.log(text)
     }
    // console.log(text)
//save in bs
let user_id = find_user_id()
let blog_name = find_blog_name()
var xhr_demo = new window.XMLHttpRequest()
xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true)
xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
xhr_demo.send(JSON.stringify({act:"change_text", s_text:text, text_number:text_number, s_id:section_number   }))
// window.location.reload()
   

    }

    // xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true)

// open div in where user can change style
function show_setting(s_id){
    let blog_sections = document.getElementsByClassName("change_style")
    let blog_section=blog_sections[0] ;
    for(i=0;i<blog_sections.length;i++){
        if (blog_sections[i].id == s_id){
            blog_section=blog_sections[i]
        }
    }

    blog_section.style.display="grid";
}

//close div in where user can change style
function cerrar_change_change_style(s_id){
    let blog_sections = document.getElementsByClassName("change_style")
    let blog_section=blog_sections[0] ;
    for(i=0;i<blog_sections.length;i++){
        if (blog_sections[i].id == s_id){
            blog_section=blog_sections[i]
        }
    }
    blog_section.style.display="none";
}
//change background color
function change_background_color(s_id){
    //initilize color value
    let s_color = "yyy";
    // if user input color in hex
    let flag = false;
    var regex = /^[0-9a-fA-F]+$/;
    let hexs = document.getElementsByClassName("color_background")
    for (i=0; i<hexs.length;i++){
        if(hexs[i].id == s_id && hexs[i].value != ""){ // if user input value in input area
            if (regex.test(hexs[i].value) == true){ // if value is hex code
                s_color = hexs[i].value // user input color hex code here
            }
            else{
                div_errors = document.getElementsByClassName("invalid_value_back");
                for(i=0;i<div_errors.length;i++){
                    if (div_errors[i].id==s_id){
                        flag = true;
                        div_errors[i].innerHTML = "no correct value" //output error
                    }
                }
            }
        }
    }
    
    // if user choose color in selects 
    let select = document.getElementsByClassName("select_color_back")
    for (i=0; i<select.length;i++){
        if (select[i].id == s_id){
            if (select[i].value != "choose_color"){
                s_color=select[i].value ;
            }
        }
    }
    // if user no choose or input color 
    if (flag == false){
    if (s_color == "yyy"){
        let div_error = document.getElementsByClassName("no_back_color");
        for(i=0;i<div_error.length;i++){
            if (div_error[i].id==s_id){
                div_error[i].innerHTML = "no choosed color" //output error
            }
        }
    }
}
    // find parameters from link
    let user_id = find_user_id()
    let blog_name = find_blog_name()
    let post_name=find_post_name();
    //send info
    var xhr_demo = new window.XMLHttpRequest()
    xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true)
    xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr_demo.send(JSON.stringify({act:"change_background_color", s_color:s_color, s_id:s_id   }))
    window.location.reload()

}
//change text color
function change_text_color(s_id){
    //initilize color value
    let s_color = "yyy";
    // if user input color in hex
    let flag = false;
    var regex = /^[0-9a-fA-F]+$/;
    let hexs = document.getElementsByClassName("text_color")
    for (i=0; i<hexs.length;i++){
        if(hexs[i].id == s_id && hexs[i].value != ""){ // if user input value in input area
            if (regex.test(hexs[i].value) == true){ // if value is hex code
                s_color = hexs[i].value // user input color hex code here
            }
            else{
                div_errors = document.getElementsByClassName("invalue_text_color");
                for(i=0;i<div_errors.length;i++){
                    if (div_errors[i].id==s_id){
                        flag = true;
                        div_errors[i].innerHTML = "no correct value" //output error
                    }
                }
            }
        }
    }
    
    // if user choose color in selects 
    let select = document.getElementsByClassName("select_text_color")
    for (i=0; i<select.length;i++){
        if (select[i].id == s_id){
            if (select[i].value != "choose_color"){
                s_color=select[i].value ;
            }
        }
    }
    // if user no choose or input color 
    if (flag == false){
    if (s_color == "yyy"){
        let div_error = document.getElementsByClassName("no_text_color");
        for(i=0;i<div_error.length;i++){
            if (div_error[i].id==s_id){
                div_error[i].innerHTML = "no choosed color" //output error
            }
        }
    }
}
    console.log("color - ", s_color);
    // find parameters from link
    let user_id = find_user_id()
    let blog_name = find_blog_name()
    let post_name=find_post_name();
    //send info
    var xhr_demo = new window.XMLHttpRequest()
    xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true)
    xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr_demo.send(JSON.stringify({act:"change_text_color", s_color:s_color, s_id:s_id   }))
   window.location.reload()
}
function choose_font(s_id){
    let s_color="yyy"
        let select = document.getElementsByClassName("text_font")
        for (i=0; i<select.length;i++){
            if (select[i].id == s_id){
                if (select[i].value != "choose_color"){
                    s_color=select[i].value ;
                }
            }
        }
        // if user no choose font
        if (s_color == "yyy"){
            let div_error = document.getElementsByClassName("no_choose_font");
            for(i=0;i<div_error.length;i++){
                if (div_error[i].id==s_id){
                    div_error[i].innerHTML = "no choosed font" //output error
                }
            }
        }
        console.log("color - ", s_color);
    // find parameters from link
    let user_id = find_user_id()
    let blog_name = find_blog_name()
    let post_name=find_post_name();
    //send info
    var xhr_demo = new window.XMLHttpRequest()
    xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true)
        xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        xhr_demo.send(JSON.stringify({act:"change_font", s_color:s_color, s_id:s_id   }))
       window.location.reload()
  
}


function delete_post(){
    console.log("lol")
    // find parameters from link
    let user_id = find_user_id()
    let blog_name = find_blog_name()
    let post_name=find_post_name();
    //send info
    var xhr_demo = new window.XMLHttpRequest()
    xhr_demo.open('DELETE',`/user/${user_id}/blog/${blog_name}/post/${post_name}/delete_post`, true)
        xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        xhr_demo.send()
        window.location.href=`/user/${user_id}/blog/${blog_name}`
    
}




