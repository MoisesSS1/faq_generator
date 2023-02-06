const router = require('express').Router()

//controllers
const AdminControllers = require('../controllers/AdminControllers')



//rotas publicas
router.post('/create',AdminControllers.createAccount)
router.get('/sectors',AdminControllers.getSectors)


//rotas privadas




module.exports = router