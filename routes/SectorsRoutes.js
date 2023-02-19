const router = require('express').Router()

//controllers
const SectorsControllers = require('../controllers/SectorsControllers')

//helpers
const checkUserIsLogged = require('../helpers/checkUserIsLogged')


router.get('/',checkUserIsLogged, SectorsControllers.getSectors)
router.post('/create',checkUserIsLogged, SectorsControllers.createSector)


module.exports = router