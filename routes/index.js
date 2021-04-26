const { Router } = require('express')
const GenerateController = require('../controllers/GenerateController')
const StaffController = require('../controllers/StaffController')
const Auth = require('../middleware/auth')

const router = new Router()

router.post('/generate', Auth.staff, GenerateController.generateUser)

router.post('/seeder', StaffController.staffMembers)

router.post('/auth', StaffController.login)

router.get('/me', Auth.staff, StaffController.me)

module.exports = router