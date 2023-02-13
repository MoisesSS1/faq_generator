//modules
const router = require('express').Router()

//controllers
const TopicsControllers =  require('../controllers/TopicsControllers')

//helpers
const checkUserIsLogged = require('../helpers/checkUserIsLogged')

router.get('/',checkUserIsLogged, TopicsControllers.get)
router.post('/create',checkUserIsLogged, TopicsControllers.create)



module.exports = router