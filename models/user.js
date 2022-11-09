const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema =  new Schema({ 
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    blogs:[ {
        name:{
            type:String,
            required:true
        },
        sections:[{
            id:{
                type:Number
            },
            backgroundcolor:{
                type:String
            },
            type_of_section:{
                type:String
            },
            name_of_section:{
                type:String
            },
            width:{
                type:Number
            },
            height:{
                type:Number
            }
        }]
    }]
})

const User = mongoose.model('Data',userSchema);
module.exports = User;