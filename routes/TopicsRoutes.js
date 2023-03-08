//modules
const router = require('express').Router()
const multer = require('multer')
const multerConfig = require('../config/multer')
//controllers
const TopicsControllers = require('../controllers/TopicsControllers')

//helpers
const checkUserIsLogged = require('../helpers/checkUserIsLogged')

//multer(multerConfig).array('file')

router.post('/create', checkUserIsLogged, TopicsControllers.create)//cria um tópico em sistema
router.get('/sector/:id', checkUserIsLogged, TopicsControllers.getAreas)//informa ao admin os tópicos de determinada area por id
router.get('/areaandtitle', checkUserIsLogged, TopicsControllers.areaAndTitle)//informa a area e os titulos
router.get('/title/:id', checkUserIsLogged, TopicsControllers.getTopics)//informa os tópicos de uma area especifica
router.post('/delete/:sector/:id', checkUserIsLogged, TopicsControllers.deleteTopic)//exclui o tópico




module.exports = router