require('dotenv').config()

//módulos
const express = require('express')

//rotas
const topicsRouter = require('./routes/topicsRoutes')

//app
const app = express()
const port = process.env.PORT

//middlewares
app.use(express.json())
app.use('/topics', topicsRouter)



app.listen(port,()=>{
    console.log('servidor rodando na porta'+ port)
})