const Router = require('express').Router()
const loginController = require('../controllers/login')

Router.post('/', loginController.login)

module.exports = Router
