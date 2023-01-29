//Módulos
const router = require('express').Router()

//Controllers
const CategoriesControllers = require('../controllers/CategoriesControllers')


//Somente rota privada

router.post("/create", CategoriesControllers.CreateCategories)
router.get("/get", CategoriesControllers.GetCategories)
router.post("/edit/:id", CategoriesControllers.EditCategories)
router.post("/delete/:id", CategoriesControllers.DeleteCategories)


module.exports = router