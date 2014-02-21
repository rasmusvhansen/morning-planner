(function () {
  'use strict';
  angular.module('morningPlannerApp').directive('clock', function ($timeout) {
      return {
        scope: true,
        restrict: 'EA',
        template: '<div class="clock">' +
          '<h2>{{now | date: format}}</h2>' +
          '</div>',
        link: function (scope, element, attrs) {
          var timeout;
          scope.format = attrs.format || 'HH:mm';
          function setTime() {
            scope.now = new Date();
            timeout = $timeout(setTime, 1000);
          }
          setTime();

          scope.$on('$destroy', function () {
            if (timeout) {
              $timeout.cancel(timeout);
            }
          });

        }
      };
    });
})();