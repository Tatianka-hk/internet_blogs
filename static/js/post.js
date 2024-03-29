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
    var setcion_code = "";
    // find code
    for(i=0;i<post_blocks.length;i++){
        if(post_blocks[i]['name'] == post_section){
            setcion_code = post_blocks[i]["codes"];
        }
    }
    // find parameters from link
    var user_id = find_user_id();
    var blog_name = find_blog_name();
    var post_name=find_post_name();
    //send info
    var xhr = new window.XMLHttpRequest();
    xhr.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify({act:"add_block", type_name:post_section , scs:setcion_code}));
    window.location.reload();
    close_view_types_of_section();
}

//find user id from link
function find_user_id(){
    var position1 = window.location.href.search("/user");
    position1 += 6;
    var position2 = window.location.href.search("/blog");
    var str = window.location.href;
    var user_id = str.substring(position1,position2);
    return user_id

}
//find blog name from link
function find_blog_name(){
    var position1 = window.location.href.search("/blog");
    position1 += 6;
    var position2 = window.location.href.search("/post");
    var str = window.location.href;
    var blog_name=str.substring(position1, position2);
    return blog_name

}
//find post name from link
function find_post_name(){
    var position1 = window.location.href.search("/post");
    position1 +=6;
    var str = window.location.href;
    var post_name = str.substring(position1) 
    return post_name
}
// loading post
function load_blocks(data){
    var sections = document.getElementsByClassName("for_load");
    var position0 = 0;
    var i = 0;
    var position1 = data.search("end827rifddfo");
    while(position1 > 0){ 
       sections[i].innerHTML = data.substring(position0, position1);
       i++;
       position0 = position1 + 13;
       position1 = data.indexOf("end827rifddfo", position1+1);
    }
}

//change block
function act(act_s, id, ob){
    // find parameters from link
    var user_id = find_user_id();
    var blog_name = find_blog_name();
    var post_name=find_post_name();
    //send info
    var xhr_demo = new window.XMLHttpRequest();
    xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true);
    xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr_demo.send(JSON.stringify({act:act_s, s_id:id}));
    window.location.reload();
    

}
//change text
function change_text1(event,ob){
    var parnode = ob.parentNode;
    var texts = parnode.getElementsByClassName("text7y88098hdf");
    var text_number = 0;
    for (i=0;i<texts.length;i++){
        if (texts[i]== ob){  text_number = i }
    }
    //find section_id
    while (parnode.getAttribute('id') == null){//while DOM element hasn't atribute "ID"
        parnode = parnode.parentNode;
     }
     
    var section_number= String(parnode.id);
    if(event.keyCode === 13){// if user press "Enter"
        text_from_user = ob.innerHTML
        while (text_from_user.includes('&lt;') == true){
            var index1 =  text_from_user.indexOf('&lt;');
            text_from_user = text_from_user.substring(0, index1)+'<'+text_from_user.substring(index1+4);
         }
         while (text_from_user.includes('&gt;') == true){
            var index =  text_from_user.indexOf('&gt;');
            text_from_user = text_from_user.substring(0, index)+'>'+text_from_user.substring(index+4)
         }
         while (text_from_user.includes('"') == true){
            var index =  text_from_user.indexOf('"');
            text_from_user = text_from_user.substring(0, index)+"'"+text_from_user.substring(index+1)
         }
        console.log(" 13");
        console.log(text_from_user);
        // find parameters from link
        var user_id = find_user_id();
        var blog_name = find_blog_name();
        var post_name=find_post_name();
        //send info
        var xhr_demo = new window.XMLHttpRequest();
        xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true);
        xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr_demo.send(JSON.stringify({act:"change_text", s_text:text_from_user, text_number:text_number, s_id:section_number }));
        window.location.reload();
    }
}

function color_button(all_text,selected_text,parted_text,start){
    var buttons = document.getElementsByClassName("herramineta");
    var ind = all_text.indexOf(parted_text);
    var index_started = all_text.indexOf("<", ind+start-1);
    var index_ended = all_text.indexOf("</",ind+start-1);
    var next_index_ended = all_text.indexOf("</", index_ended+1);
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
    var parnode = ob.parentNode;
    var texts = parnode.getElementsByClassName("text7y88098hdf");
    //find text_number
    var text_number = 0;
    for (i=0;i<texts.length;i++){
        if (texts[i]== ob){  text_number = i };
    }
    //find section_id
    while (parnode.getAttribute('id') == null){
       parnode = parnode.parentNode;
    }
    var section_number= String(parnode.id)
    var text_sele = window.getSelection().getRangeAt(0);// find selected text

    //remove all instrumentos
    var herramientos = document.getElementsByClassName("herramientos")
    for (i=0;i<herramientos.length;i++){
        herramientos[i].style.display="none"
        console.log("i - ", i)
    }
    if (text_sele.toString().length > 0 ){
        //create new div with instrumentos
        const  instrumentNode = document.createElement('herramients')
        instrumentNode.style.marginBottom = '3px'
        instrumentNode.innerHTML+=` <div class='herramientos'  style='display:flex; background-color: aliceblue; margin-bottom:3px'>\
        <button class='herramineta' onclick = "change_text_style( '<b>', 'B', '${section_number}', ${text_number},'</b>')"><b>B</b></button>\
        <button class='herramineta'  onclick = "change_text_style('<i>', 'I', '${section_number}', ${text_number},'</i>')" ><i>I</i></button>\
        <button class='herramineta'  onclick = "change_text_style('<u>', 'U', '${section_number}', ${text_number},'</u>')" ><u>U</u></button>\
        <button class='herramineta'  onclick = "change_text_style('<s>', 'S', '${section_number}', ${text_number},'</s>')" ><s>U</s></button>\
        
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
    var style_name = 'SPAN';
    var style = `<span style='color:#${ob.value}'>`;
    var style_end = '</span>';
    change_text_style( style, style_name,  section_number, text_number,style_end);

}
function make_up_style1(ob, section_number, text_number){
    var style_name = 'SPAN';
    var style = `<span style='background-color:#${ob.value}'>`;
    var style_end = '</span>';
    change_text_style( style, style_name,  section_number, text_number,style_end);
}

function change_text_style( style, style_name,  section_number, text_number,style_end){
    // if text is selected
    if (styled(style, style_name,  section_number, text_number)==true){
        add( style, style_name,  section_number, text_number, style_end);
    }
    else{
        var text_sele = window.getSelection().getRangeAt(0);// find selected text  0 221
        if (text_sele.toString() ==  text_sele.commonAncestorContainer.nodeValue){
            full(  style, style_name,  section_number, text_number, style_end);
        }
        else{
            var start = text_sele.startOffset;//find start of selected text
            var end = text_sele.startOffset +text_sele.toString().length;//find end of selected text
            text_sele.commonAncestorContainer.nodeValue  = text_sele.commonAncestorContainer.nodeValue.substring(0, start)+style_end + text_sele.commonAncestorContainer.nodeValue.substring(start,end) +style+ text_sele.commonAncestorContainer.nodeValue.substring(end);
            var par = text_sele.commonAncestorContainer.parentNode
            while (par.nodeName != "DIV"  && par.nodeName != "H1"&& par.nodeName != "H2" && par.nodeName != "H3"){
                par = par.parentNode;
            }
            var text = par.innerHTML;
            while (text.includes('&lt;') == true){
                var index1 =  text.indexOf('&lt;');
                text = text.substring(0, index1)+'<'+text.substring(index1+4);
            }
            while (text.includes('&gt;') == true){
                var index =  text.indexOf('&gt;');
                text = text.substring(0, index)+'>'+text.substring(index+4);
            }
            while (text.includes('"') == true){
                var index =  text.indexOf('"');
                text = text.substring(0, index)+"'"+text.substring(index+1);
            }
            //save in bd
            var user_id = find_user_id();
            var blog_name = find_blog_name();
            var post_name = find_post_name();
            var xhr_demo = new window.XMLHttpRequest();
            xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true);
            xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr_demo.send(JSON.stringify({act:"change_text", s_text:text, text_number:text_number, s_id:section_number   }));
            window.location.reload();
            }


    }

   
}


function full( style, style_name,  section_number, text_number,style_end){
    var text_sele = window.getSelection().getRangeAt(0);// find selected text  0 221
    var par = text_sele.commonAncestorContainer.parentNode;
    while (par.nodeName != "DIV" && par.nodeName != "H1"&& par.nodeName != "H2" && par.nodeName != "H3"){
        if (par.nodeName == style_name){
            var pp =  par.parentNode;
            pp.insertBefore(par.childNodes[0], par);
            pp.removeChild(par);
            par = pp;
        }
        else{
            par=par.parentNode;
        }  
    }
    var all_text = par.innerHTML;
    while (all_text.includes('&lt;') == true){
        var index1 =  all_text.indexOf('&lt;');
        all_text = all_text.substring(0, index1)+'<'+all_text.substring(index1+4);
    }
    while (all_text.includes('&gt;') == true){
        var index =  all_text.indexOf('&gt;');
        all_text = all_text.substring(0, index)+'>'+all_text.substring(index+4);
    }
    while (all_text.includes('"') == true){
        var index =  all_text.indexOf('"');
        all_text = all_text.substring(0, index)+"'"+all_text.substring(index+1);
    }
    //save in bs
    var user_id = find_user_id();
    var blog_name = find_blog_name();
    var post_name = find_post_name();
    var xhr_demo = new window.XMLHttpRequest();
    xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true);
    xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr_demo.send(JSON.stringify({act:"change_text", s_text:all_text, text_number:text_number, s_id:section_number   }));
    window.location.reload();
}
function styled(  style, style_name,  section_number, text_number){
    var text_sele = window.getSelection().getRangeAt(0);// find selected text  0 221
    var flag = true;
    var par = text_sele.commonAncestorContainer.parentNode
    while (par.nodeName != "DIV" && par.nodeName != "H1"&& par.nodeName != "H2" && par.nodeName != "H3"){
        console.log()
        if (par.nodeName == style_name){
            flag = false;
        }
        par = par.parentNode;
    }
    return flag;

}
    

function add( style, style_name,  section_number, text_number,style_end){
    //finds values
    var text_sele = window.getSelection().getRangeAt(0);// find selected text  0 221
    var start = text_sele.startOffset//find start of selected text
    var end = text_sele.startOffset +text_sele.toString().length;//find end of selected text
    //change_text
    text_sele.commonAncestorContainer.nodeValue  = text_sele.commonAncestorContainer.nodeValue.substring(0, start)+ style + text_sele.commonAncestorContainer.nodeValue.substring(start,end) +style_end+ text_sele.commonAncestorContainer.nodeValue.substring(end);
    var par = text_sele.commonAncestorContainer
    while (par.nodeName != "DIV"  && par.nodeName != "H1"&& par.nodeName != "H2" && par.nodeName != "H3"){
        par = par.parentNode;
    }
    var text = par.innerHTML;
     while (text.includes('&lt;') == true){
        var index1 =  text.indexOf('&lt;');
        text = text.substring(0, index1)+'<'+text.substring(index1+4);
     }
     while (text.includes('&gt;') == true){
        var index =  text.indexOf('&gt;');
        text = text.substring(0, index)+'>'+text.substring(index+4);
     }
     while (text.includes('"') == true){
        var index =  text.indexOf('"');
        text = text.substring(0, index)+"'"+text.substring(index+1);
     }
    // console.log(text)
    //save in bs
    var user_id = find_user_id();
    var blog_name = find_blog_name();
    var post_name = find_post_name();
    var xhr_demo = new window.XMLHttpRequest();
    xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true);
    xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr_demo.send(JSON.stringify({act:"change_text", s_text:text, text_number:text_number, s_id:section_number   }));
    window.location.reload();
   

    }

    // xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true)

// open div in where user can change style
function show_setting(s_id){
    var blog_sections = document.getElementsByClassName("change_style");
    var blog_section=blog_sections[0] ;
    for(i=0;i<blog_sections.length;i++){
        if (blog_sections[i].id == s_id){
            blog_section=blog_sections[i];
        }
    }
    blog_section.style.display="grid";
}

//close div in where user can change style
function cerrar_change_change_style(s_id){
    let blog_sections = document.getElementsByClassName("change_style");
    let blog_section=blog_sections[0] ;
    for(i=0;i<blog_sections.length;i++){
        if (blog_sections[i].id == s_id){
            blog_section=blog_sections[i];
        }
    }
    blog_section.style.display="none";
}
//change background color
function change_background_color(s_id){
    //initilize color value
    var s_color = "yyy";
    // if user input color in hex
    var regex = /^[0-9a-fA-F]+$/;
    var hexs = document.getElementsByClassName("color_background");
    for (i=0; i<hexs.length;i++){
        if(hexs[i].id == s_id && hexs[i].value != ""){ // if user input value in input area
            if (regex.test(hexs[i].value) == true){ // if value is hex code
                s_color = hexs[i].value;// user input color hex code here
            }
            else{
                div_errors = document.getElementsByClassName("invalid_value_back");
                for(i=0;i<div_errors.length;i++){
                    if (div_errors[i].id == s_id){
                        div_errors[i].innerHTML = "no correct value"; //output error
                    }
                }
            }
        }
    }
    // if user choose color in selects 
    var select = document.getElementsByClassName("select_color_back")
    for (i=0; i<select.length;i++){
        if (select[i].id == s_id){
            if (select[i].value != "choose_color"){
                s_color = select[i].value ;
            }
        }
    }
    // if user no choose or input color 
    if (s_color == "yyy"){
        var div_error = document.getElementsByClassName("no_back_color");
        for(i=0;i<div_error.length;i++){
            if (div_error[i].id == s_id){
                div_error[i].innerHTML = "no choosed color" ;//output error
            }
        }
    }
    else{
        // find parameters from link
        var user_id = find_user_id();
        var blog_name = find_blog_name();
        var post_name=find_post_name();
        //send info
        var xhr_demo = new window.XMLHttpRequest();
        xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true);
        xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr_demo.send(JSON.stringify({act:"change_background_color", s_color:s_color, s_id:s_id }));
        window.location.reload();
    }

}
//change text color
function change_text_color(s_id){
    //initilize color value
    var s_color = "yyy";
    // if user input color in hex
    var regex = /^[0-9a-fA-F]+$/;
    var hexs = document.getElementsByClassName("text_color");
    for (i=0; i<hexs.length;i++){
        if(hexs[i].id == s_id && hexs[i].value != ""){ // if user input value in input area
            if (regex.test(hexs[i].value) == true){ // if value is hex code
                s_color = hexs[i].value; // user input color hex code here
            }
            else{
                div_errors = document.getElementsByClassName("invalue_text_color");
                for(i=0;i<div_errors.length;i++){
                    if (div_errors[i].id == s_id){
                        div_errors[i].innerHTML = "no correct value";//output error
                    }
                }
            }
        }
    }
    // if user choose color in selects 
    var select = document.getElementsByClassName("select_text_color")
    for (i=0; i<select.length;i++){
        if (select[i].id == s_id){
            if (select[i].value != "choose_color"){
                s_color=select[i].value ;
            }
        }
    }
    if (s_color == "yyy"){
        var div_error = document.getElementsByClassName("no_text_color");
        for(i=0;i<div_error.length;i++){
            if (div_error[i].id==s_id){
                div_error[i].innerHTML = "no choosed color"; //output error
            }
        }
    }
    else{
        // find parameters from link
        var user_id = find_user_id();
        var blog_name = find_blog_name();
        var post_name = find_post_name();
        //send info
        var xhr_demo = new window.XMLHttpRequest();
        xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true);
        xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr_demo.send(JSON.stringify({act:"change_text_color", s_color:s_color, s_id:s_id }));
        window.location.reload();
}
}
function choose_font(s_id){
    var s_color = "yyy";
    var select = document.getElementsByClassName("text_font");
    for (i=0; i<select.length;i++){
        if (select[i].id == s_id){
            if (select[i].value != "choose_color"){
                s_color = select[i].value ;
            }
        }
    }
    // if user no choose font
    if (s_color == "yyy"){
        var div_error = document.getElementsByClassName("no_choose_font");
        for(i=0;i<div_error.length;i++){
            if (div_error[i].id==s_id){
                div_error[i].innerHTML = "no choosed font" ;//output error
            }
        }
    }
    else{
        // find parameters from link
        var user_id = find_user_id();
        var blog_name = find_blog_name();
        var post_name = find_post_name();
        //send info
        var xhr_demo = new window.XMLHttpRequest();
        xhr_demo.open('POST',`/user/${user_id}/blog/${blog_name}/post/${post_name}`, true);
        xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr_demo.send(JSON.stringify({act:"change_font", s_color:s_color, s_id:s_id }));
        window.location.reload();
    }
  
}

function delete_post(){
    // find parameters from link
    var user_id = find_user_id();
    var blog_name = find_blog_name();
    var post_name=find_post_name();
    //send info
    var xhr_demo = new window.XMLHttpRequest();
    xhr_demo.open('DELETE',`/user/${user_id}/blog/${blog_name}/post/${post_name}/delete_post`, true);
    xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr_demo.send();
    window.location.href=`/user/${user_id}/blog/${blog_name}`;
}