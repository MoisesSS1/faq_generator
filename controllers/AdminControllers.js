//modulos
const bcrypt = require('bcrypt')

//models
const {AdminModel} = require('../models/AdminModel')

//helpers
const getToken = require('../helpers/getToken')
const checkUserForToken = require('../helpers/checkUserForToken')

//cria conta admin
exports.createAccount = async (req,res)=> {
    const {cnpj, name, password, email, phone} =  req.body

    //Validações
    const cnpjValid = cnpj && cnpj.trim()
    const nameValid = name && name.trim()
    const passwordValid = password && password.trim()
    const emailValid = email && email.trim()
    const phoneValid = phone && phone.trim()

    //checagem
    if(!cnpjValid || !nameValid || !passwordValid || !emailValid || !phoneValid || cnpjValid.length!==14 || phoneValid.length!==11 ){
        return res.status(422).json({message:"Preencha os dados corretamente!"})
    }
    //verifica se usuario já existe
    try{
        const userExist = await AdminModel.find({cnpj:cnpjValid})
        const check = userExist.toString()// caso faça a busca e volte um array vazio

        if(check!==""){//faz a checagem se o array estiver diferente de vazio
            return res.status(422).json({message:"Cnpj já foi utilizado, use outro!"})
        }
    }catch(error){
      return  res.status(422).json({message:"Houve um erro ao validar cnpj, tente novamente mais tarde!"})
    }

    //cria a criptografia da senha e cadastrada a hash
    const passwordHash = await bcrypt.hash(passwordValid, 10)
    
    const newUser = {
            cnpj:cnpjValid,
            name: nameValid,
            password:passwordHash,
            email:emailValid,
            phone:phoneValid
    }

        try{
            const userCreate = await AdminModel.create(newUser)
            const token = await getToken(userCreate)


            return res.status(200).json({
                message:"Conta criada com sucesso",
                auth:true,
                token:token
            })
            
        }catch(error){
            res.status(400).json({message:error})
        }

}





