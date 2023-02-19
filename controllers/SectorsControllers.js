
//models
const {SectorsModel} = require('../models/AdminModel')

//helpers
const getToken = require('../helpers/getToken')
const checkUserForToken = require('../helpers/checkUserForToken')


//cria setor
exports.createSector = async (req,res)=>{
    const user = await checkUserForToken(req)

    if(user.isAdmin !== true){
        return res.status(401).json({message:"Area somente para adinistradores!"})
    }

    const {sector} = req.body
    const sectorValid = await sector && sector.trim() && sector.toUpperCase()
    
    if(!sectorValid ||sectorValid.lenght <2){
        return res.status(422).json({message:"Preencha o nome do setor corretamente"})
    }
    
    //verifica se setor já foi utilizado
    try{
        const sectorsInDB = await SectorsModel.findOne({admin:user._id,sector:sectorValid})
        
        if(sectorsInDB){
            return  res.status(401).json({message:"Esse setor já foi criado, utilize outro!"})
        }
    }catch(error){
        return res.status(422).json({message:"Erro ao checar se setor já foi utilizado, tente novamente mais tarde!"})
    }
    //adiciona setor a coleção
    try {
        const saveSector = await SectorsModel.create({
            admin:user,
            sector:sectorValid
        })
        return  res.status(200).json({message:"Setor criado com sucesso!"})
        
    } catch (error) {
        return res.status(422).json({message:"Erro ao salvar setor, tente novamente mais tarde!"})
    }
}

//informa os setores cadastrados pelo ADMIN
exports.getSectors = async (req,res)=>{ 
        const user = await checkUserForToken(req)

        try {
            const sectors = await SectorsModel.find({admin:user._id})
            return res.status(200).json({data:sectors})
            
        } catch (error) {
            return res.status(401).json({message:"Erro ao buscar setores, tente novamente mais tarde!"})
        }   
}



