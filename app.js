const express =require('express')
const mongoose=require('mongoose');
const authRoutes  = require('./routers/auth')
const inicioRoutes  = require('./routers/inicio')
const userRoutes  = require('./routers/user')
const blogRoutes = require('./routers/blog')
const postRoutes = require('./routers/post')



const app =  express();
const PORT = 5000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true } ))
app.use(express.json())
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded(
  { extended:true }
))


app.use('/auth', authRoutes);
app.use('/', inicioRoutes)
app.use('/',userRoutes)
app.use('/',blogRoutes)
app.use('/',postRoutes)




const bd =process.env.mongo;
mongoose
       .connect(bd, { useNewUrlParser: true, useUnifiedTopology: true })
       .then((res)=>console.log("Connection to DB"))
       .catch((error)=>console.log(error))//"no connection to DB"

app.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
})




                
            



// app.post(`/user/:id/blog/:name`,(req,res)=>{
//     console.log("POST")
//     console.log(req.body.act)
//     change(req.body.act,req.params.id, req.params.name, req.body.s_name, req.body.s_id, req.body.scs, req.body.s_text, req.body.s_number , req.body.s_start, req.body.s_end, req.body.s_add, req.body.style)
//     res.redirect(`/user/${req.params.id}/blog/${req.body.name}`)
// })

