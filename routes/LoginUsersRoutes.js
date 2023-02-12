const router = require('express').Router()

//Controllers
const UsersLoginControllers = require('../controllers/UsersLoginControllers')


router.post('/', UsersLoginControllers.login)



module.exports = router