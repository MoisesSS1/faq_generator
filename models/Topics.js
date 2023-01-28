const mongoose = require('../db/db')
const { Schema } = require('mongoose')


const topics = mongoose.model('Topics', new Schema ({
    name:{
        type:String,
        required:true
    }
}))

module.exports = topics
