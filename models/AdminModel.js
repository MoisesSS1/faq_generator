const mongoose = require('../db/db')
const { Schema } = require('mongoose')

const AdminModel = mongoose.model('user', new Schema({
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

    isAdmin:{
        type:Boolean,
        default:true
    },
    createAt:{
        type:Date,
        default: new Date()
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