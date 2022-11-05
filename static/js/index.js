function button_on_click(){
    if( document.getElementById("left").style.display =='grid'){
        document.getElementById("left").style.display='none';
        document.getElementById("centre").style.display='grid';
        document.getElementById("Footer").style.position='inherit';
        document.getElementById("main").style.position='inherit';
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

function create_section(){
    
}