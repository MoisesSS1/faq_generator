const mongoose = require('../db/db')
const { Schema } = require('mongoose')


const TopicsModel = mongoose.model('Topics', new Schema ({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    sector:{
        type:String,
        required:true
    },
    content:{
        type:Array,
        required:true
    },

}))

module.exports = TopicsModel
