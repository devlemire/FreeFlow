const Router = require('express').Router()
const taskController = require('../controllers/task')

Router.get('/:projectId', taskController.getTasks)
Router.post('', taskController.createTask)
Router.delete('/:projectId', taskController.deleteAllTasks)
Router.delete('/:taskId/:projectId', taskController.deleteTask)

module.exports = Router
