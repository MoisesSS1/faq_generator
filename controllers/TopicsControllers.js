//models
const {ContentModel, SectorsModel} = require('../models/AdminModel')

//helpers
const checkUserForToken = require('../helpers/checkUserForToken')

//criar tópico
exports.create = async (req,res)=>{
    const user = await checkUserForToken(req)
    //check user is admin
    if(user.isAdmin !==true){
       return res.status(401).json({message:"Area somente para usuários administradores!"})
    }

    const {area, title, steps} = req.body

    //tratando dados
    const areaCheck = area && area.trim().toUpperCase()
    const titleCheck = title && title.trim().toUpperCase()

    if(!areaCheck || !titleCheck || !steps){
       return res.status(401).json({message:"Preencha os dados corretamente!"})
    }
    
    //checa se setor existes
    try{
        const checkSectorExist = await SectorsModel.findOne({admin:user._id, sector:areaCheck})

        if(checkSectorExist===null){
            return res.status(401).json({message:"Setor não existe, crie o setor primeiro para depois criar um tópico nele!"})
        }
    }catch(error){
      return  res.status(401).json({message:"Erro ao checar se setor existe, tente mais tarde!"})
    }

    //salva tópico no banco de dados
    try {
        const ContentSave = {
            admin:user._id,
            area:areaCheck,
            title:titleCheck,
            steps:steps
        }
        
        const contentDB = await ContentModel.create(ContentSave)

        return res.status(201).json({message:"Tópico criado com sucesso!",data:contentDB})
        
    } catch (error) {
        return res.status(401).json({message:"Erro ao salvar tópico, tente mais tarde!"}) 
    }
}

//exibir tópicos
exports.get = async (req,res)=>{
    res.send("ola")
}
