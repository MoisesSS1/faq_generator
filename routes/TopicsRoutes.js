//modules
const router = require('express').Router()

//controllers
const TopicsControllers =  require('../controllers/TopicsControllers')

//helpers
const checkUserIsLogged = require('../helpers/checkUserIsLogged')

router.post('/create',checkUserIsLogged, TopicsControllers.create)//cria um tópico em sistema
router.get('/sector/:id',checkUserIsLogged, TopicsControllers.getAreas)//informa ao admin os tópicos de determinada area por id
router.get('/areaandtitle',checkUserIsLogged, TopicsControllers.areaAndTitle)//informa a area e os titulos
router.get('/title/:id',checkUserIsLogged, TopicsControllers.getTopics)//informa os tópicos de uma area especifica




module.exports = router