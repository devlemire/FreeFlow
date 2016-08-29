var app = require('../server.js');
var db = app.get('db');

module.exports = {
  getProjects: function(req, res) {
    db.queries.projects.getAll(req.params.id, function(err, r) {
      // console.log('GETTING ALL PROJECTS FOR', req.params.id);
      // console.log(r);
      res.status(200).json(r);
    });
  },
  addProject: function(req, res) {
    console.log('INCOMING PROJECT ADD', req.body);
    db.queries.projects.add([req.body.freelancer_id, req.body.name, req.body.desc, req.body.deadline, req.body.first_name, req.body.last_name, req.body.email], function(err, r) {
      db.queries.projects.getAll(req.body.freelancer_id, function(err, r) {
        res.json(r);
      });
    });
  },
  deleteProject: function(req, res) {
    db.queries.projects.delete([req.params.id], function(err, r) {
      // console.log('DELETEING PROJECT', req.params.id);
      if(err) {
        res.json({failed: true});
      } else {
        res.status(200).send();
      }
    });
  },
  getTasks: function(req, res) {
    db.queries.tasks.getAll([req.params.projectId], function(err, r) {
      res.json(r);
    });
  },
  createTask: function(req, res) {
    console.log("INCOMING TASK ADD", req.body);
    db.queries.tasks.add([req.body.project_id, req.body.title, req.body.description, req.body.deadline, req.body.priority], function(err, r) {
      db.queries.tasks.getAll([req.body.project_id], function(err, r) {
        res.json(r);
      });
    });
  },
  deleteTask: function(req, res) {
    console.log("INCOMING TASK DELETION", req.params.taskId);
    db.queries.tasks.delete([req.params.taskId], function(err, r) {
      db.queries.tasks.getAll([req.params.projectId], function(err, r) {
        res.json(r);
      });
    });
  },
  deleteAllTasks: function(req, res) {
    console.log("INCOMING DELETE ALL TASKS", req.params.projectId);
    db.queries.tasks.deleteAll([req.params.projectId], function(err, r) {
      db.queries.projects.delete([req.params.projectId], function(err, r) {
        res.status(200).send();
      });
    });
  },
  getCompletedTasks: function(req, res) {
    console.log('INCOMING GET COMPLETED TASKS', req.params.projectId);
    db.queries.completed.getAll([req.params.projectId], function(err, r) {
      console.log('TASKS FOUND:', r);
      res.json(r);
    });
  },
  addCompletedTask: function(req,res) {
    var completedTasks;
    var tasks;
    console.log('INCOMING ADD COMPLETED TASK - PROJECT', req.body.project_id);
    db.queries.completed.add([req.body.project_id, req.body.title, req.body.task_id], function(err, r) {
      //remove from task table after adding to completed task table
      db.queries.completed.deleteFromTasks(req.body.task_id, function(err, r) {
        db.queries.completed.getAll([req.body.project_id], function(err, r) {
          console.log('COMPLETED TASKS', r);
          completedTasks = r;
          db.queries.tasks.getAll([req.body.project_id], function(err, r) {
            console.log('TASKS', r);
            tasks = r;
            res.json({completed: completedTasks, tasks: tasks});
          });
        });
      });
    });
  },
  deleteCompletedTask: function(req, res) {
    console.log('INCOMING DELETE COMPLETED TASK - TASK', req.params.taskId, 'PROJECT -', req.params.projectId);
    console.log('REQ BODY', req.body);
    db.queries.completed.delete([req.params.taskId], function(err, r) {
      db.queries.completed.getAll([req.params.projectId], function(err, r) {
        console.log('UPDATED COMPLETED TASKS LIST', r);
        res.json(r);
      });
    });
  }
};
