angular
  .module('app')
  .controller('projectsCtrl', function($scope, loginSrvc, $location, projectsSrvc, ngDialog, $auth, $rootScope) {

    // --- User Validation ---
    $scope.user = JSON.parse(window.localStorage.getItem('user'));

    $scope.loggedIn = function() {
      if(!($auth.getToken())) {
        $location.path('/');
      }
    }();

    $scope.logOut = function() {
      $auth.logout();
      localStorage.clear();
      $location.path('/');
    };
    // --- User Validation ---


    // --- View Handling ---
    $scope.noMessages = true;

    $scope.showCreation = function() {
      if($scope.detailedView) {
        ngDialog.open({template: './view/addTaskTmpl.html', className: 'ngdialog-theme-default', scope: $scope});
      } else {
        ngDialog.open({ template: './view/addProjectTmpl.html', className: 'ngdialog-theme-default', scope: $scope });
      }
      console.log("CURRENT USER", JSON.parse(window.localStorage.getItem('user')));
    };

    $scope.closeDetailedView = function() {
      projectsSrvc.getProjects($scope.user.id).then(function(r) {
        if(r.data.length === 0) {
          $scope.firstTimeUser = true;
        } else {
          $scope.projects = r.data;
          $scope.tasks = [];
          $scope.firstTask = false;
        }
      });
      $scope.detailedView = false;
      $scope.projectPage = true;
    };
    // --- View Handling ---


    // --- Data Manipulation ---
    $scope.checkForNoProjects = function() {
      projectsSrvc.getProjects($scope.user.id).then(function(r) {
        if(r.data.length === 0) {
          // console.log("NO PROJECTS FOUND FOR USER", $scope.user.id, r.data);
          $scope.firstTimeUser = true;
          $scope.detailedView = false;
          $scope.projects = r.data;
        } else {
          // console.log("FOUND A PROJECT", r.data);
          $scope.firstTimeUser = false;
          $scope.detailedView = false;
          $scope.projects = r.data;
        }
        $scope.projectPage = true;
      });
    }();

    $scope.addProject = function(data) {
      // console.log('ADD PROJECT', data);
      if(data.name && data.desc && data.deadline && data.c_email && data.c_fname && data.c_lname) {
        projectData = {
          freelancer_id: $scope.user.id,
          name: data.name,
          desc: data.desc,
          deadline: data.deadline,
          first_name: data.c_fname,
          last_name: data.c_lname,
          email: data.c_email
        };

        projectsSrvc.addProject(projectData).then(function(r) {
          // console.log("UPDATED PROJECTS:", r);
          $scope.projects = r.data;
        });

        $scope.firstTimeUser = false;
        $scope.detailedView = false;
        ngDialog.close();
      }
    };

    $scope.orderTasks = function(r) {
      // console.log("ATTEMPING TO ORDER TASKS");
      var temp = [];
      for(var i in r.data) {
        if(r.data[i].priority == 'High') {
          temp.push(r.data[i]);
        }
      }
      for(var j in r.data) {
        if(r.data[j].priority == 'Medium') {
          temp.push(r.data[j]);
        }
      }
      for(var k in r.data) {
        if(r.data[k].priority == 'Low') {
          temp.push(r.data[k]);
        }
      }
      return temp;
    };

    $scope.addTask = function(data) {
      data.project_id = $scope.details.id;
      console.log('ADDING TASK', data);
      projectsSrvc.addTask(data).then(function(r) {
        console.log('UPDATED TASKS', r.data);
        $scope.tasks = $scope.orderTasks(r);
        $scope.firstTask = false;
        ngDialog.close();
      });
    };
    // --- Data Manipulation ---


    // --- Event Listeners ---
    $rootScope.$on('deleted', function (event, data) {
      $scope.projects = data.projects;
      if(data.projects.length === 0) {
          $scope.firstTimeUser = true;
      }
    });

    $rootScope.$on('detailedView', function(event, data) {
      // console.log('Incoming Detailed View Event', data);
      $scope.projectPage = false;
      $scope.projects = [data];
      $scope.details = data;
      $scope.detailedView = true;
      projectsSrvc.getTasks(data.id).then(function(r) {
        if(r.data.length === 0) {
          $scope.firstTask = true;
          console.log('FIRST TASK:', $scope.firstTask);
        } else {
          $scope.firstTask = false;
          $scope.tasks = $scope.orderTasks(r);
        }
      });
      projectsSrvc.getCompletedTasks(data.id).then(function(r) {
        $scope.completed = r.data;
      });
    });

    $rootScope.$on('taskDeletion', function(event, data) {
      $scope.tasks = $scope.orderTasks({data: data});
      if($scope.tasks.length === 0) {
        $scope.firstTask = true;
      }
    });

    $rootScope.$on('addCompleted', function(event, task) {
      console.log('ADD COMPLETED TRIGGERED', task);
      var data = {project_id: task.project_id, title: task.title, task_id: task.id};
      projectsSrvc.addCompleted(data).then(function(r) {
        // console.log(r);
        // $scope.projects = $scope.orderTasks({data: r.data.tasks});
        $scope.tasks = r.data.tasks;
        $scope.completed = r.data.completed;
      });
    });

    $rootScope.$on('completeDelete', function(event, task) {
      // console.log('DELETE COMPLETED TRIGGERED', task);
      projectsSrvc.deleteCompletedTask(task).then(function(r) {
        $scope.completed = r.data;
        if($scope.completed.length === 0 && $scope.tasks.length === 0) {
          $scope.firstTask = true;
        }
      });
    });
    // --- Event Listeners ---
  });
