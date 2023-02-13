const jwt = require('jsonwebtoken')

//models
const {AdminModel, EmployeesModel} = require('../models/AdminModel')


const checkUserForToken = async (req)=>{

    const Authorization = req.headers['authorization']
    
    const token = Authorization.replace("Bearer ","")

    const userId = await jwt.decode(token)
    
    //checar id se é válido

    try{
        const userAdmin = await AdminModel.findById(userId)

        if(!userAdmin){
            const user = await EmployeesModel.findById(userId)

            return user
    
        }
        return userAdmin
    }catch(error){
        return res.status(401).json("Houve um erro ao buscar usuário, tente novamente mais tarde!")
    }   
}

module.exports = checkUserForToken