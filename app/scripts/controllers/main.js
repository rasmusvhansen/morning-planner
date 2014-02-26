'use strict';

angular.module('morningPlannerApp')
  .controller('MainCtrl', function ($scope, $timeout, $window) {
    var timeout;
    $scope.tasks = angular.fromJson($window.localStorage.tasks) || [];
    $scope.tasks.forEach(function (t) {
      t.time = new Date(t.time);
    });

    $scope.now = function () {
      return new Date();
    };

    $scope.task = {};

    $scope.createNewTask = function (form) {
      $scope.tasks.push({time: moment($scope.task.hours + ':' + $scope.task.minutes, 'HH:mm').toDate(), title: $scope.task.title});
      $scope.tasks = $scope.tasks.sort(function (t1, t2) {
        return getTime(t1.time) > getTime(t2.time) ? 1 : -1;
      });

      $scope.task = {};
      form.$setPristine();
      saveToStore();
    };

    function saveToStore() {
      $window.localStorage.tasks = angular.toJson($scope.tasks);
    }

    $scope.deleteTask = function (task) {
      $scope.tasks.splice($scope.tasks.indexOf(task), 1);
      saveToStore();
    };

    $scope.dateFilter = function (t) {
      return getTime(t.time) > getTime(new Date());
    };

    function setCurrentTask() {
      var now = $scope.now();
      $scope.currentTask = $scope.tasks.reduce(function (prev, current) {
        return getTime(current.time) > getTime(now) ? prev : current;
      }, {time: undefined});

      var nextTaskIndex = $scope.tasks.indexOf($scope.currentTask) + 1;
      var nextTask = nextTaskIndex < $scope.tasks.length ? $scope.tasks[nextTaskIndex] : undefined;
      if (nextTask) {
        var current = getDateToday($scope.currentTask.time);
        var next = getDateToday(nextTask.time);
        $scope.currentProgress = (now - current) / (next - current) * 100;
      } else {
        $scope.currentProgress = 100;
      }
      timeout = $timeout(setCurrentTask, 1000);
    }

    function getTime(date) {
      return moment(date).format('HH:mm');
    }

    function getDateToday(date) {
      return moment(getTime(date), 'HH:mm').toDate();
    }

    setCurrentTask();

    $scope.$on('$destroy', function () {
      if (timeout) {
        $timeout.cancel(timeout);
      }
    });


  });
