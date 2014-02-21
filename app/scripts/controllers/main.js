'use strict';

angular.module('morningPlannerApp')
  .controller('MainCtrl', function ($scope, $timeout) {
    var timeout;

    $scope.tasks = [
      { time: '06:30', title: 'Stå op'},
      { time: '06:40', title: 'Væk Mads'},
      { time: '06:45', title: 'Spis morgenmad'},
      { time: '07:00', title: 'Mads i tøjet'},
      { time: '07:05', title: 'Børste tænder'},
      { time: '07:10', title: 'Pakke tasker'},
      { time: '07:15', title: 'Overtøj på'},
      { time: '07:23', title: 'Ud af døren'},
      { time: '22:41', title: 'Kod noget endnu mere'},
      { time: '23:42', title: 'Gå i seng'},
      { time: '23:40', title: 'Gå nu i seng'},
      { time: '23:55', title: 'Gå nu i seng!!!'},
    ];

    $scope.now = function () {
      return new Date();
    };

    $scope.tasks = $scope.tasks.map(function (t) {
      return { time: moment(t.time, 'HH:mm').toDate(), title: t.title };
    })
      .sort(function (t1, t2) {
        return t1.time - t2.time;
      });

    $scope.dateFilter = function (t) {
      return t.time > new Date();
    };

    function setCurrentTask() {
      var now = new Date();
      $scope.currentTask = $scope.tasks.reduce(function (prev, current) {
        return current.time > now ? prev : current;
      }, {});
      timeout = $timeout(setCurrentTask, 1000);
    }

    setCurrentTask();

    $scope.$on('$destroy', function () {
      if (timeout) {
        $timeout.cancel(timeout);
      }
    });

  });
