(function () {
  'use strict';
  angular.module('morningPlannerApp').directive('moveToNext', function () {
    return {
      restrict: 'EA',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        scope.$watch(function () {
          return ngModel.$valid;
        }, function (valid) {
          if (valid && ngModel.$dirty) {
            $(':input:eq(' + ($(':input').index(element) + 1) + ')').focus();
          }
        });
      }
    };
  });
})();