const express =require('express');
const mongoose=require('mongoose');;
const authRoutes  = require('./routers/auth');
const inicioRoutes  = require('./routers/inicio');
const userRoutes  = require('./routers/user');
const blogRoutes = require('./routers/blog');
const postRoutes = require('./routers/post');
require('dotenv').config();

const app =  express();
const PORT = process.env.POST || 3000;

app.set('view engine','ejs');
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }))
app.use( express.json() )
const bodyParser = require("body-parser")
app.use( bodyParser.urlencoded(
  { extended:true }
));
fs = require( 'fs' );


app.use( '/auth',authRoutes );
app.use( '/', inicioRoutes );
app.use( '/',userRoutes );
app.use( '/',blogRoutes );
app.use( '/',postRoutes );
app.set( 'view engine' , 'ejs');
app.set("views", __dirname + "/views");
const bd =process.env.mongo;
mongoose
       .connect(bd, { useNewUrlParser: true, useUnifiedTopology: true })
       .then((res)=>console.log('Connection to DB') )
       .catch((error)=>console.log(error))//"no connection to DB"

app.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
})

//add