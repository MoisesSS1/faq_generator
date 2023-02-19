//modules
const router = require('express').Router()

//controllers
const TopicsControllers =  require('../controllers/TopicsControllers')

//helpers
const checkUserIsLogged = require('../helpers/checkUserIsLogged')

router.post('/create',checkUserIsLogged, TopicsControllers.create)//cria um tópico em sistema
router.get('/areas',checkUserIsLogged, TopicsControllers.getAreas)//informa as areas cadastradas no banco
router.get('/area/:area',checkUserIsLogged, TopicsControllers.getTopics)//informa os tópicos de uma area especifica



module.exports = router