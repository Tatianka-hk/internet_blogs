const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postblockSchema =  new Schema({ 
    name:{
        type:String
    },
    date:{
        type:Date
    },
    user_id:{
        type:String
    },
    blog_name:{
        type:String
    },
    post_name:{
        type:String
    },
    order:{
        type:Number
    },
    name_of_section:{
        type:String
    },
    hide:{
        type:String,
        default:'grid'
    },
    demo:{
        type:String,
        default:'none'
    },
    code:{
        type: String
    },
    backgorund_color:{
        type:String,
        default:"aacac5"
    },
    text_color:{
        type:String,
        default:"6E0D25"
    },
    text_size:{
        type:String,
        default:"14px"
    },
    text_font:{
        type:String,
        default:"Arial"
    }

})

const Post = mongoose.model('Post',postblockSchema);
module.exports = Post;