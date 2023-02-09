const router = require('express').Router()

//controllers
const SectorControllers = require('../controllers/SectorControllers')


router.get('/',SectorControllers.getSectors)
router.post('/create',SectorControllers.createSector)


module.exports = router