//para cerrar o abrir grid
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

// función para cambiar nombre.insista grid 
function for_change_name(){
    document.getElementById("row_user_name").innerHTML = ` <div  id="user_name"><input id="edit_name_input" name = "edit_name_input" type="text" placeholder="Your Name *" />\
   </div>\
<div><button onclick = "put_name()" class="buttonchange" type="submit">edit</button></div>`
}
// función para cambiar correo electronca.insista grid 
function for_change_email(){
    document.getElementById("row_user_email").innerHTML = '<div  id="user_email"><input id="edit_email_input" type="email" placeholder="Your Email *" /></div>\
<div><button onclick = "put_email()" class="buttonchange"  type="submit">edit</button></div>'
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

// función que cambia nombre en base de datos
function put_name(){
   id =  find_user_id()
   console.log(id)
   let name_input = document.getElementById("edit_name_input")
   let puted_name= name_input.value
   console.log(puted_name)
   var xhr_demo = new window.XMLHttpRequest()
   xhr_demo.open('PUT',`/user/${id}/name`, true)
   xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
   xhr_demo.send(JSON.stringify({ edit_name_input: puted_name    }))
    window.location.reload()
}
// function for changing user email
function put_email(){
    id =  find_user_id()
   console.log(id)
   let name_input = document.getElementById("edit_email_input")
   let puted_name= name_input.value
   console.log(puted_name)
   var xhr_demo = new window.XMLHttpRequest()
   xhr_demo.open('PUT',`/user/${id}/email`, true)
   xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
   xhr_demo.send(JSON.stringify({ edit_name_input: puted_name    }))
    window.location.reload()
}

// encontrada id de usario 
function find_user_id(){
    let position1 = window.location.href.search("/user");
    position1+=6;
    let str = window.location.href;
    let user_id=str.substring(position1)
    // console.log(user_id)
    return user_id

}

// view project setting
function view_setting(obj){
    let par = obj.parentNode;
    par= par.parentNode; 
    par= par.parentNode; 
    console.log(par.childNodes);
    let out_set;
    for (i=0;i< par.childNodes.length;i++){
        console.log(par.childNodes[i].className)
        if (par.childNodes[i].className == "ts" ){
            out_set = par.childNodes[i]
        }
    }
    out_set.style.display="flex";


}
// view project setting
function cerrar_setting(obj){
    obj.parentNode.style.display="none";
}

//change project name
function change_project_name(obj){
    let text="input_for_change_project_name_"+obj
    console.log(text)
    console.log(document.getElementById(text))
    //change in bd
    id =  find_user_id()
    var xhr_demo = new window.XMLHttpRequest()
    xhr_demo.open('PUT',`/user/${id}/change_project_name/${obj}`, true)
    xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr_demo.send(JSON.stringify({ inputed_name: document.getElementById(text).value    }))
     window.location.reload()
    
}

// deleteproject
function delete_project(obj){
      //change in bd
      id =  find_user_id()
      var xhr_demo = new window.XMLHttpRequest()
      xhr_demo.open('DELETE',`/user/${id}/delete_porject/${obj}`, true)
      xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr_demo.send()
       window.location.reload()
}

// publich
function publish(obj){
     //change in bd
     id =  find_user_id()
     var xhr_demo = new window.XMLHttpRequest()
     xhr_demo.open('POST',`/user/${id}/publish_project/${obj}`, true)
     xhr_demo.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
     xhr_demo.send()
      window.location.reload()
}