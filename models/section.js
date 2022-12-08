
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sectionSchema =  new Schema({ 
    id_user:{
        type:String
    },
    name_of_blog:{
        type:String
    },
    id:{
        type:Number
    },
    backgroundcolor:{
        type:String
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
const Section = mongoose.model('Section',sectionSchema);
module.exports = Section;