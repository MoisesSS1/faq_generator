//models
const AdminModel = require('../models/AdminModel')


exports.createAccount = async (req,res)=> {
    
    const {cnpj, name, password, email, phone} =  req.body

    const newUser = {
        admin:{
            cnpj,
            name,
            password,
            email,
            phone
        }

    }

   
        try{
          const userCreate=  await AdminModel.create(newUser)
            res.status(200).json({message:userCreate})
            
        }catch(error){
            res.status(400).json({message:error})
        }

}

