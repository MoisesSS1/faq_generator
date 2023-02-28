const mongoose = require('../db/db')
const { Schema } = require('mongoose')


const AdminSchema = new Schema({
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
})

const EmployeesSchema = new Schema({
    admin:{
        type: Schema.Types.ObjectId,ref:'AdminSchema',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    cpf:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    sector:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default: new Date()
    },
})

const SectorsSchema = new Schema({
    admin:{
        type: Schema.Types.ObjectId,ref:'AdminSchema',
        required:true
    },
    sector:{
        type:String
    },
    areaAndTopics:[],
    createAt:{
        type:Date,
        default: new Date()
    },
})


const ContentSchema = new Schema({
    admin:{
        type: Schema.Types.ObjectId,ref:'AdminSchema',
        required:true
    },
    area:{ //area do tópico, quando for criar o conteudo, fazer uma busca pelas areas que ja foram criadas
        type:String,
        required:true
    },
    sectorAcess:{//setor que terá acesso a esse conteudo
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    obs:{ //observação
        type:String,
    },
    steps:[

    ],
    createAt:{
        type:Date,
        default: new Date()
    },
})

const AdminModel = mongoose.model('Admin', AdminSchema)
const EmployeesModel = mongoose.model('Employee', EmployeesSchema ) 
const ContentModel = mongoose.model('Content', ContentSchema) 
const SectorsModel = mongoose.model('Sector', SectorsSchema) 



module.exports = {ContentModel, AdminModel, EmployeesModel, SectorsModel}