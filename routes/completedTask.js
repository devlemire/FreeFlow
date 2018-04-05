const Router = require('express').Router()
const completedTaskController = require()

Router.get('/api/completed/:projectId', completedTaskController.getCompletedTasks)
Router.post('/api/completed', completedTaskController.addCompletedTask)
Router.delete('/api/completed/:taskId/:projectId', completedTaskController.deleteCompletedTask)

module.exports = Router
