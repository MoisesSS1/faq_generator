const mongoose = require('../db/db')
const { Schema } = require('mongoose')


const TopicsModel = mongoose.model('Topics', new Schema ({
    name:{
        type:String,
        required:true
    }
}))

module.exports = TopicsModel
