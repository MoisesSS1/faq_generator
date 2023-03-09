require('dotenv').config()

//módulos
const express = require('express')
const cors = require('cors')

//rotas
const AdminRoutes = require('./routes/AdminRoutes')
const SectorsRoutes = require('./routes/SectorsRoutes')
const EmployeesRoutes = require('./routes/EmployeesRoutes')
const LoginUsersRoutes = require('./routes/LoginUsersRoutes')
const TopicsRoutes = require('./routes/TopicsRoutes')
const morgan = require('morgan')

//app
const app = express()

//middlewares
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use('/account', AdminRoutes)
app.use('/sectors', SectorsRoutes)
app.use('/employees', EmployeesRoutes)
app.use('/login', LoginUsersRoutes)
app.use('/topics', TopicsRoutes)



app.listen(process.env.PORT || 5000, () => {
    console.log('servidor rodando ')
})