const mongoose = require('../db/db')
const { Schema } = require('mongoose')

const CategoriesModel = mongoose.model('Categories', new Schema({
    name:{
        type:String,
        required:true,
    }

})) 




module.exports = CategoriesModel

