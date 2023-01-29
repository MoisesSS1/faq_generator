//módulos
const TopicsModel = require('../models/Topics')


//criar tópico
exports.CreateTopics = (req,res)=>{
  const {name} = req.body

        try{
            const dataSave = TopicsModel.create({name:name})
            res.status(200).json({message:"Sucesso"})
        }catch(error){
            res.status(200).json({message:"error"})
        }
}

