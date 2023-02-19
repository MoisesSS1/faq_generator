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
    
    //checa se setor existe
    try{
        const checkSectorExist = await SectorsModel.findOne({admin:user._id, sector:sectorAcess})

        if(checkSectorExist===null){
            return res.status(401).json({message:"Setor não existe, crie o setor e depois um tópico nele!"})
        }
    }catch(error){
      return  res.status(401).json({message:"Erro ao checar se setor existe, tente mais tarde!"})
    }

    //salva tópico no banco de dados
    try {
        const ContentSave = {
            admin:user._id,
            area:areaCheck,
            sectorAcess:sectorAcessCheck,
            title:titleCheck,
            steps:steps
        }
        
        const contentDB = await ContentModel.create(ContentSave)
        //adiciona titulo e id do tópico no array de sectors
            const refAreaAndTopics = {
                idPub:contentDB._id,
                title:contentDB.title
            }


        //checar se a area está cadastrada no banco
            //busca todos os setores do banco, para atualizar as areas e o id das pubs
            const sectorDB = await SectorsModel.findOne({admin:user._id, sector:sectorAcess})

            let checkAreaExist;
            let check = sectorDB.areaAndTopics.map((obj)=>{
                let checkInObj = obj[areaCheck]
                        if(checkInObj){
                          checkAreaExist = true
                        }
            })

            //se nao estiver cria a area e dentro dela adiciona os dados
            //cria um novo elemento para adicionar no banco, incluindo a nova propriedade
            if(!checkAreaExist===true){
                const refAreaAndTopicsEdit = {
                        [areaCheck]:[
                            refAreaAndTopics
                        ]
                }
                const sectorDBAdd = await sectorDB.areaAndTopics.push(refAreaAndTopicsEdit)
                const updateSector = await SectorsModel.findOneAndUpdate({admin:user._id, sector:sectorAcess},sectorDB)
            }

        
            //caso esteja, apenas adicionar a coleção
            if(checkAreaExist===true){
                const sectorDBAdd = sectorDB.areaAndTopics.map((obj)=>{
                    let checkInObj = obj[areaCheck]
                        if(checkInObj){
                        let objUpdate = obj[areaCheck].push(refAreaAndTopics)

                        return objUpdate
                        }
                        return obj
                })

                const updateSector = await SectorsModel.findOneAndUpdate({admin:user._id, sector:sectorAcess},sectorDB)
            }



        return res.status(201).json({message:"Tópico criado com sucesso!",data:contentDB})
        
    } catch (error) {
        return res.status(401).json({message:"Erro ao salvar tópico, tente mais tarde!"}) 
    }
}

//exibir as areas dos tópicos para os funcionarios
exports.getAreas = async (req,res)=>{
    const user = await checkUserForToken(req)

    if(user.isAdmin){
        return res.status(200).json({message:"Como você é admin não será possivel especificar os tópicos do seu setor!"})
    }

    try {
        const contentData = await ContentModel.find({admin:user.admin,sectorAcess:user.sector},'area')
        return res.status(200).json({data:contentData})
        
    } catch (error) {
        return res.status(401).json({message:"Erro ao buscar setores no banco de dados!"})
    } 
}

//rota que pega o nome do tópico e filtra os tópicos disponiveis com aquele nome

exports.getTopics = async (req,res)=>{
    const user = await checkUserForToken(req)

    const area = req.params.area

    if(user.isAdmin){
        return res.status(200).json({message:"Como você é admin não será possivel especificar os tópicos do seu setor!"})
    }

    try {
        const contentData = await ContentModel.find({admin:user.admin,area:area})
        return res.status(200).json({data:contentData})
        
    } catch (error) {
        return res.status(401).json({message:"Erro ao buscar tópicos dessa area, tente mais tarde!"})
    }
    
}