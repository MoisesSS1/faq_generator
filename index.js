require('dotenv').config()

//módulos
const express = require('express')

//rotas
const AdminRoutes = require('./routes/AdminRoutes')

//app
const app = express()
const port = process.env.PORT

//middlewares
app.use(express.json())
app.use('/account', AdminRoutes)



app.listen(port||5000,()=>{
    console.log('servidor rodando ')
})