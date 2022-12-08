
// open grid to view types of block
function view_types_of_section(){
    document.getElementById("left1").style.display="grid";
}
// close grid to view types of block
function cerrar(){
    document.getElementById("left1").style.display="none";
    document.getElementById("types_of_block").style.display="none";
}
// to view blocks
function view_types_of_block(type_of_block){
    document.getElementById("types_of_block").style.display="grid";
    text=""
    for(i=0;i<blocks.length;i++){
        if(blocks[i]['type']==type_of_block){
            text+=" <button class='choose_type' onclick=  choose_type('"+blocks[i]["name"]+ "','"+type_of_block+"')  style=' background-image: url("+blocks[i]["img"] +");'>\
            </button>";
            
        }
    }
    document.getElementById("types_of_block").innerHTML=text
    
}
// add block to blog
function choose_type(type_name,type_of_block){
    console.log(type_name)
    let setcion_code=""
    
    for(i=0;i<blocks.length;i++){
        if(blocks[i]['name']==type_name){
            setcion_code = blocks[i]["codes"]
        }
    }
    console.log(setcion_code)
    let user_id = find_user_id()
    let blog_name = find_blog_name()

    
    var xhr = new window.XMLHttpRequest()
    xhr.open('POST',`/user/${user_id}/blog/${blog_name}`, true)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.send(JSON.stringify({act:"add_block", s_name:type_name , scs:setcion_code   }))
    window.location.reload()

    cerrar()
    
}

// loading block on page
function load_blocks(data){
    console.log(data)
    let sections = document.getElementsByClassName("for_load");
     let position0=0;
     var i=0;
     let position1 = data.search("end827rifddfo");
    while(position1 > 0){ 
       sections[i].innerHTML =data.substring(position0, position1);
        i++;
    position0 =  position1 +13;
        position1 =data.indexOf("end827rifddfo", position1+1);

    }
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
//find user id from link
function find_blog_name(){
    let position1 = window.location.href.search("/blog");
    position1+=6;
    let str = window.location.href;
    let blog_name=str.substring(position1) 
    console.log(blog_name)
    return blog_name

}
//change block
function act(act_s, id, ob){
    let user_id = find_user_id()
    let blog_name = find_blog_name()
    var xhr_demo = new window.XMLHttpRequest()
    xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}`, true)
    xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr_demo.send(JSON.stringify({act:act_s, s_id:id    }))
   // window.location.reload()
    

}

function change_text(ob){
    // hide all other textarreas
    let textsarreas = document.getElementsByClassName("txtarea")
    for (i=0;i<textsarreas.length;i++){
        textsarreas[i].style.display="none"
    }
    //find parrent node of text
    let parnode = ob.parentNode;
    let texts = parnode.getElementsByClassName("text7y88098hdf");
    //find text_number
    let text_number = 0
    for (i=0;i<texts.length;i++){
        if (texts[i]== ob){  text_number = i }
    }
    //find section_id
    while (parnode.getAttribute('id') == null){//while DOM element hasn't atribute "ID"
        parnode = parnode.parentNode;
     }
     let section_number= String(parnode.id)
     // CHANGE TEXT WITHOUT <> 
    let text = ob.innerHTML;
    const newItem = document.createElement('t');

    //create textarte
    if ( ob.className.includes("texto_centro") ==  true  ){
        console.log("1")
        newItem.innerHTML=`<div  class = "txtarea"  style='display:grid; position:relative; z-index:9; margin-top:-5%; height:15%' > <textarea contenteditable onclick="selected_text(event,'${section_number}', ${text_number}, this)" id='area' onkeypress='change_text1(event,this, ${text_number},"${section_number}")' class='for_change_content texto_centro' type='text' style=' background-color: aliceblue;height: 150%;'  >${text}</textarea> </div>`
    }
    else if( ob.className.includes("text-muted") ==  true   ){
        console.log("2")
        newItem.innerHTML=`<div  class = "txtarea"   style='display:grid;place-items: center;    position: relative; z-index: 9;margin-top: -5%;height: 15%;' > <textarea contenteditable onclick="selected_text(event,'${section_number}', ${text_number}, this)" id='area' onkeypress='change_text1(event,this, ${text_number},"${section_number}")' class='for_change_content text-muted' type='text' style=' width: 150%; height: 100%; background-color: aliceblue;'  >${text}</textarea> </div>`
    }
    else if( ob.className.includes("brand") ==  true  ){
        console.log("3")
        newItem.innerHTML=`<div style='display:grid     position: relative; z-index: 9; margin-top: -5%; height: 15%;' class = "txtarea" > <textarea contenteditable  onkeypress='change_text1(event,this, ${text_number},"${section_number}")' id='area' )class='for_change_content brand' type='text' style=' width: 30%; background-color: aliceblue;'    >${text}</textarea> </div>`
    }
    //replace text on textarea
    parnode.replaceChild(newItem, ob);
    console.log(ob)
}

function change_text1(event,ob,text_number,section_number){
    if(event.keyCode === 13){// if user press "Enter"
        text_from_user = ob.value
    let user_id = find_user_id()
    let blog_name = find_blog_name()
    var xhr_demo = new window.XMLHttpRequest()
    xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}`, true)
    xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr_demo.send(JSON.stringify({act:"change_text", s_text:text_from_user, text_number:text_number, s_id:section_number   }))
    window.location.reload()
    }
}

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
    // console.log("text_selected" ,text_sele.toString())
    // console.log(start,end)
    // console.log("data , " , text_sele.commonAncestorContainer.data )

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
    
<select class='herramineta' name='color'>\
    <option disabled>color</option>\
    <option>yellow</option>\
    <option>green</option>\
    <option>blue</option>\
    <option>white</option>\
    <option>black</option>\
    <option>gris</option>\
    <option>pink</option>\
    <option>red</option>\
    <option>brow</option>\
    <option>purple</option>\
</select>\
<select class='herramineta' name='background-color'>\
    <option disabled>background color</option>\
    <option>yellow</option>\
    <option>green</option>\
    <option>blue</option>\
    <option>white</option>\
    <option>black</option>\
    <option>gris</option>\
    <option>pink</option>\
    <option>red</option>\
    <option>brow</option>\
    <option>purple</option>\
</select>\
</div>`
//insert new div with instrumentos before textarea in which is selected text
ob.parentNode.insertBefore(instrumentNode, ob)
// color buttons
color_button(ob.innerHTML ,  text_sele.toString() ,   text_sele.commonAncestorContainer.data, start)
}

}

function change_text_style(start, end, style, section_number, text_number, button_number,all_text, selected_text, parted_text){
    let add = "add";
    let buttons = document.getElementsByClassName("herramineta");
    console.log("aqui")
    let ind = all_text.indexOf(parted_text)
    let index_started = all_text.indexOf("<", ind+start-1)
    let index_ended = all_text.indexOf("</",ind+start-1)
    let next_index_ended = all_text.indexOf("</", index_ended+1)
    console.log(index_started,index_ended)
    console.log(index_ended,next_index_ended)
    let add_end_text= style.substring(0,1)+'/'+style.substring(1);
    let all_text_for_checkong = style+selected_text+add_end_text;
    let result1 = ""
    let end_position = ind + 4+selected_text.length;
    if (index_ended <= index_started){
        if ( all_text.substring(index_ended,next_index_ended).includes("</b>") == true ){
            
        buttons[button_number].style.background = "skyblue"
         add = "delete";
         result1 =  all_text.substring(0,ind-3) + selected_text + all_text.substring(end_position)
        console.log("delete_style")
        console.log(result1)
    }
}
    if (add == "add") {
        buttons[button_number].style.background = "aliceblue"
        let add = "add";
        console.log("add_style")
       
        let ind = all_text.indexOf(parted_text)
        
         result1 = all_text.substring(0,ind) +parted_text.substring(0,start)+style+selected_text+add_end_text+parted_text.substring(end)
        if (ind+parted_text.length < all_text.length ){
            result1+=all_text.substring(ind+parted_text.length)
        }
        console.log(result1)
    }


    let user_id = find_user_id()
    let blog_name = find_blog_name()
    var xhr_demo = new window.XMLHttpRequest()
    xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}`, true)
    xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr_demo.send(JSON.stringify({act:"change_text", s_text:result1, text_number:text_number, s_id:section_number   }))
    window.location.reload()
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
    //change in bd
    let user_id = find_user_id()
    let blog_name = find_blog_name()
    var xhr_demo = new window.XMLHttpRequest()
    xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}`, true)
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
    //change in bd
    let user_id = find_user_id()
    let blog_name = find_blog_name()
    var xhr_demo = new window.XMLHttpRequest()
    xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}`, true)
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
        //change in bd
        let user_id = find_user_id()
        let blog_name = find_blog_name()
        var xhr_demo = new window.XMLHttpRequest()
        xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}`, true)
        xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        xhr_demo.send(JSON.stringify({act:"change_font", s_color:s_color, s_id:s_id   }))
       window.location.reload()
  
}














