//Módulos
const router = require('express').Router()

//Controllers
const CategoriesControllers = require('../controllers/CategoriesControllers')


//Somente rota privada

router.post("/create", CategoriesControllers.CreateCategories)
router.post("/edit", CategoriesControllers.EditCategories)
router.get("/get", CategoriesControllers.GetCategories)
router.post("/delete", CategoriesControllers.DeleteCategories)


module.exports = router