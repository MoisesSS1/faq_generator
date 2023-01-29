//Módulos
const CategoriesModel = require('../models/Categories')

//Criar categoria
exports.CreateCategories = async (req,res)=>{

    const {name} = req.body
    const nameSave = await name.toUpperCase()
    //Retira espaços em branco, antes e depois da string
    const SpaceName = await name.trim()

    //validações
    if(!name || name===undefined || SpaceName===""|| SpaceName.length <= 3){
     return res.status(422).json({message:"Preencha o nome corretamente!"})
    }

    //buscar dado no db e ver se já foi salvo, converter e lowerCase
    const query =  await CategoriesModel.find({name:nameSave})

    if(query.length!==0){
        return res.status(422).json({message:"Categoria já foi criada, utilize outra!"})
    }

    //Salvando dado no DB   
    try{
        const dataSave = await CategoriesModel.create({name:nameSave})
      return  res.status(201).json({message:"Categoria criada com sucesso!"})
    }catch(error){
      return  res.status(422).json({message:"Erro ao salvar categoria, tente mais tarde!"})
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

