const { Router } = require('express')
const GenerateController = require('../controllers/GenerateController')

const router = new Router()

router.post('/generate', GenerateController.generateUser)

module.exports = router