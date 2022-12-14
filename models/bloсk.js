const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blockSchema =  new Schema({ 
    id_user:{
        type:String
    },
    name_of_blog:{
        type:String
    },
    blog_id:{
        type:String
    },
    post_name:{
        type:String
    },
    id:{
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
    },
    post:{
        type:Boolean,
        default:false
    },
    posts:[ {
        post_name: {
            type:String
        }}
    ]
    , img:
    {
        data: Buffer,
        contentType: String
    },
    img2:
    {
        data: Buffer,
        contentType: String
    }
    ,
    img3:
    {
        data: Buffer,
        contentType: String
    }
    ,
    img4:
    {
        data: Buffer,
        contentType: String
    }
    ,
    url:{
        type:String
    }
})
const Block = mongoose.model('Block',blockSchema);
module.exports = Block;