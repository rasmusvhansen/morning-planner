(function () {
  'use strict';
  angular.module('morningPlannerApp').directive('focusOnSubmit', function () {
    return {
      restrict: 'EA',
      require: '^form',
      link: function (scope, element) {
        element.closest('form').on('submit', function () {
          element.focus();
        });
      }
    };
  });
})();