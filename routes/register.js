const Router = require('express').Router()
const registerController = require('../controllers/register')

Router.post('/', registerController.register)

module.exports = Router
