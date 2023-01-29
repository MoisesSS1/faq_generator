//módulos
const TopicsModel = require('../models/Topics')


//criar tópico
exports.CreateTopics = (req,res)=>{
  const {name} = req.body

        try{
            const dataSave = TopicsModel.create({name:name})
          return  res.status(200).json({message:"Sucesso"})
        }catch(error){
            return  res.status(200).json({message:"error"})
        }
}

