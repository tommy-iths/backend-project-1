const express = require("express");
const throttle = require("express-throttle");
const app = express();
const { Router } = require('express')
const GenerateController = require('../controllers/GenerateController')
const StaffController = require('../controllers/StaffController')
const Auth = require('../middleware/auth')



const router = new Router()

router.post('/generate', Auth.staff, throttle({ "burst": 10, "period": "24h" }), GenerateController.generateUser)

router.post('/auth', StaffController.login)

router.get('/me', Auth.staff, StaffController.me)

module.exports = router