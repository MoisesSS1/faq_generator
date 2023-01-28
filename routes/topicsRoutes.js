const express = require('express')
const router = express.Router()


//controllers
const TopicControllers = require('../controllers/TopicControllers')


router.post('/',TopicControllers.CreateTopics)









module.exports = router