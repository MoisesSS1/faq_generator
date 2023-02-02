const mongoose = require('../db/db')
const { Schema } = require('mongoose')


const faq = []

const AdminModel = mongoose.model('Structure', new Schema({
    login:{
            type:String,
            required:true,
     },
      password:{
          type:String,
          required:true,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
})) 




module.exports = AdminModel