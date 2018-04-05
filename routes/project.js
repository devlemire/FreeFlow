const Router = require('express').Router
const projectController = require('../controllers/project')

Router.post('/', projectsCtrl.addProject)
Router.get('/:id', projectsCtrl.getProjects)
Router.delete('/:id', projectsCtrl.deleteProject)

module.exports = Router
