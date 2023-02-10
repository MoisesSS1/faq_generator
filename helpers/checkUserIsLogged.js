const jwt = require('jsonwebtoken')

//models
const {AdminModel} = require('../models/AdminModel')

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

    if(UserExist===null ||UserExist=== undefined){ // caso venha um booleano, para não dar erro no método toString
        return res.status(401).json({message:"Entre em uma conta para acessar!"})
    }

    const check = UserExist.toString() //pode vir um array vazio

    if(check!==""){
        return next()
    }

    return res.status(401).json({message:"Entre em uma conta para acessar!"})
    
   } catch (error) {
  return  console.log(error)
    
   }

}


module.exports = checkUserIsLogged