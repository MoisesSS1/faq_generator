//Modules
const bcrypt = require('bcrypt')

//Models
const {EmployeesModel, SectorsModel} = require('../models/AdminModel')

//Helpers
const checkUserForToken = require('../helpers/checkUserForToken')


//Create employees
exports.create = async (req,res)=>{
    const user = await checkUserForToken(req)
    if(user.isAdmin !== true){
        return res.status(401).json({message:"Area somente para usuarios administradores!"})
    }
    const { cpf, name, email,sector,password} = req.body

    //Checagem
    const cpfValid = cpf && cpf.trim()
    const nameValid = name && name.trim()
    const passwordValid = password && password.trim()
    const emailValid = email && email.trim()
    const sectorValid = sector && sector.trim().toUpperCase()

    if(!cpfValid || !nameValid || !passwordValid || !emailValid || !sectorValid || cpfValid.length!==11 ){
        return res.status(422).json({message:"Preencha os dados corretamente!"})
    }
   
        //verify sector exist
        try{
            const checkSector = await SectorsModel.findOne({admin:user._id,sector:sectorValid})
            if(!checkSector){
                return res.status(422).json({message:"Você deve criar o setor antes e depois incluir um funcionário!!"}) 
            }
        }catch(error){
            return res.status(422).json({message:"Erro ao buscar setores salvos no DB, tente novamente mais tarde!!"}) 
        }


        try {
            const passwordHash = await bcrypt.hash(passwordValid, 10)

            const employeesData = {
                admin:user._id,
                cpf:cpfValid,
                name:nameValid,
                password:passwordHash,
                email:emailValid,
                sector:sectorValid
            }

            const employeesSave = await EmployeesModel.create(employeesData)
            res.status(200).json({message:"Funcionário criado com sucesso!!!"})

        } catch (error) {
            return res.status(422).json({message:"Erro ao criar funcionário, tente novamente mais tarde!!"}) 
        }
}

//My employees
exports.get = async (req,res)=>{
    const user = await checkUserForToken(req)

    //checar se usuario já utiliza o cpf
    try{
        const myEmployees = await EmployeesModel.find({admin:user._id})
        return res.status(200).json({data:myEmployees})
    }catch(error){

        return res.status(401).json({message:"Erro ao buscar funcionarios em sistema, tente novamente mais tarde!"})
        
    }

}

