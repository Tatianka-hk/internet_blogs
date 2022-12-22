const {change_password,  verify_access_token } = require( '../middleware/for_auth' );
const User = require( '../models/user' );
const { validationResult } = require( 'express-validator' );
const jwt = require( 'jsonwebtoken' );
require( 'dotenv' ).config();
const express = require( 'express' );
const {generateUserTokenData} = require('../middleware/for_auth')
//=============================================
// register
//=============================================

// get auth/register 
exports.register_get =( req,res ) => { 
    const title = 'Register';
    res.render( 'register.ejs' ,{ title });
}
// post auth/register 
exports.register_post =  ( req,res ) => {
    const title = 'Register';
    //vaidate data
    const errors = validationResult( req );
     //output errors
    if( !errors.isEmpty() ) {
        const alert = errors.array();
        res.render( 'register', { title, alert });
    }
    else{
        pas=change_password( req.body.password ); //coding password
        let user = new User({ name:req.body.name,email:req.body.email,password:pas });//create new user in bd
        user.save()
            .then(()=>{})
            .catch(( error )=>{console.log( error )});
            var UserTokenData =  generateUserTokenData( result )
            token= jwt.sign({ user:UserTokenData } , process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' })
            res.render('login', { title, url: `/user/${user["_id"]}` , token })
    }
}
//=============================================
// login
//=============================================
exports.login_get =  ( req,res ) =>{ 
    console.log("LOGIN GET")
    console.log( req.headers.authorization)
    const title = 'Start';
    res.render( "login.ejs", { title, token : 'undefined', url : '/' } ); 
}

exports.login_post = (req,res) =>{
    console.log( 'login post' );
    const title = 'Login';
    //vaidate data
    const errors = validationResult( req );
     //output errors
    if( !errors.isEmpty() ) {
        const alert = errors.array();
        res.render('login', { title,alert , token : 'indefined', url : '/' });
    }
    else{
        console.log( 'no error' );
        pas=change_password( req.body.password ); //coding password
        User
            .findOne({ name:req.body.name , password:pas })//verifity user
            .then(( result )=>{ 
                if ( result!= null ){
                    var UserTokenData =  generateUserTokenData( result )
                    token= jwt.sign({ user:UserTokenData } , process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' })
                    res.render('login', { title, url: `/user/${result["_id"]}` , token })
                    // res.redirect( `/user/${result["_id"]}` );
                }                
                else{
                    const no_matching="no correct"
                    res.render('login', { title,no_matching ,  token : 'indefined', url : '/' })// output error
                }
            }).catch((error)=>{
                console.log(error)
                const no_matching="no correct"
            res.render('login', { title,no_matching,  token : 'indefined', url : '/' })})
    }

}
