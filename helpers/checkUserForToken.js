const jwt = require('jsonwebtoken')

//models
const {AdminModel} = require('../models/AdminModel')


const checkUserForToken = async (req)=>{

    const Authorization = req.headers['authorization']
    const token = Authorization.replace("Bearer ","")

    const userId = await jwt.decode(token)
    
    //checar id se é válido

    try{
        const user = await AdminModel.findById(userId)
        return user
    }catch(error){
        return res.status(401).json("Houve um erro ao buscar usuário, tente novamente mais tarde!")
    }   
}

module.exports = checkUserForToken