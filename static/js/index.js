function button_on_click(){
    if( document.getElementById("left").style.display =='grid'){
        document.getElementById("left").style.display='none';
        document.getElementById("centre").style.display='grid';
        document.getElementById("Footer").style.position='absolute';
        document.getElementById("main").style.position='absolute';
    }
    else{
        document.getElementById("centre").style.display='none';
        document.getElementById("left").style.display='grid';
        document.getElementById("Footer").style.position='absolute';
        document.getElementById("main").style.position='absolute';
    }
    
}

function for_change_name(){
    document.getElementById("row_user_name").innerHTML = '<td  id="user_name"><input id="edit_name_input" type="text" placeholder="Your Name *" data-sb-validations="required"/>\
    <div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div></td>\
<td><button class="buttonchange" onclick="change_name()">edit</button></td>'
}

function for_change_email(){
    document.getElementById("row_user_email").innerHTML = '<td  id="user_email"><input id="edit_email_input" type="email" placeholder="Your Email *" data-sb-validations="required,email"/>\
    <div class="invalid-feedback" data-sb-feedback="email:required">A email is required.</div></td>\
    <div class="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>\
<td><button class="buttonchange" onclick="change_email()">edit</button></td>'
}

function change_name(){
    document.getElementById("row_user_name").innerHTML = '<td  id="user_name">'+ document.getElementById('edit_name_input').value+'</td>\
    <td><button class="buttonedit" onclick="for_change_name()"><img class="imgedit" src="/static/img/edit.png"></button></td>'
}

function change_email(){
    document.getElementById("row_user_email").innerHTML = ' <td id=user_email">'+document.getElementById('edit_email_input').value+'</td>\
    <td><button class="buttonedit" onclick="for_change_email()"><img class="imgedit" src="/static/img/edit.png"></button></td>'
}

function lwindow(){
    var blogs=document.getElementsByClassName("proyect");
    console.log(blogs)
    if(blogs.length <4){
        document.getElementById("main").style.position='absolute';
        document.getElementById("Footer").style.marginBottom=0;
        document.getElementById("Footer").style.position='absolute';
    }
}

let amount=0;



function view_types_of_section(){
    document.getElementById("left1").style.display="grid";
}

function cerrar(){
    document.getElementById("left1").style.display="none";
    document.getElementById("types_of_block").style.display="none";
}

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
function choose_type(type_name,type_of_block){
    Htext="";
    Htext+="<div class='section blog_section' id='"+amount+"'>  \
    <div class='setting' id='s"+amount+"'>\
        <div class='left'>\
            <select  class='section_setting' id='selector'>\
           <option selected>"+type_name+"</option>";
    for(i=0;i<blocks.length;i++){
        if(blocks[i]['type']==type_of_block && blocks[i]['name']!=type_name){
             Htext+="<option>"+blocks[i]['name']+"</option>"            
         }
        
    }
    //
    Htext+=" </select>\
    <button class='section_setting content'>Content</button>\
        </div>\
        <div class ='right'>\
            <button class='section_setting'><img class='img_setting' src='/static/img/edit.png'></button>\
            <button class='section_setting' onclick=delete_section('"+amount+"')><img class='img_setting'  src='/static/img/delete.png'></button>\
            <button class='section_setting' onclick=hide('c"+amount+"','s"+amount+"','h"+amount+"')><img class='img_setting'  src='/static/img/on.png'></button>\
            <button class='section_setting' onclick=up('"+amount+"')>▲</button>\
            <button class='section_setting' onclick=down('"+amount+"')>▼</button>\
        </div>\
    </div>\
    <div class='hiden' id='h"+amount+"' style='background-color:#fff; width:100%;display:none; place-items: center;'>\
    <div class ='right'>\
        <button class='section_setting' onclick=demo('c"+amount+"','s"+amount+"','h"+amount+"') style='background-color:#fff; '><img class='img_setting' style='background-color:#fff; ' src='/static/img/on.png'></button>\
    </div>\
    <h1>HIDDEN</h1>\
</div>\
    <div id='c"+amount+"'>";
    
    
    ;
    for(i=0;i<blocks.length;i++){
        if(blocks[i]['name']==type_name){
            Htext+=blocks[i]['code'];
            Htext+="</div> </div>"
            
        }

    }
    document.getElementById("user_blog").innerHTML+=Htext
    amount++;
    cerrar()

    // }"+blocks[i]["name"]+"
    
}

function delete_section(id){
    console.log('id - ' ,id);
    document.getElementById(id).remove();
}
function up(id){
    console.log(id);
}

function down(id){
    
    console.log(id);
}


function hide(c, s, h){
    console.log(c,s,h);


    console.log(document.getElementById(h).innerHTML);

    document.getElementById(c).style.display="none";
    document.getElementById(s).style.display="none";
    document.getElementById(h).style.display="grid";
}

function demo(c, s, h){
    console.log(c,s,h);


    document.getElementById(c).style.display="grid";
    document.getElementById(s).style.display="flex";
    document.getElementById(h).style.display="none";
}

// window.addEventListener('load', () => {
//         let selectObj = document.querySelector('[name=selector]');
//         let spanForChange = document.getElementsByTagName('span')[0];
     
//         selectObj.addEventListener('change', () => {
//             let selectedValue = selectObj.value;
//             console.log(selectedValue)
//         });

//     });
var selector = document.getElementById('selector')

    
    
selector.addEventListener('change', function() {
    var index = selector.value;
    console.log(index)
})    