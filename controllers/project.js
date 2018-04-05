var app = require('../server.js')
var db = app.get('db')

module.exports = {
  getProjects: function(req, res) {
    db.projects.getAll(req.params.id, function(err, r) {
      // console.log('GETTING ALL PROJECTS FOR', req.params.id);
      // console.log(r);
      res.status(200).json(r)
    })
  },
  addProject: function(req, res) {
    console.log('INCOMING PROJECT ADD', req.body)
    db.projects.add(
      [req.body.freelancer_id, req.body.name, req.body.desc, req.body.deadline, req.body.first_name, req.body.last_name, req.body.email],
      function(err, r) {
        db.projects.getAll(req.body.freelancer_id, function(err, r) {
          res.json(r)
        })
      }
    )
  },
  deleteProject: function(req, res) {
    db.projects.delete([req.params.id], function(err, r) {
      // console.log('DELETEING PROJECT', req.params.id);
      if (err) {
        res.json({ failed: true })
      } else {
        res.status(200).send()
      }
    })
  }
}
