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

    const {area,sectorAcess, title, steps} = req.body

    //tratando dados
    const areaCheck = area && area.trim().toUpperCase()
    const titleCheck = title && title.trim().toUpperCase()
    const sectorAcessCheck = sectorAcess && sectorAcess.trim().toUpperCase()

    if(!areaCheck || !titleCheck || !steps){
       return res.status(401).json({message:"Preencha os dados corretamente!"})
    }
    
    //checa se setor existes
    try{
        const checkSectorExist = await SectorsModel.findOne({admin:user._id, sector:sectorAcess})

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
            sector:sectorAcessCheck,
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
    const user = await checkUserForToken(req)

    if(user.isAdmin){
        return res.status(200).json({message:"Como você é admin não será possivel especificar os tópicos do seu setor!"})
    }

    try {
        const contentData = await ContentModel.find({admin:user.admin,area:user.sector},'-steps') 
        return res.status(200).json({data:contentData})
        
    } catch (error) {
        return res.status(401).json({message:"Erro ao buscar setores no banco de dados!"})
    }
    
} 


//rota que pega o id do tópico e exibe seu conteudo