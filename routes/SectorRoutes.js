const router = require('express').Router()

//controllers
const SectorControllers = require('../controllers/SectorControllers')

//helpers
const checkUserIsLogged = require('../helpers/checkUserIsLogged')


router.get('/',checkUserIsLogged, SectorControllers.getSectors)
router.post('/create',checkUserIsLogged, SectorControllers.createSector)


module.exports = router