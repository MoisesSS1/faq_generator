//módulos
const TopicsModel = require('../models/Topics')


//criar tópico
exports.CreateTopics = (req,res)=>{
  const {name,category,sector,content} = req.body

  const dataSaveBody = {
    name,
    category,
    sector,
    content
  }

        try{
            const dataSave = TopicsModel.create(dataSaveBody)
          return  res.status(200).json({message:"Sucesso"})
        }catch(error){
            return  res.status(200).json({message:"error"})
        }
}

