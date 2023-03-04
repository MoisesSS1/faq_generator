//modules
const bcrypt = require('bcrypt')

//models
const {AdminModel, EmployeesModel} = require("../models/AdminModel")

//helpers
const getToken = require('../helpers/getToken')





//login para a conta dos usuarios
exports.login = async (req,res)=>{

    const {email,password} = req.body

    if(!email||!password){
        return res.status(401).json({message:"Preencha os dados corretamente!"})
    }

   //checar se usuario e senha conferem
     try{
        const userAdmin = await AdminModel.findOne({email:email})
        const userEmployees = await EmployeesModel.findOne({email:email})

        if(userAdmin && userAdmin!==null){

            //validação de senha
            const checkPassword = await bcrypt.compare(password,userAdmin.password)

                    //validação de senha
                    if(!checkPassword){
                         return res.status(401).json({
                             message:"Senha incorreta!",
                         })
                        }

            const token = await getToken(userAdmin)
            
            return res.status(200).json({
                message:"Login com sucesso",
                auth:true,
                token:token,
                isAdmin:true
            })
        }

        if(userEmployees && userEmployees!==null){

            const checkPassword = await bcrypt.compare(password,userEmployees.password)
            //validação de senha
            if(!checkPassword){
                return res.status(401).json({
                    message:"Senha incorreta!",
                })
            }

            //gerar token de usuario logado
            const token = await getToken(userEmployees)

            return res.status(200).json({
                message:"Usuario logado com sucesso!",
                auth:true,
                token:token
            })
        }

        return res.status(401).json({message:"Usuário não existe, utilize um e-mail válido!!"})
            
        }catch(error){
            res.status(400).json({message:error})
        }
}


