const jwt = require('jsonwebtoken')

//models
const {AdminModel, EmployeesModel} = require('../models/AdminModel')

const checkUserIsLogged = async(req,res,next)=>{
    const Authorization = req.headers['authorization']

    if(!Authorization){
        return res.status(401).json({message:"Entre em uma conta para acessar!"})
    }
    const token = Authorization.replace("Bearer ","")
    const userId = await jwt.decode(token)

    if(!userId){
        return res.status(401).json({message:"Entre em uma conta para acessar!"})
    }

   try {
    const UserExist = await AdminModel.findById(userId,'-password')

    
// caso venha um booleano, para não dar erro no método toString
    if(UserExist===null ||UserExist=== undefined){ 
        const userEmployess = await EmployeesModel.findById(userId,'-password')
    
        //checa se usuario existe no banco de funcionarios, caso não exista retorna para logar
        if(userEmployess===null ||userEmployess=== undefined){
            return res.status(401).json({message:"Entre em uma conta para acessar!"})
        }

        return next()
    }

    const check = UserExist.toString() //pode vir um array vazio

    if(check!==""){
        return next()
    }

    return res.status(401).json({message:"Entre em uma conta para acessar!"})
    
   } catch (error) {
    return res.status(401).json({message:"Erro ao tentar logar!"})
    
   }

}


module.exports = checkUserIsLogged