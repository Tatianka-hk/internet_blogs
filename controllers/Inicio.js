const express = require('express');
const { validationResult } = require('express-validator');



exports.inicio_get =(req,res) =>{ 
    const title = 'Start';
    res.render("index.ejs",{title})
}
exports.inicio_post=  (req,res) =>{//inicio_get
    const title="Start"
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const alert = errors.array()
        res.render('index', { title,alert })
    }
    else{
        console.log("CHECK")
        res.render('index', { title})
    }
}