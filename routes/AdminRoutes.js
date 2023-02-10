const router = require('express').Router()

//controllers
const AdminControllers = require('../controllers/AdminControllers')

//helpers
const checkUserIsLogged = require('../helpers/checkUserIsLogged')

//rotas publicas
router.post('/create',AdminControllers.createAccount)

//rotas privadas
router.post('/edit', checkUserIsLogged, AdminControllers.EditAccount)





module.exports = router