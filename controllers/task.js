module.exports = {
  getTasks: function(req, res) {
    db.tasks.getAll([req.params.projectId], function(err, r) {
      res.json(r)
    })
  },
  createTask: function(req, res) {
    console.log('INCOMING TASK ADD', req.body)
    db.tasks.add([req.body.project_id, req.body.title, req.body.description, req.body.deadline, req.body.priority], function(err, r) {
      db.tasks.getAll([req.body.project_id], function(err, r) {
        res.json(r)
      })
    })
  },
  deleteTask: function(req, res) {
    console.log('INCOMING TASK DELETION', req.params)
    db.tasks.delete([req.params.taskId], function(err, r) {
      db.tasks.getAll([req.params.projectId], function(err, r) {
        res.json(r)
      })
    })
  },
  deleteAllTasks: function(req, res) {
    console.log('INCOMING DELETE ALL TASKS', req.params.projectId)
    db.tasks.deleteAll([req.params.projectId], function(err, r) {
      db.projects.delete([req.params.projectId], function(err, r) {
        res.status(200).send()
      })
    })
  }
}
