//Módulos
const CategoriesModel = require('../models/Categories')

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

//Editar categoria
exports.EditCategories = (req,res)=>{                    
    
}

//Ler categoria
exports.GetCategories = (req,res)=>{
    
}

//excluir categoria
exports.DeleteCategories = (req,res)=>{
    
}

