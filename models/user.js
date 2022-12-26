const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema =  new Schema({ 
    name:{
        type:String,
    },
    password:{
        type:String,
    },
    email:{
        type:String,
    },
    blogs:[ {
        block_name:{
            type:String,
        },
        publich:{
            type:Boolean,
            default:false
        },
        domen:{
            type:String
        }
        ,
        seo:{
            type:String 
        }
    }]
})

const User = mongoose.model('User',userSchema);
module.exports = User;