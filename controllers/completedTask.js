module.exports = {
  getCompletedTasks: function(req, res) {
    console.log('INCOMING GET COMPLETED TASKS', req.params.projectId)
    db.completed.getAll([req.params.projectId], function(err, r) {
      console.log('TASKS FOUND:', r)
      res.json(r)
    })
  },
  addCompletedTask: function(req, res) {
    var completedTasks
    var tasks
    console.log('INCOMING ADD COMPLETED TASK - PROJECT', req.body.project_id)
    db.completed.add([req.body.project_id, req.body.title, req.body.task_id], function(err, r) {
      //remove from task table after adding to completed task table
      db.completed.deleteFromTasks(req.body.task_id, function(err, r) {
        db.completed.getAll([req.body.project_id], function(err, r) {
          console.log('COMPLETED TASKS', r)
          completedTasks = r
          db.tasks.getAll([req.body.project_id], function(err, r) {
            console.log('TASKS', r)
            tasks = r
            res.json({ completed: completedTasks, tasks: tasks })
          })
        })
      })
    })
  },
  deleteCompletedTask: function(req, res) {
    console.log('INCOMING DELETE COMPLETED TASK - TASK', req.params.taskId, 'PROJECT -', req.params.projectId)
    console.log('REQ BODY', req.body)
    db.completed.delete([req.params.taskId], function(err, r) {
      db.completed.getAll([req.params.projectId], function(err, r) {
        console.log('UPDATED COMPLETED TASKS LIST', r)
        res.json(r)
      })
    })
  }
}
