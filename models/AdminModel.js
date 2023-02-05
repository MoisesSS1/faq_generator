const mongoose = require('../db/db')
const { Schema } = require('mongoose')


const AdminModel = mongoose.model('user', new Schema({

    admin:{
        cnpj:{
                type:String,
                required:true,
        },
        name:{
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
        },
    },

    employees:{
        name:{
            type:String,
        },
        cpf:{
            type:Number
        },
        sector:{
            type:String
        },
        password:{
            type:String,
        }
    },

    sectors:{
        name:{
            type:String
        },
        topics:{
            type:String
        }
    },

    content:{
        sector:{
            type:String
        },
        title:{
            type:String,
        },
        steps:{
            description:{
                type:String
            },
            img:{
                type:String
            },
            obs:{
                type:String
            }
        }
    }
})) 




module.exports = AdminModel