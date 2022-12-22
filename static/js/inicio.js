// function for page 'inicio.js'
console.log(" qui")

// function for sending token to 'get auth/login'
function sent_token_to_login() {
    
    const token = localStorage.getItem( 'access_token' );
    console.log( token )
    var xhr_demo = new window.XMLHttpRequest();
    xhr_demo.open('GET',`/auth/login`, true);
    xhr_demo.setRequestHeader(  'Content-Type', 'application/json;charset=UTF-8' );
    xhr_demo.setRequestHeader('authorization'  , token)
    xhr_demo.send(JSON.stringify({ 'token':token, act:'login' }));
    //  window.location.href=`auth/login`
}