require('dotenv').config()

//módulos
const express = require('express')

//rotas
const AdminRoutes = require('./routes/AdminRoutes')
const SectorRoutes = require('./routes/SectorRoutes')
const EmployeesRoutes = require('./routes/EmployeesRoutes')

//app
const app = express()
const port = process.env.PORT

//middlewares
app.use(express.json())
app.use('/account', AdminRoutes)
app.use('/sector', SectorRoutes)
app.use('/employees', EmployeesRoutes)



app.listen(port||5000,()=>{
    console.log('servidor rodando ')
})