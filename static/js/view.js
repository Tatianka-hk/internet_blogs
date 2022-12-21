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
        // if (sections[i].innerHTML.includes("i8938423740298341730") == true){
        //     console.log("true - ", i);
        //     let temp_code = sections[i].innerHTML.substring(0,sections[i].innerHTML.indexOf("i8938423740298341730") ) ;
        //     temp_code+= "src ='data:image/image/png;base64," +sectioms
        //     <%=image.img.data.toString('base64')%>">"


        // }
    position0 =  position1 +13;
        position1 =data.indexOf("end827rifddfo", position1+1);

    }
}