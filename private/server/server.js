var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var connectionString = "postgress://jameslemire@localhost/freeflow";
var massiveInstance = massive.connectSync({connectionString : connectionString});
var app = module.exports = express();
app.set('db', massiveInstance);
var config = require('./config/config.js');
var loginCtrl = require('./controller/loginCtrl.js');
var registerCtrl = require('./controller/registerCtrl.js');
var projectsCtrl = require('./controller/projectsCtrl.js');
var thirdPartyCtrl = require('./controller/thirdPartyCtrl.js');

app.use(express.static('../../public'));
app.use(bodyParser.json());

//Third Party Authorization
app.post('/auth/google', thirdPartyCtrl.googleAuth);

//LOGIN
app.post('/auth/local', loginCtrl.localAuth);
app.post('/login/google', loginCtrl.googleAuth);

//REGISTER
app.post('/api/register/localAuth', registerCtrl.localAuth);
app.post('/api/register/googleAuth', registerCtrl.googleAuth);

//Free Lancer endpoints

//Client endpoints

//Project endpoints
app.get('/api/projects/:id', projectsCtrl.getProjects);
app.post('/api/projects', projectsCtrl.addProject);
app.delete('/api/project/:id', projectsCtrl.deleteProject);


//Task endpoints
app.get('/api/task/:id', projectsCtrl.getTasks);
app.post('/api/task', projectsCtrl.createTask);
app.delete('/api/tasks/:projectId', projectsCtrl.deleteAllTasks);
app.delete('/api/task/:taskId/:projectId', projectsCtrl.deleteTask);

//Sub-Task endpoints

app.all('*', function(req, res, next) {
  res.sendFile('index.html', { root: '../../public' });
});

// console.log(app.get('db'));

app.listen(config.port, function() { console.log("Server intiated on port", config.port); });
