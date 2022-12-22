const express = require( 'express' );
const { validationResult } = require( 'express-validator' );
const jwt = require('jsonwebtoken')
require('dotenv').config()
// get /
exports.inicio_get = ( req, res ) => {
    const title = 'Start';
    res.render( "index.ejs", { title });
}
// recieve mesaage from human
// post /
exports.inicio_post =  (req, res ) => {//inicio_get
    const title = "Start";
    //validate data
    const errors = validationResult( req );
     //output errors
    if( !errors.isEmpty() ) {
        const alert = errors.array();
        res.render('index', { title, alert });
    }
    else{
        res.render( 'index', { title} );
    }
}