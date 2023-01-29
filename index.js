require('dotenv').config()

//módulos
const express = require('express')

//rotas
const TopicsRouter = require('./routes/TopicsRoutes')
const CategoriesRouter = require('./routes/CategoriesRoutes')

//app
const app = express()
const port = process.env.PORT

//middlewares
app.use(express.json())
app.use('/topics', TopicsRouter)
app.use('/categories', CategoriesRouter)



app.listen(port,()=>{
    console.log('servidor rodando na porta '+ port)
})