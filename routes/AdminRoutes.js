const router = require('express').Router()

//controllers
const AdminControllers = require('../controllers/AdminControllers')



//rotas publicas
router.post('/create',AdminControllers.createAccount)


//rotas privadas




module.exports = router