//Módulos
const CategoriesModel = require('../models/Categories')
const TopicsModel = require('../models/Topics')

//Criar categoria
exports.CreateCategories = async (req,res)=>{

    const {name,sector} = req.body

    //validações iniciais
    if(!name || name===undefined ){
        return res.status(422).json({message:"Preencha o nome corretamente!"})
       }
   
       if(!sector || sector===undefined ){
           return res.status(422).json({message:"Preencha o setor corretamente!"})
       }

    //Retira espaços em branco, antes e depois da string
    const SpaceName = await name.trim()
    const SpaceSector = await sector.trim()

    //deixa dado maiusculo para ter consistencia no DB
    const nameSave = await SpaceName.toUpperCase()
    const sectorSave = await SpaceSector.toUpperCase()

    //validações
    if(SpaceName===""|| SpaceName.length <= 3){
     return res.status(422).json({message:"Preencha o nome corretamente!"})
    }

    if(SpaceSector===""|| SpaceSector.length <= 1){
        return res.status(422).json({message:"Preencha o setor corretamente!"})
    }

    const query =  await CategoriesModel.find({name:nameSave,sector:sectorSave}).exec()
    const queryReturn= query[0]

    //Caso nao tenha dado com area ou setor dessa area

    if(queryReturn===undefined){
            //Salvando dado no DB   
    try{
        const dataSave = await CategoriesModel.create({name:nameSave,sector:sectorSave})
        return  res.status(201).json({message:"Categoria criada com sucesso!"})
      }catch(error){
        return  res.status(422).json({message:"Erro ao salvar categoria, tente mais tarde!"})
      }  
    }

    if(queryReturn.name===nameSave && queryReturn.sector===sectorSave){
        return res.status(422).json({message:"Categoria já foi criada nesse setor!"})
    }
}

//Ler categoria
exports.GetCategories = async (req,res)=>{

    const Categories = await CategoriesModel.find({})
    return res.status(200).json({categories:Categories}) 
}

//Editar categoria
exports.EditCategories = async (req,res)=>{

    const {name,sector} = req.body
    const _id = req.params.id

    //validações iniciais
    if(!name || name===undefined ){
        return res.status(422).json({message:"Preencha o nome corretamente!"})
       }
    if(!sector || sector===undefined ){
        return res.status(422).json({message:"Preencha o setor corretamente!"})
    }

    //Retira espaços em branco, antes e depois da string
    const SpaceName = await name.trim()
    const SpaceSector = await sector.trim()

    //deixa dado maiusculo para ter consistencia no DB
    const nameSave = await SpaceName.toUpperCase()
    const sectorSave = await SpaceSector.toUpperCase()

    //validações apos tratamento inicial dos dados
    if(SpaceName===""|| SpaceName.length <= 3){
     return res.status(422).json({message:"Preencha o nome corretamente!"})
    }
    if(SpaceSector===""|| SpaceSector.length <= 1){
        return res.status(422).json({message:"Preencha o setor corretamente!"})
    }

    //busca de categoria no banco por id
    try {
        var query =  await CategoriesModel.findById(_id)

        if(query===null||query===undefined||query===""){
            return  res.status(422).json({message:"Categoria não encontrada!"})
        }
    } catch (error) {
        return res.status(422).json({message:"Erro ao procurar dado a ser atualizado, tente novamente mais tarde!"})
    }

    //Caso nao tenha dado com area ou setor dessa area salvar dado no DB      
    if(query){
    const dataSave = {
           name:nameSave,
           sector:sectorSave
    }

    try{
        //atualizar categories e topicos
        const dataDB = await CategoriesModel.findByIdAndUpdate(_id,dataSave)
        return  res.status(201).json({message:"Categoria atualizada com sucesso!"})
      }catch(error){
        return  res.status(422).json({message:"Erro ao atualizar dados da categoria, atualize a página e tente novamente!"})
      }  
    }
}

//excluir categoria
exports.DeleteCategories = async (req,res)=>{

    //checar se id existe no db
    const _id = req.params.id
    try {
        var query =  await CategoriesModel.findById(_id)

        if(query===null||query===undefined||query===""){
            return  res.status(422).json({message:"Categoria não encontrada!"})
        }
    } catch (error) {
        return res.status(422).json({message:"Erro ao procurar dado a ser deletado, atualize e tente novamente!"})
    }

    //verificar se tem algum dados na area e setor que ele quer deletar,
    //caso exista pedir para migrar ou excluir tópicos antes de deletar a categoria

    const checkTopics = await TopicsModel.find({category:query.name,sector:query.sector}).exec()
    console.log(checkTopics)
    const queryReturn= checkTopics[0]


    if(queryReturn===undefined){
        //Deletando dados dado no DB   
                try{
                    const dataDelete = await CategoriesModel.deleteOne({_id})
                    return  res.status(201).json({message:"Categoria deletada com sucesso!"})
                }catch(error){
                    return  res.status(422).json({message:"Erro ao deletar categoria, tente mais tarde!"})
                }  
    }


    if(queryReturn){
        return  res.status(422).json({message:"Você possui tópicos nessa categoria e setor, migre eles ou os exclua para poder deletar essa categoria!"})
    }





    // const deleteData = await TopicsModel.find({})
    
}

