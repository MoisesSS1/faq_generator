const mongoose = require('../db/db')
const { Schema } = require('mongoose')

const UsersAndSector = mongoose.model('Structure', new Schema({
    sector:{
        type:String,
        required:true
    },

    users:[{
        login:{
            type:String,
     },
        password:{
            type:String,
    },
        registration:{
          type:String,
    },
    }],

    treatmentArea:{
        name:{
            type:String
        },
        topics:[
            {
                title:{
                    type:String
                },
                phases:[]
            }
        ]
    }
    
    
})) 




module.exports = UsersAndSector