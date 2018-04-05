angular.module('app').service('projectsSrvc', function($http) {
  var connectionString = 'http://localhost:4000/'
  this.projects = []

  this.getProjects = function(id) {
    return $http({
      method: 'GET',
      url: connectionString + 'api/projects/' + id
    })
  }

  this.addProject = function(data) {
    return $http({
      method: 'POST',
      url: connectionString + 'api/projects',
      data: data
    })
  }

  this.deleteProject = function(id) {
    return $http({
      method: 'DELETE',
      url: connectionString + 'api/project/' + id
    })
  }

  this.addTask = function(data) {
    return $http({
      method: 'POST',
      url: connectionString + 'api/task',
      data: data
    })
  }

  this.getTasks = function(id) {
    return $http({
      method: 'GET',
      url: connectionString + 'api/task/' + id
    })
  }

  this.deleteAllTasks = function(id) {
    return $http({
      method: 'DELETE',
      url: connectionString + 'api/tasks/' + id
    })
  }

  this.getCompletedTasks = function(project_id) {
    return $http({
      method: 'GET',
      url: connectionString + 'api/completed/' + project_id
    })
  }

  this.addCompleted = function(task) {
    return $http({
      method: 'POST',
      url: connectionString + 'api/completed',
      data: task
    })
  }

  this.deleteCompletedTask = function(task) {
    return $http({
      method: 'DELETE',
      url: connectionString + 'api/completed/' + task.id + '/' + task.project_id
    })
  }
})
