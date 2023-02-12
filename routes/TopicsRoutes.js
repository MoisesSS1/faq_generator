//modules
const router = require('express').Router()

//controllers
const TopicsControllers =  require('../controllers/TopicsControllers')

//helpers
const checkUserIsLogged = require('../helpers/checkUserIsLogged')

router.post('/create',checkUserIsLogged, TopicsControllers.create)


module.exports = router