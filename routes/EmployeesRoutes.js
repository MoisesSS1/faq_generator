const router = require('express').Router()

//controllers
const EmployeesController = require('../controllers/EmployeesControllers')

//Helpers
const checkUserIsLogged = require('../helpers/checkUserIsLogged')

router.post("/create",checkUserIsLogged, EmployeesController.create)
router.get("/",checkUserIsLogged, EmployeesController.get)



module.exports = router